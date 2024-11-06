import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export default function SearchJob() {
  return (
    <div className="flex items-center justify-center">
      <Input placeholder="Job Title or Company" className="w-40 rounded-lg rounded-r-none py-7 outline-none" />
      <Button
        size="icon"
        className="w-40 rounded-lg rounded-l-none bg-secondary-500 py-7 hover:bg-secondary-400"
        aria-label="Icon Button"
      >
        <div className="flex items-center">
          <SearchIcon className="h-4 w-4" />
          <span className="ml-2">Search Job</span>
        </div>
      </Button>
    </div>
  );
}
