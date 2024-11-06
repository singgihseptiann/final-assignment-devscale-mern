import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function JobDetailHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">You Have Applied To:</h1>
      <Link to="/job-vacancy">
        <Button className="bg-secondary-500 hover:bg-secondary-600">Apply More Jobs</Button>
      </Link>
    </div>
  );
}
