import { Button } from '@/components/ui/button';
import Bro from '../../../../assets/about/bro.png';
import { Link } from 'react-router-dom';

export default function FindJobs() {
  return (
    <section className="bg-secondary-100">
      <div className="flex flex-col-reverse items-center justify-between rounded-lg p-8 shadow-lg md:flex-row md:space-x-8">
        <div className="w-full text-center md:w-3/5 md:text-left">
          <h1 className="mb-4 text-5xl font-bold text-gray-800 md:text-6xl lg:text-8xl">
            Ready to find your dream job?
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Get started with our job search platform today and find the best opportunities tailored for you.
          </p>
          <Link to="/job-vacancy">
            <Button className="bg-secondary-500 px-6 py-3 text-lg hover:bg-secondary-600">Get Started</Button>
          </Link>
        </div>

        <div className="mb-6 w-full md:mb-0 md:w-2/5">
          <img src={Bro} alt="Find Jobs Illustration" className="h-auto w-full object-contain" />
        </div>
      </div>
    </section>
  );
}
