import Container from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <Container>
      <div className="my-10 rounded-lg bg-secondary-800 p-4 py-10">
        <h1 className="text-5xl font-semibold leading-tight text-white">Recruiter, Looking for applicants?</h1>
        <h1 className="mt-2 text-5xl font-semibold leading-tight text-white">
          Job Seeker, Searching for job Vacancies?
        </h1>
        <p className="mt-4 leading-relaxed text-gray-300">
          Our platform is built to connect recruiters with qualified candidates and job seekers with the best
          opportunities. Discover how easy it is to start your hiring or job search journey today, with powerful tools
          and resources at your fingertips.
        </p>
        <Link to="/job-vacancy">
          <Button className="mt-4 bg-secondary-500 hover:bg-secondary-400">Start your journey here!</Button>
        </Link>
      </div>
    </Container>
  );
}
