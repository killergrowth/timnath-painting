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

// Custom SVG icons — inline with brand color
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

// â"€â"€ Setup â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
ensureDir(DIST);
copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));

// Root index.html — built by buildHomepage()

// Copy coming-soon landing page to root (DISABLED — site is live)
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
// Remove _worker.js and _routes.json — Pages Functions handle routing now
// _worker.js in dist/ disables ALL Pages Functions (CF limitation)
const workerFile = path.join(DIST, '_worker.js');
const routesFile = path.join(DIST, '_routes.json');
if (fs.existsSync(workerFile)) fs.unlinkSync(workerFile);
if (fs.existsSync(routesFile)) fs.unlinkSync(routesFile);

console.log('Assets copied.\n');

// â"€â"€ HOMEPAGE â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildHomepage() {
  // ── Reviews data ─────────────────────────────────────────────────────────────
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
      btn1: { t: 'Get a Free Quote', h: '/contact.html' },
      btn2: { t: 'Our Services', h: '/exterior-painting/index.html' },
      subText: 'Professional painting done right—on time, on budget, and built to last.'
    },
  ];

  const sliderHTML = sliders.map(s => `<div class="main-slider-one__item">
  <div class="main-slider-one__bg" style="background-image:url(/assets/images/backgrounds/${s.bg});"></div>
  <div class="container"><div class="row align-items-center gutter-y-30"><div class="col-lg-7">
    <div class="main-slider-one__content">
      <h6 class="main-slider-one__sub-title">${s.sub}</h6>
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

</div>`).join('\n');

  const features = [
    { icon:'fa-solid fa-lightbulb', title:'10 Year Systems', link:'/exterior-painting/index.html' },
    { icon:'fa-solid fa-paint-roller', title:'Eco-Painter Certified', link:'/about.html' },
    { icon:'fa-solid fa-users', title:'$2M Liability Coverage', link:'/about.html' },
    { icon:'fa-solid fa-shield-halved', title:'Free On-Site Quotes', link:'/contact.html' },
  ];

  const content = `
${T.topbar()}
<!-- HEADER -->

<section class="main-slider-one">
  <div class="main-slider-one__carousel wallox-owl__carousel owl-carousel" data-owl-options='{"loop":false,"animateOut":"fadeOut","animateIn":"fadeIn","items":1,"autoplay":false,"nav":false,"dots":false,"margin":0}'>
    ${sliderHTML}
  </div>
</section>

<section class="feature-two feature-two - one" style="padding-top:60px;">
  <div class="container">
    <div class="row gutter-y-30">
      ${features.map((f,i) => `<div class="col-lg-3 col-md-4 col-sm-6"><div class="feature-two__item wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="${(i+1)*200}ms"><div class="feature-two__item__icon"><i class="${f.icon}"></i></div><h5 class="feature-two__item__title"><a href="${f.link}">${f.title}</a></h5></div></div>`).join('\n')}
    </div>
    <div class="line"></div>
  </div>
</section>

