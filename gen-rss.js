/**
 * gen-rss.js — RSS 2.0 Feed Generator
 * Timnath Painting | KillerGrowth
 *
 * Reads blog-posts/blog-index.json and outputs dist/blog/feed/index.xml
 * so the feed lives at https://timnathpainting.com/blog/feed/
 *
 * Called automatically from build.js after buildBlog().
 * Also safe to run standalone: node gen-rss.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT      = __dirname;
const DIST      = path.join(ROOT, 'dist');
const INDEX     = path.join(ROOT, 'blog-posts', 'blog-index.json');

const DOMAIN    = 'timnathpainting.com';
const SITE_NAME = 'Timnath Painting';
const SITE_URL  = `https://${DOMAIN}`;
const FEED_URL  = `${SITE_URL}/blog/feed/`;
const BLOG_URL  = `${SITE_URL}/blog/`;
const LANGUAGE  = 'en-us';
const COPYRIGHT = `Copyright ${new Date().getFullYear()} ${SITE_NAME}`;
const TTL       = 60; // minutes

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRFC822(dateStr) {
  if (!dateStr) return new Date().toUTCString();
  return new Date(dateStr).toUTCString();
}

function absImage(img) {
  if (!img) return null;
  if (img.startsWith('http')) return img;
  const clean = img.startsWith('/') ? img : `/${img}`;
  return `${SITE_URL}${clean}`;
}

function buildRss() {
  if (!fs.existsSync(INDEX)) {
    console.log('[RSS] blog-index.json not found — skipping RSS generation.');
    return;
  }

  const data  = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  const posts = (data.posts || [])
    .filter(p => p.status === 'published' && p.publishDate)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 50); // RSS standard: cap at 50 items

  const buildDate = posts.length
    ? toRFC822(posts[0].publishDate)
    : new Date().toUTCString();

  const items = posts.map(post => {
    const url     = `${SITE_URL}/blog/${post.slug}/`;
    const title   = escapeXml(post.title);
    const excerpt = escapeXml(post.excerpt || '');
    const pubDate = toRFC822(post.publishDate);
    const image   = absImage(post.featuredImage);
    const tags    = (post.tags || []).map(t => `    <category>${escapeXml(t)}</category>`).join('\n');
    const enclosure = image
      ? `    <enclosure url="${escapeXml(image)}" type="image/jpeg" length="0" />`
      : '';
    const mediaContent = image
      ? `    <media:content url="${escapeXml(image)}" medium="image" />`
      : '';

    return `  <item>
    <title>${title}</title>
    <link>${escapeXml(url)}</link>
    <guid isPermaLink="true">${escapeXml(url)}</guid>
    <description>${excerpt}</description>
    <pubDate>${pubDate}</pubDate>
    <author>info@timnathpainting.com (${escapeXml(post.author || SITE_NAME)})</author>
${tags}
${enclosure}
${mediaContent}
  </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)} Blog</title>
    <link>${SITE_URL}</link>
    <description>Painting tips, project ideas, and local insights from ${escapeXml(SITE_NAME)} — Northern Colorado's trusted exterior painting contractor.</description>
    <language>${LANGUAGE}</language>
    <copyright>${COPYRIGHT}</copyright>
    <ttl>${TTL}</ttl>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/assets/img/timnath-painting-logo.png</url>
      <title>${escapeXml(SITE_NAME)} Blog</title>
      <link>${BLOG_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  // Output to dist/blog/feed/index.xml → serves at /blog/feed/
  const outDir = path.join(DIST, 'blog', 'feed');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'index.xml');
  fs.writeFileSync(outPath, xml, 'utf8');

  console.log(`[RSS] Generated feed with ${posts.length} posts → dist/blog/feed/index.xml`);
}

buildRss();
module.exports = { buildRss };
