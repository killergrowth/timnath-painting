'use strict';

const CLIENT = {
  name: 'Timnath Painting',
  phone: '(970) 236-8271',
  phoneTel: '9702368271',
  email: 'josh@timnathpainting.com',
  city: 'Timnath',
  state: 'CO',
  zip: '80547',
  facebook: 'https://facebook.com/timnathpainting',
  instagram: 'https://instagram.com/timnathpainting',
  tagline: 'Northern Colorado\'s Premium Painting Contractor',
  description: 'Premium painting contractor serving Timnath, Windsor, Severance & Northern Colorado. Licensed, insured, Eco-Painter Certified. Call (970) 236-8271.',
};

const SERVICES = [
  { label: 'Exterior Painting',   slug: 'exterior-painting',   icon: 'fa-solid fa-house',             img: 'img-4932-exterior.jpg', tagline: 'Coatings built to handle Colorado freeze-thaw cycles — rated for 7-10 years.' },
  { label: 'Interior Painting',   slug: 'interior-painting',   icon: 'fa-solid fa-couch',             img: 'img-5611-interior.jpg', tagline: 'Clean lines, zero fumes. Low-VOC options available for families and pets.' },
  { label: 'HOA Painting',        slug: 'hoa-painting',        icon: null,          img: 'service-4-3.jpg', tagline: 'Board-approved color matching and documentation for HOA compliance.' },
  { label: 'Commercial Painting', slug: 'commercial-painting', icon: 'fa-solid fa-building',  img: 'photo-commercial-painting.jpg', tagline: 'Minimal disruption scheduling. Crew-owned, not subcontracted.' },
  { label: 'Fence Staining',      slug: 'fence-staining',      icon: null,        img: 'photo-fence-staining.jpg', tagline: 'Oil-based penetrating stains that protect wood grain through Colorado summers.' },
  { label: 'Exterior Staining',   slug: 'exterior-staining',   icon: null,              img: 'photo-exterior-staining.jpg', tagline: 'Deck and siding stain systems applied by Eco-Painter certified applicators.' },
];

const CITIES = [
  { label: 'Timnath',     slug: 'timnath-co' },
  { label: 'Windsor',     slug: 'windsor-co' },
  { label: 'Severance',   slug: 'severance-co' },
  { label: 'Fort Collins', slug: 'fort-collins-co' },
  { label: 'Loveland',    slug: 'loveland-co' },
  { label: 'Greeley',     slug: 'greeley-co' },
  { label: 'Wellington',  slug: 'wellington-co' },
  { label: 'Johnstown',   slug: 'johnstown-co' },
];

