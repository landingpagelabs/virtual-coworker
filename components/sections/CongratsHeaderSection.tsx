interface CongratsHeaderSectionProps {
  section: {
    badgeText?: string;
  };
}

// Minimal congrats-page nav: logo + "CONSULTATION BOOKED!" pill. Replaces the
// standard Header on this page (PageBuilder skips <Header /> when present).
export default function CongratsHeaderSection({ section }: CongratsHeaderSectionProps) {
  return (
    <header className="congrats-nav">
      <div className="padding-global">
        <div className="container-large">
          <div className="congrats-nav_wrapper">
            <img
              className="congrats-nav_logo"
              src="/images/sections/congrats/congrats-logo.svg"
              alt="Virtual Coworker"
            />
            <div className="congrats-nav_badge">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 8L6 11.5L12.5 4" stroke="#12A557" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{section.badgeText || 'CONSULTATION BOOKED!'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
