/**
 * GET /api/photo/:id — serve raw image bytes
 */

export async function onRequestGet({ params, env }) {
  try {
    const { id } = params;
    const metaRaw = await env.GALLERY_META.get(`photo:meta:${id}`);
    if (!metaRaw) return new Response('Not found', { status: 404 });

    const meta = JSON.parse(metaRaw);
    // Fetch raw binary directly — no base64 decode needed
    const bytes = await env.GALLERY_META.get(`photo:data:${id}`, { type: 'arrayBuffer' });
    if (!bytes) return new Response('Not found', { status: 404 });

    return new Response(bytes, {
      headers: {
        'Content-Type': meta.mimeType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      }
    });
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
}
