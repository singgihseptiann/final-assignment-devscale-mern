import Banner from './components/banner';
import Hero from './components/hero';
import Vacancy from './components/vacancy';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Vacancy />
      <Banner />
    </div>
  );
}
