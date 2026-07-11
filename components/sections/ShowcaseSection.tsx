interface ShowcaseSectionProps {
  section: {
    title?: string;
  };
}

const ITEMS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="#33DED8" strokeWidth="1.5" />
        <path d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z" stroke="#33DED8" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    problem: 'Too much work and not enough hands?',
    solution: 'Add a proven pro in days, without months of recruiting or the $70k salary.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9994 16.92V19.92C22.0006 20.1985 21.9435 20.4741 21.832 20.7293C21.7204 20.9845 21.5567 21.2136 21.3515 21.4018C21.1463 21.5901 20.904 21.7335 20.6402 21.8227C20.3764 21.9119 20.0968 21.945 19.8194 21.92C16.7423 21.5856 13.7864 20.5341 11.1894 18.85C8.77327 17.3146 6.72478 15.2661 5.18945 12.85C3.49942 10.2412 2.44769 7.27097 2.11944 4.17997C2.09446 3.90344 2.12732 3.62474 2.21595 3.3616C2.30457 3.09846 2.44702 2.85666 2.63421 2.6516C2.82141 2.44653 3.04925 2.28268 3.30324 2.1705C3.55722 2.05831 3.83179 2.00024 4.10945 1.99997H7.10945C7.59475 1.9952 8.06524 2.16705 8.43321 2.48351C8.80118 2.79996 9.04152 3.23942 9.10944 3.71997C9.23607 4.68004 9.47089 5.6227 9.80945 6.52997C9.94399 6.8879 9.97311 7.27689 9.89335 7.65086C9.8136 8.02482 9.62831 8.36809 9.35944 8.63998L8.08945 9.90997C9.513 12.4135 11.5859 14.4864 14.0894 15.91L15.3594 14.64C15.6313 14.3711 15.9746 14.1858 16.3486 14.1061C16.7225 14.0263 17.1115 14.0554 17.4694 14.19C18.3767 14.5285 19.3194 14.7634 20.2794 14.89C20.7652 14.9585 21.2088 15.2032 21.526 15.5775C21.8431 15.9518 22.0116 16.4296 21.9994 16.92Z" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    problem: 'Want more booked calls on the calendar?',
    solution: 'An Appointment Setter chases every lead and follow-up, so booked calls keep landing.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4.5H6C4.34315 4.5 3 5.84315 3 7.5V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V7.5C21 5.84315 19.6569 4.5 18 4.5Z" stroke="#33DED8" strokeWidth="1.5" />
        <path d="M8 2.5V6.5M16 2.5V6.5M3 9.5H21" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.5 14H10.5M13.5 14H15.5M8.5 17.5H10.5M13.5 17.5H15.5" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    problem: 'Admin and scheduling pile up across your team?',
    solution: 'A Virtual Assistant or EA takes the day-to-day, so your team gets back to high-value work.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 11H8M14 7H8" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    problem: 'Invoices, reconciliation, and reporting always behind?',
    solution: 'A Bookkeeper runs QuickBooks, invoicing, and follow-ups, so the books stay current and right.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 10.8045C17 10.4588 17 10.286 17.052 10.132C17.2032 9.68444 17.6018 9.51076 18.0011 9.32888C18.45 9.12442 18.6744 9.02219 18.8968 9.0042C19.1493 8.98378 19.4022 9.03818 19.618 9.15929C19.9041 9.31984 20.1036 9.62493 20.3079 9.87302C21.2513 11.0188 21.7229 11.5918 21.8955 12.2236C22.0348 12.7334 22.0348 13.2666 21.8955 13.7764C21.6438 14.6979 20.8485 15.4704 20.2598 16.1854C19.9587 16.5511 19.8081 16.734 19.618 16.8407C19.4022 16.9618 19.1493 17.0162 18.8968 16.9958C18.6744 16.9778 18.45 16.8756 18.0011 16.6711C17.6018 16.4892 17.2032 16.3156 17.052 15.868C17 15.714 17 15.5412 17 15.1955V10.8045Z" stroke="#33DED8" strokeWidth="1.5" />
        <path d="M7 10.8046C7 10.3694 6.98778 9.97821 6.63591 9.6722C6.50793 9.5609 6.33825 9.48361 5.99891 9.32905C5.55001 9.12458 5.32556 9.02235 5.10316 9.00436C4.43591 8.9504 4.07692 9.40581 3.69213 9.87318C2.74875 11.019 2.27706 11.5919 2.10446 12.2237C1.96518 12.7336 1.96518 13.2668 2.10446 13.7766C2.3562 14.6981 3.15152 15.4705 3.74021 16.1856C4.11129 16.6363 4.46577 17.0475 5.10316 16.996C5.32556 16.978 5.55001 16.8757 5.99891 16.6713C6.33825 16.5167 6.50793 16.4394 6.63591 16.3281C6.98778 16.0221 7 15.631 7 15.1957V10.8046Z" stroke="#33DED8" strokeWidth="1.5" />
        <path d="M5 9C5 5.68629 8.13401 3 12 3C15.866 3 19 5.68629 19 9" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
        <path d="M19 17V17.8C19 19.5673 17.2091 21 15 21H13" stroke="#33DED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    problem: 'Getting more support tickets than your team can handle?',
    solution: 'A Customer Service Specialist works the queue in your voice, so customers get fast replies.',
  },
];

export default function ShowcaseSection({ section }: ShowcaseSectionProps) {
  return (
    <section className="showcase">
      <div className="padding-global">
        <div className="container-large">
          <div className="showcase_wrapper">
            <div className="showcase_head">
              <div className="showcase_title-wrap">
                <h2 className="title-h2 is-white">
                  {section.title ||
                    "Here's how a Virtual Coworker grows your business without growing payroll"}
                </h2>
              </div>
            </div>
            <div className="showcase_list">
              {ITEMS.map((item, i) => (
                <div className="item_showcase" key={i}>
                  <div className="item-showcase_left">
                    <div className="item-showcase-left_icon-wrap">{item.icon}</div>
                    <div className="item-showcase-left_text-wrap">
                      <p className="text-label-medium is-white">{item.problem}</p>
                    </div>
                  </div>
                  <div className="item-showcase_line" />
                  <div className="item-showcase_right">
                    <p className="text-body-small is-offwhite">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="showcase_bottom">
              <p className="text-label-large is-offwhite">Plus, much, much more!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
