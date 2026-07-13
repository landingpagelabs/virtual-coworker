'use client';

import { useEffect, useRef } from 'react';

export function ModalSmall() {
  const modalRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    // Shows once, on a genuine exit intent, then disappears after 15 seconds
    // (Figma annotation on node 5005:122460).
    let triggered = false;
    const show = () => {
      if (triggered) return;
      triggered = true;
      modal.classList.add('visible');
      hideTimer.current = window.setTimeout(() => modal.classList.remove('visible'), 15000);
      cleanup();
    };

    // Only arm once the visitor has actually engaged with the page. Without
    // this the pop fired instantly, because the cursor is already near the top
    // of the window right after someone clicks a link or types the URL.
    let armed = false;
    const ARM_DELAY_MS = 8000;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    // The pointer must be inside the page before a "leaving" gesture counts.
    let pointerWasInside = false;
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY > 120) pointerWasInside = true;
    };

    // Desktop exit-intent: the cursor actually LEAVES the viewport through the
    // top (toward the tabs / address bar / close button), not merely hovers up
    // near the nav. relatedTarget === null means it left the document.
    const onMouseOut = (e: MouseEvent) => {
      if (!armed || !pointerWasInside) return;
      if (e.relatedTarget === null && (e as MouseEvent).clientY <= 0) show();
    };

    // Mobile exit-intent: a decisive fast scroll back up toward the top, after
    // the visitor has read a fair way down (no cursor to track on touch).
    let lastY = window.scrollY;
    let lastT = Date.now();
    const onScroll = () => {
      if (!armed) {
        lastY = window.scrollY;
        lastT = Date.now();
        return;
      }
      const now = Date.now();
      const dy = window.scrollY - lastY;
      const dt = now - lastT;
      const speed = dt > 0 ? -dy / dt : 0; // px per ms, upward positive
      // Deep into the page, flicking up hard, and heading for the top.
      if (dy < 0 && speed > 2 && lastY > window.innerHeight * 2) show();
      lastY = window.scrollY;
      lastT = now;
    };

    const cleanup = () => {
      window.clearTimeout(armTimer);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cleanup();
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  const close = () => {
    modalRef.current?.classList.remove('visible');
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
  };

  return (
    <div className="modal-small" ref={modalRef}>
      <div className="modal-small-wrapper">
        <div className="modal-small-exit" onClick={close}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66667 13.3333C2.98477 13.3333 0 10.3485 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3485 0 13.3333 2.98477 13.3333 6.66667C13.3333 10.3485 10.3485 13.3333 6.66667 13.3333ZM6.66667 12C9.6122 12 12 9.6122 12 6.66667C12 3.72115 9.6122 1.33333 6.66667 1.33333C3.72115 1.33333 1.33333 3.72115 1.33333 6.66667C1.33333 9.6122 3.72115 12 6.66667 12ZM6.66667 5.72387L8.55227 3.83824L9.49507 4.78105L7.60947 6.66667L9.49507 8.55227L8.55227 9.49507L6.66667 7.60947L4.78105 9.49507L3.83824 8.55227L5.72387 6.66667L3.83824 4.78105L4.78105 3.83824L6.66667 5.72387Z" fill="white" fillOpacity="0.9" />
          </svg>
        </div>
        <div className="modal-small_image">
          <img src="/images/header/img-modal.avif" width={380} height={434} alt="Virtual Coworker team — Top Virtual Assistant Company (Clutch)" loading="lazy" decoding="async" />
        </div>
        <div className="modal-small_info">
          <div className="modal-small_logo">
            <img src="/images/header/Client Logo.avif" width={184} height={61} alt="" loading="lazy" decoding="async" />
          </div>
          <h2 className="title-h5 white">At least get some free outsourcing advice</h2>
          <div className="modal-small_cta">
            <a className="cta-main" href="#consultation" onClick={close}>
              <span className="title-h5 fz-16 bold">Book A Free Consultation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
