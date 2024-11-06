import ApplicantListHeader from './components/applicant-list-header';
import ApplicantListTable from './components/table-applicant-list';

export default function RecruiterApplicantListPage() {
  return (
    <div className="mx-auto flex h-screen flex-col gap-4 overflow-scroll pb-12">
      <ApplicantListHeader />
      <ApplicantListTable />
    </div>
  );
}
