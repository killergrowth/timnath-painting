'use strict';
/**
 * build.js  -  Timnath Painting Site Builder
 * Generates all pillar pages from data + templates
 * Run: node build.js
 * Output: dist/
 */

const fs   = require('fs');
const path = require('path');
const { CLIENT, SERVICES, CITIES, SERVICE_DATA, CITY_DATA } = require('./_build-data.js');
const T = require('./build-templates.js');
const { buildBlog } = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\lib\\blog-build');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const PARTS = path.join(ROOT, '_partials');

function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

const HEADER = fs.readFileSync(path.join(PARTS, 'header.html'), 'utf8');
const HEADER_STRIPPED = fs.readFileSync(path.join(PARTS, 'header-stripped.html'), 'utf8');
const FOOTER_MINIMAL = fs.readFileSync(path.join(PARTS, 'footer-minimal.html'), 'utf8');

// Custom SVG icons â€" inline with brand color
const RED = '#AE360E';
function inlineSvg(filename, size) {
  const raw = fs.readFileSync(path.join(__dirname, 'assets/images', filename), 'utf8')
    .replace(/<\?xml[^?]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  return raw.replace('<svg ', `<svg fill="${RED}" width="${size}" height="${size}" `);
}
const FOOTER = fs.readFileSync(path.join(PARTS, 'footer.html'), 'utf8');

function injectPartials(html) {
  return html.replace('<!-- HEADER -->', HEADER).replace('<!-- FOOTER -->', FOOTER);
}

function write(relPath, html) {
  const dest = path.join(DIST, relPath);
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, injectPartials(html), 'utf8');
  console.log('Built:', relPath);
}

function writeStripped(relPath, html) {
  const dest = path.join(DIST, relPath);
  ensureDir(path.dirname(dest));
  const result = html.replace('<!-- HEADER -->', HEADER_STRIPPED).replace('<!-- FOOTER -->', FOOTER_MINIMAL);
  fs.writeFileSync(dest, result, 'utf8');
  console.log('Built:', relPath);
}

// Ã¢"â'¬Ã¢"â'¬ Setup Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬
ensureDir(DIST);
copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));
// Generate mobile hero variant (800px @ q68 ~70KB) â€" desktop is pre-compressed in source
// Source: assets/images/backgrounds/slider-3-1.webp (151KB @ 1440px q50)
{
  const sharp = require('sharp');
  const heroSrc = path.join(DIST, 'assets', 'images', 'backgrounds', 'slider-3-1.webp');
  const heroMobile = path.join(DIST, 'assets', 'images', 'backgrounds', 'slider-3-1-mobile.webp');
  if (fs.existsSync(heroSrc) && !fs.existsSync(heroMobile)) {
    sharp(heroSrc).resize(800, null, { withoutEnlargement: true }).webp({ quality: 68 })
      .toFile(heroMobile).then(() => {}).catch(() => {});
  }
}
// Copy root config files to dist
['_headers', '_redirects', 'robots.txt', 'sitemap.xml'].forEach(f => {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
});

// Root index.html â€" built by buildHomepage()

// Copy coming-soon landing page to root (DISABLED â€" site is live)
/* const COMING_SOON = path.join(ROOT, '..', 'timnath-painting-coming-soon');
if (fs.existsSync(COMING_SOON)) {
  fs.copyFileSync(path.join(COMING_SOON, 'index.html'), path.join(DIST, 'index.html'));
  if (fs.existsSync(path.join(COMING_SOON, 'favicon.ico'))) fs.copyFileSync(path.join(COMING_SOON, 'favicon.ico'), path.join(DIST, 'favicon.ico'));
  copyDir(path.join(COMING_SOON, 'assets'), path.join(DIST, 'landing-assets'));
  // Patch asset paths in the copied index.html to use /landing-assets/
  let csHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  csHtml = csHtml.replace(/(["'])assets\//g, '$1/landing-assets/');
  fs.writeFileSync(path.join(DIST, 'index.html'), csHtml, 'utf8');
  console.log('Coming-soon landing page copied to root.');
} */
// Remove _worker.js and _routes.json â€" Pages Functions handle routing now
// _worker.js in dist/ disables ALL Pages Functions (CF limitation)
const workerFile = path.join(DIST, '_worker.js');
const routesFile = path.join(DIST, '_routes.json');
if (fs.existsSync(workerFile)) fs.unlinkSync(workerFile);
if (fs.existsSync(routesFile)) fs.unlinkSync(routesFile);

console.log('Assets copied.\n');

