interface ProofBarSectionProps {
  section: {
    reviews?: string;
  };
}

const FiveStars = () => (
  <svg width="90" height="16" viewBox="0 0 90 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.1385 0.663695C7.50656 -0.221231 8.76016 -0.221232 9.12822 0.663694L10.8374 4.77307L15.2738 5.12873C16.2292 5.20532 16.6166 6.39756 15.8887 7.02107L12.5086 9.91647L13.5413 14.2457C13.7636 15.1779 12.7495 15.9148 11.9316 15.4152L8.13336 13.0953L4.33517 15.4152C3.51726 15.9148 2.50308 15.1779 2.72545 14.2457L3.75812 9.91647L0.378043 7.02107C-0.349833 6.39757 0.0375455 5.20533 0.9929 5.12873L5.42932 4.77307L7.1385 0.663695Z" fill="#FCC100" />
    <path fillRule="evenodd" clipRule="evenodd" d="M25.5721 0.663695C25.9402 -0.221231 27.1938 -0.221232 27.5618 0.663694L29.271 4.77307L33.7074 5.12873C34.6628 5.20532 35.0502 6.39756 34.3223 7.02107L30.9422 9.91647L31.9749 14.2457C32.1972 15.1779 31.1831 15.9148 30.3651 15.4152L26.567 13.0953L22.7688 15.4152C21.9508 15.9148 20.9367 15.1779 21.159 14.2457L22.1917 9.91647L18.8116 7.02107C18.0838 6.39757 18.4711 5.20533 19.4265 5.12873L23.8629 4.77307L25.5721 0.663695Z" fill="#FCC100" />
    <path fillRule="evenodd" clipRule="evenodd" d="M44.0057 0.663695C44.3738 -0.221231 45.6273 -0.221232 45.9954 0.663694L47.7046 4.77307L52.141 5.12873C53.0964 5.20532 53.4837 6.39756 52.7559 7.02107L49.3758 9.91647L50.4085 14.2457C50.6308 15.1779 49.6167 15.9148 48.7987 15.4152L45.0005 13.0953L41.2024 15.4152C40.3844 15.9148 39.3703 15.1779 39.5926 14.2457L40.6253 9.91647L37.2452 7.02107C36.5174 6.39757 36.9047 5.20533 37.8601 5.12873L42.2965 4.77307L44.0057 0.663695Z" fill="#FCC100" />
    <path fillRule="evenodd" clipRule="evenodd" d="M62.4393 0.663695C62.8073 -0.221231 64.0609 -0.221232 64.429 0.663694L66.1382 4.77307L70.5746 5.12873C71.53 5.20532 71.9173 6.39756 71.1895 7.02107L67.8094 9.91647L68.842 14.2457C69.0644 15.1779 68.0502 15.9148 67.2323 15.4152L63.4341 13.0953L59.636 15.4152C58.818 15.9148 57.8039 15.1779 58.0262 14.2457L59.0589 9.91647L55.6788 7.02107C54.9509 6.39757 55.3383 5.20533 56.2937 5.12873L60.7301 4.77307L62.4393 0.663695Z" fill="#FCC100" />
    <path fillRule="evenodd" clipRule="evenodd" d="M80.8709 0.663695C81.239 -0.221231 82.4926 -0.221232 82.8606 0.663694L84.5698 4.77307L89.0062 5.12873C89.9616 5.20532 90.349 6.39756 89.6211 7.02107L86.241 9.91647L87.2737 14.2457C87.4961 15.1779 86.4819 15.9148 85.664 15.4152L81.8658 13.0953L78.0676 15.4152C77.2497 15.9148 76.2355 15.1779 76.4579 14.2457L77.4905 9.91647L74.1105 7.02107C73.3826 6.39757 73.77 5.20533 74.7253 5.12873L79.1617 4.77307L80.8709 0.663695Z" fill="#FCC100" />
  </svg>
);

export default function ProofBarSection({ section }: ProofBarSectionProps) {
  return (
    <section className="proof-bar">
      <div className="padding-global">
        <div className="container-large">
          <div className="proof-bar_wrapper">
            <div className="proof-bar_left">
              <div className="proof-bar-left_text-wrap">
                <p className="proof-bar-left_text">{section.reviews || '400+'}</p>
              </div>
              <div className="proof-bar-left_stars-wrap">
                <FiveStars />
              </div>
            </div>
            <div className="proof-bar_text-wrap">
              <p className="proof-bar_text">
                Join 400+ businesses that trust Virtual Coworker to help them grow without the hefty overhead of local hires
              </p>
            </div>
            <div className="proof-bar_right">
              <div className="proof-bar_image-first">
                <img className="proof-bar_img-first" src="/images/sections/proof-bar/proof-bar-stack.avif" width={366} height={85} alt="proof bar people" loading="lazy" decoding="async" />
              </div>
              <div className="proof-bar_image-second">
                <img className="proof-bar_img-second" src="/images/sections/proof-bar/proof-bar-rating.png" width={251} height={87} alt="proof bar stars" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
