interface WorkSectionProps {
  section: {
    title?: string;
    text?: string;
  };
}

const CtaSvg = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9775 4.30176H2.22266L7.24452 12.9999L2.22266 21.698H7.9775L12.9994 12.9999L7.9775 4.30176Z" fill="black" />
    <path d="M18.7548 4.30176H13L18.0219 12.9999L13 21.698H18.7548L23.7767 12.9999L18.7548 4.30176Z" fill="black" />
  </svg>
);

export default function WorkSection({ section }: WorkSectionProps) {
  return (
    <section className="work">
      <div className="padding-global">
        <div className="container-large">
          <div className="work_wrapper">
            <div className="work_head">
              <div className="work_logo-wrap">
                <img className="work_logo" src="/images/sections/work/work_crest.png" alt="" />
              </div>
              <div className="work_title-wrap">
                <h2 className="title-h2 is-white">
                  {section.title || 'Every hire is backed by our lifetime replacement guarantee'}
                </h2>
              </div>
              <div className="work_text-wrap">
                <p className="text-body-regular is-white">
                  {section.text ||
                    'We do everything we can to get the match right with your very first Coworker. Fifteen years of matching, specialist recruiters, and a 600,000-strong network mean we almost always do. You\'ll either get a perfect fit first time, or we\'ll find another for you, free. And if your Coworker ever moves on down the road, the next one\'s free too. Their work is documented from day one, so nothing they know walks out the door. Plus, you don\'t pay anything until your new team member actually starts working.'}
                </p>
              </div>
            </div>
            <div className="work_bottom">
              <a href="#consultation" className="footer_cta-wrap">
                <button className="cta-main is-long">
                  <span className="title-h5">Book Your Free Consultation</span>
                  <CtaSvg />
                </button>
              </a>
              <div className="work_qoute-wrap">
                <div className="work-qoute_image-2">
                  <img className="work-qoute_img" src="/images/sections/work/work_image_people.png" alt="" />
                </div>
                <div className="work-qoute_right">
                  <p className="text-body-regular is-white">
                    &ldquo;To be able to zero in on a suitable person with the skills that we required from Day One has been amazing&rdquo;
                  </p>
                  <p className="text-label-double-extra-small is-gray">
                    Leonie · Director, HR industry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
