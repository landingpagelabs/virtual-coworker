import { LeadForm } from '@/components/LeadForm';

interface HeroSectionProps {
  section: {
    heading?: string;
    subtitle?: string;
    formTitle?: string;
    guarantee?: string;
  };
}

export default function HeroSection({ section }: HeroSectionProps) {
  return (
    <section className="hero">
      {/* The hero backdrop is a CSS background, so the browser can't find it
          until the stylesheet is parsed — one extra round trip on the LCP
          path. This preload puts it in the HTML for the preload scanner. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link rel="preload" as="image" href="/images/sections/hero/Hero.avif" fetchPriority="high" />
      <div className="padding-global">
        <div className="container-large">
          <div className="hero_wrapper">
            <div className="hero_title-wrap">
              <h1 className="title-h1 white">
                {section.heading || 'Hire a virtual assistant who\'s so good, you forget they\'re offshore'}
              </h1>
            </div>
            <div className="hero_subtitle-wrap">
              <p className="text-body-large off-white">
                {section.subtitle ||
                  'We hand-pick the Philippines\' best talent for your role and handle all the HR. They work your hours, use AI to get more done and cost a fraction of a local salary.'}
              </p>
            </div>

            <div className="hero_form-wrap">
              <div className="hero_form-title-wrap">
                <div className="text-label-medium white">
                  {section.formTitle || 'Complete The Form Below To Book Your Free Consultation'}
                </div>
              </div>
              <LeadForm prefix="hero" source="hero" guarantee={section.guarantee} eager />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