<section class="about-one">
  <div class="container">
    <div class="row align-items-start gutter-y-30">
      <div class="col-lg-6">
        <div class="about-one__thumb">
          <div class="about-one__thumb__item real-image"><img src="/assets/images/about/about-1-1.jpg" alt="${CLIENT.name}  -  Professional Painting in Northern Colorado"></div>
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
              
              <h6 class="sec-title__tagline">About ${CLIENT.name}</h6>
            </div>
            <h3 class="sec-title__title">Paint Systems Built for Colorado's Climate</h3>
          </div>
          <p class="about-one__top__text wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">Northern Colorado sees 28+ freeze-thaw cycles a year. UV radiation hits 10-15% harder at altitude. Cheap paint fails in 3-4 years here. ${CLIENT.name} builds exterior systems that last 7-10 years using premium Sherwin-Williams and Benjamin Moore coatings, applied by an Eco-Painter Certified crew with $2M general liability coverage.</p>
          <ul class="about-one__list list-unstyled wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="400ms">
            <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Licensed &amp; Insured in Colorado</li>
            <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Eco-Painter Certified applicators</li>
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
      <div class="d-flex align-items-center justify-content-center"><h6 class="sec-title__tagline">what we do</h6></div>
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
            <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">Why Choose Us?</h6></div>
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
            <div class="progress-box__bar"><div class="progress-box__bar__inner count-bar" data-percent="95%"><div class="progress-box__number count-text">95%</div></div></div>
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
            <img src="/assets/images/resources/why-choose-1-1.jpg" alt="${CLIENT.name} crew at work"><div class="why-choose-one__thumb-box"></div>
          </div>
          <div class="why-choose-one__thumb-two wow fadeInRight" data-wow-duration="1500ms" data-wow-delay="300ms">
            <img src="/assets/images/resources/why-choose-1-2.jpg" alt="Premium exterior painting result">
          </div>
          <div class="why-choose-one__thumb-box-two"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- REVIEWS -->

${T.contactFormSection()}`;

  // Inject reviews section and schema
  const finalContent = schemaTag + '\n' + content.replace('<!-- REVIEWS -->', reviewsSection);

  write('index.html', `${T.htmlHead(`${CLIENT.name} | Exterior Painting & Fence Staining in Northern Colorado`, CLIENT.description)}
${T.wrapBody(finalContent)}`);
}

// â"€â"€ ABOUT PAGE â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
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
          <a href="/contact.html" class="wallox-btn wallox-btn--base" style="margin-top:20px;display:inline-block;">Get a Free Quote</a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="about-one__right">
          <div class="sec-title text-start">
            <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">Our Story</h6></div>
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
          <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">Why We Do It Differently</h6></div>
          <h3 class="sec-title__title">Why Northern Colorado Homes Trust Timnath Painting</h3>
        </div>
        <p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">Most painting contractors are reactive. You call when something's wrong. They show up, quote the job, and disappear until the next crisis. That's not how we operate.</p>
        <ul class="about-one__list list-unstyled wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms" style="margin-top:20px;">
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Licensed &amp; Insured in Colorado</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Eco-Painter Certified  -  approved Sherwin-Williams &amp; Benjamin Moore applicator</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> $2M general liability  -  certificates available on request</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> We Know Our Crews</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Limited project capacity to maintain quality control</li>
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> Daily progress updates  -  no chasing us down</li>
        </ul>
      </div>
      <div class="col-lg-6">
        <div class="why-choose-one__progress progress-box wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms" style="margin-top:40px;">
          <h4 class="progress-box__title">Surface Preparation Standards</h4>
          <div class="progress-box__bar"><div class="progress-box__bar__inner count-bar" data-percent="95%"><div class="progress-box__number count-text">95%</div></div></div>
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
          <img src="/assets/images/about/about-kitchen.jpg" alt="Interior painting project by Timnath Painting" style="width:100%;height:auto;display:block;border-radius:10px;">
        </div>
      </div>
    </div>
  </div>
</section>

<section style="padding:80px 0;">
  <div class="container">
    <div class="sec-title text-center">
      <div class="d-flex align-items-center justify-content-center"><h6 class="sec-title__tagline">Our Services</h6></div>
      <h3 class="sec-title__title">What We Do</h3>
    </div>
    <div class="row gutter-y-30" style="margin-top:40px;">
      ${SERVICES.map(s => `<div class="col-md-6 col-lg-4">
        <div class="feature-two__item wow fadeInUp" data-wow-duration="1500ms" style="padding:30px;border:1px solid #e4dacc;border-radius:8px;text-align:center;">
          <h5 class="feature-two__item__title" style="margin-bottom:10px;"><a href="/${s.slug}/index.html">${s.label}</a></h5>
          <a href="/${s.slug}/index.html" class="wallox-btn wallox-btn--base" style="margin-top:10px;">Learn More</a>
        </div>
      </div>`).join('\n')}
      <div class="col-md-6 col-lg-4">
        <div class="feature-two__item wow fadeInUp" data-wow-duration="1500ms" style="padding:30px;border:1px solid #e4dacc;border-radius:8px;text-align:center;background:#f4ede4;">
          <h5 class="feature-two__item__title" style="margin-bottom:10px;"><a href="/areas-served/index.html" style="color:#AE360E;">See Areas We Serve</a></h5>
          <a href="/areas-served/index.html" class="wallox-btn wallox-btn--base" style="margin-top:10px;">View All Areas</a>
        </div>
      </div>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write('about.html', `${T.htmlHead('About Timnath Painting | Josh Funk | NoCo Painting Contractor', "Meet Josh Funk and the Timnath Painting team. Premium painting contractor serving the Golden Triangle  -  Timnath, Windsor & Severance CO. (970) 236-8271")}
