import JobListHeader from './components/job-list-header';
import { JobListTable } from './components/table-job-list';

export default function RecruiterJobListPage() {
  return (
    <div className="mx-auto flex h-screen flex-col gap-4 overflow-scroll pb-12">
      <JobListHeader />
      <JobListTable />
    </div>
  );
}
