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
  { label: 'Exterior Painting', slug: 'exterior-painting', img: 'service-4-1.jpg' },
  { label: 'Interior Painting', slug: 'interior-painting', img: 'service-4-2.jpg' },
  { label: 'HOA Painting',      slug: 'hoa-painting',      img: 'service-4-3.jpg' },
  { label: 'Commercial Painting', slug: 'commercial-painting', img: 'service-4-4.jpg' },
  { label: 'Fence Staining',    slug: 'fence-staining',    img: 'service-4-5.jpg' },
  { label: 'Exterior Staining', slug: 'exterior-staining', img: 'service-4-1.jpg' },
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
  { label: 'Evans',       slug: 'evans-co' },
  { label: 'Milliken',    slug: 'milliken-co' },
  { label: 'Eaton',       slug: 'eaton-co' },
  { label: 'La Salle',    slug: 'la-salle-co' },
  { label: 'Longmont',    slug: 'longmont-co' },
  { label: 'Berthoud',    slug: 'berthoud-co' },
];

const SERVICE_DATA = {
  'exterior-painting': {
    title: 'Exterior Painting in Northern Colorado',
    metaTitle: 'Exterior Painting Northern Colorado | Timnath Painting',
    metaDesc: 'Exterior painting built for Colorado\'s climate. Licensed, eco-certified, 7-10 year coatings. Northern Colorado homes. (970) 236-8271',
    tagline: 'Built for Colorado\'s Climate',
    heroTitle: 'Exterior Painting That Lasts 7-10 Years in Northern Colorado',
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
  'interior-painting': {
    title: 'Interior Painting in Northern Colorado',
    metaTitle: 'Interior Painting Northern Colorado | Timnath Painting',
    metaDesc: 'Interior painting by certified professionals. Low-VOC options, meticulous prep, clean results. Serving Northern Colorado. (970) 236-8271',
    tagline: 'Meticulous Prep. Clean Results.',
    heroTitle: 'Interior Painting That Protects and Transforms Your Home',
    intro: `Interior painting is where the details live. Proper surface preparation  -  patching nail holes, skim-coating damaged drywall, sanding all surfaces  -  is what separates a professional result from a paint-over job that shows every flaw.

Timnath Painting brings the same no-shortcuts approach to interior work that we apply to every exterior project. We use low-VOC and zero-VOC options from Sherwin-Williams and Benjamin Moore. We protect your floors, furniture, and trim meticulously. We leave your home cleaner than we found it.`,
    process: `Every interior project begins with a full walkthrough to assess surfaces, note existing damage, and confirm color selections.

<strong>Surface Preparation:</strong> We patch all holes and cracks, skim-coat damaged drywall sections, sand all surfaces smooth, caulk gaps between trim and walls, and apply the correct primer for each surface type.

<strong>Coating Application:</strong> We use Sherwin-Williams Emerald and Benjamin Moore Aura for interiors  -  both available in low-VOC and zero-VOC formulations. Ceiling paint, trim paint, and wall paint are each specified separately for correct sheen and performance.

<strong>Protection & Cleanup:</strong> All floors, furniture, and surfaces are masked or covered. We remove all tape and masking before final walkthrough. Full site cleanup is included.`,
    faqs: [
      { q: 'Do you use low-VOC paint for interior projects?', a: 'Yes. We offer low-VOC and zero-VOC interior paint options from Sherwin-Williams (Emerald) and Benjamin Moore (Aura). These products perform as well or better than standard formulations and are appropriate for homes with children, pets, or occupants with chemical sensitivities.' },
      { q: 'How long does interior painting take?', a: 'A typical 2,000 sq ft home interior takes 3-5 days depending on number of rooms, ceiling height, trim complexity, and surface condition. Homes with extensive drywall repair or multiple color changes take longer. We provide a specific timeline during the on-site assessment.' },
      { q: 'Do I need to move furniture before you arrive?', a: 'We ask that you clear small items from surfaces and remove breakables. For larger furniture, we work around it and cover what cannot be moved. We handle all floor and surface protection with drop cloths and masking.' },
      { q: 'What does interior painting cost in Northern Colorado?', a: 'Interior painting for a standard room typically ranges from $400-$900 depending on size, ceiling height, and surface condition. Full home interiors run $3,500-$12,000+. Call (970) 236-8271 for an accurate quote.' },
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

module.exports = { CLIENT, SERVICES, CITIES, SERVICE_DATA };
