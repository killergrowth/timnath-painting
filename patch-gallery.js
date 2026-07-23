'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sign-up.html');
let html = fs.readFileSync(filePath, 'utf8');

const galleryStart = html.indexOf('<!-- Our Work Gallery -->');
if (galleryStart === -1) {
  console.error('ERROR: Could not find <!-- Our Work Gallery --> comment');
  process.exit(1);
}

// Find the closing </div> of the outer div (margin-top:56px)
// The structure is: comment, outer div, inner div (columns), inner div (text-align:center), outer close
// We need to find where this block ends - it closes before <!-- Why Choose Us -->
const whyStart = html.indexOf('<!-- ── Why Choose Us');
if (whyStart === -1) {
  console.error('ERROR: Could not find Why Choose Us comment');
  process.exit(1);
}

// The block we want to replace is from <!-- Our Work Gallery --> up to (but not including) <!-- Why Choose Us -->
const blockToReplace = html.substring(galleryStart, whyStart);
console.log('Block found, length:', blockToReplace.length);
console.log('Block preview (first 100 chars):', blockToReplace.substring(0, 100));

const newBlock = `<!-- Our Work Gallery -->
    <div style="margin-top:56px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:10px;">Our Work</p>
      <h3 style="font-size:22px;font-weight:800;color:#201B10;margin-bottom:8px;">See What We've Built</h3>
      <p style="font-size:15px;color:#7E7C76;line-height:1.7;margin-bottom:28px;">Browse our completed exterior painting, HOA, and fence staining projects across Northern Colorado.</p>
      <a href="/gallery/" style="display:inline-flex;align-items:center;gap:10px;background:#AE360E;color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:100px;text-decoration:none;">
        <i class="fa-solid fa-images"></i> View Our Project Gallery
      </a>
    </div>
  </div>
</section>

`;

html = html.substring(0, galleryStart) + newBlock + html.substring(whyStart);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Done - gallery block replaced with /gallery/ link');
