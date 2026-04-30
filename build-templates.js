'use strict';
const { CLIENT, SERVICES } = require('./_build-data.js');

function htmlHead(title, desc) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex, nofollow">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons-v2/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons-v2/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons-v2/favicon-16x16.png">
<link rel="manifest" href="/assets/images/favicons-v2/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/vendors/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/assets/vendors/bootstrap-select/bootstrap-select.min.css">
<link rel="stylesheet" href="/assets/vendors/animate/animate.min.css">
<link rel="stylesheet" href="/assets/vendors/fontawesome/css/all.min.css">
<link rel="stylesheet" href="/assets/vendors/jquery-ui/jquery-ui.css">
<link rel="stylesheet" href="/assets/vendors/jarallax/jarallax.css">
<link rel="stylesheet" href="/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css">
<link rel="stylesheet" href="/assets/vendors/tiny-slider/tiny-slider.css">
<link rel="stylesheet" href="/assets/vendors/wallox-icons/style.css">
<link rel="stylesheet" href="/assets/vendors/owl-carousel/css/owl.carousel.min.css">
<link rel="stylesheet" href="/assets/vendors/owl-carousel/css/owl.theme.default.min.css">
<link rel="stylesheet" href="/assets/vendors/slick-carousel/slick.css">
<link rel="stylesheet" href="/assets/vendors/slick-carousel/slick-theme.css">
<link rel="stylesheet" href="/assets/css/wallox.css">
<link rel="stylesheet" href="/assets/css/timnath-custom.css">
<link rel="stylesheet" href="/assets/css/icon-shim.css">
<link rel="stylesheet" href="/assets/css/timnath-overrides.css">
</head>`;
}

function htmlScripts() {
  return `<script src="/assets/vendors/jquery/jquery-3.7.0.min.js"></script>
<script src="/assets/vendors/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/assets/vendors/bootstrap-select/bootstrap-select.min.js"></script>
<script src="/assets/vendors/jarallax/jarallax.min.js"></script>
<script src="/assets/vendors/jquery-ui/jquery-ui.js"></script>
<script src="/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js"></script>
<script src="/assets/vendors/jquery-appear/jquery.appear.min.js"></script>
<script src="/assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js"></script>
<script src="/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js"></script>
<script src="/assets/vendors/jquery-validate/jquery.validate.min.js"></script>
<script src="/assets/vendors/tiny-slider/tiny-slider.js"></script>
<script src="/assets/vendors/owl-carousel/js/owl.carousel.min.js"></script>
<script src="/assets/vendors/slick-carousel/slick.min.js"></script>
<script src="/assets/vendors/wow/wow.js"></script>
<script src="/assets/vendors/imagesloaded/imagesloaded.min.js"></script>
<script src="/assets/vendors/isotope/isotope.js"></script>
<script src="/assets/vendors/jquery-circleType/jquery.circleType.js"></script>
<script src="/assets/vendors/jquery-lettering/jquery.lettering.min.js"></script>
<script src="/assets/vendors/gsap/splittext.min.js"></script>
<script src="/assets/vendors/gsap/ScrollTrigger.min.js"></script>
<script src="/assets/vendors/gsap/gsap.js"></script>
<script src="/assets/js/wallox-gsap.js"></script>
<script src="/assets/js/wallox.js"></script>`;
}

function topbar() {
  return `<div class="topbar-two">
  <div class="container-fluid"><div class="topbar-two__inner">
    <div class="topbar-two__list"><ul class="list-unstyled topbar-two__info">
      <li class="topbar-two__info__item">
        <div class="topbar-two__info__icon"><i class="fa-solid fa-location-dot"></i></div>
        <div class="topbar-two__info__content"><span class="topbar-two__info__subtitle">location</span><p class="topbar-two__info__location">${CLIENT.city}, ${CLIENT.state}</p></div>
      </li>
      <li class="topbar-two__info__item">
        <div class="topbar-two__info__icon"><i class="fa-solid fa-envelope"></i></div>
        <div class="topbar-two__info__content"><span class="topbar-two__info__subtitle">email us</span><a href="mailto:${CLIENT.email}" class="topbar-two__info__content">${CLIENT.email}</a></div>
      </li>
      <li class="topbar-two__info__item">
        <div class="topbar-two__info__icon"><i class="fa-solid fa-phone"></i></div>
        <div class="topbar-two__info__content"><span class="topbar-two__info__subtitle">call us</span><a href="tel:${CLIENT.phoneTel}" class="topbar-two__info__content">${CLIENT.phone}</a></div>
      </li>
    </ul></div>
    <div class="topbar-two__right"><div class="topbar-two__social">
      <a href="${CLIENT.facebook}"><i class="fa-brands fa-facebook-f"></i><span class="sr-only">Facebook</span></a>
      <a href="${CLIENT.instagram}"><i class="fa-brands fa-instagram"></i><span class="sr-only">Instagram</span></a>
    </div></div>
  </div></div>
