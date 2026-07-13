'use client';

import { useEffect, useRef, useState } from 'react';

interface FaqSectionProps {
  section: {
    title?: string;
    faqs?: { _key?: string; question: string; answer: string }[];
  };
}

const FAQS = [
  { q: "Can't AI just do this now?", a: "AI is great at the repetitive parts. What it still can't do is chase a supplier who's gone quiet, calm a frustrated customer, or flag the thing that looks off before it costs you. The best results come from a person who uses AI, and every Virtual Coworker works with the same tools you do." },
  { q: "How do I know you'll match me with the right person?", a: "Matching is the part we obsess over. A recruiter who hires for your type of role maps the tasks, hours, and tools, then screens every candidate against exactly that. You only ever see a shortlist built for the real job, and you make the final call." },
  { q: "What if it doesn't work out, or my assistant leaves?", a: "Then we replace them free, however long they've been with you. That's the lifetime replacement guarantee. Every Virtual Coworker has an account team behind them who check in, handle the HR, and step in early when something's off. A bad hire is our problem to fix, not yours to absorb." },
  { q: "Will they actually work my hours and time zone?", a: "They work the hours you set, with full overlap across your workday, so they're online when you are. You can message them, jump on a call, and get same-day turnaround the way you would with someone down the hall. Those hours are agreed before they start, so the overlap is real from day one, not something you're left to chase later. Teams running on US and Australian time do this every day, and most say that within a couple of weeks it stops feeling remote at all." },
  { q: "How good is their English and communication?", a: "Fluent, and you don't have to take our word for it: you interview every candidate and hear their English for yourself before anyone starts. The Philippines is the fourth-largest English-speaking country in the world, with English taught from grade school, and every Virtual Coworker is screened for clear written and spoken English before they reach your shortlist. That clarity is why so many clients put them on the front line, in support and reception roles, talking to their own customers." },
  { q: "How is this different from Upwork or hiring someone myself?", a: "You can absolutely post the role yourself and sort the replies. Posting the job was never the hard part though. The hard part is working out who can actually do the work, communicate clearly, keep your hours, and still be there in six months, and that's the exact part we take off you. We source, screen, and shortlist for it, then stay involved with an account team and the HR handled, so you skip the weeks that hiring usually eats and go straight to interviewing people who already fit. And when a hire you found yourself falls through, you start over from zero. Here, every placement is backed by our lifetime replacement guarantee. The teams who value this most have already tried it the hard way and don't want to do it again." },
  { q: "How much does it cost, and is it cheaper than hiring locally?", a: "Up to 80% less than hiring locally, once you count everything. With a Virtual Coworker you pay for the agreed hours, not payroll tax, benefits, equipment, office space, recruitment fees, or the weeks lost trying to hire. The cheapest VA online usually costs more in the end, because work that needs constant fixing eats your day. Pricing depends on the role and the hours, and you get the exact monthly number before you interview anyone, no mystery bill after you've already said yes." },
  { q: "How fast can I get started, and is my data safe?", a: "Most roles go from a short briefing call to a shortlist within days; you interview the candidates, pick the one you want, and set the start date. On security, you decide exactly which tools, inboxes, and permissions your Virtual Coworker gets. Every one of them has passed an FBI-grade background check and works under confidentiality, and you get daily reports, so nothing happens out of sight." },
  { q: "Am I locked into a contract, or can I cancel anytime?", a: "There's no lock-in. You go month to month, scale up or down, or cancel anytime, and billing only starts once your Virtual Coworker starts work. Because we have to keep earning your business every month instead of trapping you in a contract, your account team stays on top of the placement. A lot of clients stay for years, and that's the point: we'd rather keep you because the work is good than because the paperwork says you have to." },
  { q: "How do I pay them, and do you handle payroll and invoicing?", a: "You don't touch any of it. Your Virtual Coworker is engaged through us, so there's no overseas payroll to run and no employment tax or benefits to administer. You get one simple invoice for the hours worked, and that's the whole arrangement. The admin that makes a local hire slow and expensive is exactly the part we take off your plate." },
  { q: "How does a Virtual Coworker integrate with my team?", a: "They're in your Slack or Teams, your meetings, and your tools from day one, working your hours. A success manager runs a structured onboarding with you, then stays on the placement, checking in and stepping in early if anything's off. Even time off is handled: leave is requested in advance and planned around your workload, so you're never left guessing. It's why the line that keeps showing up in our reviews is “feels like part of the team.”" },
  { q: "How are you different from other VA agencies?", a: "Most agencies match you from a database of whoever's available. We recruit fresh for every single role, with a recruiter who only places your type of role, which is why our matches stick. Your first call is with a US-based outsourcing specialist, not an offshore queue, and they'll tell you straight if we're not the right fit. And while most providers guarantee a replacement for a few months, ours is free for life." },
  { q: "How do you vet and screen your candidates?", a: "The vetting happens long before you meet anyone. A specialist recruiter who places your type of role screens every candidate against the actual work, tests their skills and their English, and runs an FBI-grade background check. Out of everyone who applies, very few make it through, so the interview is you choosing between strong options instead of filtering out weak ones. And because we screen this hard, we can afford to back every placement with a lifetime replacement guarantee." },
  { q: "Where are your assistants based, and why the Philippines?", a: "The Philippines, and that's a deliberate choice. English is taught from grade school, the professional remote-work culture runs deep, and the hours can be set to overlap your day. Just as important, we're one of the most-followed staffing companies in the country, so a lot of the best talent comes to us before they go anywhere else. We're choosing the right person for your role, never scraping for whoever's free." },
  { q: "Can I hire part-time, or only full-time?", a: "Part-time from 20 hours a week, or full-time from day one. You tell us the workload and we match you to the right person for it, and you never pay for hours you don't need. Plenty of teams begin part-time on the tasks eating the most time, then scale up as the relationship proves itself. Starting small is a low-risk way to see the fit for yourself, and because there's no lock-in, you can adjust the hours as your business changes." },
];