${T.wrapBody(content)}`);
}

// â"€â"€ SERVICE HUB PAGES â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildServiceHub(slug) {
  const d = SERVICE_DATA[slug];
  if (!d) { console.warn('No data for', slug); return; }

  const cityLinksHTML = CITIES.map(c =>
    `<a href="/${slug}/${c.slug}/index.html" class="wallox-btn wallox-btn--border" style="margin:4px 4px 4px 0;">${c.label}</a>`
  ).join('\n');

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader(d.title, `<li><span>${d.title.split(' in ')[0]}</span></li>`)}

<section style="padding:80px 0;">
  <div class="container">
    <div class="row gutter-y-30">
      <div class="col-lg-8">
        <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:16px;">
          <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">${d.tagline}</h6></div>
          <h3 class="sec-title__title" style="margin-bottom:0;">${d.heroTitle}</h3>
        </div>
        ${d.intro.split('\n\n').map(p => `<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">${p}</p>`).join('\n')}
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;">
            <h4 style="margin-bottom:12px;">Our Process</h4>
          </div>
          ${d.process.split('\n\n').map(p => `<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">${p}</p>`).join('\n')}
        </div>
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
            <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">cities we serve</h6></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Areas Served</h3>
          </div>
          <p class="wow fadeInUp" data-wow-duration="1500ms">We provide ${d.title.split(' in ')[0].toLowerCase()} throughout Northern Colorado:</p>
          <div style="margin-top:20px;">${cityLinksHTML}</div>
        </div>
        <div style="margin:40px 0;">
          <div class="sec-title text-start" style="padding-bottom:0;margin-bottom:12px;">
            <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">common questions</h6></div>
            <h3 class="sec-title__title" style="margin-bottom:0;">Frequently Asked Questions</h3>
          </div>
          <div style="margin-top:30px;">${T.faqBlock(d.faqs, slug + '-faq')}</div>
        </div>
      </div>
      <div class="col-lg-4">
        <div style="background:#f4ede4;padding:30px;border-radius:8px;margin-bottom:30px;">
          <h4 style="margin-bottom:20px;">Get a Free Quote</h4>
          <ul class="list-unstyled" style="line-height:2.2;">
            <li><i class="fa-solid fa-phone" style="color:var(--wallox-base);margin-right:8px;"></i><a href="tel:${CLIENT.phoneTel}" style="font-weight:700;font-size:18px;">${CLIENT.phone}</a></li>
            <li><i class="fa-solid fa-envelope" style="color:var(--wallox-base);margin-right:8px;"></i><a href="mailto:${CLIENT.email}">${CLIENT.email}</a></li>
            <li><i class="fa-solid fa-location-dot" style="color:var(--wallox-base);margin-right:8px;"></i>${CLIENT.city}, ${CLIENT.state}</li>
          </ul>
          <a href="/contact.html" class="wallox-btn wallox-btn--base" style="margin-top:20px;display:block;text-align:center;">Request a Quote</a>
        </div>
        <div style="background:#201b10;color:#f4ede4;padding:30px;border-radius:8px;">
          <h4 style="color:#ae360e;margin-bottom:15px;">Why Timnath Painting</h4>
          <ul class="list-unstyled" style="line-height:2;">
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>Licensed &amp; Insured</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>Eco-Painter Certified</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>$2M General Liability</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>SW &amp; BM Approved</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>We Know Our Crews</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write(`${slug}/index.html`, `${T.htmlHead(d.metaTitle, d.metaDesc)}
${T.wrapBody(content)}`);
}