const SERVICE_DATA = {
  'interior-painting': {
    title: 'Interior Painting in Northern Colorado',
    metaTitle: 'Interior Painting Northern Colorado | Timnath Painting',
    metaDesc: 'Interior painting by certified professionals. Low-VOC options, meticulous prep, clean results. Serving Northern Colorado. (970) 236-8271',
    tagline: 'Meticulous Prep. Clean Results.',
    heroTitle: 'Interior Painting That Protects and Transforms Your Home',
    intro: `Interior painting is where the details live. Proper surface preparation — patching nail holes, skim-coating damaged drywall, sanding all surfaces — is what separates a professional result from a paint-over job that shows every flaw.

Timnath Painting brings the same no-shortcuts approach to interior work that we apply to every exterior project. We use low-VOC and zero-VOC options from Sherwin-Williams and Benjamin Moore. We protect your floors, furniture, and trim meticulously. We leave your home cleaner than we found it.`,
    process: `Every interior project begins with a full walkthrough to assess surfaces, note existing damage, and confirm color selections.

<strong>Surface Preparation:</strong> We patch all holes and cracks, skim-coat damaged drywall sections, sand all surfaces smooth, caulk gaps between trim and walls, and apply the correct primer for each surface type.

<strong>Coating Application:</strong> We use Sherwin-Williams Emerald and Benjamin Moore Aura for interiors — both available in low-VOC and zero-VOC formulations. Ceiling paint, trim paint, and wall paint are each specified separately for correct sheen and performance.

<strong>Protection & Cleanup:</strong> All floors, furniture, and surfaces are masked or covered. We remove all tape and masking before final walkthrough. Full site cleanup is included.`,
    faqs: [
      { q: 'Do you use low-VOC paint for interior projects?', a: 'Yes. We offer low-VOC and zero-VOC interior paint options from Sherwin-Williams (Emerald) and Benjamin Moore (Aura). These products perform as well or better than standard formulations and are appropriate for homes with children, pets, or occupants with chemical sensitivities.' },
      { q: 'How long does interior painting take?', a: 'A typical 2,000 sq ft home interior takes 3-5 days depending on number of rooms, ceiling height, trim complexity, and surface condition. Homes with extensive drywall repair or multiple color changes take longer. We provide a specific timeline during the on-site assessment.' },
      { q: 'Do I need to move furniture before you arrive?', a: 'We ask that you clear small items from surfaces and remove breakables. For larger furniture, we work around it and cover what cannot be moved. We handle all floor and surface protection with drop cloths and masking.' },
      { q: 'What does interior painting cost in Northern Colorado?', a: 'Interior painting for a standard room typically ranges from $400-$900 depending on size, ceiling height, and surface condition. Full home interiors run $3,500-$12,000+. Call (970) 236-8271 for an accurate quote.' },
    ],
  },
  'exterior-painting': {
    title: 'Exterior Painting in Northern Colorado',
    metaTitle: 'Exterior Painting Northern Colorado | Timnath Painting',
    metaDesc: 'Exterior painting built for Colorado\'s climate. Licensed, eco-certified, 7-10 year coatings. Northern Colorado homes. (970) 236-8271',
    tagline: 'Built for Colorado\'s Climate',
    heroTitle: 'Exterior Painting in Northern Colorado That Lasts 10+ Years',
    intro: `Northern Colorado sees 28+ freeze-thaw cycles every year. UV radiation hits 10-15% harder at altitude. Wood siding expands and contracts with temperature swings that can exceed 60 degrees in a single day. Cheap paint jobs fail in 3-4 years here.

Timnath Painting builds exterior painting systems that last 7-10 years using premium prep, Sherwin-Williams and Benjamin Moore coatings, and methods designed specifically for Zone 5b conditions. We are Licensed, Insured, and Eco-Painter Certified with $2M general liability coverage.`,
    process: `Every project starts with a full surface assessment. We identify substrate issues, previous coating failures, and moisture problems before prep begins.

<strong>Surface Preparation:</strong> We scrape all loose and peeling paint, sand smooth transitions, repair wood rot and damaged trim, caulk all gaps and joints with premium elastomeric sealants, and pressure wash to remove dirt, mildew, and chalking.

<strong>Coating Application:</strong> We use Sherwin-Williams Duration, Emerald, or SuperPaint, and Benjamin Moore Aura or Regal Select. Two-coat minimum on all surfaces. Three coats on south and west exposures where UV is most intense.

<strong>Project Management:</strong> You get a dedicated project lead, daily progress updates, and full site cleanup. No subcontractors. No volume rushing.`,
    faqs: [
      { q: 'How long does exterior paint last in Colorado?', a: 'Budget paint jobs typically last 3-4 years in Northern Colorado due to freeze-thaw cycles and high UV exposure. Premium systems with proper surface prep and high-grade acrylic or elastomeric coatings last 7-10 years. We use Sherwin-Williams Duration and Benjamin Moore Aura - both formulated for extreme temperature cycling and UV resistance.' },
      { q: 'What prep work is required for exterior painting in Northern Colorado?', a: 'All loose and failing paint must be scraped to stable substrate. Wood siding requires sanding, rot repair, and bare wood priming with oil or shellac-based primers. All gaps, joints, and seams need premium elastomeric caulking. Surfaces are pressure washed to remove dirt, mildew, and chalk. Skipping any of these steps leads to premature failure.' },
      { q: 'Do you handle HOA color approval for exterior painting?', a: 'Yes. Many Northern Colorado communities require HOA approval before exterior color changes. We help navigate the approval process, provide color samples that meet HOA guidelines, and submit all required documentation on your behalf. Most approvals take 2-4 weeks, which we build into project timelines.' },
      { q: 'What does exterior painting cost in Northern Colorado?', a: 'Most premium exterior painting projects for $650K+ homes range from $8,000-$18,000+ depending on home size, siding type, and surface condition. Call (970) 236-8271 for an accurate quote based on your specific home.' },
    ],
  },
  'hoa-painting': {
    title: 'HOA Painting in Northern Colorado',
    metaTitle: 'HOA Painting Northern Colorado | Timnath Painting',
    metaDesc: 'HOA painting specialists in Northern Colorado. Color coordination, documentation, multi-unit scheduling. Call Timnath Painting: (970) 236-8271',
    tagline: 'HOA Color Compliance Made Simple',
    heroTitle: 'HOA Painting in Northern Colorado  -  Color Approval to Final Coat',
    intro: `HOA painting projects require a level of coordination most painting contractors aren't set up for. Color approval documentation, multi-unit scheduling that minimizes resident disruption, and precise color matching across dozens of homes  -  these aren't extras. They're requirements.

Timnath Painting has worked with HOAs across Timnath, Windsor, and Severance. We understand the approval process, carry $2M general liability insurance with COI on request, and deliver consistent color results across every building we touch.`,
    process: `HOA projects begin with a meeting with the property manager or board to confirm scope, color palette, scheduling requirements, and documentation needs.

<strong>Color Coordination:</strong> We work directly with HOA architectural review committees to confirm approved colors, obtain approval letters, and document color specifications for every structure.

<strong>Scheduling:</strong> Multi-unit projects are sequenced to minimize resident disruption. We communicate project timelines directly with affected residents when requested.

<strong>Execution:</strong> Same prep and coating standards as every Timnath Painting project  -  no shortcuts because the client is an HOA instead of an individual homeowner.`,
    faqs: [
      { q: 'Do you handle HOA color approval documentation?', a: 'Yes. We work with HOA architectural review committees to confirm approved colors, provide color samples, and submit all required documentation. We\'ve worked with dozens of local HOAs in Timnath, Windsor, and Severance and know their standards and timelines.' },
      { q: 'Can you coordinate multi-unit HOA projects?', a: 'Yes. We sequence multi-unit projects to minimize resident disruption and maintain consistent scheduling. Property managers receive regular progress updates. We coordinate resident communications when required.' },
      { q: 'Do you provide certificates of insurance for HOA projects?', a: 'Yes. Timnath Painting carries $2M general liability insurance. Certificates of insurance are provided on request, typically within 24 hours.' },
      { q: 'What does HOA exterior painting cost?', a: 'HOA painting costs depend on number of units, building size, surface condition, and color change requirements. We provide per-unit pricing and bulk project estimates. Call (970) 236-8271 for a site assessment and quote.' },
    ],
  },
  'commercial-painting': {
    title: 'Commercial Painting in Northern Colorado',
    metaTitle: 'Commercial Painting Northern Colorado | Timnath Painting',
    metaDesc: 'Commercial painting in Northern Colorado. After-hours scheduling, minimal disruption, $2M liability. Call Timnath Painting: (970) 236-8271',
    tagline: 'After-Hours Scheduling. Zero Disruption.',
    heroTitle: 'Commercial Painting in Northern Colorado  -  Built Around Your Schedule',
    intro: `Timnath Painting provides commercial painting in Northern Colorado for strip malls, office buildings, and multi-family properties along the I-25 corridor. We specialize in after-hours scheduling, use commercial-grade coatings built for Colorado's 28+ annual freeze-thaw cycles, and carry $2M general liability insurance with certificates available on request.

Your commercial property takes the same beating from Colorado's climate as any home. But unlike residential work, your repaint can't shut down your business for two weeks.`,
    process: `We start with a site assessment and schedule consultation. Most commercial clients need after-hours or weekend work to avoid disrupting operations. We accommodate that.

<strong>Surface Prep:</strong> Pressure wash, scrape failing coatings, repair substrate damage, prime bare wood or metal, caulk every penetration. Colorado's climate demands this foundation  -  shortcuts fail within two years.

<strong>Coating Selection:</strong> We use elastomeric and commercial-grade coatings from Sherwin-Williams and Benjamin Moore. Elastomeric coatings bridge hairline cracks and flex with temperature swings. Industrial acrylics resist UV degradation through Colorado's 300+ sunny days per year.

<strong>Documentation:</strong> Certificates of insurance available within 24 hours. We coordinate with property managers on access, security, and scheduling requirements.`,
    faqs: [
      { q: 'Can you paint after hours or on weekends?', a: 'Yes. Timnath Painting schedules commercial crews for evenings, overnight shifts, and weekends in Northern Colorado. Retail storefronts, medical offices, and multi-family buildings often require after-hours work. We coordinate site access, lighting requirements, and security protocols before beginning.' },
      { q: 'Do you provide certificates of insurance for commercial projects?', a: 'Yes. We carry $2M general liability insurance and provide COI on request, typically within 24 hours. We also carry workers\' compensation for all crew members.' },
      { q: 'What coatings do you use for commercial properties?', a: 'We specify elastomeric and industrial-grade acrylics from Sherwin-Williams and Benjamin Moore for commercial properties. Elastomeric coatings bridge hairline cracks and flex with temperature swings. We don\'t use residential-grade paints on commercial projects.' },
      { q: 'What does commercial painting cost per square foot?', a: 'Commercial painting in Northern Colorado typically costs $2.50-$5.50 per square foot for standard exteriors with good existing paint. Complex projects with substrate repairs, elastomeric coatings, or difficult access run higher. We provide detailed written quotes after site assessment.' },
    ],
  },
  'fence-staining': {
    title: 'Fence Staining in Northern Colorado',
    metaTitle: 'Fence Staining Northern Colorado | Timnath Painting',
    metaDesc: 'Professional fence staining in Northern Colorado. Penetrating stains, proper prep, 3-5 year protection. Call Timnath Painting: (970) 236-8271',
    tagline: 'Penetrating Protection. Not Just Color.',
    heroTitle: 'Fence Staining in Northern Colorado  -  Built to Survive Colorado\'s Weather',
    intro: `Colorado's UV index, freeze-thaw cycles, and wind-driven moisture destroy untreated or poorly stained fences faster than almost anywhere in the country. Solid stains peel. Clear sealers wear off in one season. Penetrating semi-transparent stains  -  applied to properly prepared wood  -  last 3-5 years and protect the wood from the inside out.

Timnath Painting uses penetrating oil-based and water-based stains from premium manufacturers, applied after proper cleaning, sanding, and wood brightening. We don't brush stain over dirty, weathered wood and call it done.`,
    process: `Every fence project begins with a condition assessment  -  existing coating type, wood species, weathering, and moisture content all affect product selection and prep requirements.

<strong>Preparation:</strong> Power washing removes dirt, mildew, and failing stain. Wood brightener restores the wood's natural pH and opens the grain to accept stain. Sanding addresses rough surfaces and gray weathered wood.

<strong>Stain Application:</strong> We use penetrating semi-transparent or semi-solid stains that absorb into the wood rather than forming a film on top. Film-forming stains peel. Penetrating stains don't.

<strong>Product Selection:</strong> Stain type (oil vs. water-based), sheen level, and UV protection are selected based on wood species, sun exposure, and existing finish.`,
    faqs: [
      { q: 'How long does fence stain last in Colorado?', a: 'Penetrating semi-transparent stains last 3-5 years on properly prepared wood in Northern Colorado. Solid stains and paints often fail sooner because they form a film that peels under freeze-thaw stress. UV exposure at altitude accelerates degradation of all coatings, so south and west-facing fence sections may need restaining sooner.' },
      { q: 'Should I use oil-based or water-based stain on my fence?', a: 'Both work well when properly selected for the wood species and condition. Oil-based stains penetrate deeper on dense woods and aged surfaces. Water-based stains dry faster, have lower VOC content, and are easier to clean up. We recommend specific products after assessing your fence\'s wood type, current condition, and sun exposure.' },
      { q: 'Does the fence need to be cleaned before staining?', a: 'Yes. Power washing removes dirt, mildew, and old failing stain. For weathered gray wood, we apply a wood brightener to restore the wood\'s natural color and pH before staining. Skipping cleaning means the stain bonds to surface contamination instead of wood fibers  -  it fails early.' },
      { q: 'What does fence staining cost in Northern Colorado?', a: 'Fence staining typically costs $2-$5 per linear foot depending on fence height, condition, number of sides, and stain type. A 150-foot privacy fence in average condition runs $600-$1,200. Call (970) 236-8271 for an accurate estimate.' },
    ],
  },
  'exterior-staining': {
    title: 'Exterior Staining in Northern Colorado',
    metaTitle: 'Exterior Staining Northern Colorado | Timnath Painting',
    metaDesc: 'Exterior staining for wood siding, decks & trim in Northern Colorado. Premium penetrating stains, proper prep. Call (970) 236-8271',
    tagline: 'Penetrating Stains for Lasting Protection',
    heroTitle: 'Exterior Staining in Northern Colorado  -  Wood That Lasts',
    intro: `Log homes, cedar siding, wood decks, and natural wood trim all require staining  -  not painting  -  to maintain their appearance and structural integrity in Colorado's climate. Paint traps moisture in wood and eventually peels. Penetrating stains work with the wood, allowing it to breathe while protecting against UV degradation, moisture intrusion, and freeze-thaw damage.

Timnath Painting specializes in exterior staining for natural wood surfaces across Northern Colorado. We use premium penetrating oil and water-based stains and prepare surfaces properly before any product touches the wood.`,
    process: `Exterior staining projects begin with a full surface assessment  -  existing finish type, wood species and condition, moisture content, and exposure level all drive product selection.

<strong>Preparation:</strong> All surfaces are cleaned thoroughly  -  power washing, mildew treatment, and wood brightening where needed. Failed existing stain is stripped or sanded. Bare wood is allowed to dry completely before application.

<strong>Stain Application:</strong> We use penetrating stains from Defy, Armstrong Clark, TWP, and Ready Seal  -  products specifically formulated for Colorado's UV intensity and freeze-thaw cycles. Application method (brush, roller, or sprayer) is selected based on surface profile.

<strong>Two-coat Application:</strong> Most exterior staining projects require two coats  -  a wet-on-wet application on new wood or a second coat after proper dry time on previously stained surfaces.`,
    faqs: [
      { q: 'What types of exterior surfaces can be stained?', a: 'We stain wood siding (cedar, pine, redwood, T1-11), log homes, wood decks, pergolas, fences, wood trim, and shake roofing. Each surface type requires specific stain formulation and prep approach. Composite or PVC surfaces are not candidates for staining.' },
      { q: 'How do I know if my wood needs staining or painting?', a: 'Natural wood with visible grain that has previously been stained should be restained. Wood that has been painted should be repainted. Converting from paint to stain requires full paint removal  -  a major project. If you\'re unsure, we assess the existing finish during our on-site evaluation.' },
      { q: 'How often does exterior wood need to be restained in Colorado?', a: 'Northern Colorado\'s UV intensity and freeze-thaw cycles accelerate coating breakdown. Most exterior staining lasts 3-5 years with premium products and proper prep. South and west-facing surfaces may need attention sooner. Annual inspection catches early signs of failure before water intrusion causes wood damage.' },
      { q: 'What does exterior staining cost in Northern Colorado?', a: 'Exterior staining costs vary significantly based on surface area, wood species, condition, and accessibility. Deck staining typically runs $1.50-$3.50 per square foot. Log home exteriors vary by complexity. Call (970) 236-8271 for an on-site assessment and accurate quote.' },
    ],
  },
};

