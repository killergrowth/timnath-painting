'use strict';
/**
 * compress-source-images.js
 * Compresses large images in-place in the SOURCE assets/images folder.
 * Originals backed up to assets/images/_originals/
 * Run once before building; images stay compressed for all future builds.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const IMAGES = path.join(__dirname, 'assets', 'images');
const BACKUP = path.join(IMAGES, '_originals');
if (!fs.existsSync(BACKUP)) fs.mkdirSync(BACKUP, { recursive: true });

const targets = [
  // JPG backgrounds
  { rel: 'backgrounds/page-header-bg-1-1.jpg', quality: 72, maxWidth: 1920 },
  { rel: 'backgrounds/quote-bg.jpg',           quality: 72, maxWidth: 1920 },
  { rel: 'backgrounds/slider-3-1.jpg',         quality: 78, maxWidth: 1920 },
  { rel: 'backgrounds/slider-drive-hero.jpg',  quality: 78, maxWidth: 1920 },
  // Large content images
  { rel: 'resources/why-choose-1-1.jpg',       quality: 72, maxWidth: 1600 },
  { rel: 'resources/why-choose-1-2.jpg',       quality: 72, maxWidth: 1600 },
  { rel: 'service/img-4932-exterior.jpg',      quality: 75, maxWidth: 1600 },
  { rel: 'service/img-5611-interior.jpg',      quality: 75, maxWidth: 1600 },
  { rel: 'service-exterior-painting.jpg',      quality: 75, maxWidth: 1600 },
  { rel: 'service-interior-painting.jpg',      quality: 75, maxWidth: 1600 },
  { rel: 'service/areas-served-map.jpg',       quality: 72, maxWidth: 1600 },
  { rel: 'service/photo-exterior-staining.jpg',quality: 75, maxWidth: 1600 },
  { rel: 'about/josh-funk.png',                quality: 80, maxWidth: 800,  format: 'jpeg' },
  { rel: 'stock/hero-luxury-home.jpg',         quality: 78, maxWidth: 1920 },
  { rel: 'slider/slider-drive-hero.jpg',       quality: 78, maxWidth: 1920 },
  { rel: 'shapes/about-bg-2-1.png',           quality: 75, maxWidth: 1600 },
  { rel: 'shapes/hero-2-1.png',               quality: 75, maxWidth: 1200 },
];

// Unused files to delete from source
const unused = [
  'backgrounds/slider-3-2.jpg',
  'backgrounds/slider-2-1.jpg',
];

async function run() {
  let totalSaved = 0;

  for (const t of targets) {
    const src = path.join(IMAGES, t.rel);
    if (!fs.existsSync(src)) { console.log(`SKIP (not found): ${t.rel}`); continue; }

    const backup = path.join(BACKUP, t.rel.replace(/\//g, '_'));
    if (!fs.existsSync(backup)) {
      fs.copyFileSync(src, backup);
    }

    const before = Math.round(fs.statSync(src).size / 1024);
    const tmp = src + '.tmp';

    try {
      let pipeline = sharp(src).resize({ width: t.maxWidth, withoutEnlargement: true });
      if (t.format === 'jpeg' || src.match(/\.png$/i)) {
        // Convert PNG to JPEG where appropriate
        const outPath = src.replace(/\.png$/i, '.jpg');
        await pipeline.jpeg({ quality: t.quality || 80, mozjpeg: true }).toFile(tmp);
        fs.renameSync(tmp, src.replace(/\.png$/i, '.jpg'));
        // Remove original PNG only if it was converted
        if (outPath !== src) { /* keep original path for now */ }
      } else {
        await pipeline.jpeg({ quality: t.quality, mozjpeg: true }).toFile(tmp);
        fs.renameSync(tmp, src);
      }
      const after = Math.round(fs.statSync(t.format === 'jpeg' && src.match(/\.png$/i) ? src.replace(/\.png$/i, '.jpg') : src).size / 1024);
      const saved = before - after;
      totalSaved += saved;
      console.log(`✓ ${t.rel}: ${before}KB → ${after}KB (saved ${saved}KB)`);
    } catch (e) {
      console.error(`✗ ${t.rel}: ${e.message}`);
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  }

  for (const u of unused) {
    const f = path.join(IMAGES, u);
    if (fs.existsSync(f)) {
      const backup = path.join(BACKUP, u.replace(/\//g, '_'));
      if (!fs.existsSync(backup)) fs.copyFileSync(f, backup);
      fs.unlinkSync(f);
      console.log(`🗑 Deleted unused: ${u}`);
    }
  }

  console.log(`\n✅ Done. Total saved: ${Math.round(totalSaved / 1024)}MB`);
}

run().catch(console.error);
