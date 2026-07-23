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

const whyStart = html.indexOf('<!-- ── Why Choose Us');
if (whyStart === -1) {
  console.error('ERROR: Could not find Why Choose Us comment');
  process.exit(1);
}

const oldBlock = html.substring(galleryStart, whyStart);
console.log('Replacing block of length:', oldBlock.length);

// New block: masonry grid on desktop, arrow carousel on mobile
const newBlock = `<!-- Our Work Gallery -->
    <div style="margin-top:56px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:10px;">Our Work</p>
      <h3 style="font-size:22px;font-weight:800;color:#201B10;margin-bottom:8px;">See What We've Built</h3>
      <p style="font-size:15px;color:#7E7C76;line-height:1.7;margin-bottom:28px;">Completed exterior painting, HOA, and fence staining projects across Northern Colorado.</p>

      <!-- Desktop: masonry grid | Mobile: arrow carousel -->
      <style>
        /* ── Gallery carousel (mobile) / grid (desktop) ── */
        .our-work-carousel { position:relative; }

        /* DESKTOP: 4-col masonry */
        @media(min-width:641px){
          .our-work-track { columns:4 200px; column-gap:14px; display:block; }
          .our-work-slide { break-inside:avoid; margin-bottom:14px; display:block; }
          .our-work-slide img { width:100%; border-radius:8px; display:block; }
          .our-work-arrows { display:none; }
          .our-work-dots  { display:none; }
          .our-work-cta   { margin-top:28px; }
        }

        /* MOBILE: full-width single-slide carousel */
        @media(max-width:640px){
          .our-work-carousel { overflow:hidden; position:relative; border-radius:10px; }
          .our-work-track {
            display:flex;
            transition:transform .35s ease;
            will-change:transform;
          }
          .our-work-slide {
            flex:0 0 100%;
            max-width:100%;
          }
          .our-work-slide img {
            width:100%;
            aspect-ratio:4/3;
            object-fit:cover;
            display:block;
            border-radius:10px;
          }

          /* Arrow buttons */
          .our-work-arrows {
            position:absolute;
            top:50%;
            left:0; right:0;
            transform:translateY(-50%);
            display:flex;
            justify-content:space-between;
            pointer-events:none;
            padding:0 10px;
            z-index:10;
          }
          .our-work-btn {
            pointer-events:all;
            background:#AE360E;
            color:#fff;
            border:none;
            border-radius:50%;
            width:44px; height:44px;
            font-size:18px;
            cursor:pointer;
            display:flex; align-items:center; justify-content:center;
            box-shadow:0 3px 10px rgba(0,0,0,0.35);
            flex-shrink:0;
            transition:background .2s;
          }
          .our-work-btn:hover { background:#8f2a0a; }

          /* Dots */
          .our-work-dots {
            display:flex;
            justify-content:center;
            gap:8px;
            margin-top:14px;
          }
          .our-work-dot {
            width:8px; height:8px;
            border-radius:50%;
            background:#E4DACC;
            border:none;
            cursor:pointer;
            padding:0;
            transition:background .2s, transform .2s;
          }
          .our-work-dot.active { background:#AE360E; transform:scale(1.3); }
          .our-work-cta { margin-top:20px; text-align:center; }
        }
      </style>

      <div class="our-work-carousel" id="ourWorkCarousel">
        <!-- Arrow buttons (mobile only via CSS) -->
        <div class="our-work-arrows">
          <button class="our-work-btn" id="ourWorkPrev" aria-label="Previous photo">&#8592;</button>
          <button class="our-work-btn" id="ourWorkNext" aria-label="Next photo">&#8594;</button>
        </div>

        <div class="our-work-track" id="ourWorkTrack">
          <div class="our-work-slide"><img src="/assets/images/gallery/gallery-1-1.webp" alt="Exterior house painting Northern Colorado" loading="lazy"></div>
          <div class="our-work-slide"><img src="/assets/images/gallery/gallery-1-2.webp" alt="Residential painting Timnath CO" loading="lazy"></div>
          <div class="our-work-slide"><img src="/assets/images/gallery/gallery-1-3.webp" alt="House painting Windsor Colorado" loading="lazy"></div>
          <div class="our-work-slide"><img src="/assets/images/gallery/gallery-1-4.webp" alt="Exterior painting Fort Collins CO" loading="lazy"></div>
          <div class="our-work-slide"><img src="/assets/images/gallery/gallery-1-5.webp" alt="Home exterior painting Northern Colorado" loading="lazy"></div>
          <div class="our-work-slide"><img src="/assets/images/gallery/gallery-1-6.webp" alt="Professional painting contractor Timnath" loading="lazy"></div>
          <div class="our-work-slide"><img src="/assets/images/gallery/gallery-1-7.webp" alt="Exterior house painting Severance CO" loading="lazy"></div>
          <div class="our-work-slide"><img src="/assets/images/gallery/gallery-1-8.webp" alt="Residential exterior painting NoCo" loading="lazy"></div>
        </div>
      </div>

      <!-- Dots (mobile only via CSS) -->
      <div class="our-work-dots" id="ourWorkDots">
        <button class="our-work-dot active" data-idx="0"></button>
        <button class="our-work-dot" data-idx="1"></button>
        <button class="our-work-dot" data-idx="2"></button>
        <button class="our-work-dot" data-idx="3"></button>
        <button class="our-work-dot" data-idx="4"></button>
        <button class="our-work-dot" data-idx="5"></button>
        <button class="our-work-dot" data-idx="6"></button>
        <button class="our-work-dot" data-idx="7"></button>
      </div>

      <div class="our-work-cta">
        <a href="/gallery/" style="display:inline-flex;align-items:center;gap:10px;background:#AE360E;color:#fff;font-weight:700;font-size:15px;padding:12px 26px;border-radius:100px;text-decoration:none;">
          <i class="fa-solid fa-images"></i> View Full Gallery
        </a>
      </div>

      <script>
      (function(){
        var track = document.getElementById('ourWorkTrack');
        var dots  = document.querySelectorAll('#ourWorkDots .our-work-dot');
        var prev  = document.getElementById('ourWorkPrev');
        var next  = document.getElementById('ourWorkNext');
        var total = 8;
        var cur   = 0;

        function goTo(idx){
          if(idx < 0) idx = total - 1;
          if(idx >= total) idx = 0;
          cur = idx;
          track.style.transform = 'translateX(-' + (cur * 100) + '%)';
          dots.forEach(function(d,i){ d.classList.toggle('active', i === cur); });
        }

        prev.addEventListener('click', function(){ goTo(cur - 1); });
        next.addEventListener('click', function(){ goTo(cur + 1); });
        dots.forEach(function(d){ d.addEventListener('click', function(){ goTo(parseInt(d.dataset.idx)); }); });

        // Touch/swipe support
        var startX = null;
        track.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
        track.addEventListener('touchend', function(e){
          if(startX === null) return;
          var dx = e.changedTouches[0].clientX - startX;
          if(Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1);
          startX = null;
        }, {passive:true});
      })();
      </script>
    </div>
  </div>
</section>

`;

html = html.substring(0, galleryStart) + newBlock + html.substring(whyStart);
fs.writeFileSync(filePath, html, 'utf8');
console.log('Done - carousel gallery written');
