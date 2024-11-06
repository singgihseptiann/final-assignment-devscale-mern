import Container from '@/components/shared/container';
import vacancyImage from '../../../../assets/home/vacancy/vacancy.png';
import { Link } from 'react-router-dom';

export default function Vacancy() {
  return (
    <Container>
      <div className="my-10 flex flex-col items-center gap-10 md:flex-row">
        <div>
          <img src={vacancyImage} alt="Vacancy" className="w-full max-w-[450px]" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold">
            Available Vacancy <br />
            For You, <br />
            Only!
          </h1>
          <div className="flex flex-col items-center gap-2 pt-5 md:flex-row">
            <Link className="rounded-lg bg-secondary-500 px-4 py-2 text-white" to="/job-vacancy">
              Search Job
            </Link>
            <Link className="underline" to="/about">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
