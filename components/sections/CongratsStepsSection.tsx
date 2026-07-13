'use client';

import { useState } from 'react';

interface Step {
  _key?: string;
  strapline?: string;
  title?: string;
  content?: string;
  copyMessage?: string;
}

interface CongratsStepsSectionProps {
  section: {
    title?: string;
    steps?: Step[];
  };
}

// Gmail-style calendar-invite mockup shown inside step 1 (built native so the
// text stays crisp; per the Figma design, decorative only).
const InviteMockup = () => (
  <div className="congrats-invite">
    <div className="congrats-invite_sender">
      <img className="congrats-invite_avatar" src="/images/sections/congrats/invite-avatar.avif" alt="" />
      <div>
        <p className="congrats-invite_sender-name">Virtual Coworker</p>
        <p className="congrats-invite_sender-tome">to me ▾</p>
      </div>
    </div>
    <div className="congrats-invite_card">
      <img className="congrats-invite_date" src="/images/sections/congrats/invite-date-tile.avif" alt="" />
      <div className="congrats-invite_details">
        <p className="congrats-invite_title">Invitation from Virtual Coworker</p>
        <p className="congrats-invite_link">View on Calendar</p>
        <div className="congrats-invite_row"><span>When</span><p>The Date And Time You Selected</p></div>
        <div className="congrats-invite_row"><span>Where</span><p>Google Meet (instructions in description)</p></div>
        <div className="congrats-invite_row"><span>Who</span><p>Virtual Coworker Team</p></div>
        <div className="congrats-invite_rsvp">
          <div className="congrats-invite_yes-wrap">
            <button type="button" className="congrats-invite_btn">Yes ▾</button>
            <svg className="congrats-invite_circle" viewBox="0 0 74 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="37" cy="22" rx="34" ry="19" stroke="#12A557" strokeWidth="2.5" />
            </svg>
          </div>
          <button type="button" className="congrats-invite_btn">Maybe</button>
          <button type="button" className="congrats-invite_btn">No</button>
        </div>
      </div>
    </div>
    <p className="congrats-invite_hint">↖ Please click “Yes”</p>
  </div>
);

export default function CongratsStepsSection({ section }: CongratsStepsSectionProps) {
  const [copied, setCopied] = useState(false);
  const steps = section.steps ?? [];

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable; button just doesn't confirm */
    }
  };

  const scrollToReviews = () => {
    document.querySelector('.reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="congrats-steps">
      <div className="padding-global">
        <div className="container-large">
          <div className="congrats-steps_wrapper">
            <h2 className="congrats-steps_title">
              <span className="congrats-steps_dot" aria-hidden="true" />
              {section.title || 'Important! To confirm your call, follow the 3 steps below:'}
            </h2>

            {steps.map((step, i) => (
              <div className="congrats-step" key={step._key ?? i}>
                <div className="congrats-step_pill">{step.strapline || `Step #${i + 1}/3`}</div>
                <h3 className="congrats-step_title">{step.title}</h3>
                <p className="congrats-step_text">{step.content}</p>

                {i === 0 && <InviteMockup />}

                {step.copyMessage && (
                  <>
                    <div className="congrats-bubble">
                      <p>{step.copyMessage}</p>
                    </div>
                    <button
                      type="button"
                      className="congrats-copy"
                      onClick={() => copyMessage(step.copyMessage!)}
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4.5" y="4.5" width="9" height="9" rx="1.5" stroke="#1a1a1a" strokeWidth="1.3" />
                        <path d="M10.5 4.5V3A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h1.5" stroke="#1a1a1a" strokeWidth="1.3" />
                      </svg>
                      {copied ? 'Copied!' : 'Copy Message And Send'}
                    </button>
                  </>
                )}

                {i === steps.length - 1 && (
                  <button className="congrats-chevron" onClick={scrollToReviews} aria-label="Scroll to reviews">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3.5L8 8.5L14 3.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 8.5L8 13.5L14 8.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
