'use client';

import { CongratsConfetti } from '@/components/CongratsConfetti';

interface CongratsHeroSectionProps {
  section: {
    title?: string;
    strapline?: string;
    subtitle?: string;
  };
}

export default function CongratsHeroSection({ section }: CongratsHeroSectionProps) {
  const scrollToSteps = () => {
    document.querySelector('.congrats-steps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="congrats-hero">
      <CongratsConfetti />
      <div className="padding-global">
        <div className="container-large">
          <div className="congrats-hero_wrapper">
            <div className="congrats-hero_eyebrow">
              <span className="congrats-hero_eyebrow-badge">CONGRATS!</span>
              <span className="congrats-hero_eyebrow-text">
                {section.strapline || 'We’re looking forward to speaking with you, and...'}
              </span>
            </div>
            <h1 className="congrats-hero_title">
              {section.title ||
                'You’re one step closer to a hand-picked hire who clears the backlog and stays for years'}
            </h1>
            <p className="congrats-hero_subtitle">
              {section.subtitle ||
                'On the call, we’ll show you how it works, walk you through pricing, and answer every question you have. Please note that your attendance is required.'}
            </p>
            <button className="congrats-chevron" onClick={scrollToSteps} aria-label="Scroll to the next steps">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3.5L8 8.5L14 3.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 8.5L8 13.5L14 8.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