const PlusIcon = () => (
  <svg className="item-faq-head_icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="5" width="12" height="2" rx="1" fill="#214873" />
    <rect x="5" width="2" height="12" rx="1" fill="#214873" />
  </svg>
);

const MinusIcon = () => (
  <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="2" rx="1" fill="#214873" />
  </svg>
);

export default function FaqSection({ section }: FaqSectionProps) {
  // Content-driven with the hardcoded set as fallback, normalised to one shape.
  const faqs = section.faqs?.length
    ? section.faqs
    : FAQS.map((f) => ({ _key: undefined, question: f.q, answer: f.a }));

  // Multi-open accordion: the first three items start expanded.
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => new Set([0, 1, 2]));
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) =>
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  // Set each panel's height to its content (so long answers aren't clipped).
  useEffect(() => {
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      panel.style.maxHeight = openIndexes.has(i) ? `${panel.scrollHeight + 24}px` : '0px';
    });
  }, [openIndexes]);

  return (
    <section className="faq">
      <div className="padding-global">
        <div className="container-large">
          <div className="faq_wrapper">
            <div className="faq_head">
              <div className="faq_title-wrap">
                <h2 className="title-h2 is-white">
                  {section.title || 'Frequently asked questions'}
                </h2>
              </div>
            </div>

            <div className="faq_list">
              {faqs.map((item, i) => (
                <div className={`item_faq${openIndexes.has(i) ? ' active' : ''}`} key={item._key ?? i}>
                  <div className="item-faq_head">
                    <div className="item-faq-head_content" onClick={() => toggle(i)}>
                      <div className="item-faq-head_title-wrap">
                        <p className="text-label-small">{item.question}</p>
                      </div>
                      <div className="item-faq-head_icon-wrap">
                        <PlusIcon />
                      </div>
                      <div className="item-faq-head_icon-wrap-minus">
                        <MinusIcon />
                      </div>
                    </div>
                  </div>
                  <div
                    className="item-faq_panel"
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                  >
                    <div className="item-faq-panel_text-wrap">
                      <p className="text-body-regular is-gray">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
