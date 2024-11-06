import Container from '@/components/shared/container';

import JobDetail from './components/job-detail';

export default function JobDetailPage() {
  return (
    <Container>
      <div className="py-10">
        <JobDetail />
      </div>
    </Container>
  );
}
