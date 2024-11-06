import JobDetailHeader from './component/job-detail-header';
import { JobDetailTable } from './component/table-job-detail';

export default function JobHunterJobDetailsPage() {
  return (
    <div className="mx-auto flex h-screen flex-col gap-4 overflow-scroll pb-12">
      <JobDetailHeader />
      <JobDetailTable />
    </div>
  );
}
