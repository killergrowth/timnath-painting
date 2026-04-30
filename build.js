'use strict';
/**
 * build.js  -  Timnath Painting Site Builder
 * Generates all pillar pages from data + templates
 * Run: node build.js
 * Output: dist/
 */

const fs   = require('fs');
const path = require('path');
const { CLIENT, SERVICES, CITIES, SERVICE_DATA } = require('./_build-data.js');
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

// Copy coming-soon landing page to root
const COMING_SOON = path.join(ROOT, '..', '..', 'timnath-painting-coming-soon');
if (fs.existsSync(COMING_SOON)) {
  fs.copyFileSync(path.join(COMING_SOON, 'index.html'), path.join(DIST, 'index.html'));
  if (fs.existsSync(path.join(COMING_SOON, 'favicon.ico'))) fs.copyFileSync(path.join(COMING_SOON, 'favicon.ico'), path.join(DIST, 'favicon.ico'));
  copyDir(path.join(COMING_SOON, 'assets'), path.join(DIST, 'landing-assets'));
  // Patch asset paths in the copied index.html to use /landing-assets/
  let csHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  csHtml = csHtml.replace(/(["'])assets\//g, '$1/landing-assets/');
  fs.writeFileSync(path.join(DIST, 'index.html'), csHtml, 'utf8');
  console.log('Coming-soon landing page copied to root.');
}
console.log('Assets copied.\n');

// â"€â"€ HOMEPAGE â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildHomepage() {
  const sliders = [
    {
      bg: 'slider-3-1.jpg',
      sub: 'Northern Colorado Painting Contractor',
      lines: ['Premium Exterior &amp;', 'Interior Painting'],
      btn1: { t: 'Get a Free Quote', h: '/contact.html' },
      btn2: { t: 'Our Services', h: '/exterior-painting/index.html' }
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
      <div class="main-slider-one__btn">
        <a href="${s.btn1.h}" class="tp-btn-hero tp-hero-primary">${s.btn1.t}</a>
        <a href="${s.btn2.h}" class="tp-btn-hero tp-hero-secondary">${s.btn2.t}</a>
      </div>
    </div>
  </div></div></div>

</div>`).join('\n');

  const features = [
    { icon:'fa-solid fa-lightbulb', title:'7-10 Year Systems', link:'/exterior-painting/index.html' },
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
    <div class="row align-items-center gutter-y-30">
      <div class="col-lg-6">
        <div class="about-one__thumb">
          <div class="about-one__thumb__item real-image"><img src="/assets/images/about/about-1-1.jpg" alt="${CLIENT.name}  -  Professional Painting in Northern Colorado"></div>
          <div class="about-one__funfact count-box">
            <h3 class="about-one__count"><span class="count-text" data-stop="28" data-speed="1500"></span><span>+</span></h3>
            <p class="about-one__funfact__text">freeze-thaw<br>cycles per year</p>
          </div>
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
            <li class="about-one__list__item"><i class="fa-solid fa-check"></i> No subcontractors. No volume rushing.</li>
          </ul>
          <div class="about-one__client wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
            <div class="about-one__client__item"><div class="about-one__client__dec">
              <div class="about-one__client__star"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
              <p class="about-one__client__text">5-Star Google Rated</p>
            </div></div>
            <a href="/about.html" class="wallox-btn wallox-btn--base">More About Us</a>
          </div>
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
  <div class="service-one__bottom wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="300ms">
    <div class="service-one__bottom__link"><p>Get a <a href="/contact.html">Free Estimate</a></p></div>
    <div class="service-one__bottom__call">
      <div class="service-one__bottom__call__icon"><i class="fa-solid fa-phone"></i></div>
      <div class="service-one__bottom__call__content">
        <span class="service-one__bottom__call__title">Call Us</span>
        <a href="tel:${CLIENT.phoneTel}" class="service-one__bottom__call__number">${CLIENT.phone}</a>
      </div>
    </div>
    <div class="service-one__bottom__nav">
      <button class="service-one__carousel__nav - left"><span>&#8249;</span></button>
      <button class="service-one__carousel__nav - right"><span>&#8250;</span></button>
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
              <h4 class="why-choose-one__feature__title">No Subcontractors. Ever.</h4>
            </div></div>
            <p class="why-choose-one__feature__text">Josh leads every project personally. The crew you meet on day one is the crew that finishes the job.</p>
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

${T.contactFormSection()}`;

  write('home/index.html', `${T.htmlHead(`${CLIENT.name} | Exterior & Interior Painting in Northern Colorado`, CLIENT.description)}
${T.wrapBody(content)}`);
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
          <p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">I'm Josh, a Colorado native. I've been in and around the painting industry since 2007 and have owned and operated multiple successful painting and construction companies in the Midwest.</p>
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
          <li class="about-one__list__item"><i class="fa-solid fa-check"></i> No subcontractors on any project</li>
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
        <div class="sec-title text-start">
          <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">${d.tagline}</h6></div>
          <h3 class="sec-title__title">${d.heroTitle}</h3>
        </div>
        ${d.intro.split('\n\n').map(p => `<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">${p}</p>`).join('\n')}
        <div style="margin:40px 0;">
          <div class="sec-title text-start">
            <h4 style="margin-bottom:20px;">Our Process</h4>
          </div>
          ${d.process.split('\n\n').map(p => `<p class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">${p}</p>`).join('\n')}
        </div>
        <div style="margin:40px 0;">
          <div class="sec-title text-start">
            <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">cities we serve</h6></div>
            <h3 class="sec-title__title">Service Areas</h3>
          </div>
          <p class="wow fadeInUp" data-wow-duration="1500ms">We provide ${d.title.split(' in ')[0].toLowerCase()} throughout Northern Colorado:</p>
          <div style="margin-top:20px;">${cityLinksHTML}</div>
        </div>
        <div style="margin:40px 0;">
          <div class="sec-title text-start">
            <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">common questions</h6></div>
            <h3 class="sec-title__title">Frequently Asked Questions</h3>
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
        <div style="background:#2e2a20;color:#f4ede4;padding:30px;border-radius:8px;">
          <h4 style="color:#df9e42;margin-bottom:15px;">Why Timnath Painting</h4>
          <ul class="list-unstyled" style="line-height:2;">
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>Licensed &amp; Insured</li>
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>Eco-Painter Certified</li>
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>$2M General Liability</li>
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>SW &amp; BM Approved</li>
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>No Subcontractors</li>
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
      <div class="col-md-4">
        <div class="contact-one__item wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms" style="text-align:center;padding:30px;background:#f4ede4;border-radius:8px;">
          <div style="font-size:40px;color:var(--wallox-base);margin-bottom:15px;"><i class="fa-solid fa-location-dot"></i></div>
          <h4>Address</h4>
          <p>${CLIENT.city}, ${CLIENT.state} ${CLIENT.zip}<br>Serving Northern Colorado</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="contact-one__item wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="300ms" style="text-align:center;padding:30px;background:#f4ede4;border-radius:8px;">
          <div style="font-size:40px;color:var(--wallox-base);margin-bottom:15px;"><i class="fa-solid fa-phone"></i></div>
          <h4>Phone</h4>
          <a href="tel:${CLIENT.phoneTel}" style="font-size:20px;font-weight:700;white-space:nowrap;">${CLIENT.phone}</a>
          <p style="margin-top:8px;font-size:14px;">Mon–Sat: 7am–6pm</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="contact-one__item wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="500ms" style="text-align:center;padding:30px;background:#f4ede4;border-radius:8px;">
          <div style="font-size:40px;color:var(--wallox-base);margin-bottom:15px;"><i class="fa-solid fa-envelope"></i></div>
          <h4>Email</h4>
          <a href="mailto:${CLIENT.email}">${CLIENT.email}</a>
        </div>
      </div>
    </div>
    <div class="row gutter-y-30" style="margin-top:60px;">
      <div class="col-lg-8">
        <div class="sec-title text-start">
          <div class="d-flex align-items-center justify-content-start"><h6 class="sec-title__tagline">get in touch</h6></div>
          <h3 class="sec-title__title">Get a Free Quote</h3>
        </div>
        <p>Ready to transform your home or business with professional painting? We respond quickly  -  usually within a few hours  -  and always provide honest, no-obligation quotes.</p>
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
        <div style="background:#2e2a20;color:#f4ede4;padding:30px;border-radius:8px;">
          <h4 style="color:#df9e42;margin-bottom:20px;">Quick Info</h4>
          <ul class="list-unstyled" style="line-height:2.5;">
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>Licensed &amp; Insured in Colorado</li>
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>Eco-Painter Certified</li>
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>$2M General Liability  -  COI on request</li>
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>No subcontractors</li>
            <li><i class="fa-solid fa-check" style="color:#df9e42;margin-right:8px;"></i>Free on-site quotes</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="contact-map" style="margin-top:60px;">
      <div class="google-map google-map__contact" style="height:400px;background:#e4dacc;display:flex;align-items:center;justify-content:center;border-radius:8px;">
        <p style="color:#7e7c76;">[GOOGLE MAPS EMBED PLACEHOLDER  -  Replace with client Google Maps embed URL]</p>
      </div>
    </div>
  </div>
</section>`;

  write('contact.html', `${T.htmlHead('Contact Timnath Painting | Free Quote | (970) 236-8271', 'Contact Timnath Painting for a free exterior or interior painting quote. Serving Timnath, Windsor, Severance & Northern Colorado. Call (970) 236-8271.')}
${T.wrapBody(content)}`);
}

// â"€â"€ SERVICE AREAS INDEX â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildServiceAreas() {
  const cityGrid = CITIES.map(c => `
  <div class="col-md-6 col-lg-4 col-xl-3">
    <div class="wow fadeInUp" data-wow-duration="1500ms" style="background:#f4ede4;padding:25px;border-radius:8px;margin-bottom:20px;">
      <h4 style="margin-bottom:15px;">${c.label}, CO</h4>
      <ul class="list-unstyled" style="font-size:14px;line-height:2;">
        ${SERVICES.map(s => `<li><a href="/${s.slug}/${c.slug}/index.html">${s.label}</a></li>`).join('')}
      </ul>
    </div>
  </div>`).join('\n');

  const content = `
${T.topbar()}
<!-- HEADER -->
${T.pageHeader('Service Areas  -  Northern Colorado', '<li><span>Service Areas</span></li>')}

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

  write('service-areas/index.html', `${T.htmlHead('Service Areas | Timnath Painting | Northern Colorado', 'Timnath Painting serves Northern Colorado including Timnath, Windsor, Fort Collins, Loveland, Greeley and more. View all service areas.')}
${T.wrapBody(content)}`);
}

// â"€â"€ RUN ALL â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
buildHomepage();
buildAbout();
Object.keys(SERVICE_DATA).forEach(buildServiceHub);
buildContact();
buildServiceAreas();

console.log('\nâœ... All pillar pages built successfully.');