// â"€â"€ CONTACT PAGE â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
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
          <p style="margin:0;">${CLIENT.city}, ${CLIENT.state} ${CLIENT.zip}<br>Serving Northern Colorado</p>
        </div>
      </div>
      <div class="col-md-4 d-flex"><div class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="300ms" style="text-align:center;padding:36px 24px;background:#f4ede4;border-radius:12px;border:1px solid #e4dacc;width:100%;">
          <div style="font-size:36px;color:var(--wallox-base);margin-bottom:12px;"><i class="fa-solid fa-phone"></i></div>
          <h4 style="margin-bottom:8px;">Phone</h4>
          <a href="tel:${CLIENT.phoneTel}" style="font-size:20px;font-weight:700;color:var(--wallox-base);display:block;">${CLIENT.phone}</a>
          <p style="margin-top:6px;font-size:13px;color:#666;">Mon–Sat: 7am–6pm</p>
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
          <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">get in touch</h6></div>
          <h3 class="sec-title__title" style="margin-bottom:8px;">Get a Free Quote</h3>
        </div>
        <p style="margin-top:0;">Ready to transform your home or business with professional painting? We respond quickly  -  usually within a few minutes  -  and always provide honest, no-obligation quotes.</p>
        <form class="contact-one__form" id="quote-form" action="/submit" method="POST" style="margin-top:30px;">
          <div class="row gutter-y-20">
            <div class="col-md-6"><input type="text" name="name" placeholder="Your Name *" required style="width:100%;padding:15px;border:1px solid #ddd;border-radius:4px;margin-bottom:15px;"></div>
            <div class="col-md-6"><input type="email" name="email" placeholder="Email Address *" required style="width:100%;padding:15px;border:1px solid #ddd;border-radius:4px;margin-bottom:15px;"></div>
            <div class="col-md-6"><input type="text" name="phone" placeholder="Phone Number" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:4px;margin-bottom:15px;"></div>
            <div class="col-md-6">
              <select name="service" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:4px;margin-bottom:15px;">
                <option value="">Service Needed</option>
                ${SERVICES.map(s => `<option value="${s.slug}">${s.label}</option>`).join('')}
              </select>
            </div>
            <div class="col-12"><textarea name="message" placeholder="Tell us about your project" rows="5" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:4px;margin-bottom:15px;"></textarea></div>
            <div class="col-12"><button type="submit" class="wallox-btn wallox-btn--base">Send Message</button></div>
          </div>
        </form>
      </div>
      <div class="col-lg-4">
        <div style="background:#201b10;color:#f4ede4;padding:30px;border-radius:8px;">
          <h4 style="color:#ae360e;margin-bottom:20px;">Quick Info</h4>
          <ul class="list-unstyled" style="line-height:2.5;">
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>Licensed &amp; Insured in Colorado</li>
            <li><i class="fa-solid fa-check" style="color:#ae360e;margin-right:8px;"></i>Eco-Painter Certified</li>
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

  write('contact.html', `${T.htmlHead('Contact Timnath Painting | Free Quote | (970) 236-8271', 'Contact Timnath Painting for a free exterior or interior painting quote. Serving Timnath, Windsor, Severance & Northern Colorado. Call (970) 236-8271.')}
${T.wrapBody(content)}`);
}

