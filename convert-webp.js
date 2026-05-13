'use strict';
/**
 * convert-webp.js
 * Converts compressed JPGs in source assets/images to WebP.
 * Creates .webp copies alongside originals (keeps JPG as fallback).
 * Then patches dist HTML/CSS to reference WebP versions.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES = path.join(__dirname, 'assets', 'images');
const DIST_IMAGES = path.join(__dirname, 'dist', 'assets', 'images');

async function convertToWebP(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_originals' || entry.name === 'originals') continue;
      await convertToWebP(full);
    } else if (entry.isFile() && /\.(jpg|jpeg)$/i.test(entry.name)) {
      const webpPath = full.replace(/\.(jpg|jpeg)$/i, '.webp');
      if (fs.existsSync(webpPath)) continue; // already converted
      try {
        const before = Math.round(fs.statSync(full).size / 1024);
        await sharp(full).webp({ quality: 80 }).toFile(webpPath);
        const after = Math.round(fs.statSync(webpPath).size / 1024);
        const rel = full.replace(IMAGES + path.sep, '');
        console.log(`✓ ${rel}: ${before}KB → ${after}KB WebP`);
      } catch (e) {
        console.error(`✗ ${entry.name}: ${e.message}`);
      }
    }
  }
}

async function patchDistHTML() {
  // After build copies assets, patch all dist HTML files to use .webp for background-image inline styles
  const distDir = path.join(__dirname, 'dist');
  const htmlFiles = [];
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.html')) htmlFiles.push(full);
    }
  }
  walk(distDir);

  let patched = 0;
  for (const f of htmlFiles) {
    let html = fs.readFileSync(f, 'utf8');
    // Replace .jpg/.jpeg in background-image inline styles and CSS url() references with .webp
    // Only replace if the WebP version exists in dist
    const original = html;
    html = html.replace(/url\(([^)]*)\.(jpg|jpeg)\)/gi, (match, base, ext) => {
      // Resolve path relative to dist
      const relPath = base.replace(/^\//, '');
      const webpDist = path.join(distDir, relPath + '.webp');
      if (fs.existsSync(webpDist)) return `url(${base}.webp)`;
      return match;
    });
    if (html !== original) {
      fs.writeFileSync(f, html, 'utf8');
      patched++;
    }
  }
  console.log(`\nPatched ${patched} HTML files to use WebP backgrounds.`);
}

async function run() {
  console.log('Converting JPGs to WebP in source assets...');
  await convertToWebP(IMAGES);
  console.log('\nConverting JPGs to WebP in dist assets...');
  await convertToWebP(DIST_IMAGES);
  await patchDistHTML();
  console.log('\n✅ WebP conversion complete.');
}

run().catch(console.error);
