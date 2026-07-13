'use client';

import { useState } from 'react';

interface ReasonsSectionProps {
  section: {
    title?: string;
    reasons?: { _key?: string; title?: string; text?: string }[];
  };
}

const REASONS = [
  { img: '1', title: 'Your shortlist, ready in days', text: 'Posting a job yourself means a hundred resumes to sort. Here you brief a US-based expert once, and our 600,000-strong network does the rest. You interview the few worth meeting, and pick.' },
  { img: '2', title: 'Fluent English from day one', text: 'Every Virtual Coworker speaks fluent English, has done the role for years and most even hold a university degree. They have great culture and understand how to work well with Western companies.' },
  { img: '3', title: 'Only pay for hours worked', text: 'Our software tracks every hour, so you never pay for a minute they didn\'t work. Benefits, equipment and paid leave are on us. You can start at just 20 hours a week.' },
  { img: '4', title: 'One flat rate covers everything', text: 'Recruitment costs nothing, and so do HR, payroll, training, and their computer and internet. It all folds into one hourly rate, up to 80% below a local salary.' },
  { img: '5', title: 'We take care of our people', text: 'Your Virtual Coworker gets great pay, benefits, and a career path. Our own team runs on the same model we sell, and many of our people have stayed a decade.' },
  { img: '6', title: 'They work your hours', text: 'Your Virtual Coworker is online when your team is, so questions get quick answers, they sit in your meetings, and nothing waits overnight. The same dedicated person, every day, working like they\'re right there in the office.' },
  { img: '7', title: 'Custom-recruited for your exact role', text: 'A recruiter screens every applicant, testing skills and English and running an FBI-grade background check. Only the few who clear everything reach you. You interview them free, and nobody starts until you\'re sure.' },
  { img: '8', title: 'Free lifetime replacement', text: 'If your Virtual Coworker ever leaves or the fit isn\'t right, we recruit a replacement free, usually within days. Everything they learned is passed on, so you never start over from zero.' },
  { img: '9', title: 'Scale up or down anytime', text: 'Start with one person part-time, take them full-time when you\'re ready, or build a team. Add help when work piles up and pull back when it\'s quiet. There\'s no lock-in.' },
];

export default function ReasonsSection({ section }: ReasonsSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="reasons">
      <div className="padding-global">
        <div className="container-large">
          <div className="reasons_wrapper">
            <div className="reasons_title-wrap">
              <h2 className="title-h2 white">
                {section.title ||
                  'Why busy teams that want proven talent who stick around for the long term use us rather than DIYing it'}
              </h2>
            </div>

            <div className={`reasons_list${expanded ? ' expanded' : ''}`}>
              <div className={`reasons_decor${expanded ? ' active' : ''}`} />
              {REASONS.map((r, i) => {
                // Text is content-driven; the card art stays welded to its index.
                const c = section.reasons?.[i];
                return (
                  <div className="reasons_item" key={c?._key ?? i}>
                    <div className="reasons_item-image">
                      <img src={`/images/sections/reasons/${r.img}.png`} alt="" />
                    </div>
                    <div className="reasons_info">
                      <p className="text-label-large white">{c?.title ?? r.title}</p>
                      <p className="text-body-small white">{c?.text ?? r.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="reasons_cta" id="reasons-cta" onClick={() => setExpanded(!expanded)}>
              <img src="/images/sections/reasons/img.png" alt="" />
              <p className="text-body-regular white mobile-d-none">Multi-Award Winning &amp; Top-Rated By Growing Businesses</p>
              <svg width="1" height="18" viewBox="0 0 1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.5" y1="18" x2="0.5" stroke="white" strokeOpacity="0.3" />
              </svg>
              <p className="reasons_cta-text-swap white">{expanded ? 'Show Less Reasons' : 'Show More Reasons'}</p>
              <div className="reasons_cta-icon">
                <div className={`reasons_cta-icon-plus${expanded ? ' active' : ''}`} />
                <div className="reasons_cta-icon-minus" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
