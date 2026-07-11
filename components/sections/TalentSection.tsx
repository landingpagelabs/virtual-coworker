'use client';

import { useEffect } from 'react';

interface TalentSectionProps {
  section: {
    title?: string;
  };
}

const TALENT = [
  { img: '1', name: 'Jasmine T.', role: 'Executive Assistant' },
  { img: '2', name: 'Marco D.', role: 'Virtual Assistant' },
  { img: '3', name: 'Kristine S.', role: 'Social Media Manager' },
  { img: '4', name: 'Miguel D.', role: 'Appointment Setter' },
  { img: '5', name: 'Joanna M.', role: 'Bookkeeper' },
  { img: '6', name: 'Bianca T.', role: 'Marketing Assistant' },
  { img: '7', name: 'Justin L.', role: 'Customer Service Specialist' },
  { img: '8', name: 'Daniel R.', role: 'Accountant' },
];

const INDUSTRIES = ['Ecommerce', 'Real Estate', 'Healthcare', 'Finance', 'Legal', 'SaaS', 'Retail', 'Construction'];

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.1673 11C20.1673 5.93739 16.0632 1.83333 11.0007 1.83333C5.93804 1.83333 1.83398 5.93739 1.83398 11C1.83398 16.0626 5.93804 20.1667 11.0007 20.1667C16.0632 20.1667 20.1673 16.0626 20.1673 11Z" fill="#33DED8" />
    <path d="M7.33398 11.6875C7.33398 11.6875 8.80065 12.524 9.53398 13.75C9.53398 13.75 11.734 8.9375 14.6673 7.33333" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TalentSection({ section }: TalentSectionProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let instance: any = null;
    let killed = false;

    // The slides have a fixed size in CSS (.talent-item is 250px wide, the image
    // is absolutely positioned), so autoWidth is stable without waiting for
    // images. We only wait for the deferred Splide CDN scripts to be ready.
    const timer = window.setInterval(() => {
      if (killed) {
        window.clearInterval(timer);
        return;
      }
      const Splide = (window as any).Splide;
      const extensions = (window as any).splide?.Extensions;
      if (!Splide || !extensions) return;

      const el = document.querySelector<HTMLElement>('.talent-carousel');
      if (!el) return;

      window.clearInterval(timer);
      instance = new Splide(el, {
        type: 'loop',
        drag: false,
        autoWidth: true,
        pagination: false,
        arrows: false,
        clones: 40,
        autoScroll: { speed: 0.4, pauseOnHover: false, autoStart: true },
      }).mount(extensions);
    }, 100);

    // destroy(true) fully restores the DOM so React StrictMode's double-mount
    // (mount → unmount → mount) re-initialises cleanly instead of leaving a
    // half-torn-down carousel.
    return () => {
      killed = true;
      window.clearInterval(timer);
      instance?.destroy?.(true);
    };
  }, []);

  return (
    <section className="talent">
      <div className="padding-global">
        <div className="container-large">
          <div className="talent_wrapper">
            <div className="talent_title-wrap">
              <h2 className="title-h2 white">
                {section.title ||
                  'We find and then further train the best talent in the Philippines (hire one or a whole team)'}
              </h2>
            </div>

            <div className="talent-carousel-inner">
              <div className="talent-carousel-decor" />
              <div className="talent-carousel-decor right" />
              <div className="talent-carousel splide">
                <div className="talent-track splide__track">
                  <div className="talent-list splide__list">
                    {TALENT.map((t) => (
                      <div className="talent-item splide__slide" key={t.img}>
                        <img className="talent-item_img" src={`/images/sections/talent/${t.img}.png`} alt={t.name} />
                        <div className="talent-item_content">
                          <p className="text-label-extra-small white">{t.name}</p>
                          <p className="text-body-small white">{t.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="talent_list-2-wrap">
              <div className="talent_title-2-wrap">
                <h3 className="title-h5 white">Delivering wins for businesses in all industries</h3>
              </div>
              <div className="talent_list-2">
                {INDUSTRIES.map((ind) => (
                  <div className="talent-item-2" key={ind}>
                    <CheckIcon />
                    <p className="text-label-extra-small white">{ind}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="cta-block">
              <a className="cta-main" href="#consultation">
                <span className="title-h5">Book Your Free Consultation</span>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.9775 4.30176H2.22266L7.24452 12.9999L2.22266 21.698H7.9775L12.9994 12.9999L7.9775 4.30176Z" fill="black" />
                  <path d="M18.7548 4.30176H13L18.0219 12.9999L13 21.698H18.7548L23.7767 12.9999L18.7548 4.30176Z" fill="black" />
                </svg>
              </a>
              <div className="cta-text">
                Every hire is backed by our lifetime replacement guarantee. Plus, it’s 100% free to get started, and you don’t pay until your new team member starts work
              </div>
              <div className="work_qoute-wrap">
                <div className="work-qoute_image-2">
                  <img className="work-qoute_img" src="/images/sections/reviews/Frame 2147227455.png" alt="qoute image" />
                </div>
                <div className="work-qoute_right">
                  <div className="work-qoute-right_text-wrap">
                    <p className="text-body-small white">
                      “Our SDR booked 14 qualified meetings in the first quarter at a fraction of what a US-based hire would have cost”
                    </p>
                  </div>
                  <div className="work-qoute-right_name-wrap">
                    <p className="text-label-double-extra-small is-gray">Dave · B2B SaaS founder</p>
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