// Ã¢"â'¬Ã¢"â'¬ HOMEPAGE Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬
function buildHomepage() {
  // â"€â"€ Reviews data â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
  const reviewsFile = path.join(ROOT, 'data', 'reviews.json');
  const reviewData = fs.existsSync(reviewsFile)
    ? JSON.parse(fs.readFileSync(reviewsFile, 'utf8'))
    : { rating: null, userRatingCount: 0, reviews: [] };

  // Build review cards
  const reviewCards = reviewData.reviews.map(r => {
    const initial = (r.author || 'A').charAt(0).toUpperCase();
    const escapedText = (r.text || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="col-md-6 col-lg-4">
  <div class="wow fadeInUp" data-wow-duration="1500ms" style="background:#fff;border-radius:10px;padding:28px 24px;border:1px solid rgba(0,0,0,0.07);height:100%;display:flex;flex-direction:column;">
    <div style="color:#AE360E;margin-bottom:12px;font-size:15px;">
      <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
    </div>
    <p style="font-size:14px;color:#5a5650;line-height:1.8;margin-bottom:20px;flex:1;">&ldquo;${escapedText}&rdquo;</p>
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:38px;height:38px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:15px;flex-shrink:0;">${initial}</div>
      <div>
        <strong style="font-size:14px;color:#201B10;display:block;">${r.author}</strong>
        <span style="font-size:12px;color:#999;">${r.relativeTime}</span>
      </div>
    </div>
  </div>
</div>`;
  }).join('\n');

  // Render reviews partial
  const reviewsSection = fs.readFileSync(path.join(PARTS, 'reviews.html'), 'utf8')
    .replace('<!-- REVIEW_CARDS -->', reviewCards || '').replace('<!-- RATING_VALUE -->', reviewData.rating !== null ? Number(reviewData.rating).toFixed(1) : '5.0');

  // Build LocalBusiness + AggregateRating + Review[] schema
  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: CLIENT.name,
    telephone: CLIENT.phone,
    email: CLIENT.email,
    url: 'https://timnathpainting.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4836 Becker Dr',
      addressLocality: 'Timnath',
      addressRegion: 'CO',
      postalCode: '80547',
      addressCountry: 'US'
    },
    areaServed: 'Northern Colorado'
  };
  if (reviewData.rating && reviewData.userRatingCount) {
    schemaObj.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviewData.rating,
      reviewCount: reviewData.userRatingCount,
      bestRating: 5,
      worstRating: 1
    };
  }
  if (reviewData.reviews.length > 0) {
    schemaObj.review = reviewData.reviews.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
      ...(r.publishTime ? { datePublished: r.publishTime.substring(0, 10) } : {})
    }));
  }
  const schemaTag = `<script type="application/ld+json">${JSON.stringify(schemaObj)}</script>`;

  const sliders = [
    {
      bg: 'slider-3-1.jpg',
      sub: 'Northern Colorado Painting Contractor',
      lines: ['Premium Exterior', 'Painting and More'],
      btn1: { t: 'Get a Free Quote', h: '/get-a-quote/' },
      btn2: { t: 'Our Services', h: '/exterior-painting/index.html' },
      subText: 'Professional painting done right-on time, on budget, and built to last.'
    },
  ];

  const sliderHTML = sliders.map(s => {
    // Use WebP path for LCP hero image
    const bgWebp = s.bg.replace(/\.(jpg|jpeg)$/i, '.webp');
    const bgMobile = bgWebp.replace('.webp', '-mobile.webp');
    return `<div class="main-slider-one__item active">
  <div class="main-slider-one__bg">
    <img
      src="/assets/images/backgrounds/${bgWebp}"
      srcset="/assets/images/backgrounds/${bgMobile} 800w, /assets/images/backgrounds/${bgWebp} 1440w"
      sizes="(max-width:800px) 100vw, 1440px"
      alt="" width="1440" height="960"
      fetchpriority="high" decoding="sync"
      style="position:absolute;top:-5%;left:0;width:100%;height:110%;object-fit:cover;object-position:center;">
  </div>
  <div class="container"><div class="row align-items-center gutter-y-30"><div class="col-lg-7">
    <div class="main-slider-one__content">
      <p class="main-slider-one__sub-title">${s.sub}</p>
      <div class="main-slider-one__title">
        ${s.lines.map(l => `<div class="main-slider-one__title__box"><h2 class="main-slider-one__title__text">${l}</h2></div>`).join('')}
      </div>
      <p class="main-slider-one__sub-text">${s.subText || ''}</p>
      <div class="main-slider-one__btn">
        <a href="${s.btn1.h}" class="wallox-btn wallox-btn--base">${s.btn1.t} <i class="fa-solid fa-arrow-right"></i></a>
        <a href="${s.btn2.h}" class="wallox-btn wallox-btn--hero-secondary">${s.btn2.t}</a>
      </div>
    </div>
  </div></div></div>

</div>`; }).join('\n');

  const features = [
    { icon:'fa-solid fa-lightbulb', title:'10 Year Systems', link:'/exterior-painting/index.html' },
    { icon:'fa-solid fa-paint-roller', title:'No-VOC Products.', link:'/about.html' },
    { icon:'fa-solid fa-users', title:'$2M Liability Coverage', link:'/about.html' },
    { icon:'fa-solid fa-shield-halved', title:'Free On-Site Quotes', link:'/get-a-quote/' },
  ];

  const content = `
${T.topbar()}
<!-- HEADER -->

<main>
<!-- Static hero: no Owl carousel, no wallox.js dependency for LCP visibility -->
<section class="main-slider-one hero-static">
    ${sliderHTML}
</section>

<section class="feature-two feature-two - one" style="padding-top:60px;">
  <div class="container">
    <div class="row gutter-y-30">
      ${features.map((f,i) => `<div class="col-lg-3 col-md-4 col-sm-6"><div class="feature-two__item wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="${(i+1)*200}ms"><div class="feature-two__item__icon"><i class="${f.icon}"></i></div><p class="feature-two__item__title"><a href="${f.link}">${f.title}</a></p></div></div>`).join('\n')}
    </div>
    <div class="line"></div>
  </div>
</section>

<section class="about-one">
  <div class="container">
    <div class="row align-items-start gutter-y-30">
      <div class="col-lg-6">
        <div class="about-one__thumb">
          <div class="about-one__thumb__item real-image"><img src="/assets/images/about/about-1-1.jpg" loading="lazy" width="570" height="600" alt="${CLIENT.name}  -  Professional Painting in Northern Colorado"></div>
          <div class="about-one__funfact count-box">
            <h3 class="about-one__count"><span class="count-text" data-stop="28" data-speed="1500"></span><span>+</span></h3>
            <p class="about-one__funfact__text">freeze-thaw<br>cycles per year</p>
          </div>
        </div>
        <div class="about-one__client wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms" style="margin-top:28px;">
          <div class="about-one__client__item"><div class="about-one__client__dec">
            <div class="about-one__client__star"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="about-one__client__text">5-Star Google Rated</p>
          </div></div>
          <a href="/about.html" class="wallox-btn wallox-btn--base">More About Us</a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="about-one__right">
          <div class="sec-title text-start">
            <div class="d-flex align-items-center justify-content-start">

              <p class="sec-title__tagline">About ${CLIENT.name}</p>
            </div>
            <h3 class="sec-title__title">Paint Systems Built for Colorado's Climate</h3>
          </div>
          <p class="about-one__top__text wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">Northern Colorado sees 28+ freeze-thaw cycles a year. UV radiation hits 10-15% harder at altitude. Cheap paint fails in 3-4 years here. ${CLIENT.name} builds exterior systems that last 7-10 years using premium Sherwin-Williams and Benjamin Moore coatings, using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore. $2M general liability coverage.</p>
          <ul class="about-one__list list-unstyled wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="400ms">
            <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Licensed &amp; Insured in Colorado</li>
            <li class="about-one__list__item"><i class="fa-solid fa-check"></i> applicators using premium eco-friendly, no-VOC products</li>
            <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Sherwin-Williams &amp; Benjamin Moore approved</li>
            <li class="about-one__list__item"><i class="fa-solid fa-check"></i> $2M general liability  -  COI on request</li>
            <li class="about-one__list__item"><i class="fa-solid fa-check"></i> We Know Our Crews. No volume rushing.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</section>

<section class="service-one">
  <div class="service-one__bg" style="background-image:url(/assets/images/backgrounds/service-4-1.jpg);"></div>
  <div class="service-one__top">
    <div class="sec-title text-center">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">what we do</p></div>
      <h3 class="sec-title__title">Painting Services We Offer</h3>
    </div>
  </div>
  <div class="service-one__middle wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="300ms">
    <div class="service-one__grid">
      ${T.serviceCarouselItems()}
    </div>
  </div>

</section>

<section class="why-choose-one">
  <div class="container">
    <div class="row gutter-y-30">
      <div class="col-lg-6">
        <div class="why-choose-one__left">
          <div class="sec-title text-start">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">Why Choose Us?</p></div>
            <h3 class="sec-title__title">The Difference Between a 4-Year Job and a 10-Year System</h3>
          </div>
          <blockquote class="why-choose-one__top__text wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">Most paint failures in Colorado are prep failures, not coating failures. We address the full stack  -  surface prep, primer selection, coating chemistry, and application standards most painters never learn.</blockquote>
          <div class="why-choose-one__feature wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
            <div class="why-choose-one__feature__item"><div class="why-choose-one__feature__item__inner">
              <div class="why-choose-one__feature__icon"><i class="fa-solid fa-check"></i></div>
              <h4 class="why-choose-one__feature__title">We Know Our Crews.</h4>
            </div></div>
            <p class="why-choose-one__feature__text">The crew you meet on day one is the crew that finishes the job.</p>
          </div>
          <div class="why-choose-one__progress progress-box wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
            <h4 class="progress-box__title">Premium Surface Preparation</h4>
            <div class="progress-box__bar"><div class="progress-box__bar__inner count-bar" data-percent="100%"><div class="progress-box__number count-text">100%</div></div></div>
          </div>
          <div class="why-choose-one__progress progress-box wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms">
            <h4 class="progress-box__title">Customer Satisfaction Rate</h4>
            <div class="progress-box__bar"><div class="progress-box__bar__inner count-bar" data-percent="100%"><div class="progress-box__number count-text">100%</div></div></div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="why-choose-one__right">
          <div class="why-choose-one__thumb wow fadeInRight" data-wow-duration="1500ms" data-wow-delay="100ms">
            <img src="/assets/images/resources/why-choose-1-1.jpg" loading="lazy" width="490" height="460" alt="${CLIENT.name} crew at work"><div class="why-choose-one__thumb-box"></div>
          </div>
          <div class="why-choose-one__thumb-two wow fadeInRight" data-wow-duration="1500ms" data-wow-delay="300ms">
            <img src="/assets/images/resources/why-choose-1-2.jpg" loading="lazy" width="490" height="460" alt="Premium exterior painting result">
          </div>
          <div class="why-choose-one__thumb-box-two"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- REVIEWS -->


<section style="padding:80px 0;background:#F4EDE4;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Painting Tips &amp; Insights</p></div>
      <h2 class="sec-title__title">From the Timnath Painting Blog</h2>
    </div>
    <div class="row gutter-y-30">
      <!-- RECENT_POSTS -->
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="/blog/" class="wallox-btn wallox-btn--base">See All Posts <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  // Inject reviews section and schema
  const finalContent = schemaTag + '\n' + content.replace('<!-- REVIEWS -->', reviewsSection);

  write('index.html', `${T.htmlHead(`${CLIENT.name} | Exterior Painting & Fence Staining in Northern Colorado`, CLIENT.description, 'https://timnathpainting.com/', '/assets/images/backgrounds/slider-3-1.jpg')}
${T.wrapBody(finalContent)}`);
}

// Ã¢"â'¬Ã¢"â'¬ ABOUT PAGE Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬
function buildAbout() {
  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader('About Timnath Painting', '<li><span>About Us</span></li>')}

<section class="about-one" style="padding-top:80px;padding-bottom:80px;">
  <div class="container">
    <div class="row align-items-center gutter-y-30">
      <div class="col-lg-6" style="text-align:center;">
        <div style="overflow:visible;">
          <img src="/assets/images/about/josh-funk.png" alt="Josh Funk  -  Owner, Timnath Painting" style="width:100%;max-width:460px;display:block;margin:0 auto;">
          <p style="margin-top:12px;font-weight:600;font-size:1rem;color:#3a2e1e;">Josh Funk, Owner</p>
          <a href="/get-a-quote/" class="wallox-btn wallox-btn--base" style="margin-top:20px;display:inline-block;">Get a Free Quote</a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="about-one__right">
          <div class="sec-title text-start">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">Our Story</p></div>
            <h3 class="sec-title__title">Built Different  -  On Purpose</h3>
          </div>
          <p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">I'm Josh, a Colorado local, and I've been in and around the painting industry since 2007 and have owned and operated multiple successful painting and construction companies in the Midwest.</p>
          <p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="150ms"><em>I have a passion for running small businesses that are insistent on absolute customer satisfaction.</em> I am also a founding partner and coach for Service Catalyst, a growing, Fort Collins-based, coaching and advisory community dedicated to helping service business owners succeed and scale.</p>
          <p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms">Aside from that, I'm a committed family man with a loving wife and four amazing children. I believe customers want to pay for exceptional care and peace of mind. Our commitment is to curate that!</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="why-choose-one" style="background:#f4ede4;padding:80px 0;">
  <div class="container">
    <div class="row gutter-y-30">
      <div class="col-lg-6">
        <div class="sec-title text-start">
          <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">Why We Do It Differently</p></div>
          <h3 class="sec-title__title">Why Northern Colorado Homes Trust Timnath Painting</h3>
        </div>
        <p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">Most painting contractors are reactive. You call when something's wrong. They show up, quote the job, and disappear until the next crisis. That's not how we operate.</p>
        <ul class="about-one__list list-unstyled wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms" style="margin-top:20px;">
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Licensed &amp; Insured in Colorado</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> No-VOC Products.  -  approved Sherwin-Williams &amp; Benjamin Moore applicator</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> $2M general liability  -  certificates available on request</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> We Know Our Crews</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Limited project capacity to maintain quality control</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Weekly progress updates  -  no chasing us down</li>
        </ul>
      </div>
      <div class="col-lg-6">
        <div class="why-choose-one__progress progress-box wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms" style="margin-top:40px;">
          <h4 class="progress-box__title">Surface Preparation Standards</h4>
          <div class="progress-box__bar"><div class="progress-box__bar__inner count-bar" data-percent="100%"><div class="progress-box__number count-text">100%</div></div></div>
        </div>
        <div class="why-choose-one__progress progress-box wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms">
          <h4 class="progress-box__title">Customer Satisfaction Rate</h4>
          <div class="progress-box__bar"><div class="progress-box__bar__inner count-bar" data-percent="100%"><div class="progress-box__number count-text">100%</div></div></div>
        </div>
        <div class="why-choose-one__progress progress-box wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="300ms">
          <h4 class="progress-box__title">Premium Coating Systems</h4>
          <div class="progress-box__bar"><div class="progress-box__bar__inner count-bar" data-percent="90%"><div class="progress-box__number count-text">90%</div></div></div>
        </div>
        <div class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="400ms" style="margin-top:32px;border-radius:10px;overflow:hidden;">
          <img src="/assets/images/about/about-kitchen.jpg" alt="Painting project by Timnath Painting" style="width:100%;height:auto;display:block;border-radius:10px;">
        </div>
      </div>
    </div>
  </div>
</section>

<section class="about-services-grid" style="padding:80px 0;">
  <div class="container">
    <div class="sec-title text-center">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Our Services</p></div>
      <h3 class="sec-title__title">What We Do</h3>
    </div>
    <div class="row gutter-y-30" style="margin-top:40px;">
      ${SERVICES.map(s => `<div class="col-md-6 col-lg-4">
        <div class="feature-two__item wow fadeInUp" data-wow-duration="1500ms" style="padding:30px;border:1px solid #e4dacc;border-radius:8px;text-align:center;">
          <p class="feature-two__item__title" style="margin-bottom:10px;"><a href="/${s.slug}/index.html">${s.label}</a></p>
          <a href="/${s.slug}/index.html" class="wallox-btn wallox-btn--base" style="margin-top:10px;margin-left:auto;">Learn More</a>
        </div>
      </div>`).join('\n')}
      <div class="col-md-6 col-lg-4">
        <div class="feature-two__item wow fadeInUp" data-wow-duration="1500ms" style="padding:30px;border:1px solid #e4dacc;border-radius:8px;text-align:center;background:#f4ede4;">
          <p class="feature-two__item__title" style="margin-bottom:10px;"><a href="/areas-served/index.html" style="color:#AE360E;">See Areas We Serve</a></p>
          <a href="/areas-served/index.html" class="wallox-btn wallox-btn--base" style="margin-top:10px;margin-left:auto;">View All Areas</a>
        </div>
      </div>
    </div>
  </div>
</section>


<section style="padding:80px 0;background:#F4EDE4;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Painting Tips &amp; Insights</p></div>
      <h2 class="sec-title__title">From the Timnath Painting Blog</h2>
    </div>
    <div class="row gutter-y-30">
      <!-- RECENT_POSTS -->
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="/blog/" class="wallox-btn wallox-btn--base">See All Posts <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write('about.html', `${T.htmlHead('About Timnath Painting | Josh Funk | NoCo Painting Contractor', "Meet Josh Funk and the Timnath Painting team. Premium painting contractor serving the Golden Triangle  -  Timnath, Windsor & Severance CO. (970) 670-3965", 'https://timnathpainting.com/about')}
${T.wrapBody(content)}`);
}

// Ã¢"â'¬Ã¢"â'¬ SERVICE HUB PAGES Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬
function buildServiceHub(slug) {
  const d = SERVICE_DATA[slug];
  if (!d) { console.warn('No data for', slug); return; }

  const cityLinksHTML = CITIES.map(c =>
    `<a href="/${slug}-${c.slug}/index.html" class="wallox-btn wallox-btn--border" style="margin:4px 4px 4px 0;">${c.label}</a>`
  ).join('\n');

  // Reviews section (same pattern as homepage)
  const reviewsFile = require('path').join(__dirname, 'data', 'reviews.json');
  const reviewData = require('fs').existsSync(reviewsFile)
    ? JSON.parse(require('fs').readFileSync(reviewsFile, 'utf8'))
    : { rating: null, userRatingCount: 0, reviews: [] };
  const PARTS_LOCAL = require('path').join(__dirname, '_partials');
  const reviewCards = reviewData.reviews.slice(0, 3).map(r => {
    const initial = (r.author || 'A').charAt(0).toUpperCase();
    const escapedText = (r.text || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="col-md-6 col-lg-4">
  <div class="wow fadeInUp" data-wow-duration="1500ms" style="background:#fff;border-radius:10px;padding:28px 24px;border:1px solid rgba(0,0,0,0.07);height:100%;display:flex;flex-direction:column;">
    <div style="color:#AE360E;margin-bottom:12px;font-size:15px;">
      <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
    </div>
    <p style="font-size:14px;color:#5a5650;line-height:1.8;margin-bottom:20px;flex:1;">&ldquo;${escapedText}&rdquo;</p>
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:38px;height:38px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:15px;flex-shrink:0;">${initial}</div>
      <div>
        <strong style="font-size:14px;color:#201B10;display:block;">${r.author}</strong>
        <span style="font-size:12px;color:#999;">${r.relativeTime}</span>
      </div>
    </div>
  </div>
</div>`;
  }).join('\n');
  const serviceReviewsSection = reviewCards
    ? require('fs').readFileSync(require('path').join(PARTS_LOCAL, 'reviews.html'), 'utf8')
        .replace('<!-- REVIEW_CARDS -->', reviewCards)
        .replace('<!-- RATING_VALUE -->', reviewData.rating !== null ? Number(reviewData.rating).toFixed(1) : '5.0')
    : '';

  const sidingSection = d.sidingTypes ? `<div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">siding types</p></div>
            <h3 class="sec-title__title" style="margin-bottom:8px;">Siding Types We Work With</h3>
            <p style="margin:0;color:#666;">Different siding materials require different prep and coating strategies. Here is how we approach each one in Colorado's climate.</p>
          </div>
          <div style="margin-top:20px;">
            ${d.sidingTypes.map(s => `<div class="wow fadeInUp" data-wow-duration="1500ms" style="border-left:3px solid #AE360E;padding:14px 18px;margin-bottom:16px;background:#faf7f4;border-radius:0 6px 6px 0;">
              <strong style="display:block;color:#201B10;margin-bottom:6px;">${s.type}</strong>
              <p style="margin:0;color:#5a5650;font-size:15px;line-height:1.7;">${s.desc}</p>
            </div>`).join('\n')}
          </div>
        </div>` : '';

  const whyUsSection = d.whyUs ? `<div style="margin:40px 0;padding:32px;background:#201b10;border-radius:10px;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline" style="color:#AE360E;">why choose us</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;color:#fff;">Why Timnath Painting</h3>
          </div>
          ${d.whyUs.split('\n\n').map(p => `<p class="wow fadeInUp" data-wow-duration="1500ms" style="color:#e8e0d8;line-height:1.8;">${p}</p>`).join('\n')}
          <ul class="list-unstyled" style="margin-top:20px;line-height:2.2;">
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">Licensed &amp; Insured in Colorado</span></li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">No-VOC Products.</span></li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">$2M General Liability &mdash; COI on request</span></li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">Sherwin-Williams &amp; Benjamin Moore Approved</span></li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:10px;"></i><span style="color:#fff;">No subcontractors. We know our crews.</span></li>
          </ul>
        </div>` : '';

  const timelineSection = d.timeline ? `<div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">what to expect</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Project Timeline</h3>
          </div>
          ${d.timeline.split('\n\n').map(p => `<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">${p}</p>`).join('\n')}
        </div>` : '';

  const relatedSection = d.relatedServices ? `<div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">related services</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Other Services We Offer</h3>
          </div>
          <div class="row gutter-y-20" style="margin-top:8px;">
            ${d.relatedServices.map(s => `<div class="col-md-6"><div style="border:1px solid #e4dacc;border-radius:8px;padding:20px;height:100%;">
              <strong><a href="/${s.slug}/index.html" style="color:#201B10;">${s.label}</a></strong>
              <p style="margin:8px 0 12px;font-size:14px;color:#5a5650;">${s.desc}</p>
              <a href="/${s.slug}/index.html" style="font-size:13px;font-weight:700;color:#AE360E;text-decoration:none;">Learn more &rarr;</a>
            </div></div>`).join('\n')}
          </div>
        </div>` : '';

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader(d.title, `<li><span>${d.title.split(' in ')[0]}</span></li>`)}

<section style="padding:80px 0;">
  <div class="container">
    <div class="row gutter-y-30">
      <div class="col-lg-8">
        <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
          <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">${d.tagline}</p></div>
          <h3 class="sec-title__title" style="margin-bottom:0;">${d.heroTitle}</h3>
        </div>
        ${d.intro.split('\n\n').map(p => `<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">${p}</p>`).join('\n')}
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;">
            <h4 style="margin-bottom:12px;">Our Process</h4>
          </div>
          ${d.process.split('\n\n').map(p => `<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">${p}</p>`).join('\n')}
        </div>
        ${sidingSection}
        ${whyUsSection}
        ${timelineSection}
        ${relatedSection}
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">cities we serve</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Areas Served</h3>
          </div>
          <p class="wow fadeInUp" data-wow-duration="1500ms">We provide ${d.title.split(' in ')[0].toLowerCase()} throughout Northern Colorado:</p>
          <div style="margin-top:20px;">${cityLinksHTML}</div>
        </div>
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
            <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">common questions</p></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Frequently Asked Questions</h3>
          </div>
          <div style="margin-top:30px;">${T.faqBlock(d.faqs, slug + '-faq')}</div>
        </div>
      </div>
      <div class="col-lg-4">
        <div style="position:sticky;top:100px;">
          <div style="background:#f4ede4;padding:30px;border-radius:8px;margin-bottom:30px;">
            <h4 style="margin-bottom:20px;">Get a Free Quote</h4>
            <ul class="list-unstyled" style="line-height:2.2;">
              <li><i class="fa-solid fa-phone" style="color:var(--wallox-base);margin-right:8px;"></i><a href="tel:${CLIENT.phoneTel}" style="font-weight:700;font-size:18px;">${CLIENT.phone}</a></li>
              <li><i class="fa-solid fa-envelope" style="color:var(--wallox-base);margin-right:8px;"></i><a href="mailto:${CLIENT.email}">${CLIENT.email}</a></li>
              <li><i class="fa-solid fa-location-dot" style="color:var(--wallox-base);margin-right:8px;"></i>${CLIENT.city}, ${CLIENT.state}</li>
            </ul>
            <a href="/get-a-quote/" class="wallox-btn wallox-btn--base" style="margin-top:20px;display:block;text-align:center;">Request a Quote</a>
          </div>
          <div style="background:#201b10;color:#f4ede4;padding:30px;border-radius:8px;">
            <h4 style="color:#ae360e;margin-bottom:15px;">Why Timnath Painting</h4>
            <ul class="list-unstyled" style="line-height:2;">
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>Licensed &amp; Insured</li>
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>No-VOC Products.</li>
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>$2M General Liability</li>
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>SW &amp; BM Approved</li>
              <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>No Subcontractors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

${serviceReviewsSection}


<section style="padding:80px 0;background:#F4EDE4;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Painting Tips &amp; Insights</p></div>
      <h2 class="sec-title__title">From the Timnath Painting Blog</h2>
    </div>
    <div class="row gutter-y-30">
      <!-- RECENT_POSTS -->
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="/blog/" class="wallox-btn wallox-btn--base">See All Posts <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write(`${slug}/index.html`, `${T.htmlHead(d.metaTitle, d.metaDesc, `https://timnathpainting.com/${slug}/`)}
${T.wrapBody(content)}`);
}



// Ã¢"â'¬Ã¢"â'¬ CONTACT PAGE Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬
function buildContact() {
  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader('Contact Timnath Painting', '<li><span>Contact</span></li>')}

<section class="contact-one" style="padding:80px 0;">
  <div class="container">
    <div class="row gutter-y-30">
      <div class="col-md-4 d-flex"><div class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms" style="text-align:center;padding:36px 24px;background:#f4ede4;border-radius:12px;border:1px solid #e4dacc;width:100%;">
          <div style="font-size:36px;color:var(--wallox-base);margin-bottom:12px;"><i class="fa-solid fa-location-dot"></i></div>
          <h4 style="margin-bottom:8px;">Address</h4>
          <p style="margin:0;">${CLIENT.city}, ${CLIENT.state} ${CLIENT.zip}</p><p style="margin:4px 0 0;">Serving Northern Colorado</p>
        </div>
      </div>
      <div class="col-md-4 d-flex"><div class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="300ms" style="text-align:center;padding:36px 24px;background:#f4ede4;border-radius:12px;border:1px solid #e4dacc;width:100%;">
          <div style="font-size:36px;color:var(--wallox-base);margin-bottom:12px;"><i class="fa-solid fa-phone"></i></div>
          <h4 style="margin-bottom:8px;">Phone</h4>
          <a href="tel:${CLIENT.phoneTel}" style="font-size:20px;font-weight:700;color:var(--wallox-base);display:block;">${CLIENT.phone}</a>
          <p style="margin-top:6px;font-size:13px;color:#666;">Mon&ndash;Sat: 7am&ndash;6pm</p>
        </div>
      </div>
      <div class="col-md-4 d-flex"><div class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="500ms" style="text-align:center;padding:36px 24px;background:#f4ede4;border-radius:12px;border:1px solid #e4dacc;width:100%;">
          <div style="font-size:36px;color:var(--wallox-base);margin-bottom:12px;"><i class="fa-solid fa-envelope"></i></div>
          <h4 style="margin-bottom:8px;">Email</h4>
          <a href="mailto:${CLIENT.email}" style="word-break:break-all;">${CLIENT.email}</a>
        </div>
      </div>
    </div>
    <div class="row gutter-y-30" style="margin-top:60px;">
      <div class="col-lg-8">
        <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
          <div class="d-flex align-items-center justify-content-start"><p class="sec-title__tagline">get in touch</p></div>
          <h3 class="sec-title__title" style="margin-bottom:8px;">Get a Free Quote</h3>
        </div>
        <p style="margin-top:0;">Ready to transform your home or business with professional painting? We respond quickly  -  usually within a few minutes  -  and always provide honest, no-obligation quotes.</p>
        <div style="margin-top:30px;">
          <div id="2d355475-e9e2-4025-be1d-9768705789fb-4555532"></div>
          <link rel="stylesheet" href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css" media="screen" />
          <script src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js" clienthub_id="2d355475-e9e2-4025-be1d-9768705789fb-4555532" form_url="https://clienthub.getjobber.com/client_hubs/2d355475-e9e2-4025-be1d-9768705789fb/public/work_request/embedded_work_request_form?form_id=4555532"></script>
        </div>
      </div>
      <div class="col-lg-4">
        <div style="background:#201b10;color:#f4ede4;padding:30px;border-radius:8px;">
          <h4 style="color:#ae360e;margin-bottom:20px;">Quick Info</h4>
          <ul class="list-unstyled" style="line-height:2.5;">
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>Licensed &amp; Insured in Colorado</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>No-VOC Products.</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>$2M General Liability  -  COI on request</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>We Know Our Crews</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>Free on-site quotes</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="contact-map" style="margin-top:60px;">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97168.06445598403!2d-105.03495221370565!3d40.44202459799552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa4047ac4cc01168b%3A0x5ca0bf376555449f!2sTimnath%20Painting!5e0!3m2!1sen!2sus!4v1777530014876!5m2!1sen!2sus" width="100%" height="450" style="border:0;border-radius:8px;display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>`;

  write('contact.html', `${T.htmlHead('Contact Timnath Painting | Free Quote | (970) 670-3965', 'Contact Timnath Painting for a free exterior or interior painting quote. Serving Timnath, Windsor, Severance & Northern Colorado. Call (970) 670-3965.', 'https://timnathpainting.com/contact')}
${T.wrapBody(content)}`);
}

// Ã¢"â'¬Ã¢"â'¬ Areas Served INDEX Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬
function buildServiceAreas() {
  const cityGrid = CITIES.map(c => {
    const serviceLinks = SERVICES.map(s =>
      `<li style="margin-bottom:2px;"><a href="/${s.slug}-${c.slug}/index.html" style="font-size:13px;color:#5a5650;text-decoration:none;display:flex;align-items:center;gap:6px;padding:3px 0;"><i class="fa-solid fa-angle-right" style="color:#AE360E;font-size:10px;"></i>${s.label}</a></li>`
    ).join('');
    return `
  <div class="col-md-6 col-lg-4 col-xl-3">
    <div class="wow fadeInUp" data-wow-duration="1500ms" style="background:#f4ede4;padding:25px;border-radius:8px;margin-bottom:20px;">
      <h4 style="margin-bottom:14px;"><a href="/areas-served/${c.slug}/index.html" style="color:#201B10;text-decoration:none;">${c.label}, CO</a></h4>
      <ul style="list-style:none;padding:0;margin:0 0 14px;">${serviceLinks}</ul>
      <a href="/areas-served/${c.slug}/index.html" style="font-size:12px;font-weight:700;color:#AE360E;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">All services in ${c.label} &rarr;</a>
    </div>
  </div>`;
  }).join('\n');

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader('Areas Served  -  Northern Colorado', '<li><span>Areas Served</span></li>')}

<section style="padding:80px 0;">
  <div class="container">
    <div class="sec-title text-center">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">where we work</p></div>
      <h3 class="sec-title__title">Painting Services Across Northern Colorado</h3>
    </div>
    <p class="text-center" style="margin:20px auto 50px;max-width:700px;">${CLIENT.name} serves homeowners and commercial property owners throughout the Northern Colorado I-25 corridor. Select your city below to learn more about our services in your area.</p>
    <div class="row gutter-y-30">${cityGrid}</div>
  </div>
</section>


<section style="padding:80px 0;background:#F4EDE4;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Painting Tips &amp; Insights</p></div>
      <h2 class="sec-title__title">From the Timnath Painting Blog</h2>
    </div>
    <div class="row gutter-y-30">
      <!-- RECENT_POSTS -->
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="/blog/" class="wallox-btn wallox-btn--base">See All Posts <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write('areas-served/index.html', `${T.htmlHead('Areas Served | Timnath Painting | Northern Colorado', 'Timnath Painting serves Northern Colorado including Timnath, Windsor, Fort Collins, Loveland, Greeley and more. View all Areas Served.', 'https://timnathpainting.com/areas-served/')}
${T.wrapBody(content)}`);
}

// Ã¢"â'¬Ã¢"â'¬ RUN ALL Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬Ã¢"â'¬
buildHomepage();
buildAbout();
Object.keys(SERVICE_DATA).forEach(buildServiceHub);
buildContact();

// --- Services Hub ---
function buildServicesHub() {
  const serviceGrid = SERVICES.map(s => `
    <div class="col-lg-4 col-md-6">
      <div style="background:#fff;border-radius:10px;padding:32px 24px;text-align:center;border:1px solid rgba(0,0,0,0.07);height:100%;display:flex;flex-direction:column;align-items:center;">
        <div style="font-size:48px;color:#AE360E;margin-bottom:16px;line-height:1;">${
          s.slug === 'fence-staining'   ? inlineSvg('icon-wooden-fence.svg', 52) :
          s.slug === 'exterior-staining' ? inlineSvg('icon-gazebo.svg', 52) :
          s.slug === 'hoa-painting'      ? inlineSvg('icon-hoa-house.svg', 52) :
          `<i class="${s.icon}"></i>`
        }</div>
        <h4 style="font-size:20px;font-weight:700;color:#201B10;margin-bottom:8px;">${s.label}</h4>
        <p style="color:#5a5650;font-size:14px;margin-bottom:24px;flex:1;">${s.tagline}</p>
        <a href="/${s.slug}/index.html" class="wallox-btn wallox-btn--base" style="font-size:14px;padding:10px 22px;">Learn More <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div>`).join('\n');

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader('Our Services', '<li><span>Services</span></li>')}

<section style="padding:80px 0;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">what we do</p></div>
      <h3 class="sec-title__title">Professional Painting Services in Northern Colorado</h3>
      <p style="margin:20px auto 0;max-width:680px;color:#5a5650;">From full exterior repaint to HOA common areas, Timnath Painting handles it all with crews using premium eco-friendly, no-VOC products by Sherwin Williams and Benjamin Moore.</p>
    </div>
    <div class="row gutter-y-30">${serviceGrid}
    <div class="col-lg-4 col-md-6">
      <div style="background:#fff;border-radius:10px;padding:32px 24px;text-align:center;border:1px solid rgba(0,0,0,0.07);height:100%;display:flex;flex-direction:column;align-items:center;">
        <div style="font-size:48px;color:#AE360E;margin-bottom:16px;line-height:1;"><i class="fa-solid fa-medal"></i></div>
        <h4 style="font-size:20px;font-weight:700;color:#201B10;margin-bottom:8px;">Why Timnath?</h4>
        <p style="color:#5a5650;font-size:14px;margin-bottom:24px;flex:1;">No-VOC Products. $2M liability. We know our crews. See what sets us apart.</p>
        <a href="/about.html" class="wallox-btn wallox-btn--base" style="font-size:14px;padding:10px 22px;">Our Story <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div></div>
  </div>
</section>


<section style="padding:80px 0;background:#F4EDE4;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Painting Tips &amp; Insights</p></div>
      <h2 class="sec-title__title">From the Timnath Painting Blog</h2>
    </div>
    <div class="row gutter-y-30">
      <!-- RECENT_POSTS -->
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="/blog/" class="wallox-btn wallox-btn--base">See All Posts <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write('services/index.html', `${T.htmlHead('Services | Timnath Painting | Northern Colorado', 'Exterior painting, HOA painting, commercial painting, fence staining and more. Professional painting services across Northern Colorado.', 'https://timnathpainting.com/services/')}
${T.wrapBody(content)}`);
}
// â•â• CITY HUB PAGES â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function buildCityHub(city) {
  const d = CITY_DATA[city.slug];
  if (!d) { console.warn('No city data for', city.slug); return; }

  const serviceFeatures = SERVICES.map(s => `
    <li style="display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid #e4dacc;">
      <div style="flex-shrink:0;width:32px;height:32px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;margin-top:2px;">
        <i class="fa-solid fa-check"></i>
      </div>
      <div style="flex:1;">
        <div style="font-weight:700;color:#201B10;margin-bottom:4px;">
          <a href="/${s.slug}-${city.slug}/index.html" style="color:#201B10;text-decoration:none;">${s.label} in ${d.label}, CO</a>
        </div>
        <div style="color:#5a5650;font-size:14px;line-height:1.6;margin-bottom:6px;">${s.tagline}</div>
        <a href="/${s.slug}-${city.slug}/index.html" style="font-size:12px;font-weight:700;color:#AE360E;text-decoration:none;">Learn more &rarr;</a>
      </div>
    </li>`).join('');

  const otherCities = CITIES.filter(c => c.slug !== city.slug)
    .map(c => `<a href="/areas-served/${c.slug}/index.html" style="display:inline-block;margin:4px 4px 4px 0;padding:6px 14px;background:#f4ede4;border-radius:4px;font-size:13px;color:#201B10;text-decoration:none;border:1px solid #e4dacc;">${c.label}</a>`).join('');

  const faqSchema = d.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }));
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: CLIENT.name,
      telephone: CLIENT.phone,
      email: CLIENT.email,
      url: `https://timnathpainting.com/areas-served/${city.slug}/`,
      areaServed: `${d.label}, ${d.state}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Timnath',
        addressRegion: 'CO',
        postalCode: CLIENT.zip,
        addressCountry: 'US'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchema
    }
  ];

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader(`Painting Services in ${d.label}, CO`, `<li><a href="/areas-served/index.html">Areas Served</a></li><li><span>${d.label}</span></li>`)}

<script type="application/ld+json">${JSON.stringify(schema)}</script>

<section style="padding:80px 0;">
  <div class="container">
    <div class="row gutter-y-30">

      <!-- MAIN CONTENT -->
      <div class="col-lg-8">
        <div style="margin-bottom:32px;">
          <h1 style="font-size:32px;font-weight:700;color:#201B10;margin-bottom:10px;">Painting Services in ${d.label}, CO</h1>
          <p style="font-size:15px;color:#5a5650;margin-bottom:0;"><strong>${d.context}.</strong></p>
        </div>

        ${d.intro.split('\n\n').map(p => `<p style="color:#5a5650;line-height:1.8;margin-bottom:18px;">${p}</p>`).join('')}

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">what we offer</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:20px;">Our Services in ${d.label}, CO</h2>
          <ul style="list-style:none;padding:0;margin:0;border-top:1px solid #e4dacc;">
            ${serviceFeatures}
          </ul>
        </div>

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">common questions</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:20px;">Frequently Asked Questions â€" ${d.label}, CO</h2>
          ${T.faqBlock(d.faqs, city.slug + '-faq')}
        </div>

        <div style="background:#201B10;color:#f4ede4;border-radius:8px;padding:28px 32px;margin-top:32px;">
          <h4 style="color:#fff;margin:0 0 10px;font-size:20px;">Ready to Get Started in ${d.label}?</h4>
          <p style="margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.8);">Call or text <a href="tel:${CLIENT.phoneTel}" style="color:#AE360E;font-weight:700;">${CLIENT.phone}</a> or use the form below. We respond same-day and always provide free on-site quotes.</p>
        </div>
      </div>

      <!-- SIDEBAR -->
      <div class="col-lg-4">
        <div style="background:#f4ede4;padding:28px;border-radius:8px;margin-bottom:24px;">
          <h4 style="margin-bottom:16px;color:#201B10;">Get a Free Quote</h4>
          <ul class="list-unstyled" style="line-height:2.4;margin-bottom:16px;">
            <li><i class="fa-solid fa-phone" style="color:#AE360E;margin-right:8px;"></i><a href="tel:${CLIENT.phoneTel}" style="font-weight:700;font-size:18px;color:#201B10;">${CLIENT.phone}</a></li>
            <li><i class="fa-solid fa-envelope" style="color:#AE360E;margin-right:8px;"></i><a href="mailto:${CLIENT.email}" style="color:#5a5650;">${CLIENT.email}</a></li>
            <li><i class="fa-solid fa-location-dot" style="color:#AE360E;margin-right:8px;"></i><span style="color:#5a5650;">Based in ${CLIENT.city}, ${CLIENT.state}</span></li>
          </ul>
          <a href="/get-a-quote/" class="wallox-btn wallox-btn--base" style="display:block;text-align:center;">Request a Quote</a>
        </div>

        <div style="background:#201B10;color:#f4ede4;padding:28px;border-radius:8px;margin-bottom:24px;">
          <p style="color:#AE360E;margin-bottom:14px;font-size:16px;font-weight:600;">Why Timnath Painting</p>
          <ul class="list-unstyled" style="line-height:2.2;margin:0;">
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Licensed &amp; Insured</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>No-VOC Products.</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>\$2M General Liability</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>SW &amp; BM Approved</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>We Know Our Crews</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Free On-Site Quotes</li>
          </ul>
        </div>

        <div style="padding:28px;border:1px solid #e4dacc;border-radius:8px;">
          <p style="color:#201B10;margin-bottom:14px;font-size:15px;font-weight:600;">Other Areas We Serve</p>
          <div>${otherCities}</div>
        </div>
      </div>

    </div>
  </div>
</section>


<section style="padding:80px 0;background:#F4EDE4;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Painting Tips &amp; Insights</p></div>
      <h2 class="sec-title__title">From the Timnath Painting Blog</h2>
    </div>
    <div class="row gutter-y-30">
      <!-- RECENT_POSTS -->
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="/blog/" class="wallox-btn wallox-btn--base">See All Posts <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write(`areas-served/${city.slug}/index.html`,
    `${T.htmlHead(
      `Painting Services in ${d.label}, CO | Timnath Painting`,
      `Professional painting services in ${d.label}, CO. Exterior painting, HOA, commercial, fence staining. Licensed, eco-certified, $2M liability. Call (970) 670-3965.`,
      `https://timnathpainting.com/areas-served/${city.slug}/`
    )}
${T.wrapBody(content)}`);
}

// â•â• GALLERY PAGE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function buildGallery_OLD() { // OLD â€" replaced by template-based version below
  const galleryCSS = `
.gallery-filter-bar{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:36px;}
.filter-btn{padding:7px 18px;border-radius:20px;border:1px solid #ddd;background:#fff;color:#5a5650;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.filter-btn:hover,.filter-btn.active{background:#AE360E;border-color:#AE360E;color:#fff;}
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}
.gallery-card{background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);transition:transform 0.2s,box-shadow 0.2s;}
.gallery-card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,0.14);}
.gallery-card img{width:100%;height:220px;object-fit:cover;display:block;cursor:pointer;}
.gallery-card-body{padding:14px 16px;}
.gallery-card-title{font-weight:600;font-size:14px;color:#201B10;margin-bottom:8px;}
.gallery-card-tags{display:flex;flex-wrap:wrap;gap:5px;}
.gallery-tag{background:#f4ede4;color:#AE360E;font-size:11px;font-weight:700;padding:3px 10px;border-radius:12px;text-transform:uppercase;letter-spacing:0.5px;cursor:pointer;}
.gallery-tag:hover{background:#AE360E;color:#fff;}
#lightbox{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;align-items:center;justify-content:center;padding:20px;}
#lightbox.open{display:flex;}
#lightbox img{max-height:90vh;max-width:90vw;object-fit:contain;border-radius:4px;}
#lightbox-close{position:absolute;top:20px;right:28px;color:#fff;font-size:32px;cursor:pointer;line-height:1;z-index:10000;}
#lightbox-caption{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);color:#fff;font-size:14px;background:rgba(0,0,0,0.6);padding:8px 18px;border-radius:4px;white-space:nowrap;max-width:90vw;overflow:hidden;text-overflow:ellipsis;}
.gallery-empty{text-align:center;padding:80px 20px;color:#999;}
.gallery-empty i{font-size:48px;color:#e4dacc;margin-bottom:16px;display:block;}
.gallery-loading{text-align:center;padding:80px 20px;}
.gallery-loading .spinner{width:40px;height:40px;border:3px solid #f4ede4;border-top-color:#AE360E;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px;}
@keyframes spin{to{transform:rotate(360deg);}}`;

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader('Project Gallery', '<li><span>Gallery</span></li>')}

<section style="padding:80px 0;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">our work</p></div>
      <h3 class="sec-title__title">Completed Projects</h3>
      <p style="color:#5a5650;margin-top:12px;max-width:600px;margin-left:auto;margin-right:auto;">Browse our completed painting projects across Northern Colorado. Click a tag to filter by project type.</p>
    </div>
    <div class="gallery-filter-bar" id="filterBar">
      <button class="filter-btn active" data-tag="all">All Projects</button>
    </div>
    <div id="galleryContainer">
      <div class="gallery-loading"><div class="spinner"></div><p style="color:#999;font-size:14px;">Loading photos...</p></div>
    </div>
  </div>
</section>

<div id="lightbox">
  <span id="lightbox-close">&times;</span>
  <img id="lightbox-img" src="" alt="">
  <div id="lightbox-caption"></div>
</div>


<section style="padding:80px 0;background:#F4EDE4;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Painting Tips &amp; Insights</p></div>
      <h2 class="sec-title__title">From the Timnath Painting Blog</h2>
    </div>
    <div class="row gutter-y-30">
      <!-- RECENT_POSTS -->
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="/blog/" class="wallox-btn wallox-btn--base">See All Posts <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  const head = T.htmlHead('Project Gallery | Timnath Painting', 'Browse completed painting projects by Timnath Painting across Northern Colorado. Exterior, HOA, commercial, fence staining and more.');
  const fullPage = head.replace('</head>', `<style>${galleryCSS}</style></head>`);

  const bodyScript = `
<script>
(function() {
  let activeTag = 'all';
  function renderPhotos(photos) {
    const container = document.getElementById('galleryContainer');
    if (!photos.length) {
      container.innerHTML = '<div class="gallery-empty"><i class="fa-regular fa-images"></i><p>No photos yet. Check back soon!</p></div>';
      return;
    }
    container.innerHTML = '<div class="gallery-grid" id="galleryGrid"></div>';
    const grid = document.getElementById('galleryGrid');
    photos.forEach(function(p) {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.dataset.tags = JSON.stringify(p.tags || []);
      const tagsHtml = (p.tags || []).map(t => '<span class="gallery-tag" data-tag="'+t+'">'+t+'</span>').join('');
      card.innerHTML = '<img src="/api/photo/'+p.id+'" alt="'+(p.title||'Project photo')+'" loading="lazy" onclick="openLightbox(\'/api/photo/'+p.id+'\',\''+(p.title||'').replace(/'/g,"\\'")+'\')"><div class="gallery-card-body">'+(p.title?'<div class="gallery-card-title">'+p.title+'</div>':'')+'<div class="gallery-card-tags">'+tagsHtml+'</div></div>';
      grid.appendChild(card);
    });
    document.querySelectorAll('.gallery-tag').forEach(function(el) {
      el.addEventListener('click', function() { setFilter(this.dataset.tag); });
    });
  }
  function buildFilterBar(photos) {
    const bar = document.getElementById('filterBar');
    const tags = new Set();
    photos.forEach(p => (p.tags||[]).forEach(t => tags.add(t)));
    bar.innerHTML = '<button class="filter-btn active" data-tag="all">All Projects</button>';
    tags.forEach(function(tag) {
      const btn = document.createElement('button');
      btn.className = 'filter-btn'; btn.dataset.tag = tag; btn.textContent = tag;
      bar.appendChild(btn);
    });
    bar.querySelectorAll('.filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { setFilter(this.dataset.tag); });
    });
  }
  function setFilter(tag) {
    activeTag = tag;
    document.querySelectorAll('#filterBar .filter-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.tag === tag);
    });
    document.querySelectorAll('.gallery-card').forEach(function(card) {
      const tags = JSON.parse(card.dataset.tags||'[]');
      card.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
    });
  }
  window.openLightbox = function(src, caption) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-caption').textContent = caption;
    document.getElementById('lightbox').classList.add('open');
  };
  document.getElementById('lightbox-close').onclick = function() {
    document.getElementById('lightbox').classList.remove('open');
    document.getElementById('lightbox-img').src = '';
  };
  document.getElementById('lightbox').onclick = function(e) {
    if (e.target === this) { this.classList.remove('open'); document.getElementById('lightbox-img').src = ''; }
  };
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { document.getElementById('lightbox').classList.remove('open'); document.getElementById('lightbox-img').src = ''; }
  });
  fetch('/api/photos').then(r => r.json()).then(function(data) {
    const photos = data.photos || [];
    buildFilterBar(photos);
    renderPhotos(photos);
  }).catch(function() {
    document.getElementById('galleryContainer').innerHTML = '<div class="gallery-empty"><i class="fa-solid fa-triangle-exclamation"></i><p>Failed to load photos.</p></div>';
  });
})();
<\/script>`;

  const wrapped = T.wrapBody(content).replace('</body>', bodyScript + '\n</body>');
  write('gallery/index.html', fullPage + '\n' + wrapped);
}

function buildGallery() {
  // Read clean source template, inject header+footer partials, write to dist
  let html = fs.readFileSync(path.join(ROOT, 'build-gallery-template.html'), 'utf8');
  html = html.replace('<!-- HEADER -->', HEADER).replace('<!-- FOOTER -->', FOOTER);
  const dest = path.join(DIST, 'gallery', 'index.html');
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, html, 'utf8');
  console.log('Built: gallery/index.html');
}

// â•â• UPLOAD ADMIN PAGE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function buildUploadAdmin() {
  // Read the pre-built upload page from the dist template file if it exists,
  // otherwise write the standalone file directly (not injected through wrapBody
  // since it has its own minimal shell with no site chrome).
  const uploadHtml = require('fs').readFileSync(
    require('path').join(__dirname, 'build-upload-template.html'), 'utf8'
  );
  const dest = require('path').join(DIST, 'upload', 'index.html');
  require('fs').mkdirSync(require('path').dirname(dest), { recursive: true });
  require('fs').writeFileSync(dest, uploadHtml, 'utf8');
  console.log('Built: upload/index.html');
}

buildServiceAreas();
buildServicesHub();
CITIES.forEach(buildCityHub);
buildGallery();
buildUploadAdmin();

// ══ SERVICE + LOCATION PAGES ════════════════════════════════════════════════════════
// URL: /[service-slug]-[city-slug]/index.html
// All pages are noindex until scheduled rollout.
function buildServiceLocation(service, city) {
  const sd = SERVICE_DATA[service.slug];
  const cd = CITY_DATA[city.slug];
  if (!sd || !cd) { console.warn('Missing data:', service.slug, city.slug); return; }

  const pageSlug   = `${service.slug}-${city.slug}`;
  const canonical  = `https://timnathpainting.com/${pageSlug}/`;
  const h1Title    = `${service.label} in ${cd.label}, CO`;
  const metaTitle  = `${service.label} in ${cd.label}, CO | Timnath Painting`;
  const metaDesc   = `Professional ${service.label.toLowerCase()} in ${cd.label}, CO. Licensed, Eco-Friendly & No-VOC, $2M liability. Free on-site quote. Call ${CLIENT.phone}.`.slice(0, 160);

  // Blended FAQs: 2 service-specific + up to 3 city-specific
  const blendedFaqs = [
    ...sd.faqs.slice(0, 2).map(f => ({ q: f.q, a: f.a })),
    ...cd.faqs.slice(0, 3).map(f => ({ q: f.q, a: f.a })),
  ];

  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: h1Title,
      serviceType: service.label,
      description: metaDesc,
      provider: {
        '@type': 'LocalBusiness',
        name: CLIENT.name,
        telephone: CLIENT.phone,
        email: CLIENT.email,
        url: 'https://timnathpainting.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4836 Becker Dr',
          addressLocality: 'Timnath',
          addressRegion: 'CO',
          postalCode: CLIENT.zip,
          addressCountry: 'US'
        }
      },
      areaServed: { '@type': 'City', name: cd.label }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: blendedFaqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    }
  ]);

  // Other services this city page links to
  const otherServiceLinks = SERVICES
    .filter(s => s.slug !== service.slug)
    .map(s => `<li><a href="/${s.slug}-${city.slug}/index.html" style="display:block;padding:8px 0;color:#201B10;font-size:14px;text-decoration:none;border-bottom:1px solid #e4dacc;">${s.label} in ${cd.label}, CO</a></li>`)
    .join('');

  // Other cities for this service
  const otherCityLinks = CITIES
    .filter(c => c.slug !== city.slug)
    .map(c => `<a href="/${service.slug}-${c.slug}/index.html" style="display:inline-block;margin:4px 4px 4px 0;padding:5px 12px;background:#f4ede4;border-radius:4px;font-size:13px;color:#201B10;text-decoration:none;border:1px solid #e4dacc;">${c.label}</a>`)
    .join('');

  const whyFeatures = [
    { icon: 'fa-solid fa-shield-halved', title: 'Licensed &amp; Insured in Colorado', text: '$2M general liability coverage. Certificates of insurance available on request within 24 hours.' },
    { icon: 'fa-solid fa-leaf',          title: 'No-VOC Products.',              text: 'Approved Sherwin-Williams and Benjamin Moore applicator. Products and methods that protect your home and the environment.' },
    { icon: 'fa-solid fa-users',         title: 'We Know Our Crews',                  text: 'No subcontractors. The crew you meet on day one finishes the job. No volume rushing, no shortcuts.' },
    { icon: 'fa-solid fa-clock',         title: 'Same-Day Response',              text: 'Every quote request gets a same-day response during business hours. On-site assessments scheduled fast.' },
  ];

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader(h1Title, `<li><a href="/${service.slug}/index.html">${service.label}</a></li><li><span>${cd.label}, CO</span></li>`)}

