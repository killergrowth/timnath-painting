/**
 * GET /api/photos — list all photos with metadata
 * POST /api/photos — upload a new photo (admin only)
 */

function unauthorized() {
  return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
    status: 401, headers: { 'Content-Type': 'application/json' }
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

export async function onRequestGet({ env }) {
  try {
    // List all photo metadata keys — avoids race conditions with a shared photo_ids array
    const list = await env.GALLERY_META.list({ prefix: 'photo:meta:' });
    const metas = await Promise.all(
      list.keys.map(async ({ name }) => {
        const raw = await env.GALLERY_META.get(name);
        return raw ? JSON.parse(raw) : null;
      })
    );
    // Sort newest first by uploadedAt
    const photos = metas.filter(Boolean).sort((a, b) =>
      new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
    return json({ ok: true, photos });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const password = formData.get('password') || '';
    if (password !== env.GALLERY_ADMIN_PASSWORD) return unauthorized();

    const file = formData.get('photo');
    const tags = (formData.get('tags') || '').split(',').map(t => t.trim()).filter(Boolean);
    const title = formData.get('title') || '';

    if (!file) return json({ ok: false, error: 'No photo provided' }, 400);

    // Read image bytes — store raw ArrayBuffer in KV (no base64 overhead)
    const bytes = await file.arrayBuffer();
    const mimeType = file.type || 'image/jpeg';

    const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const meta = {
      id,
      title,
      tags,
      mimeType,
      size: bytes.byteLength,
      uploadedAt: new Date().toISOString(),
    };

    // Store raw binary + metadata — no shared list needed, we use KV prefix listing
    await env.GALLERY_META.put(`photo:data:${id}`, bytes);
    await env.GALLERY_META.put(`photo:meta:${id}`, JSON.stringify(meta));

    return json({ ok: true, photo: meta });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
