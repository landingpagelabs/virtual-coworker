'use client';

import { useEffect, useRef, useState } from 'react';

interface StepsSectionProps {
  section: { title?: string };
}

const STEPS = [
  {
    strapline: 'Step 1',
    title: 'Get free advice from an outsourcing expert',
    text: 'Book a quick and free consultation with our outsourcing specialist. We’ll explain how it works, pricing and answer all your questions.',
    img: '/images/sections/steps/steps_1.png',
  },
  {
    strapline: 'Step 2',
    title: 'Receive your hand-picked shortlist',
    text: 'If it’s a fit, we start recruiting, and give you a shortlist of pre-vetted candidates within days. You interview them and select your favorite.',
    img: '/images/sections/steps/steps_2.png',
  },
  {
    strapline: 'Step 3',
    title: 'Grow past the bottleneck',
    text: 'Finally, the work that’s been piling up gets done. Support tickets get answered faster, more calls get booked on the calendar and you hit your next revenue milestone.',
    img: '/images/sections/steps/steps_3.png',
  },
];

const PrevIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 18C0 27.9411 8.05887 36 18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18Z" fill="white" fillOpacity="0.12" />
    <path d="M20.5195 12.9637L15.4828 18.0004L20.5195 23.0371" stroke="white" strokeWidth="1.6789" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NextIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36C27.9411 36 36 27.9411 36 18Z" fill="white" fillOpacity="0.12" />
    <path d="M15.4805 12.9637L20.5172 18.0004L15.4805 23.0371" stroke="white" strokeWidth="1.6789" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function StepsSection({ section }: StepsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(STEPS.length - 1, i));
    (track.children[clamped] as HTMLElement | undefined)?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  // Keep the active dot in sync while the user swipes the mobile slider.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trackLeft = track.getBoundingClientRect().left;
        let closest = 0;
        let min = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const d = Math.abs((child as HTMLElement).getBoundingClientRect().left - trackLeft);
          if (d < min) {
            min = d;
            closest = i;
          }
        });
        setActive(closest);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="steps">
      <div className="padding-global">
        <div className="container-large">
          <div className="steps_wrapper">
            <div className="steps_head">
              <div className="steps_title-wrap">
                <h2 className="title-h2 is-white">
                  {section.title || '3 easy steps to get a great team member without the hiring hassle'}
                </h2>
              </div>
            </div>
            <div className="steps_list" ref={trackRef}>
              {STEPS.map((s) => (
                <div className="item_steps" key={s.strapline}>
                  <div className="item-steps_head">
                    <div className="item-steps_strapline-wrap">
                      <p className="item-steps-strapline_text">{s.strapline}</p>
                    </div>
                    <div className="item-steps_title-wrap">
                      <h3 className="item-steps_title">{s.title}</h3>
                    </div>
                    <div className="item-steps_text-wrap">
                      <p className="text-body-regular is-white">{s.text}</p>
                    </div>
                  </div>
                  <div className="item-steps_down">
                    <img className="item-steps-down_img" src={s.img} alt="steps image" />
                  </div>
                </div>
              ))}
            </div>

            {/* Slider controls — shown only on mobile (see globals.css). */}
            <div className="steps_slider-nav">
              <button
                type="button"
                className="steps_slider-arrow"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label="Previous step"
              >
                <PrevIcon />
              </button>
              <div className="steps_slider-dots">
                {STEPS.map((s, i) => (
                  <button
                    type="button"
                    key={s.strapline}
                    className={`steps_slider-dot${active === i ? ' is-active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${s.strapline}`}
                    aria-current={active === i ? 'true' : undefined}
                  />
                ))}
              </div>
              <button
                type="button"
                className="steps_slider-arrow"
                onClick={() => goTo(active + 1)}
                disabled={active === STEPS.length - 1}
                aria-label="Next step"
              >
                <NextIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