<script type="application/ld+json">${schema}</script>

<section style="padding:80px 0;">
  <div class="container">
    <div class="row gutter-y-30">

      <!-- MAIN CONTENT -->
      <div class="col-lg-8">

        <!-- H1 + City Intro -->
        <div style="margin-bottom:32px;">
          <h1 style="font-size:32px;font-weight:700;color:#201B10;margin-bottom:10px;">${h1Title}</h1>
          <p style="font-size:15px;color:#5a5650;margin-bottom:0;"><strong>${cd.context}.</strong></p>
        </div>

        ${cd.intro.split('\n\n').map(p => `<p style="color:#5a5650;line-height:1.8;margin-bottom:18px;">${p}</p>`).join('')}

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <!-- Service Intro -->
        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">${sd.tagline}</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:16px;">${sd.heroTitle.includes(cd.label) ? sd.heroTitle : sd.heroTitle + ' &#8212; ' + cd.label + ', CO'}</h2>
          ${sd.intro.split('\n\n').map(p => `<p style="color:#5a5650;line-height:1.8;margin-bottom:16px;">${p}</p>`).join('')}
        </div>

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <!-- Process -->
        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">how we work</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:16px;">Our ${service.label} Process in ${cd.label}</h2>
          ${sd.process.split('\n\n').map(p => `<p style="color:#5a5650;line-height:1.8;margin-bottom:16px;">${p}</p>`).join('')}
        </div>

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <!-- Why Us -->
        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">why choose us</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:20px;">Why ${cd.label} Homeowners Choose Timnath Painting</h2>
          <ul style="list-style:none;padding:0;margin:0;">
            ${whyFeatures.map(f => `<li style="display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid #e4dacc;"><div style="flex-shrink:0;width:36px;height:36px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;"><i class="${f.icon}"></i></div><div><div style="font-weight:700;color:#201B10;margin-bottom:4px;">${f.title}</div><div style="color:#5a5650;font-size:14px;line-height:1.6;">${f.text}</div></div></li>`).join('')}
          </ul>
        </div>

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <!-- FAQs -->
        <div style="margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">common questions</p>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:20px;">Frequently Asked Questions &#8212; ${service.label} in ${cd.label}, CO</h2>
          ${T.faqBlock(blendedFaqs, pageSlug + '-faq')}
        </div>

        <!-- Other Cities for This Service -->
        <div style="padding:24px;background:#f4ede4;border-radius:8px;margin-bottom:32px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#AE360E;margin-bottom:10px;">${service.label} in Other NoCo Cities</p>
          <div>${otherCityLinks}</div>
        </div>

        <!-- Bottom CTA -->
        <div style="background:#201B10;color:#f4ede4;border-radius:8px;padding:28px 32px;margin-top:16px;">
          <h4 style="color:#fff;margin:0 0 10px;font-size:20px;">Ready to Get a Free Quote in ${cd.label}?</h4>
          <p style="margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.8);">Call or text <a href="tel:${CLIENT.phoneTel}" style="color:#AE360E;font-weight:700;">${CLIENT.phone}</a> or fill out the form below. We respond same-day and provide free on-site assessments.</p>
        </div>

      </div>

      <!-- SIDEBAR -->
      <div class="col-lg-4">

        <div style="background:#f4ede4;padding:28px;border-radius:8px;margin-bottom:24px;">
          <h4 style="margin-bottom:16px;color:#201B10;">Get a Free Quote</h4>
          <ul class="list-unstyled" style="line-height:2.4;margin-bottom:16px;">
            <li><i class="fa-solid fa-phone" style="color:#AE360E;margin-right:8px;"></i><a href="tel:${CLIENT.phoneTel}" style="font-weight:700;font-size:18px;color:#201B10;">${CLIENT.phone}</a></li>
            <li><i class="fa-solid fa-envelope" style="color:#AE360E;margin-right:8px;"></i><a href="mailto:${CLIENT.email}" style="color:#5a5650;">${CLIENT.email}</a></li>
            <li><i class="fa-solid fa-location-dot" style="color:#AE360E;margin-right:8px;"></i><span style="color:#5a5650;">Based in ${CLIENT.city}, ${CLIENT.state}</span></li>
          </ul>
          <a href="/get-a-quote/" class="wallox-btn wallox-btn--base" style="display:block;text-align:center;">Request a Quote</a>
        </div>

        <div style="background:#201B10;color:#f4ede4;padding:28px;border-radius:8px;margin-bottom:24px;">
          <p style="color:#AE360E;margin-bottom:14px;font-size:16px;font-weight:600;">Why Timnath Painting</p>
          <ul class="list-unstyled" style="line-height:2.2;margin:0;">
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Licensed &amp; Insured</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>No-VOC Products.</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>\$2M General Liability</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>SW &amp; BM Approved</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>We Know Our Crews</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Free On-Site Quotes</li>
          </ul>
        </div>

        <div style="padding:28px;border:1px solid #e4dacc;border-radius:8px;margin-bottom:24px;">
          <p style="color:#201B10;margin-bottom:14px;font-size:15px;font-weight:600;">Our Services in ${cd.label}, CO</p>
          <ul class="list-unstyled" style="margin:0;">
            ${otherServiceLinks}
            <li><a href="/${service.slug}-${city.slug}/index.html" style="display:block;padding:8px 0;color:#AE360E;font-size:14px;font-weight:700;text-decoration:none;">${service.label} in ${cd.label} &rarr;</a></li>
          </ul>
        </div>

        <div style="padding:28px;border:1px solid #e4dacc;border-radius:8px;">
          <p style="color:#201B10;margin-bottom:14px;font-size:15px;font-weight:600;">Other Areas for ${service.label}</p>
          <div>${otherCityLinks}</div>
        </div>

      </div>
    </div>
  </div>