// â"€â"€ Areas Served INDEX â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildServiceAreas() {
  const cityGrid = CITIES.map(c => `
  <div class="col-md-6 col-lg-4 col-xl-3">
    <div class="wow fadeInUp" data-wow-duration="1500ms" style="background:#f4ede4;padding:25px;border-radius:8px;margin-bottom:20px;">
      <h4 style="margin-bottom:15px;"><a href="/areas-served/${c.slug}/index.html" style="color:#201B10;text-decoration:none;">${c.label}, CO</a></h4>
      <ul class="list-unstyled" style="font-size:14px;line-height:2;">
        ${SERVICES.map(s => `<li><a href="/${s.slug}/${c.slug}/index.html">${s.label}</a></li>`).join('')}
      </ul>
    </div>
  </div>`).join('\n');

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader('Areas Served  -  Northern Colorado', '<li><span>Areas Served</span></li>')}

<section style="padding:80px 0;">
  <div class="container">
    <div class="sec-title text-center">
      <div class="d-flex align-items-center justify-content-center"><h6 class="sec-title__tagline">where we work</h6></div>
      <h3 class="sec-title__title">Painting Services Across Northern Colorado</h3>
    </div>
    <p class="text-center" style="margin:20px auto 50px;max-width:700px;">${CLIENT.name} serves homeowners and commercial property owners throughout the Northern Colorado I-25 corridor. Select your city below to learn more about our services in your area.</p>
    <div class="row gutter-y-30">${cityGrid}</div>
  </div>
</section>

${T.contactFormSection()}`;

  write('areas-served/index.html', `${T.htmlHead('Areas Served | Timnath Painting | Northern Colorado', 'Timnath Painting serves Northern Colorado including Timnath, Windsor, Fort Collins, Loveland, Greeley and more. View all Areas Served.')}
