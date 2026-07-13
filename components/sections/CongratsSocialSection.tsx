interface CongratsSocialSectionProps {
  section: {
    title?: string;
    facebookUrl?: string;
  };
}

const FACEBOOK_URL = 'https://www.facebook.com/virtualcoworkerinc';

export default function CongratsSocialSection({ section }: CongratsSocialSectionProps) {
  return (
    <section className="congrats-social">
      <div className="padding-global">
        <div className="container-large">
          <div className="congrats-social_card">
            <h2 className="congrats-social_title">
              {section.title || 'We look forward to meeting you at our call!'}
            </h2>
            <div className="congrats-social_divider">
              <span className="congrats-social_line" />
              <span className="congrats-social_talk">TALK SOON</span>
              <span className="congrats-social_line" />
            </div>
            <div className="congrats-social_braden">
              <img
                className="congrats-social_signature"
                src="/images/sections/congrats/congrats-signature.avif"
                alt="Braden Yuill signature"
              />
              <img
                className="congrats-social_avatar"
                src="/images/sections/congrats/congrats-braden.avif"
                alt="Braden Yuill"
              />
              <div className="congrats-social_who">
                <p className="congrats-social_name">Braden Yuill</p>
                <p className="congrats-social_role">Founder &amp; CEO</p>
              </div>
            </div>
            <p className="congrats-social_proof">400+ businesses matched with top talent over 15 years</p>
            {/* Opens in a new tab per Figma annotation on 5252:36426 */}
            <a
              className="cta-main congrats-social_cta"
              href={section.facebookUrl || FACEBOOK_URL}
              target="_blank"
              rel="noopener"
            >
              <span className="title-h5">Connect With Us On Facebook</span>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.9775 4.30176H2.22266L7.24452 12.9999L2.22266 21.698H7.9775L12.9994 12.9999L7.9775 4.30176Z" fill="black" />
                <path d="M18.7548 4.30176H13L18.0219 12.9999L13 21.698H18.7548L23.7767 12.9999L18.7548 4.30176Z" fill="black" />
              </svg>
            </a>
            <p className="congrats-social_awards-label">Awards &amp; Features</p>
            <img
              className="congrats-social_awards"
              src="/images/sections/congrats/congrats-awards.avif"
              alt="Awards and features: Google 5-star reviews, Forbes, Clutch, Trustpilot, BRW, Startup Smart, Startup Daily, The Sydney Morning Herald"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