</section>


<section style="padding:80px 0;background:#F4EDE4;">
  <div class="container">
    <div class="sec-title text-center" style="margin-bottom:40px;">
      <div class="d-flex align-items-center justify-content-center"><p class="sec-title__tagline">Painting Tips &amp; Insights</p></div>
      <h2 class="sec-title__title">From the Timnath Painting Blog</h2>
    </div>
    <div class="row gutter-y-30">
      <!-- RECENT_POSTS -->
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="/blog/" class="wallox-btn wallox-btn--base">See All Posts <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write(`${pageSlug}/index.html`,
    `${T.htmlHead(metaTitle, metaDesc, canonical, null, true)}
${T.wrapBody(content)}`);
}

// Build all 40 service+location combos
SERVICES.forEach(service => {
  CITIES.forEach(city => {
    buildServiceLocation(service, city);
  });
});

// Always sync functions/ into dist/ so CF Pages deploys include the API workers
copyDir(path.join(ROOT, 'functions'), path.join(DIST, 'functions'));

// Build blog
buildBlog({
  srcDir: ROOT,
  distDir: DIST,
  siteId: 'timnath-painting',
  postsPerPage: 10,
  domain: 'timnathpainting.com',
  siteName: 'Timnath Painting'
});

console.log('\n✓ All pillar pages built successfully.');