const CITY_DATA = {
  'timnath-co': {
    label: 'Timnath',
    state: 'CO',
    context: 'Fast-growing community along the I-25 corridor with high-end new construction and HOA neighborhoods',
    intro: `Timnath is one of the fastest-growing communities in Northern Colorado, with new construction neighborhoods and established HOA communities spreading east of I-25. The homes here are newer and premium — and the expectation for exterior appearance matches. Colorado's 28+ freeze-thaw cycles and intense UV exposure hit every home in Timnath the same way, regardless of age. Paint systems that aren't designed for Zone 5b conditions fail early.\n\nTimnath Painting is based here. We know the neighborhoods, the HOA requirements, and the local conditions better than anyone. Licensed, Insured, and Eco-Painter Certified with $2M general liability coverage.`,
    faqs: [
      { q: 'Do you serve the Timnath area?', a: 'Yes — Timnath is our home base. We serve all neighborhoods in Timnath including newer HOA communities east of I-25. We\x27re on-site in Timnath regularly and can typically schedule faster here than in other cities.' },
      { q: 'Do you work with HOAs in Timnath?', a: 'Yes. Many Timnath neighborhoods have HOA color approval requirements. We handle the approval documentation, provide color samples, and submit to the architectural review committee on your behalf. Most HOA approvals in this area take 2–4 weeks, which we build into every project timeline.' },
      { q: 'How long does exterior paint last on new construction in Timnath?', a: 'Builder-grade paint applied on new construction homes typically lasts 4–6 years before visible chalking, fading, and edge failures appear. We install premium Sherwin-Williams and Benjamin Moore systems rated for 7–10 years using proper prep and two-coat minimum application.' },
      { q: 'Can you match existing HOA-approved colors?', a: 'Yes. We use spectrophotometer color matching and work directly with Sherwin-Williams and Benjamin Moore reps to replicate existing approved colors precisely. Accurate color matching is essential for HOA compliance and multi-unit consistency.' },
      { q: 'How far in advance should I book exterior painting in Timnath?', a: 'Spring and early summer slots fill 4–8 weeks out in Timnath. We recommend contacting us in March or April for May–June scheduling. We do accept late-season projects through October when weather permits.' },
    ],
  },
  'windsor-co': {
    label: 'Windsor',
    state: 'CO',
    context: 'Established and growing community with lakefront properties, HOA neighborhoods, and premium residential builds',
    intro: `Windsor combines established neighborhoods near Lake Windsor with newer HOA communities growing along the US-34 and I-25 corridors. The range of home styles — from lakefront properties to newer planned communities — means painting needs vary widely. What doesn\'t vary is Colorado\'s climate: 28+ freeze-thaw cycles per year, intense UV at altitude, and temperature swings that push coating systems to their limits.\n\nTimnath Painting serves all of Windsor with the same licensed, insured, Eco-Painter Certified crew we bring to every project. No subcontractors. No volume rushing. Premium Sherwin-Williams and Benjamin Moore coatings with $2M general liability coverage.`,
    faqs: [
      { q: 'Do you serve Windsor, CO?', a: 'Yes. Timnath Painting serves all of Windsor including neighborhoods near Lake Windsor, Eastman Park, and newer communities along Harmony Road and the I-25 corridor. We\'re in Windsor regularly and can provide on-site quotes quickly.' },
      { q: 'Do you handle HOA color approvals in Windsor?', a: 'Yes. Windsor has a number of HOA communities with strict color approval requirements. We handle the full documentation process — color samples, approval submissions, and compliance letters — on your behalf.' },
      { q: 'What exterior paint should I use on my Windsor home?', a: 'We specify Sherwin-Williams Duration, Emerald, or Benjamin Moore Aura for Windsor exteriors. These are 100% acrylic latex coatings formulated for Colorado\'s UV intensity and freeze-thaw cycling. Builder-grade or budget paints fail 2–3 years faster in this climate.' },
      { q: 'How long does exterior painting take in Windsor?', a: 'Most residential exterior painting projects in Windsor take 3–5 days from first day of prep to final coat. Larger homes, significant repair work, or HOA multi-unit projects run longer. We provide specific timelines during the quoting process.' },
      { q: 'Do you offer fence staining in Windsor?', a: 'Yes. Fence staining is one of our most common services in Windsor. We use penetrating oil and water-based stains that protect wood from Windsor\'s UV exposure and moisture cycles. Most fences need restaining every 3–5 years.' },
    ],
  },
  'severance-co': {
    label: 'Severance',
    state: 'CO',
    context: 'Small but rapidly growing town north of Windsor with new residential development and rural properties',
    intro: `Severance has grown rapidly over the past decade, with new residential subdivisions filling in around its rural roots north of Windsor. Whether you have a newer build in a planned community or an older home on a larger lot, Northern Colorado\'s climate treats every home the same — freeze-thaw cycles, high-altitude UV, and wind-driven moisture test exterior paint systems every single year.\n\nTimnath Painting serves Severance with full exterior and interior painting, fence staining, and commercial work. Licensed, Insured, Eco-Painter Certified. $2M general liability. We bring the same standards to every project regardless of size.`,
    faqs: [
      { q: 'Does Timnath Painting serve Severance, CO?', a: 'Yes. We serve Severance and the surrounding Weld County communities. Severance is within our standard service area and we\'re able to schedule projects there without travel surcharges.' },
      { q: 'How does Colorado\'s climate affect exterior paint in Severance?', a: 'Northern Colorado sees 28+ freeze-thaw cycles annually. UV radiation at altitude is 10–15% more intense than at sea level. These factors degrade budget exterior coatings in 3–4 years. We use premium paint systems rated for 7–10 years and apply proper prep including pressure washing, scraping, caulking, and spot priming before any topcoat.' },
      { q: 'Do you do fence staining in Severance?', a: 'Yes. Fence staining is common in Severance where newer homes have cedar and pine fencing. We use penetrating semi-transparent stains that protect the wood grain through Northern Colorado winters and summers, lasting 3–5 years with proper prep.' },
      { q: 'Can you paint the exterior of an older farmhouse or rural property in Severance?', a: 'Yes. Older homes and rural properties often have more prep work involved — failed paint, wood rot, compromised caulk, and weathered surfaces. We assess all of this upfront and factor it into the quote. We don\'t charge extra for thorough prep; we treat it as part of every project.' },
      { q: 'How do I get a quote for exterior painting in Severance?', a: 'Call (970) 236-8271 or use the contact form on this page. We schedule on-site assessments in Severance and provide written quotes within 24 hours of the visit. We respond to all inquiries within a few minutes during business hours.' },
    ],
  },
  'fort-collins-co': {
    label: 'Fort Collins',
    state: 'CO',
    context: 'Larimer County seat with a diverse housing stock ranging from historic Craftsman homes to newer neighborhoods',
    intro: `Fort Collins is the largest city in Northern Colorado and has one of the most diverse housing stocks in the region — historic Craftsman and Victorian homes in Old Town, mid-century builds in established neighborhoods, and newer subdivisions spreading south and east. Each era of construction comes with its own set of coating challenges. Historic homes require careful prep, lead paint awareness, and specialty primers. Newer builds need proper topcoat systems, not just builder repaints.\n\nTimnath Painting serves Fort Collins with the same standards we apply everywhere — Licensed, Insured, Eco-Painter Certified, $2M general liability. Sherwin-Williams and Benjamin Moore coatings. No subcontractors.`,
    faqs: [
      { q: 'Does Timnath Painting serve Fort Collins?', a: 'Yes. We serve all areas of Fort Collins including Old Town, Midtown, and newer developments in southeast Fort Collins. Fort Collins is within our standard service area with no travel surcharges.' },
      { q: 'Can you paint historic homes in Old Town Fort Collins?', a: 'Yes. Older homes in Old Town require special attention — lead paint testing and containment on pre-1978 homes, oil-based primers for chalky or bare wood surfaces, and careful prep to avoid damaging historic trim detail. We\'re experienced with the specific challenges of older Fort Collins housing stock.' },
      { q: 'How long does exterior paint last on Fort Collins homes?', a: 'Most Fort Collins homes see the same Northern Colorado climate as the rest of the region — 28+ freeze-thaw cycles, intense UV, and temperature swings. Budget paint fails in 3–4 years. Premium systems using Sherwin-Williams Duration or Benjamin Moore Aura last 7–10 years with proper prep.' },
      { q: 'Do you offer commercial painting in Fort Collins?', a: 'Yes. We provide commercial exterior and interior painting for Fort Collins businesses, including strip malls, office buildings, and multi-family properties. We schedule around business hours and provide COI within 24 hours.' },
      { q: 'What Fort Collins neighborhoods do you serve?', a: 'We serve all of Fort Collins — Old Town, Midtown, Fossil Creek, Harmony, Rigden Farm, Sidehill, and new developments in southeast and southwest Fort Collins. Call (970) 236-8271 for availability in your specific neighborhood.' },
    ],
  },
  'loveland-co': {
    label: 'Loveland',
    state: 'CO',
    context: 'Mid-sized Larimer County city with established neighborhoods, growing south end, and scenic Front Range setting',
    intro: `Loveland sits along the Front Range at the foot of the Big Thompson Canyon — scenic, but that also means direct UV exposure, wind, and temperature swings that challenge exterior paint systems year-round. The city has a mix of established mid-century neighborhoods near downtown and newer developments spreading south and east toward Johnstown. Both require proper exterior coating systems to survive Northern Colorado's climate.\n\nTimnath Painting serves Loveland with the same Eco-Painter Certified crew, premium Sherwin-Williams and Benjamin Moore coatings, and thorough prep that protects every project for 7–10 years. Licensed, Insured, $2M general liability.`,
    faqs: [
      { q: 'Does Timnath Painting serve Loveland, CO?', a: 'Yes. Loveland is within our standard service area. We serve all areas of Loveland including established neighborhoods near downtown, the south end near the Centerra area, and outlying properties.' },
      { q: 'How does the Front Range climate affect exterior paint in Loveland?', a: 'Loveland\'s location at the base of the Big Thompson Canyon means increased wind exposure on top of Northern Colorado\'s standard UV and freeze-thaw cycles. Paint systems need to be flexible enough to handle thermal cycling and tough enough to resist UV degradation. We specify coatings rated for exactly these conditions.' },
      { q: 'Do you stain fences and decks in Loveland?', a: 'Yes. Fence and deck staining is common in Loveland. We use penetrating semi-transparent stains that protect wood from UV damage and moisture, typically lasting 3–5 years. Decks on the south or west side of homes in Loveland may need attention sooner due to sun exposure.' },
      { q: 'Can you paint older Loveland homes?', a: 'Yes. We handle older homes with the appropriate prep — scraping to stable substrate, oil-based or shellac primers on bare wood, elastomeric caulking on all gaps, and pressure washing before any coating goes on. Thorough prep is the difference between a 4-year job and a 10-year system.' },
      { q: 'How do I get a painting quote in Loveland?', a: 'Call (970) 236-8271 or fill out the quote form on this page. We schedule on-site assessments in Loveland and provide written quotes within 24 hours. We respond to all quote requests within minutes during business hours.' },
    ],
  },
  'greeley-co': {
    label: 'Greeley',
    state: 'CO',
    context: 'Weld County seat and agricultural hub with a large and diverse housing stock',
    intro: `Greeley is the Weld County seat and one of the larger cities in Northern Colorado, with a housing stock that ranges from older neighborhoods near downtown to newer developments spreading west and south. The agricultural and industrial roots of the city mean many properties have seen harder use than typical residential homes — and Colorado\'s climate doesn\'t take it easy on any of them. UV radiation, freeze-thaw cycles, and wind-driven dust and moisture accelerate coating breakdown across the region.\n\nTimnath Painting serves Greeley with the same standards: Licensed, Insured, Eco-Painter Certified, $2M general liability, premium Sherwin-Williams and Benjamin Moore coatings.`,
    faqs: [
      { q: 'Does Timnath Painting serve Greeley, CO?', a: 'Yes. We serve Greeley and the surrounding Weld County area. Greeley is within our standard service area.' },
      { q: 'Do you paint commercial properties in Greeley?', a: 'Yes. We provide commercial exterior and interior painting in Greeley for office buildings, retail properties, and multi-family housing. We schedule around business operations and carry $2M general liability with COI available on request.' },
      { q: 'How do you prep older Greeley homes for exterior painting?', a: 'Older homes in Greeley often have multiple layers of failed paint, weathered wood, and outdated caulking. We scrape all loose and peeling material to stable substrate, repair damaged wood, apply appropriate primers, and re-caulk all joints before any topcoat goes on. There are no shortcuts in prep.' },
      { q: 'What exterior paint works best in Greeley\'s climate?', a: 'We specify Sherwin-Williams Duration, Emerald, or Benjamin Moore Aura for Greeley exteriors. These 100% acrylic coatings are formulated for high UV exposure and thermal cycling. They outperform budget paints by 3–5 years in Northern Colorado conditions.' },
      { q: 'Do you offer fence and deck staining in Greeley?', a: 'Yes. Fence and deck staining is available in Greeley. We use penetrating oil and water-based stains that protect wood from Greeley\'s UV exposure and moisture cycles, typically lasting 3–5 years per application.' },
    ],
  },
  'wellington-co': {
    label: 'Wellington',
    state: 'CO',
    context: 'Small town north of Fort Collins with rural properties and newer residential subdivisions',
    intro: `Wellington sits at the northern end of the I-25 corridor, a small town that has grown considerably with families looking for more space north of Fort Collins. The mix here includes acreage properties, older ranch-style homes, and newer subdivision builds. All of them share the same Northern Colorado climate conditions — and the same need for coating systems that actually hold up to freeze-thaw cycles, wind, and intense UV radiation at altitude.\n\nTimnath Painting serves Wellington with no travel surcharge and the same full-service approach: Licensed, Insured, Eco-Painter Certified, $2M general liability. We bring the prep and the product to make it last.`,
    faqs: [
      { q: 'Does Timnath Painting serve Wellington, CO?', a: 'Yes. Wellington is within our standard service area. We serve residential and commercial properties in Wellington with no travel surcharge.' },
      { q: 'Can you paint acreage properties and outbuildings in Wellington?', a: 'Yes. Rural properties, detached garages, barns, and outbuildings are within our scope. We assess each structure and apply appropriate coatings — exterior latex for residential structures, and elastomeric or industrial coatings for metal buildings and agricultural structures where appropriate.' },
      { q: 'How does wind affect exterior paint in Wellington?', a: 'Wellington is exposed to consistent Front Range winds that accelerate paint breakdown, especially on north and west-facing surfaces. Wind-driven moisture and debris abrade coating surfaces over time. This makes proper prep — scraping, priming, and caulking — even more important than it is in more sheltered locations.' },
      { q: 'Do you stain fences and decks in Wellington?', a: 'Yes. Fence and deck staining is common in Wellington where wood fencing is standard on acreage and suburban properties alike. We use penetrating stains that hold up to Northern Colorado\'s weather cycles, lasting 3–5 years per application.' },
      { q: 'How do I book exterior painting in Wellington?', a: 'Call (970) 236-8271 or submit the quote form on this page. We schedule on-site assessments in Wellington and provide written quotes within 24 hours of the visit.' },
    ],
  },
  'johnstown-co': {
    label: 'Johnstown',
    state: 'CO',
    context: 'Fast-growing I-25 corridor community with newer residential developments and commercial growth',
    intro: `Johnstown has grown significantly along the I-25 corridor between Loveland and Greeley, with newer residential neighborhoods and commercial development continuing to expand. Most homes here are newer builds — but newer doesn\'t mean immune to Colorado\'s climate. Freeze-thaw cycles, intense UV, and temperature swings that can exceed 60°F in a single day stress even recently applied builder-grade paint systems.\n\nTimnath Painting serves Johnstown with the same approach: thorough prep, premium Sherwin-Williams and Benjamin Moore coatings rated for 7–10 years, and an Eco-Painter Certified crew. Licensed, Insured, $2M general liability.`,
    faqs: [
      { q: 'Does Timnath Painting serve Johnstown, CO?', a: 'Yes. Johnstown is within our standard service area. We serve residential and commercial properties throughout Johnstown.' },
      { q: 'How long does builder paint last on newer Johnstown homes?', a: 'Builder-grade paint applied during construction typically shows chalking, fading, and edge failures within 4–6 years in Northern Colorado. We replace it with premium two-coat systems using Sherwin-Williams Duration or Benjamin Moore Aura — rated for 7–10 years with proper surface prep.' },
      { q: 'Do you do HOA exterior painting in Johnstown?', a: 'Yes. Several Johnstown communities have HOA requirements for exterior painting. We handle color approval documentation, provide compliant color samples, and submit to architectural review committees. We\'ve worked with HOAs throughout Northern Colorado and understand the approval process.' },
      { q: 'What commercial painting services do you offer in Johnstown?', a: 'We provide commercial exterior and interior painting for Johnstown businesses — retail, office, and multi-family properties. We schedule around business operations and carry $2M general liability insurance with COI available on request.' },
      { q: 'How do I get a painting quote in Johnstown?', a: 'Call (970) 236-8271 or fill out the quote form on this page. We provide on-site assessments in Johnstown and written quotes within 24 hours. We respond to all inquiries within minutes during business hours.' },
    ],
  },
};

module.exports = { CLIENT, SERVICES, CITIES, SERVICE_DATA, CITY_DATA };
