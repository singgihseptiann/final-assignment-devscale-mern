import JobListHeader from './component/job-list-header';
import { JobListTable } from './component/table-job-list';

export default function JobHunterJobListPage() {
  return (
    <div className="mx-auto flex h-screen flex-col gap-4 overflow-scroll pb-12">
      <JobListHeader />
      <JobListTable />
    </div>
  );
}
