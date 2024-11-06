import React from 'react';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

const Footer: React.FC = () => {
  const getYear = new Date().getFullYear();
  return (
    <footer className="bg-black py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-10 md:flex-row">
          <div className="md:w-2/12">
            <h2 className="mb-2 text-lg font-bold">
              <span role="img" aria-label="job">
                💼
              </span>{' '}
              Seek Your Job
            </h2>
            <p></p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">Company</h2>
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="hover:underline">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:underline">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/for-job-seekers" className="hover:underline">
                  For Job Seekers
                </Link>
              </li>
              <li>
                <Link to="/for-recruiters" className="hover:underline">
                  For Recruiters
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between border-t border-gray-700 pt-4 text-center md:flex-row">
          <div>
            <p>© Copyright Job {getYear}.</p>
          </div>

          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
