'use client';

import { useEffect, useState } from 'react';

interface Review {
  industry: string;
  avatar: string;
  modalAvatar: string;
  name: string;
  company: string;
  quote: string;
}

const REVIEWS: Review[] = [
  { industry: 'Construction', avatar: '/images/sections/cs/Frame 2087327516.png', modalAvatar: '/images/sections/cs/Frame 2087327516.png', name: 'Douglas', company: 'Ace Accounting', quote: 'When I had a question early on, someone called me back the same day. That kind of accountability is rare at this price point.' },
  { industry: 'Recruitment', avatar: '/images/sections/cs/item-2.png', modalAvatar: '/images/sections/cs/item-2.png', name: 'Paul Slezak', company: 'Cofounder, RecruitLoop', quote: 'Virtual Coworker provided us with high-quality profiles, worked with us around our own screening/recruitment processes, and provided great talent.' },
  { industry: 'HR Industry', avatar: '/images/sections/cs/item-3.png', modalAvatar: '/images/sections/cs/item-3.png', name: 'Leonie', company: 'Director, HR Industry', quote: 'To be able to zero in on a suitable person with the skills that we required from Day One has been amazing.' },
  { industry: 'SaaS', avatar: '/images/sections/cs/item-4.png', modalAvatar: '/images/sections/cs/Frame 2087327516.png', name: 'Dave', company: 'B2B SaaS founder', quote: 'Our SDR booked 14 qualified meetings in the first quarter at a fraction of what a US-based hire would have cost.' },
  { industry: 'Accounting', avatar: '/images/sections/cs/item-5.png', modalAvatar: '/images/sections/cs/item-5.png', name: 'Elyse Campbell', company: 'Ace Accounting', quote: 'Partnering with Virtual Coworker to hire a full-time remote accountant has been a game-changer for our firm.' },
  { industry: 'Marine', avatar: '/images/sections/cs/item-6.png', modalAvatar: '/images/sections/cs/item-6.png', name: 'Rebecca Jones', company: 'Director, Yacht and Boat', quote: 'After interviewing several candidates via email and phone, we felt confident that our new coworker would fit in well with our dynamic business.' },
  { industry: 'E-commerce', avatar: '/images/sections/cs/item-7.png', modalAvatar: '/images/sections/cs/avatar -1.png', name: 'Lexi', company: 'E-commerce website owner', quote: 'As a small company, we really couldn\'t afford a call center, but by outsourcing this to the Philippines, we have been able to provide much better customer service for our customers.' },
  { industry: 'Agency', avatar: '/images/sections/cs/last.png', modalAvatar: '/images/sections/cs/avatar.png', name: 'Matthew', company: 'Marketing agency owner', quote: 'Six months in, our senior team is back to doing strategy and client work and our margins look better for it.' },
];

const GradientLine = ({ id }: { id: string }) => (
  <svg width="186" height="1" viewBox="0 0 186 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.2">
      <rect width="185.25" height="1" fill={`url(#${id})`} />
    </g>
    <defs>
      <linearGradient id={id} x1="0" y1="0.5" x2="185.25" y2="0.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.2" />
        <stop offset="0.480346" stopColor="white" stopOpacity="0.9" />
        <stop offset="1" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);

const VerifiedBadge = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="6" cy="5.5" rx="3" ry="2.5" fill="white" />
    <path d="M3.8 11L2.85 9.32381L1.05 8.90476L1.225 6.96667L0 5.5L1.225 4.03333L1.05 2.09524L2.85 1.67619L3.8 0L5.5 0.759524L7.2 0L8.15 1.67619L9.95 2.09524L9.775 4.03333L11 5.5L9.775 6.96667L9.95 8.90476L8.15 9.32381L7.2 11L5.5 10.2405L3.8 11ZM4.975 7.35952L7.8 4.4L7.1 3.64048L4.975 5.86667L3.9 4.76667L3.2 5.5L4.975 7.35952Z" fill="#3897F0" />
  </svg>
);

const Dot = () => (
  <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.875 3.75002C1.53125 3.75002 1.21733 3.66622 0.933239 3.4986C0.649148 3.32815 0.421875 3.10087 0.25142 2.81678C0.0838068 2.53269 0 2.21877 0 1.87502C0 1.52843 0.0838068 1.21451 0.25142 0.933261C0.421875 0.64917 0.649148 0.423317 0.933239 0.255704C1.21733 0.0852492 1.53125 2.19345e-05 1.875 2.19345e-05C2.22159 2.19345e-05 2.53551 0.0852492 2.81676 0.255704C3.10085 0.423317 3.3267 0.64917 3.49432 0.933261C3.66477 1.21451 3.75 1.52843 3.75 1.87502C3.75 2.21877 3.66477 2.53269 3.49432 2.81678C3.3267 3.10087 3.10085 3.32815 2.81676 3.4986C2.53551 3.66622 2.22159 3.75002 1.875 3.75002Z" fill="#41424D" />
  </svg>
);

