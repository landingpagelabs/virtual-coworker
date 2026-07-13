import { imageUrl } from '@/lib/content';

type SanityImage = { _key?: string; asset?: { _ref?: string } } & Record<string, unknown>;

interface AboutSectionProps {
  section: {
    title?: string;
    subtitle?: string;
    starQuotes?: string[];
    galleryImages?: SanityImage[];
    mainImage?: SanityImage;
    ctaText?: string;
    ctaQuote?: string;
    ctaAuthor?: string;
  };
}

const StarRow = () => (
  <svg width="84" height="15" viewBox="0 0 84 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0, 17.016, 34.032, 51.048, 68.068].map((x, i) => (
      <path key={i} fillRule="evenodd" clipRule="evenodd"
        d={`M${(6.5896 + x).toFixed(4)} 0.612661C${(6.92936 + x).toFixed(4)} -0.20422 ${(8.08656 + x).toFixed(4)} -0.204221 ${(8.42632 + x).toFixed(4)} 0.612661L${(10.0041 + x).toFixed(4)} 4.40605L${(14.0994 + x).toFixed(4)} 4.73437C${(14.9813 + x).toFixed(4)} 4.80507 ${(15.3389 + x).toFixed(4)} 5.90563 ${(14.6669 + x).toFixed(4)} 6.4812L${(11.5468 + x).toFixed(4)} 9.15396L${(12.5 + x).toFixed(4)} 13.1503C${(12.7053 + x).toFixed(4)} 14.0108 ${(11.7691 + x).toFixed(4)} 14.691 ${(11.0141 + x).toFixed(4)} 14.2299L${(7.50796 + x).toFixed(4)} 12.0883L${(4.00182 + x).toFixed(4)} 14.2299C${(3.2468 + x).toFixed(4)} 14.691 ${(2.31061 + x).toFixed(4)} 14.0108 ${(2.51589 + x).toFixed(4)} 13.1503L${(3.46915 + x).toFixed(4)} 9.15396L${(0.348974 + x).toFixed(4)} 6.4812C${(-0.322933 + x).toFixed(4)} 5.90564 ${(0.0346585 + x).toFixed(4)} 4.80507 ${(0.916552 + x).toFixed(4)} 4.73437L${(5.01184 + x).toFixed(4)} 4.40605L${(6.5896 + x).toFixed(4)} 0.612661Z`}
        fill="#FCC100" />
    ))}
  </svg>
);

const CtaSvg = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9775 4.30176H2.22266L7.24452 12.9999L2.22266 21.698H7.9775L12.9994 12.9999L7.9775 4.30176Z" fill="black" />
    <path d="M18.7548 4.30176H13L18.0219 12.9999L13 21.698H18.7548L23.7767 12.9999L18.7548 4.30176Z" fill="black" />
  </svg>
);

const FALLBACK_GALLERY = ['Chat Bubble 1', 'Chat Bubble 4', 'Chat Bubble 5'];

export default function AboutSection({ section }: AboutSectionProps) {
  const starQuotes = section.starQuotes?.length
    ? section.starQuotes
    : ['Exactly what I needed', 'Feels like part of the team'];

  const gallery = section.galleryImages?.length ? section.galleryImages : null;

  const mainImageUrl =
    imageUrl(section.mainImage) ?? '/images/sections/cs/Agent Panel (1).png';

  return (
    <section className="about">
      <div className="padding-global">
        <div className="container-large">
          <div className="about_wrapper">
            <div className="about_stars">
              <div className="about_star">
                <StarRow />
                <p className="text-body-regular white">&ldquo;{starQuotes[0]}&rdquo;</p>
              </div>
              <div className="about_star d-none">
                <StarRow />
                <p className="text-body-regular white">&ldquo;{starQuotes[1] ?? starQuotes[0]}&rdquo;</p>
              </div>
            </div>

            <div className="about_title-wrap">
              <h2 className="title-h2 white">
                {section.title ||
                  'Fill that key role with a great offshore hire for an 80% discount and without the HR hassles'}
              </h2>
            </div>
            <div className="about_subtitle-wrap">
              <p className="text-body-regular white">
                {section.subtitle ||
                  'More work than your team can handle? Hiring locally means months of recruiting, weeks of paid leave, and a $70k+ salary. A Virtual Coworker joins your team full-time or part-time, works your hours, and is dedicated to your business. Each one is recruited for your exact role with years already in it, and the payroll, HR, and paperwork all run through us. With 600,000 professionals in our network, most roles fill within days. And if the fit\'s ever wrong, we replace them free.'}
              </p>
            </div>

            <div className="about_list">
              <div className="about_list-left">
                {gallery
                  ? gallery.map((img, i) => (
                      <div className="about-image" key={img._key ?? i}>
                        <img src={imageUrl(img) ?? ''} alt="" />
                      </div>
                    ))
                  : FALLBACK_GALLERY.map((name) => (
                      <div className="about-image" key={name}>
                        <img src={`/images/sections/cs/${name}.png`} alt="" />
                      </div>
                    ))}
              </div>
              <div className="about_list-right">
                <div className="about_image-right">
                  <img src={mainImageUrl} alt="" />
                </div>
              </div>
            </div>

            <div className="cta-block">
              <a className="cta-main" href="#consultation">
                <span className="title-h5">Book Your Free Consultation</span>
                <CtaSvg />
              </a>
              <p className="cta-text">
                {section.ctaText ||
                  'Every hire is backed by our lifetime replacement guarantee. Plus, it\'s 100% free to get started, and you don\'t pay until your new team member starts work'}
              </p>
              <div className="work_qoute-wrap">
                <div className="work-qoute_image-2">
                  <img className="work-qoute_img" src="/images/sections/reviews/123.png" alt="" />
                </div>
                <div className="work-qoute_right">
                  <p className="text-body-regular is-white">
                    &ldquo;{section.ctaQuote ||
                      'We were so pleased with the quality of our first hire that we quickly sought out a second'}&rdquo;
                  </p>
                  <p className="text-label-double-extra-small is-gray">
                    {section.ctaAuthor || 'Paul Slezak · Cofounder, RecruitLoop'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