// ============================================================
// GET A QUOTE PAGE — High-conversion standalone landing page
// ============================================================
function buildGetAQuote() {
  const HEADER_STRIPPED_HTML = fs.readFileSync(path.join(PARTS, 'header-stripped.html'), 'utf8');
  const FOOTER_MINIMAL_HTML  = fs.readFileSync(path.join(PARTS, 'footer-minimal.html'),  'utf8');

  function inject(html) {
    return html.replace('<!-- HEADER -->', HEADER).replace('<!-- FOOTER -->', FOOTER_MINIMAL_HTML);
  }

  const head = T.htmlHead(
    'Get a Free Painting Quote | Timnath Painting | (970) 670-3965',
    'Request a free painting quote from Timnath Painting. No pressure, no surprises. Serving Timnath, Windsor, Fort Collins & Northern Colorado. We respond within 2 hours.',
    'https://timnathpainting.com/get-a-quote/'
  );

  const html = head + `
<!-- HEADER -->
<div class="page-wrapper" style="display:flex;flex-direction:column;min-height:100vh;">
<style>
.gaq-wrap{flex:1;background:#F4EDE4;padding:20px 0 64px;}
.gaq-page-header{margin-bottom:16px;}
.gaq-trust-strip{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:12px 28px;}
.gaq-trust-strip li{display:flex;align-items:center;gap:8px;color:#2E2A20;font-size:14px;font-weight:500;}
.gaq-trust-strip li i{color:#AE360E;font-size:14px;flex-shrink:0;}
.gaq-headline{color:#201B10;font-size:clamp(24px,2.4vw,34px);font-weight:800;line-height:1.15;letter-spacing:-0.02em;margin:0 0 8px;}
.gaq-subhead{color:#5a5650;font-size:17px;line-height:1.65;margin:0 0 32px;}
.gaq-trust-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;}
.gaq-trust-list li{display:flex;align-items:flex-start;gap:12px;color:#2E2A20;font-size:15px;line-height:1.5;}
.gaq-trust-list li i{color:#AE360E;margin-top:2px;flex-shrink:0;font-size:16px;}
.gaq-card{background:#fff;border-radius:14px;padding:32px 32px 28px;box-shadow:0 4px 24px rgba(0,0,0,0.09);}
.gaq-input{width:100%;padding:11px 14px;border:1.5px solid #e4dacc;border-radius:8px;font-size:15px;font-family:var(--wallox-font,"Plus Jakarta Sans",sans-serif);color:#201B10;background:#fff;box-sizing:border-box;transition:border-color 0.15s;}
.gaq-input:focus{outline:none;border-color:#AE360E;}
.gaq-input::placeholder{color:#a09890;}
.gaq-fields{display:flex;flex-direction:column;gap:12px;}
.gaq-submit{width:100%;padding:14px 20px;background:#AE360E;color:#fff;border:none;border-radius:100px;font-size:16px;font-weight:700;font-family:var(--wallox-font,"Plus Jakarta Sans",sans-serif);cursor:pointer;margin-top:4px;transition:background 0.2s;}
.gaq-submit:hover{background:#922d0a;}
.gaq-trust-line{text-align:center;color:#5a5650;font-size:13px;margin-top:10px;display:flex;align-items:center;justify-content:center;gap:6px;}
.gaq-trust-line i{color:#AE360E;}
.gaq-social-proof{margin-top:40px;padding-top:36px;border-top:1px solid #e4dacc;display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:24px;align-items:center;}
@media(max-width:700px){.gaq-social-proof{grid-template-columns:1fr 1fr;}}
.gaq-stars{color:#f59e0b;font-size:20px;letter-spacing:2px;}
.gaq-rating-wrap{display:flex;flex-direction:column;gap:2px;}
.gaq-rating-num{font-size:28px;font-weight:800;color:#201B10;line-height:1;}
.gaq-rating-label{color:#5a5650;font-size:13px;}
.gaq-proof-item{display:flex;align-items:flex-start;gap:10px;}
.gaq-proof-item i{color:#AE360E;margin-top:3px;font-size:16px;flex-shrink:0;}
.gaq-proof-item p{margin:0;color:#2E2A20;font-size:14px;line-height:1.5;}
.gaq-proof-item strong{display:block;font-size:14px;font-weight:700;}
.gaq-subtext{font-size:16px;font-weight:600;color:#AE360E;margin:0;letter-spacing:-0.01em;}
</style>
<main>
<section class="gaq-wrap">
  <div class="container">
    <div class="gaq-page-header">
      <h1 class="gaq-headline">An Honest Painting Quote</h1>
      <p class="gaq-subtext">No Pressure, No Surprises, No Runaround</p>
    </div>
    <div class="gaq-card" style="padding:24px;margin-bottom:24px;">
      <div id="2d355475-e9e2-4025-be1d-9768705789fb-4555532"></div>
      <link rel="stylesheet" href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css" media="screen" />
      <script src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js" clienthub_id="2d355475-e9e2-4025-be1d-9768705789fb-4555532" form_url="https://clienthub.getjobber.com/client_hubs/2d355475-e9e2-4025-be1d-9768705789fb/public/work_request/embedded_work_request_form?form_id=4555532"></script>
    </div>
    <ul class="gaq-trust-strip">
      <li><i class="fa-solid fa-check"></i>Licensed &amp; Insured &mdash; $2M liability</li>
      <li><i class="fa-solid fa-check"></i>Free on-site estimates, no obligation</li>
      <li><i class="fa-solid fa-check"></i>Premium Sherwin-Williams &amp; Benjamin Moore coatings</li>
      <li><i class="fa-solid fa-check"></i>Local to Northern Colorado</li>
    </ul>
    <div class="gaq-social-proof">
      <div class="gaq-rating-wrap">
        <div class="gaq-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <div class="gaq-rating-num">4.9</div>
        <div class="gaq-rating-label">Google Reviews</div>
      </div>
      <div class="gaq-proof-item">
        <i class="fa-solid fa-location-dot"></i>
        <p><strong>Local to Northern Colorado</strong>Based in Timnath &mdash; serving Timnath, Windsor, Fort Collins, Loveland &amp; the I-25 corridor.</p>
      </div>
      <div class="gaq-proof-item">
        <i class="fa-solid fa-shield-halved"></i>
        <p><strong>Licensed &amp; Insured</strong>$2M general liability. COI on request within 24 hours.</p>
      </div>
      <div class="gaq-proof-item">
        <i class="fa-solid fa-tag"></i>
        <p><strong>Free Estimates &mdash; No Obligation</strong>On-site assessment, no-pressure quote. You decide if it makes sense.</p>
      </div>
    </div>
  </div>
</section>
</main>
<!-- FOOTER -->
</div>
</body>
</html>`;

  const dest = path.join(DIST, 'get-a-quote/index.html');
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, inject(html), 'utf8');
  console.log('Built: get-a-quote/index.html');
}

buildGetAQuote();