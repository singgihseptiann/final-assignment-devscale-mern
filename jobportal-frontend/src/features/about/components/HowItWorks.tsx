import React from 'react';
import { Users, Briefcase, Search, HandshakeIcon } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start rounded-lg bg-secondary-100 p-6">
    <div className="b mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">{icon}</div>
    <div>
      <h3 className="mb-2 flex items-center text-xl font-semibold text-gray-900 dark:text-white">
        <span className="mr-2">{title}</span>
      </h3>
      <p className="text-base text-gray-500 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="rounded-3xl bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">How it works</h1>
        <p className="mx-auto mb-12 max-w-3xl text-center text-gray-600">
          At Seek Your Job, we are revolutionizing the way talent connects with opportunity through the power of
          Artificial Intelligence. Our platform leverages cutting-edge AI technology to streamline the hiring process,
          making it faster, smarter, and more efficient for both job seekers and employers.
        </p>
        <div className="-mx-4 grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-4">
          <StatItem
            icon={<Users size={32} />}
            title="Create Your Profile"
            description="Job seekers can easily create an account and set up a personalized profile."
          />
          <StatItem
            icon={<Briefcase size={32} />}
            title="For Employers: Post a Job"
            description="Employers can post job listings effortlessly. Our AI generates a comprehensive and tailored job description for you."
          />
          <StatItem
            icon={<Search size={32} />}
            title="Browse Opportunities"
            description="Explore AI-matched job listings tailored to your skills and preferences."
          />
          <StatItem
            icon={<HandshakeIcon size={32} />}
            title="Apply Seamlessly"
            description="Apply with a single click. Our streamlined process increases your chances of landing your dream job."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
