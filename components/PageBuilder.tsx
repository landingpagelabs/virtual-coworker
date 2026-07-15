import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ModalSmall } from '@/components/ModalSmall';
import HeroSection from '@/components/sections/HeroSection';
import CsSection from '@/components/sections/CsSection';
import AboutSection from '@/components/sections/AboutSection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import TalentSection from '@/components/sections/TalentSection';
import ReasonsSection from '@/components/sections/ReasonsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import WorkSection from '@/components/sections/WorkSection';
import StepsSection from '@/components/sections/StepsSection';
import FinalSection from '@/components/sections/FinalSection';
import FaqSection from '@/components/sections/FaqSection';
import ProofBarSection from '@/components/sections/ProofBarSection';
import CongratsHeaderSection from '@/components/sections/CongratsHeaderSection';
import CongratsHeroSection from '@/components/sections/CongratsHeroSection';
import CongratsStepsSection from '@/components/sections/CongratsStepsSection';
import CongratsSocialSection from '@/components/sections/CongratsSocialSection';

interface Section {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

interface Page {
  title?: string;
  sections?: Section[];
}

interface PageBuilderProps {
  page: Page;
}

function renderSection(section: Section) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = { section: section as any };

  switch (section._type) {
    case 'heroSection':
      return <HeroSection {...props} />;
    case 'csSection':
      return <CsSection {...props} />;
    case 'aboutSection':
      return <AboutSection {...props} />;
    case 'capabilitiesSection':
      return <CapabilitiesSection {...props} />;
    case 'showcaseSection':
      return <ShowcaseSection {...props} />;
    case 'talentSection':
      return <TalentSection {...props} />;
    case 'reasonsSection':
      return <ReasonsSection {...props} />;
    case 'reviewsSection':
      return <ReviewsSection {...props} />;
    case 'workSection':
      return <WorkSection {...props} />;
    case 'stepsSection':
      return <StepsSection {...props} />;
    case 'finalSection':
      return <FinalSection {...props} />;
    case 'faqSection':
      return <FaqSection {...props} />;
    case 'proofBarSection':
      return <ProofBarSection {...props} />;
    case 'congratsHeaderSection':
      return <CongratsHeaderSection {...props} />;
    case 'congratsHeroSection':
      return <CongratsHeroSection {...props} />;
    case 'congratsStepsSection':
      return <CongratsStepsSection {...props} />;
    case 'congratsSocialSection':
      return <CongratsSocialSection {...props} />;
    default:
      return null;
  }
}

export default function PageBuilder({ page }: PageBuilderProps) {
  // The congrats pages bring their own minimal nav (logo + booked badge), so
  // the standard header is skipped there. The same flag drives everything
  // else that must NOT appear after a booking (Figma annotations 2026-07-15):
  // no exit-intent pop pitching a consultation they just booked, and no
  // footer CTA button (its #consultation anchor doesn't even exist there).
  const isCongrats = page.sections?.some((s) => s._type === 'congratsHeaderSection');
  return (
    <>
      {!isCongrats && <Header />}
      <main>
        {page.sections?.map((section) => (
          <div key={section._key}>
            {renderSection(section)}
          </div>
        ))}
      </main>
      <Footer hideCta={isCongrats} />
      {!isCongrats && <ModalSmall />}
    </>
  );
}
