import { LeadForm } from '@/components/LeadForm';
import { DynamicMonth } from '@/components/DynamicMonth';

interface FinalSectionProps {
  section: {
    title?: string;
    subtitle?: string;
    formTitle?: string;
    guarantee?: string;
  };
}

export default function FinalSection({ section }: FinalSectionProps) {
  return (
    <section className="final" id="consultation">
      <div className="padding-global">
        <div className="container-large">
          <div className="final_wrapper">
            <div className="final_head">
              <div className="final_strapline-wrap">
                <div className="pointer-wrap is-white">
                  <div className="pointer-wrap-flashing">
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="3.5" cy="3.5" r="3.5" fill="#008000" />
                    </svg>
                  </div>
                  <div className="pointer_text-wrap">
                    <p className="text-label-extra-small">
                      Free Consultations Still Available For <DynamicMonth />
                    </p>
                  </div>
                </div>
              </div>
              <div className="final_title-wrap">
                <h2 className="title-h2">
                  {section.title || 'Your next US-quality team member is waiting to help... and for a fraction of the price'}
                </h2>
              </div>
              <div className="final_text-wrap">
                <p className="text-body-regular">
                  {section.subtitle ||
                    'If your team has more work than hands, this is for you. Book your free call today, interview pre-vetted candidates within days, and your new team member could be clearing the backlog in less than two weeks. You don’t pay anything until they start, and there’s no lock-in. Claim your spot below while this month’s free consultations last.'}
                </p>
              </div>
            </div>

            <div className="final-form">
              <div className="hero_form-title-wrap">
                <div className="text-label-large">
                  {section.formTitle || 'Complete The Form Below To Get Pricing And Book Your Free Consultation'}
                </div>
              </div>
              <LeadForm prefix="final" source="section" guarantee={section.guarantee} />
            </div>

            <div className="final_down">
              <div className="final-down_image">
                <img className="final-down_img" src="/images/sections/final/final_1.avif" width={1060} height={632} alt="bottom image" loading="lazy" decoding="async" />
              </div>
              <div className="final-down_image">
                <img className="final-down_img" src="/images/sections/final/final_2.avif" width={1060} height={630} alt="bottom image" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
