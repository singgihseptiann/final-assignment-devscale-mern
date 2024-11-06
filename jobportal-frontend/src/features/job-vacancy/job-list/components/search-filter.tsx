import { Input } from '@/components/ui/input';
import FilterExperience from './filter-experience';
import FilterJobType from './filter-job-type';

const SearchFilter = () => {
  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h3 className="mb-4 text-lg font-bold">Search by Job Title</h3>
      <Input
        type="text"
        placeholder="Job title or company"
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <div className="mb-4">
        <FilterJobType />
      </div>

      <div>
        <FilterExperience />
      </div>
    </div>
  );
};

export default SearchFilter;
