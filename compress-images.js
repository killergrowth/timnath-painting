'use strict';
/**
 * compress-images.js
 * One-time compression of oversized background images.
 * Originals backed up to assets/images/backgrounds/originals/
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BG = path.join(__dirname, 'dist', 'assets', 'images', 'backgrounds');
const BACKUP = path.join(BG, 'originals');

if (!fs.existsSync(BACKUP)) fs.mkdirSync(BACKUP, { recursive: true });

const targets = [
  // { file, quality, maxWidthPx }
  { file: 'page-header-bg-1-1.jpg', quality: 72, maxWidth: 1920 }, // 12MB → target ~120KB
  { file: 'quote-bg.jpg',           quality: 72, maxWidth: 1920 }, // 2MB  → target ~80KB
  { file: 'slider-3-1.jpg',         quality: 78, maxWidth: 1920 }, // 486KB → target ~120KB
];

// Unused files to delete
const unused = ['slider-3-2.jpg', 'slider-2-1.jpg'];

async function run() {
  for (const t of targets) {
    const src = path.join(BG, t.file);
    if (!fs.existsSync(src)) { console.log(`SKIP (not found): ${t.file}`); continue; }

    const backup = path.join(BACKUP, t.file);
    if (!fs.existsSync(backup)) {
      fs.copyFileSync(src, backup);
      console.log(`Backed up: ${t.file}`);
    }

    const before = Math.round(fs.statSync(src).size / 1024);
    await sharp(src)
      .resize({ width: t.maxWidth, withoutEnlargement: true })
      .jpeg({ quality: t.quality, mozjpeg: true })
      .toFile(src + '.tmp');

    fs.renameSync(src + '.tmp', src);
    const after = Math.round(fs.statSync(src).size / 1024);
    console.log(`${t.file}: ${before}KB → ${after}KB (saved ${before - after}KB)`);
  }

  for (const u of unused) {
    const f = path.join(BG, u);
    if (fs.existsSync(f)) {
      const backup = path.join(BACKUP, u);
      if (!fs.existsSync(backup)) fs.copyFileSync(f, backup);
      fs.unlinkSync(f);
      console.log(`Deleted unused: ${u}`);
    }
  }

  console.log('\nDone. Originals saved in dist/assets/images/backgrounds/originals/');
}

run().catch(console.error);