</div>`;
}

function pageHeader(title, crumbs) {
  return `<section class="page-header">
  <div class="page-header__bg" style="background-image:url(/assets/images/backgrounds/page-header-bg-1-1.jpg);"></div>
  <div class="container">
    <h2 class="page-header__title">${title}</h2>
    <div class="wallox-breadcrumb"><ul class="wallox-breadcrumb__list list-unstyled">
      <li><a href="/index.html"><i class="fa-solid fa-house"></i> Home</a></li>
      ${crumbs}
    </ul></div>
  </div>
</section>`;
}

function mobileNav() {
  return `<div class="mobile-nav__wrapper">
  <div class="mobile-nav__overlay mobile-nav__toggler"></div>
  <div class="mobile-nav__content">
    <span class="mobile-nav__close mobile-nav__toggler"><i class="fa-solid fa-xmark"></i></span>
    <div class="logo-box"><a href="/index.html"><img src="/assets/images/logo-light.png" width="155" alt="${CLIENT.name}"></a></div>
    <div class="mobile-nav__container"></div>
    <ul class="mobile-nav__contact list-unstyled">
      <li><i class="fa-solid fa-envelope"></i><a href="mailto:${CLIENT.email}">${CLIENT.email}</a></li>
      <li><i class="fa-solid fa-phone"></i><a href="tel:${CLIENT.phoneTel}">${CLIENT.phone}</a></li>
    </ul>
    <div class="mobile-nav__social">
      <a href="${CLIENT.facebook}"><i class="fa-brands fa-facebook-f"></i><span class="sr-only">Facebook</span></a>
      <a href="${CLIENT.instagram}"><i class="fa-brands fa-instagram"></i><span class="sr-only">Instagram</span></a>
    </div>
  </div>
</div>
<a href="#" data-target="html" class="scroll-to-target scroll-to-top">
  <span class="scroll-to-top__text">back top</span>
  <span class="scroll-to-top__wrapper"><span class="scroll-to-top__inner"></span></span>
</a>`;
}

function contactFormSection() {
  const serviceOptions = SERVICES.map(s => `<option value="${s.slug}" style="color:#222;background:#fff;">${s.label}</option>`).join('');
  return `<div class="testimonials-contact" style="
    position:relative;
    background-image: linear-gradient(rgba(20,15,10,0.72), rgba(20,15,10,0.72)), url(/assets/images/backgrounds/quote-bg.jpg);
    background-size:cover;
    background-position:center;
    padding:100px 0;
  ">
  <div class="container">
    <div class="row gutter-y-30 align-items-start">

      <!-- Quote Form -->
      <div class="col-lg-6">
        <div class="wow fadeInLeft" data-wow-duration="1500ms" data-wow-delay="100ms"
          style="background:rgba(30,22,14,0.88);border-radius:10px;padding:40px 36px;">
          <div style="margin-bottom:24px;">
            <span style="color:var(--wallox-base,#DF9E42);font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Request a Quote</span>
            <h3 style="color:#fff;margin-top:8px;margin-bottom:0;">Get a Free Quote</h3>
          </div>
          <form class="contact-one__form form-one" id="quote-form"
            action="/submit"
            method="POST"
            style="--form-bg:transparent;">
            <div class="form-one__group">
              <div class="form-one__control">
                <label for="name" style="color:#ccc;font-size:13px;">Your Name*</label>
                <input id="name" type="text" name="name" placeholder="Full name" required
                  style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:5px;padding:10px 14px;width:100%;">
              </div>
              <div class="form-one__control">
                <label for="email" style="color:#ccc;font-size:13px;">Email*</label>
                <input type="email" id="email" name="email" placeholder="Email address" required
                  style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:5px;padding:10px 14px;width:100%;">
              </div>
              <div class="form-one__control">
                <label for="phone" style="color:#ccc;font-size:13px;">Phone*</label>
                <input type="text" id="phone" name="phone" placeholder="(970) 000-0000"
                  style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:5px;padding:10px 14px;width:100%;">
              </div>
              <div class="form-one__control">
                <label for="service" style="color:#ccc;font-size:13px;">Service Needed</label>
                <select id="service" name="service"
                  style="width:100%;padding:10px 14px;border:1px solid rgba(255,255,255,0.15);border-radius:5px;background:#2a1e12;color:#fff;">
                  <option value="" style="color:#222;background:#fff;">Select a Service</option>${serviceOptions}
                </select>
              </div>
              <div class="form-one__control form-one__control--full" style="grid-column:1/-1;">
                <label for="message" style="color:#ccc;font-size:13px;">Message</label>
                <textarea name="message" id="message" placeholder="Tell us about your project"
                  style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:5px;padding:10px 14px;width:100%;min-height:110px;"></textarea>
              </div>
              <div class="form-one__control form-one__control--full" style="grid-column:1/-1;">
                <button type="submit" class="wallox-btn wallox-btn--base" style="width:100%;">Request a Quote</button>
              </div>
            </div>
          </form>
          <p style="margin-top:16px;font-size:13px;color:#aaa;">We respond within a few hours. Prefer to call? <a href="tel:${CLIENT.phoneTel}" style="color:var(--wallox-base,#DF9E42);">${CLIENT.phone}</a></p>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="col-lg-6">
        <div class="wow fadeInRight" data-wow-duration="1500ms" data-wow-delay="150ms" style="padding:20px 10px;">
          <span style="color:var(--wallox-base,#DF9E42);font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Reach Us Directly</span>
          <h3 style="color:#fff;margin-top:8px;margin-bottom:30px;">We Respond Within a Few Hours</h3>
          <ul class="list-unstyled" style="line-height:2.6;">
            <li><i class="fa-solid fa-phone" style="color:var(--wallox-base,#DF9E42);margin-right:12px;"></i><a href="tel:${CLIENT.phoneTel}" style="font-size:20px;font-weight:700;color:#fff;">${CLIENT.phone}</a></li>
            <li><i class="fa-solid fa-envelope" style="color:var(--wallox-base,#DF9E42);margin-right:12px;"></i><a href="mailto:${CLIENT.email}" style="color:#ddd;">${CLIENT.email}</a></li>
            <li><i class="fa-solid fa-location-dot" style="color:var(--wallox-base,#DF9E42);margin-right:12px;"></i><span style="color:#ddd;">${CLIENT.city}, ${CLIENT.state} ${CLIENT.zip}</span></li>
          </ul>
          <p style="margin-top:30px;font-style:italic;color:#bbb;">Licensed &amp; Insured &bull; Eco-Painter Certified &bull; $2M General Liability</p>
        </div>
      </div>

    </div>
  </div>
