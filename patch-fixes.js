'use strict';
// Two fixes:
// 1. All pages have all 5 services in relatedServices
// 2. Timeline sections use "regular/weekly updates" language instead of Day X / Week X

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '_build-data.js');
let content = fs.readFileSync(filePath, 'utf8');

// ─── ALL SERVICES lookup ────────────────────────────────────────────────────
const ALL_SERVICES = {
  'exterior-painting':  { label: 'Exterior Painting',   desc: '7\u201310 year paint systems built for Colorado\'s freeze-thaw cycles.' },
  'hoa-painting':       { label: 'HOA Painting',         desc: 'Color approval documentation and multi-unit scheduling for HOA communities.' },
  'commercial-painting':{ label: 'Commercial Painting',  desc: 'After-hours scheduling, $2M liability, owned crew \u2014 not subcontractors.' },
  'fence-staining':     { label: 'Fence Staining',       desc: 'Penetrating stains for cedar, pine, and pressure-treated fences.' },
  'exterior-staining':  { label: 'Exterior Staining',    desc: 'Deck, log home, and wood siding stain systems for natural wood surfaces.' },
};

function buildRelated(excludeSlug) {
  return Object.entries(ALL_SERVICES)
    .filter(([slug]) => slug !== excludeSlug)
    .map(([slug, { label, desc }]) => `      { label: '${label}', slug: '${slug}', desc: '${desc}' }`);
}

// Build the relatedServices block for each service
for (const [slug] of Object.entries(ALL_SERVICES)) {
  const related = buildRelated(slug);
  const block = `    relatedServices: [\n${related.join(',\n')},\n    ],`;

  // Find and replace the existing relatedServices block for this service
  // We locate it by finding the service key first, then scanning forward for relatedServices
  const serviceKey = `  '${slug}': {`;
  const serviceStart = content.indexOf(serviceKey);
  if (serviceStart < 0) { console.log(`WARN: service ${slug} not found`); continue; }

  // Find relatedServices within this service block
  const rsStart = content.indexOf('    relatedServices: [', serviceStart);
  if (rsStart < 0) { console.log(`WARN: relatedServices not found for ${slug}`); continue; }

  // Find the closing ],
  const rsEnd = content.indexOf('\n    ],', rsStart) + '\n    ],'.length;

  content = content.substring(0, rsStart) + block + content.substring(rsEnd);
  console.log(`Fixed relatedServices for ${slug}`);
}

// ─── TIMELINE: replace Day/Week numbered headers with phase names ─────────────
// Also add regular-updates note at the end of each timeline block
// Replacements for Day-based timelines (fence staining, exterior staining, exterior painting)
const dayReplacements = [
  // exterior-painting timeline phases
  [/<strong>Day 1 &mdash; Prep:<\/strong>/g, '<strong>Prep Phase:</strong>'],
  [/<strong>Day 2[–—-]3? &mdash; Priming[^<]*<\/strong>/g, '<strong>Priming &amp; First Coat:</strong>'],
  [/<strong>Day [23][–—-]?[45]? &mdash; Coating[^<]*<\/strong>/g, '<strong>Coating Phase:</strong>'],
  [/<strong>Final &mdash; ([^<]+)<\/strong>/g, '<strong>Final &mdash; $1</strong>'],

  // fence staining
  [/<strong>Day 1 &mdash; Prep:<\/strong>/g, '<strong>Prep Phase:</strong>'],
  [/<strong>Day 2 &mdash; Stain Application:<\/strong>/g, '<strong>Stain Application:</strong>'],
  [/<strong>Dry and Cure:<\/strong>/g, '<strong>Cure &amp; Ready to Use:</strong>'],

  // exterior staining
  [/<strong>Day 1 &mdash; Assessment and Prep:<\/strong>/g, '<strong>Assessment &amp; Prep Phase:</strong>'],
  [/<strong>Day 2 &mdash; Dry and Inspect:<\/strong>/g, '<strong>Dry &amp; Inspect:</strong>'],
  [/<strong>Day 2[–—-]3? &mdash; Stain Application:<\/strong>/g, '<strong>Stain Application:</strong>'],
  [/<strong>Final Coat and Cure:<\/strong>/g, '<strong>Final Coat &amp; Cure:</strong>'],

  // HOA / commercial week-based
  [/<strong>Week 1 &mdash; Color Approval:<\/strong>/g, '<strong>Color Approval Phase:</strong>'],
  [/<strong>Week [12][–—-]?[23]? &mdash; Prep:<\/strong>/g, '<strong>Prep Phase:</strong>'],
  [/<strong>Weeks [23][–—-]?[45]? &mdash; Coating:<\/strong>/g, '<strong>Coating Phase:</strong>'],
  [/<strong>Week 1 &mdash; Assessment and Scheduling:<\/strong>/g, '<strong>Assessment &amp; Scheduling:</strong>'],
  [/<strong>Weeks 1[–—-]?2? &mdash; Prep:<\/strong>/g, '<strong>Prep Phase:</strong>'],
  [/<strong>Weeks [23][–—-]?[34]? &mdash; Coating:<\/strong>/g, '<strong>Coating Phase:</strong>'],
];

for (const [pattern, replacement] of dayReplacements) {
  content = content.replace(pattern, replacement);
}

// Add regular-updates note to all timeline blocks that don't already have it
// Find each timeline field and append the note before closing backtick
const timelinePattern = /(    timeline: `[^`]+)(`\s*,)/g;
const updatesNote = '\n\nWe provide regular updates throughout your project and are available by phone or text at any stage. You will never wonder where things stand.';
content = content.replace(timelinePattern, (match, body, end) => {
  if (body.includes('regular updates')) return match; // already has it
  return body + updatesNote + end;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('\nAll fixes applied.');
