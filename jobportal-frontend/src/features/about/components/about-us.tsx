import { Button } from '@/components/ui/button';
import imgAbout from '../../../../assets/about/about.png';
import { Link } from 'react-router-dom';
export default function AboutUs() {
  return (
    <div className="">
      <section className="mx-auto w-[95%] rounded-3xl bg-secondary-100 p-8 md:p-16">
        <div className="mx-auto flex flex-col items-center justify-between md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 xl:text-8xl">
              A team of experts dedicated to your needs
            </h1>
            <p className="mb-6 text-lg text-gray-600">
              Whether you're a job seeker looking for your next opportunity or a recruiter searching for top talent, our
              platform is designed to meet your needs. We offer powerful tools and personalized support to make job
              searching and hiring more efficient and successful.
            </p>

            <Link to="/contact" className="space-x-4">
              <Button className="bg-secondary-500 text-white hover:bg-secondary-600">Contact us</Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <img src={imgAbout} alt="Team of experts dedicated to your needs" className="" />
          </div>
        </div>
      </section>
    </div>
  );
}