</div>`;
}

function faqBlock(faqs, groupName) {
  return `<div class="wallox-accrodion" data-grp-name="${groupName || 'faq'}">
  ${faqs.map((f, i) => `<div class="accrodion${i === 0 ? ' active' : ''}">
    <div class="accrodion-title"><h4>${f.q}</h4></div>
    <div class="accrodion-content"><div class="inner"><p>${f.a}</p></div></div>
  </div>`).join('\n  ')}
</div>`;
}

function serviceCarouselItems() {
  return SERVICES.map(s => `<div class="item"><div class="service-one__item">
    <div class="service-one__item__thumb"><img src="/assets/images/service/${s.img}" alt="${s.label} in Northern Colorado"></div>
    <div class="service-one__item__content">
      <h4 class="service-one__item__title"><a href="/${s.slug}/index.html">${s.label}</a></h4>
      <p class="service-one__item__tagline">${s.tagline}</p>
      <a href="/${s.slug}/index.html" class="service-one__item__link">Learn more &rarr;</a>
    </div>
  </div></div>`).join('\n');
}

function wrapBody(content) {
  return `<body>
<div class="preloader"><div class="preloader__image" style="background-image:url(/assets/images/loader-v2.png);"></div></div>
<div class="page-wrapper">
${content}
<!-- FOOTER -->
</div>
${mobileNav()}
${htmlScripts()}
<script>
// Fix JS-driven transforms that break about section layout
function fixTransforms() {
  var thumb = document.querySelector(".about-one__thumb__item.real-image");
  if (thumb) { thumb.style.transform = "none"; thumb.style.position = "static"; }
  var funfact = document.querySelector(".about-one__funfact");
  if (funfact) { funfact.style.transform = "none"; }
  var bgJar = document.querySelectorAll(".about-one [data-jarallax],.about-one__thumb .jarallax-img");
  bgJar.forEach(function(el) { el.style.transform = "none"; el.style.position = "static"; });
}
document.addEventListener("DOMContentLoaded", fixTransforms);
setTimeout(fixTransforms, 500);
setTimeout(fixTransforms, 1500);
setTimeout(fixTransforms, 3000);
// Fix letter-spacing on taglines after wallox.js runs
function fixTaglines() {
  document.querySelectorAll(".sec-title__tagline").forEach(function(el) {
    el.style.letterSpacing = "0.5px";
    el.style.wordSpacing = "normal";
    el.querySelectorAll("div, span").forEach(function(child) {
      child.style.display = "inline";
      child.style.letterSpacing = "0.5px";
    });
  });
}
setTimeout(fixTaglines, 300);
setTimeout(fixTaglines, 1000);
setTimeout(fixTaglines, 2500);
</script>
<!-- form submits natively to formsubmit.co -->
</body>
</html>`;
}

module.exports = { htmlHead, htmlScripts, topbar, pageHeader, mobileNav, contactFormSection, faqBlock, serviceCarouselItems, wrapBody };








