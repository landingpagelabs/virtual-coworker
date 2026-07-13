'use client';

import { useEffect, useRef } from 'react';

export function ModalSmall() {
  const modalRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    // Shows once, on the FIRST exit intent, then disappears after 15 seconds
    // (Figma annotation on node 5005:122460).
    let triggered = false;
    const show = () => {
      if (triggered) return;
      triggered = true;
      modal.classList.add('visible');
      hideTimer.current = window.setTimeout(() => modal.classList.remove('visible'), 15000);
      cleanup();
    };

    // Desktop exit-intent: the cursor heads toward the top of the window.
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) show();
    };

    // Mobile exit-intent: a fast upward scroll (no cursor to track).
    let lastY = window.scrollY;
    let lastT = Date.now();
    const onScroll = () => {
      const now = Date.now();
      const dy = window.scrollY - lastY;
      const dt = now - lastT;
      // Scrolled up faster than ~1.2px/ms after being at least a viewport deep.
      if (dy < 0 && dt > 0 && -dy / dt > 1.2 && lastY > window.innerHeight) show();
      lastY = window.scrollY;
      lastT = now;
    };

    const cleanup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
    document.addEventListener('mousemove', onMouseMove);
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
          <img src="/images/header/img-modal.png" alt="Virtual Coworker team — Top Virtual Assistant Company (Clutch)" />
        </div>
        <div className="modal-small_info">
          <div className="modal-small_logo">
            <img src="/images/header/Client Logo.png" alt="" />
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
