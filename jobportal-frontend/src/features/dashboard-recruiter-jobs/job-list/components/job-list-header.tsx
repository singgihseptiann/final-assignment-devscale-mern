import { Button } from '@/components/ui/button';

import { Link } from 'react-router-dom';

export default function JobListHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Job List</h1>
      <Link to="/dashboard/recruiter/create/jobs">
        <Button className="bg-secondary-500 hover:bg-secondary-600">Create Job</Button>
      </Link>
    </div>
  );
}
