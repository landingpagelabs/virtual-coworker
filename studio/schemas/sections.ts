export const heroSection = {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    { name: 'heading', title: 'Heading (H1)', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    { name: 'formTitle', title: 'Form Title', type: 'string' },
    { name: 'guarantee', title: 'Guarantee Note (below form)', type: 'string' },
  ],
};

export const csSection = {
  name: 'csSection',
  title: 'CS Section (Reviews + Awards)',
  type: 'object',
  fields: [
    { name: 'strapline', title: 'Strapline', type: 'string' },
    { name: 'reviews', title: 'Reviews', type: 'array', of: [{ type: 'object', fields: [
      { name: 'quote', title: 'Quote', type: 'text' },
      { name: 'author', title: 'Author', type: 'string' },
      { name: 'role', title: 'Role', type: 'string' },
    ]}]},
  ],
};

export const aboutSection = {
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    { name: 'ctaQuote', title: 'CTA Quote', type: 'string' },
    { name: 'ctaAuthor', title: 'CTA Quote Author', type: 'string' },
  ],
};

export const capabilitiesSection = {
  name: 'capabilitiesSection',
  title: 'Capabilities Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'tags', title: 'Role Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'panelText', title: 'Bottom Panel Text', type: 'string' },
  ],
};

export const showcaseSection = {
  name: 'showcaseSection',
  title: 'Showcase Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'items', title: 'Items', type: 'array', of: [{ type: 'object', fields: [
      { name: 'problem', title: 'Problem (left)', type: 'string' },
      { name: 'solution', title: 'Solution (right)', type: 'text' },
    ]}]},
  ],
};

export const talentSection = {
  name: 'talentSection',
  title: 'Talent Section (Carousel)',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'industryListTitle', title: 'Industries List Title', type: 'string' },
  ],
};

export const reasonsSection = {
  name: 'reasonsSection',
  title: 'Reasons Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'reasons', title: 'Reasons', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'text', title: 'Text', type: 'text' },
    ]}]},
  ],
};

export const reviewsSection = {
  name: 'reviewsSection',
  title: 'Reviews Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'reviews', title: 'Reviews', type: 'array', of: [{ type: 'object', fields: [
      { name: 'quote', title: 'Quote', type: 'text' },
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'role', title: 'Role', type: 'string' },
    ]}]},
  ],
};

export const workSection = {
  name: 'workSection',
  title: 'Work / Guarantee Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'text', title: 'Body Text', type: 'text' },
    { name: 'quoteText', title: 'Quote Text', type: 'string' },
    { name: 'quoteAuthor', title: 'Quote Author', type: 'string' },
  ],
};

export const stepsSection = {
  name: 'stepsSection',
  title: 'Steps Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'steps', title: 'Steps', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', title: 'Step Title', type: 'string' },
      { name: 'text', title: 'Step Text', type: 'text' },
    ]}]},
  ],
};

export const finalSection = {
  name: 'finalSection',
  title: 'Final CTA Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    { name: 'formTitle', title: 'Form Title', type: 'string' },
  ],
};

export const faqSection = {
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'object', fields: [
      { name: 'question', title: 'Question', type: 'string' },
      { name: 'answer', title: 'Answer', type: 'text' },
    ]}]},
  ],
};

export const proofBarSection = {
  name: 'proofBarSection',
  title: 'Proof Bar Section',
  type: 'object',
  fields: [
    { name: 'reviews', title: 'Review Count (e.g. 400+)', type: 'string' },
    { name: 'platforms', title: 'Platform Count', type: 'string' },
    { name: 'stars', title: 'Star Rating (e.g. 4.9)', type: 'string' },
  ],
};