${T.wrapBody(content)}`);
}

// â"€â"€ RUN ALL â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
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
      <div class="d-flex align-items-center justify-content-center"><h6 class="sec-title__tagline">what we do</h6></div>
      <h3 class="sec-title__title">Professional Painting Services in Northern Colorado</h3>
      <p style="margin:20px auto 0;max-width:680px;color:#5a5650;">From full exterior repaint to HOA common areas, Timnath Painting handles it all with Eco-Painter Certified crews and premium Sherwin-Williams and Benjamin Moore coatings.</p>
    </div>
    <div class="row gutter-y-30">${serviceGrid}
    <div class="col-lg-4 col-md-6">
      <div style="background:#fff;border-radius:10px;padding:32px 24px;text-align:center;border:1px solid rgba(0,0,0,0.07);height:100%;display:flex;flex-direction:column;align-items:center;">
        <div style="font-size:48px;color:#AE360E;margin-bottom:16px;line-height:1;"><i class="fa-solid fa-medal"></i></div>
        <h4 style="font-size:20px;font-weight:700;color:#201B10;margin-bottom:8px;">Why Timnath?</h4>
        <p style="color:#5a5650;font-size:14px;margin-bottom:24px;flex:1;">Eco-Painter Certified. $2M liability. We know our crews. See what sets us apart.</p>
        <a href="/about.html" class="wallox-btn wallox-btn--base" style="font-size:14px;padding:10px 22px;">Our Story <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div></div>
  </div>
</section>

${T.contactFormSection()}`;

  write('services/index.html', `${T.htmlHead('Services | Timnath Painting | Northern Colorado', 'Exterior painting, interior painting, HOA painting, commercial painting, fence staining and more. Professional painting services across Northern Colorado.')}
${T.wrapBody(content)}`);
}
// ══ CITY HUB PAGES ══════════════════════════════════════════════════════════
function buildCityHub(city) {
  const d = CITY_DATA[city.slug];
  if (!d) { console.warn('No city data for', city.slug); return; }

  const serviceFeatures = SERVICES.map(s => `
    <li style="display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid #e4dacc;">
      <div style="flex-shrink:0;width:32px;height:32px;background:#AE360E;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;margin-top:2px;">
        <i class="fa-solid fa-check"></i>
      </div>
      <div>
        <div style="font-weight:700;color:#201B10;margin-bottom:4px;">
          ${s.label} in ${d.label}, CO
        </div>
        <div style="color:#5a5650;font-size:14px;line-height:1.6;">${s.tagline}</div>
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
          <h6 style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">what we offer</h6>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:20px;">Our Services in ${d.label}, CO</h2>
          <ul style="list-style:none;padding:0;margin:0;border-top:1px solid #e4dacc;">
            ${serviceFeatures}
          </ul>
        </div>

        <hr style="border:none;border-top:1px dashed #ddd;margin:32px 0;">

        <div style="margin-bottom:32px;">
          <h6 style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#AE360E;margin-bottom:8px;">common questions</h6>
          <h2 style="font-size:24px;font-weight:700;color:#201B10;margin-bottom:20px;">Frequently Asked Questions — ${d.label}, CO</h2>
          ${T.faqBlock(d.faqs, city.slug + '-faq')}
        </div>

        <div style="background:#201B10;color:#f4ede4;border-radius:8px;padding:28px 32px;margin-top:32px;">
          <h4 style="color:#fff;margin:0 0 10px;font-size:20px;">Ready to Get Started in ${d.label}?</h4>
          <p style="margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.8);">Call <a href="tel:${CLIENT.phoneTel}" style="color:#AE360E;font-weight:700;">${CLIENT.phone}</a> or use the form below. We respond within minutes and always provide free on-site quotes.</p>
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
          <a href="/contact.html" class="wallox-btn wallox-btn--base" style="display:block;text-align:center;">Request a Quote</a>
        </div>

        <div style="background:#201B10;color:#f4ede4;padding:28px;border-radius:8px;margin-bottom:24px;">
          <h5 style="color:#AE360E;margin-bottom:14px;font-size:16px;">Why Timnath Painting</h5>
          <ul class="list-unstyled" style="line-height:2.2;margin:0;">
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Licensed &amp; Insured</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Eco-Painter Certified</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>\$2M General Liability</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>SW &amp; BM Approved</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>We Know Our Crews</li>
            <li><i class="fa-solid fa-check" style="color:#AE360E;margin-right:8px;"></i>Free On-Site Quotes</li>
          </ul>
        </div>

        <div style="padding:28px;border:1px solid #e4dacc;border-radius:8px;">
          <h5 style="color:#201B10;margin-bottom:14px;font-size:15px;">Other Areas We Serve</h5>
          <div>${otherCities}</div>
        </div>
      </div>

    </div>
  </div>
</section>

${T.contactFormSection()}`;

  write(`areas-served/${city.slug}/index.html`,
    `${T.htmlHead(
      `Painting Services in ${d.label}, CO | Timnath Painting`,
      `Professional painting services in ${d.label}, CO. Exterior painting, HOA, commercial, fence staining. Licensed, eco-certified, $2M liability. Call (970) 236-8271.`
    )}
${T.wrapBody(content)}`);
}

// ══ GALLERY PAGE ══════════════════════════════════════════════════════════
function buildGallery_OLD() { // OLD — replaced by template-based version below
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
      <div class="d-flex align-items-center justify-content-center"><h6 class="sec-title__tagline">our work</h6></div>
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

${T.contactFormSection()}`;

  const head = T.htmlHead('Project Gallery | Timnath Painting', 'Browse completed painting projects by Timnath Painting across Northern Colorado. Exterior, interior, HOA, commercial and more.');
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

// ══ UPLOAD ADMIN PAGE ═════════════════════════════════════════════════════════
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

console.log('\nâœ... All pillar pages built successfully.');



