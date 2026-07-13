interface CapabilitiesSectionProps {
  section: {
    title?: string;
    subtitle?: string;
  };
}

const TAGS = [
  'They stay for years',
  'Onshore quality, or better',
  'No handholding needed',
  'Custom-recruited for your exact role',
];

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.1673 11C20.1673 5.93743 16.0632 1.83337 11.0007 1.83337C5.93804 1.83337 1.83398 5.93743 1.83398 11C1.83398 16.0626 5.93804 20.1667 11.0007 20.1667C16.0632 20.1667 20.1673 16.0626 20.1673 11Z" fill="white" />
    <path d="M7.33398 11.6875C7.33398 11.6875 8.80065 12.524 9.53398 13.75C9.53398 13.75 11.734 8.93754 14.6673 7.33337" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CapabilitiesSection({ section }: CapabilitiesSectionProps) {
  return (
    <section className="capabilities">
      <div className="padding-global">
        <div className="container-large">
          <div className="capabilities_wrapper">
            <div className="capabilities_head">
              <div className="capabilities_title-wrap">
                <h2 className="title-h2 is-white">
                  {section.title || 'But can’t AI just do it?'}
                </h2>
              </div>
              <div className="capabilities_text-wrap">
                <p className="text-body-regular is-white">
                  {section.subtitle ||
                    'Some VAs just send emails and do the basic work AI now handles. Not your Virtual Coworker. We’ve spent 15 years building a network of the best talent in the Philippines. They’re experienced professionals with real skills, trained on AI, so one person completes the work of several. Because having someone use AI beats just having AI. Plus, they’re fluent in English, have great work ethics, no Roth IRAs to fund, and you only pay for hours worked.'}
                </p>
              </div>
              <div className="capabilities_tags-wrap">
                {TAGS.map((tag) => (
                  <div className="capabilities_tag" key={tag}>
                    <div className="capabilities-tag_icon-wrap">
                      <CheckIcon />
                    </div>
                    <div className="capabilities-tag_text-wrap">
                      <p className="text-body-regular is-white">{tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="capabilities_bottom">
              <div className="capabilities_left">
                <img className="capabilities-left_img" src="/images/sections/reviews/12345.avif" alt="capabilities left image" />
              </div>
              <div className="capabilities_right">
                <div className="capabilities-right_top">
                  <div className="capabilities-right-top_head">
                    <div className="capabilities-right-top-head_image">
                      <img className="capabilities-right-top-head_img" src="/images/sections/capabilities/capabilities_switch.avif" alt="" />
                    </div>
                    <div className="capabilities-right-top-head_text-wrap">
                      <p className="text-label-extra-small is-white">Have Your Next Great Hire In Days</p>
                    </div>
                  </div>
                  <div className="capabilities-right-top_people-wrap">
                    <img className="capabilities-right-top-people_img" src="/images/sections/capabilities/capabilities_line.avif" alt="" />
                  </div>
                  <div className="capabilities-right-top_review-wrap">
                    <img className="capabilities-right-top-review_img" src="/images/sections/capabilities/capabilities_review.avif" alt="" />
                  </div>
                </div>
                <div className="capabilities-right_bottom">
                  <div className="capabilities-right-bottom_title-wrap">
                    <p className="text-body-large white medium">Your Virtual Coworkers Come Fully Trained In:</p>
                  </div>
                  <div className="capabilities-right-bottom_list">
                    {[1, 2, 3, 4].map((n) => (
                      <div className="item_capabilities-right-bottom" key={n}>
                        <img
                          className="item-capabilities-right-bottom_img"
                          src={`/images/sections/capabilities/capabilities_${n}.svg`}
                          alt=" ai logo"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
