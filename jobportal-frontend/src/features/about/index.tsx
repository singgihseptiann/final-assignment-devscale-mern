import Container from '@/components/shared/container';
import AboutUs from './components/about-us';
import HowItWorks from './components/HowItWorks';
import FindJobs from './components/find-jobs';

export default function AboutPage() {
  return (
    <>
      <AboutUs />
      <Container>
        <HowItWorks />
      </Container>
      <FindJobs />
    </>
  );
}