export default function CsSection({
  section,
}: {
  section?: {
    title?: string;
    reviews?: { _key?: string; industry?: string; name?: string; company?: string; quote?: string }[];
  };
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Close the open review popover when clicking/tapping anywhere outside of it
  // (mouseleave alone never fires on touch devices, so the popover would stick open).
  useEffect(() => {
    if (openIndex === null) return;
    const handlePointerDown = (e: PointerEvent) => {
      const item = (e.target as Element | null)?.closest?.('.cs_list-reviews-item');
      if (!item || Number(item.getAttribute('data-index')) !== openIndex) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [openIndex]);

  return (
    <section className="cs">
      <div className="padding-global">
        <div className="container-large">
          <div className="cs_wrapper">
            <div className="cs_title-wrap">
              <h2 className="text-label-large white">
                {section?.title || '15+ Years Staffing Businesses With Top Quality Talent At Incredible Prices'}
              </h2>
            </div>
            <div className="cs_list">
              {/* Reviews column */}
              <div className="cs_list-reviews">
                <div className="cs_list_strapline">
                  <GradientLine id="gl1" />
                  <div className="cs_list_strapline-text">
                    <p className="text-label-extra-small white">Reviews</p>
                  </div>
                  <GradientLine id="gl2" />
                </div>
                <div className="cs_list-reviews-flex">
                  {REVIEWS.map((r, i) => {
                    // Text is content-driven; avatars stay hardcoded (the
                    // content's image refs are dead Sanity references).
                    const c = section?.reviews?.[i];
                    return (
                    <div className="cs_list-reviews-item" data-index={i} key={c?._key ?? i}>
                      <div className="cs_list-reviews-avatar">
                        <img src={r.avatar} alt="" />
                      </div>
                      <div className="cs_list-reviews-info">
                        <div className="cs_list-reviews-name">
                          <p className="text-label-double-extra-small white">{c?.industry ?? r.industry}</p>
                          <VerifiedBadge />
                        </div>
                        <div
                          className="cs_list-reviews-cta"
                          onMouseEnter={() => setOpenIndex(i)}
                          onMouseLeave={() => setOpenIndex(null)}
                          // Tap toggles on touch devices, where hover never
                          // fires (Figma annotation 5251:14433).
                          onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                          <p className="text-label-triple-extra-small">Review</p>
                          <div className="cs_list-reviews-cta-icon">
                            <div className={`cs_list-reviews-cta-plus${openIndex !== i ? ' active' : ''}`}>+</div>
                            <div className={`cs_list-reviews-cta-minus${openIndex === i ? ' active' : ''}`}>-</div>
                          </div>
                        </div>
                      </div>
                      <div className={`cs_list-reviews-modal${openIndex === i ? ' visible' : ''}`}>
                        <div className="cs_list-reviews-modal-triangle">
                          <svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 0L19.5 8H9.5H0L9.5 0Z" fill="white" />
                          </svg>
                        </div>
                        <div className="cs_list-reviews-modal-flex">
                          <div className="cs_list-reviews-modal-top">
                            <div className="cs_list-reviews-modal-avatar">
                              <img src={r.modalAvatar} alt="" />
                            </div>
                            <p className="text-label-double-extra-small">{c?.name ?? r.name}</p>
                            <Dot />
                            <p className="cs_list-reviews-modal-position">{c?.company ?? r.company}</p>
                          </div>
                          <p className="text-body-caption">{c?.quote ?? r.quote}</p>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>

              <div className="mobile-d-none">
                <svg width="1" height="186" viewBox="0 0 1 186" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clipCS)">
                    <g opacity="0.1">
                      <rect width="1" height="185" transform="translate(0 16.5)" fill="white" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clipCS"><rect width="1" height="186" fill="white" /></clipPath>
                  </defs>
                </svg>
              </div>

              {/* Awards column */}
              <div className="cs_list-awards">
                <div className="cs_list_strapline is-awards">
                  <GradientLine id="gl3" />
                  <div className="cs_list_strapline-text">
                    <p className="text-label-extra-small white">Awards &amp; Features</p>
                  </div>
                  <GradientLine id="gl4" />
                </div>
                <div className="cs_list-awards-flex">
                  <div className="cs_list-awards-item item-1"><img src="/images/sections/cs/founded.png" alt="" /></div>
                  <div className="cs_list-awards-item item-2"><img src="/images/sections/cs/Avatar Card.png" alt="" /></div>
                  <div className="cs_list-awards-item item-3"><img src="/images/sections/cs/forbes-business-council 2.png" alt="" /></div>
                  <div className="cs_list-awards-item item-4"><img src="/images/sections/cs/Avatar Card (1).png" alt="" /></div>
                  <div className="cs_list-awards-item item-5"><img src="/images/sections/cs/Badges.png" alt="" /></div>
                  <div className="cs_list-awards-item item-6"><img src="/images/sections/cs/Clutch Badge.png" alt="" /></div>
                  <div className="cs_list-awards-item item-7"><img src="/images/sections/cs/brw 1.png" alt="" /></div>
                  <div className="cs_list-awards-item item-8"><img src="/images/sections/cs/startup 1.png" alt="" /></div>
                  <div className="cs_list-awards-item item-9"><img src="/images/sections/cs/Figure 1.png" alt="" /></div>
                  <div className="cs_list-awards-item item-10"><img src="/images/sections/cs/Sydney_Morning_Herald_logo 1.png" alt="" /></div>
                  <div className="cs_list-awards-item item-11"><img src="/images/sections/cs/startupsmart_restored 1.png" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
