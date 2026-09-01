'use strict';
/**
 * build-projects.js
 * Builds /projects/<slug>/index.html for each entry in content/projects/generated/
 * Called by build.js — uses the same write() + T.htmlHead() + T.wrapBody() pattern as all other pages.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'projects', 'generated');

function extractArticleHtml(raw) {
  if (!raw) return '';
  let text = raw.trim();
  text = text.replace(/^```[\w]*\n?/m, '').replace(/```\s*$/m, '').trim();
  if (text.startsWith('{')) {
    try {
      const parsed = JSON.parse(text);
      if (parsed.blog_post) return parsed.blog_post;
    } catch (e) {}
  }
  return text;
}

function buildAllProjects(write, T) {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('No projects content dir found, skipping.');
    return [];
  }
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
  const built = [];
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'));
    buildProjectPage(data, write, T);
    built.push(data);
  }
  return built;
}

function buildProjectPage(data, write, T) {
  const slug = data.slug;
  const articleHtml = extractArticleHtml(data.article);
  const videoUrl = data.r2_video_url || null;
  const driveEmbedUrl = `https://drive.google.com/file/d/${data.drive_file_id}/preview`;

  // FAQ HTML
  const faqItems = (data.faqs || []).map(f => `
    <div class="faq-item" style="border-bottom:1px solid #e4dacc;padding:20px 0;">
      <button class="faq-toggle"
        style="width:100%;text-align:left;background:none;border:none;font-size:16px;font-weight:700;color:#201B10;cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding:0;"
        onclick="var a=this.parentElement.querySelector('.faq-answer');a.style.display=a.style.display==='none'?'block':'none';this.querySelector('i').classList.toggle('fa-plus');this.querySelector('i').classList.toggle('fa-minus');"
        aria-expanded="false">
        ${f.q}
        <i class="fa-solid fa-plus" style="color:#AD3824;flex-shrink:0;margin-left:16px;"></i>
      </button>
      <div class="faq-answer" style="display:none;margin-top:12px;color:#5a5650;line-height:1.8;font-size:15px;">
        <p>${f.a}</p>
      </div>
    </div>`).join('');

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (data.faqs || []).map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timnathpainting.com/' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://timnathpainting.com/projects/' },
      { '@type': 'ListItem', position: 3, name: data.title, item: `https://timnathpainting.com/projects/${slug}/` }
    ]
  });

  const schemaBlock = `<script type="application/ld+json">${faqSchema}</script>
<script type="application/ld+json">${breadcrumbSchema}</script>`;

  // Body content — NO <html>/<head>/<body> tags, NO <!-- HEADER --> or <!-- FOOTER -->
  // Just the inner content that goes inside T.wrapBody()
  const content = `
${schemaBlock}
<!-- HEADER -->
${T.pageHeader(data.title, `<li><a href="/projects/">Projects</a></li><li><span>${data.title}</span></li>`)}

<section style="padding:60px 0 80px;">
  <div class="container">
    <div class="row gutter-y-30">

      <!-- Main content -->
      <div class="col-lg-8">

        <!-- Video embed -->
        ${videoUrl ? `
        <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css">
        <style>
          .plyr { border-radius:10px; margin-bottom:36px; }
          .plyr video { max-height:420px; }
        </style>
        <div style="margin-bottom:36px;">
          <video id="project-video" playsinline controls preload="metadata"
            style="width:100%;border-radius:10px;"
            aria-label="${data.title} – Timnath Painting Project Walkthrough">
            <source src="${videoUrl}" type="video/mp4">
          </video>
        </div>
        <script src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            new Plyr('#project-video', {
              controls: ['play-large','play','progress','current-time','mute','volume','fullscreen'],
              resetOnEnd: true
            });
          });
        </script>` : `
        <div style="position:relative;width:100%;padding-bottom:56.25%;background:#000;border-radius:10px;overflow:hidden;margin-bottom:36px;">
          <iframe
            src="${driveEmbedUrl}"
            style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
            allow="autoplay"
            loading="lazy"
            title="${data.title} – Timnath Painting Project Walkthrough"
            allowfullscreen>
          </iframe>
        </div>`}

        <!-- Meta badges -->
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;">
          <span style="background:#f4ede4;color:#AD3824;font-size:13px;font-weight:700;padding:6px 14px;border-radius:100px;">
            <i class="fa-solid fa-paintbrush" style="margin-right:6px;"></i>${data.service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          <span style="background:#f4ede4;color:#5a5650;font-size:13px;font-weight:600;padding:6px 14px;border-radius:100px;">
            <i class="fa-solid fa-location-dot" style="color:#AD3824;margin-right:6px;"></i>${data.location}, CO
          </span>
          <span style="background:#f4ede4;color:#5a5650;font-size:13px;font-weight:600;padding:6px 14px;border-radius:100px;">
            <i class="fa-regular fa-calendar" style="color:#AD3824;margin-right:6px;"></i>${data.date}
          </span>
        </div>

        <!-- Article -->
        <div class="project-article" style="line-height:1.85;color:#3a3228;font-size:16px;">
          <style>
            .project-article h2{font-size:22px;font-weight:800;color:#201B10;margin:36px 0 14px;}
            .project-article p{margin:0 0 18px;}
          </style>
          ${articleHtml}
        </div>

        <!-- FAQ -->
        <div style="margin:60px 0 0;">
          <div class="sec-title text-start" style="margin-bottom:8px;">
            <div class="d-flex align-items-center justify-content-start">
              <p class="sec-title__tagline">Common Questions</p>
            </div>
            <h2 class="sec-title__title" style="font-size:26px;">Frequently Asked Questions</h2>
          </div>
          <div style="margin-top:24px;">
            ${faqItems}
          </div>
        </div>

      </div>

      <!-- Sidebar -->
      <div class="col-lg-4">
        <div style="position:sticky;top:110px;">

          <!-- CTA card -->
          <div style="background:#AD3824;color:#fff;padding:32px;border-radius:12px;margin-bottom:24px;">
            <h3 style="color:#fff;font-size:20px;margin:0 0 8px;">Get a Free Quote</h3>
            <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0 0 20px;line-height:1.6;">
              Like what you saw? We'd love to help with your project.
            </p>
            <a href="tel:9706703965" style="display:block;background:#fff;color:#AD3824;text-align:center;padding:14px;border-radius:8px;font-weight:800;font-size:16px;text-decoration:none;margin-bottom:12px;">
              <i class="fa-solid fa-phone" style="margin-right:8px;"></i>(970) 670-3965
            </a>
            <a href="/contact.html" style="display:block;border:2px solid #fff;color:#fff;text-align:center;padding:12px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;">
              Request a Quote Online
            </a>
          </div>

          <!-- Why us -->
          <div style="background:#201B10;padding:28px;border-radius:12px;margin-bottom:24px;">
            <h4 style="color:#AD3824;font-size:16px;margin:0 0 16px;">Why Timnath Painting</h4>
            <ul class="list-unstyled" style="margin:0;line-height:2.2;">
              <li style="color:#e8e0d8;font-size:14px;"><i class="fa-solid fa-check" style="color:#AD3824;margin-right:8px;"></i>Licensed &amp; Insured in Colorado</li>
              <li style="color:#e8e0d8;font-size:14px;"><i class="fa-solid fa-check" style="color:#AD3824;margin-right:8px;"></i>No-VOC Products</li>
              <li style="color:#e8e0d8;font-size:14px;"><i class="fa-solid fa-check" style="color:#AD3824;margin-right:8px;"></i>$1M General Liability</li>
              <li style="color:#e8e0d8;font-size:14px;"><i class="fa-solid fa-check" style="color:#AD3824;margin-right:8px;"></i>SW &amp; BM Approved</li>
              <li style="color:#e8e0d8;font-size:14px;"><i class="fa-solid fa-check" style="color:#AD3824;margin-right:8px;"></i>We Know Our Crews</li>
            </ul>
          </div>

          <!-- Related services -->
          <div style="background:#f4ede4;padding:28px;border-radius:12px;">
            <h4 style="color:#201B10;font-size:16px;margin:0 0 16px;">Our Services</h4>
            <ul class="list-unstyled" style="margin:0;">
              <li style="margin-bottom:8px;"><a href="/exterior-painting/" style="color:#AD3824;font-size:14px;font-weight:600;text-decoration:none;"><i class="fa-solid fa-arrow-right" style="margin-right:6px;font-size:11px;"></i>Exterior Painting</a></li>
              <li style="margin-bottom:8px;"><a href="/hoa-painting/" style="color:#AD3824;font-size:14px;font-weight:600;text-decoration:none;"><i class="fa-solid fa-arrow-right" style="margin-right:6px;font-size:11px;"></i>HOA Painting</a></li>
              <li style="margin-bottom:8px;"><a href="/commercial-painting/" style="color:#AD3824;font-size:14px;font-weight:600;text-decoration:none;"><i class="fa-solid fa-arrow-right" style="margin-right:6px;font-size:11px;"></i>Commercial Painting</a></li>
              <li style="margin-bottom:8px;"><a href="/fence-staining/" style="color:#AD3824;font-size:14px;font-weight:600;text-decoration:none;"><i class="fa-solid fa-arrow-right" style="margin-right:6px;font-size:11px;"></i>Fence Staining</a></li>
              <li><a href="/exterior-staining/" style="color:#AD3824;font-size:14px;font-weight:600;text-decoration:none;"><i class="fa-solid fa-arrow-right" style="margin-right:6px;font-size:11px;"></i>Exterior Staining</a></li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
<!-- FOOTER -->`;

  // Use same pattern as all other pages: T.htmlHead + T.wrapBody, then write()
  write(
    `projects/${slug}/index.html`,
    `${T.htmlHead(
      `${data.meta_title} | Timnath Painting`,
      data.meta_desc,
      `https://timnathpainting.com/projects/${slug}/`
    )}
${T.wrapBody(content)}`
  );
}

module.exports = { buildAllProjects, buildProjectPage, extractArticleHtml };
