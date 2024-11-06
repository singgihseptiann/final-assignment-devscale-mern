import Container from '@/components/shared/container';
import SearchFilter from './components/search-filter';
import { JobList } from './components/JobList';

export default function JobVacancyPage() {
  return (
    <Container>
      <div className="flex flex-col gap-2 md:flex-row md:space-x-4 py-10">
        <div className="md:w-1/4">
          <SearchFilter />
        </div>
        <div className="md:w-3/4">
          <JobList />
        </div>
      </div>
    </Container>
  );
}
