import { DynamicMonth, DynamicYear } from '@/components/DynamicMonth';

const AWARD_DIMS: Record<number, [number, number]> = {1: [102, 103], 2: [102, 102], 3: [97, 97], 4: [102, 110], 5: [102, 102], 6: [102, 102]};

interface FooterProps {
  /** Congrats pages drop the whole CTA row (button + limited-spots pointer) —
      the visitor just booked, and #consultation doesn't exist there. Matches
      the MegaFooter instance on the congrats Figma frame (5252:34322). */
  hideCta?: boolean;
}

export default function Footer({ hideCta }: FooterProps) {

  return (
    <footer className="footer">
      <div className="footer_rgb" />
      <div className="padding-global">
        <div className="container-large">
          <div className="footer_wrapper">

            <div className="footer_head">
              <div className="footer-head_top">
                <div className="footer_image">
                  <img className="footer_img" src="/images/footer/footer_logo.svg" alt="Virtual Coworker" loading="lazy" decoding="async" />
                </div>
                <div className="footer_text-wrap">
                  <p className="text-body-regular is-white">
                    Virtual Coworker is the staffing agency businesses trust to put the Philippines&apos; best talent on
                    their team. For the last 15 years we&apos;ve been recruiting, managing, and training top offshore
                    professionals. Every hire is custom-recruited for your exact role, works your hours, and is backed
                    by our lifetime replacement guarantee. Book your free consultation today, and don&apos;t pay anything
                    until your new team member starts.
                  </p>
                </div>
              </div>
              {!hideCta && (
              <div className="footer-head_down">
                <a href="#consultation" className="footer_cta-wrap">
                  <button className="cta-main max-content">
                    <span className="title-h5">Book Your Free Consultation</span>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.9775 4.30176H2.22266L7.24452 12.9999L2.22266 21.698H7.9775L12.9994 12.9999L7.9775 4.30176Z" fill="black" />
                      <path d="M18.7548 4.30176H13L18.0219 12.9999L13 21.698H18.7548L23.7767 12.9999L18.7548 4.30176Z" fill="black" />
                    </svg>
                  </button>
                </a>
                <div className="pointer-wrap">
                  <div className="pointer_dote-wrap" />
                  <div className="pointer_text-wrap">
                    <p className="text-label-extra-small is-white">
                      Limited Spots Available For <DynamicMonth />
                    </p>
                  </div>
                </div>
              </div>
              )}
            </div>

            <div className="footer_content-wrap">
              <div className="footer_content">
                <div className="footer-content_title-wrap">
                  <h3 className="text-label-large is-white">Awards:</h3>
                </div>
                <div className="footer-content_list">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <a key={n} href="#" className="item_footer-content">
                      <img className="item-footer-content_img" src={`/images/footer/award_${n}.avif`} width={AWARD_DIMS[n][0]} height={AWARD_DIMS[n][1]} loading="lazy" decoding="async" alt={`Award ${n}`} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="footer_content">
                <div className="footer-content_title-wrap">
                  <h3 className="text-label-large is-white">Features:</h3>
                </div>
                <div className="footer-content_list">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <a key={n} href="#" className="item_footer-content-second">
                      <img src={`/images/footer/secong_logo_${n}.avif`} loading="lazy" decoding="async" alt={`Feature logo ${n}`} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="footer_content">
                <div className="footer-content_title-wrap">
                  <h3 className="text-label-large is-white">Locations:</h3>
                </div>
                <div className="footer-content_list is-text">
                  <p className="text-label-extra-small is-white">
                    USA 888 964 8644<br />
                    750 N San Vicente Blvd.<br />
                    West Hollywood, CA 90069
                  </p>
                  <p className="text-label-extra-small is-white">
                    Australia 1300 886 740<br />
                    Level 8, 11 York Street<br />
                    Sydney NSW 2000
                  </p>
                </div>
              </div>
            </div>

            <div className="footer_down">
              <div className="item_footer-down">
                <div className="item-footer-down_image">
                  <img src="/images/footer/footer_bottom-icon.avif" width={96} height={96} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="item-footer-down_text-wrap">
                  <p className="text-label-extra-small is-white">Built By Landing Page Labs</p>
                </div>
              </div>
              <div className="item_footer-down">
                <div className="item-footer-down_text-wrap">
                  <p className="text-label-extra-small is-white">
                    <a href="https://virtualcoworker.com/privacy/" target="_blank" rel="noopener">Privacy Policy</a>
                  </p>
                </div>
              </div>
              <div className="item_footer-down">
                <div className="item-footer-down_text-wrap">
                  <p className="text-label-extra-small is-white">
                    Virtual Coworker Inc. © <DynamicYear />. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
