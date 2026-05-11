/**
 * PATCH /api/photos/:id — update tags/title (admin only)
 * DELETE /api/photos/:id — delete a photo (admin only)
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

export async function onRequestPatch({ params, request, env }) {
  try {
    const { id } = params;
    const body = await request.json();
    if (body.password !== env.GALLERY_ADMIN_PASSWORD) return unauthorized();

    const raw = await env.GALLERY_META.get(`photo:meta:${id}`);
    if (!raw) return json({ ok: false, error: 'Not found' }, 404);

    const meta = JSON.parse(raw);
    if (body.tags !== undefined) meta.tags = body.tags;
    if (body.title !== undefined) meta.title = body.title;
    await env.GALLERY_META.put(`photo:meta:${id}`, JSON.stringify(meta));

    return json({ ok: true, photo: meta });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}

export async function onRequestDelete({ params, request, env }) {
  try {
    const { id } = params;
    const body = await request.json();
    if (body.password !== env.GALLERY_ADMIN_PASSWORD) return unauthorized();

    // Delete data + meta — no shared list to update
    await env.GALLERY_META.delete(`photo:data:${id}`);
    await env.GALLERY_META.delete(`photo:meta:${id}`);

    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
