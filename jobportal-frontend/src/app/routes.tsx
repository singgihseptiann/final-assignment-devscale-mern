import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/components/shared/auth-provider';
import { Layout } from '@/components/shared/layout';
import { DashboardLayout } from '@/components/shared/dashboard-layout';
import { ProtectedRoute } from '@/components/shared/protected-route';
import { ROLE } from '@/constants';
import HomePage from '@/features/home';
import LoginPage from '@/features/authentication/login';
import RegisterPage from '@/features/authentication/register';
import DashboardPage from '@/features/dashboard';
import JobVacancyPage from '@/features/job-vacancy/job-list';
import AboutPage from '@/features/about';
import ContactPage from '@/features/contact';
import DashboardRecruiterCampany from '@/features/dashboard-recruiter-company';
import RecruiterJobListPage from '@/features/dashboard-recruiter-jobs/job-list/recruiter-job-list';
import RecruiterJobDetailsPage from '@/features/dashboard-recruiter-jobs/job-details/recruiter-job-details';
import RecruiterApplicantListPage from '@/features/dashboard-recruiter-jobs/applicant-list/recruiter-applicant-list';
import JobHunterJobListPage from '@/features/dashboard-jobhunter-jobs/job-list/jobhunter-job-list';
import JobHunterJobDetailsPage from '@/features/dashboard-jobhunter-jobs/job-detail/jobhunter-job-details';
import RecruiterCreateJobPage from '@/features/dashboard-recruiter-jobs/create-job';
import NotFoundPage from '@/features/not-found';
import JobDetailPage from '@/features/job-vacancy/job-detail';

export const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  const isRecruiter = user?.role === ROLE.RECRUITER;
  const isJobHunter = user?.role === ROLE.JOB_HUNTER;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-vacancy" element={<JobVacancyPage />} />
          <Route path="/job-vacancy/:id" element={<JobDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAllowed={isAuthenticated}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Pages for Recruiter */}
          <Route
            path="/dashboard/recruiter/company"
            element={
              <ProtectedRoute isAllowed={isAuthenticated && isRecruiter}>
                <DashboardRecruiterCampany />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/recruiter/jobs"
            element={
              <ProtectedRoute isAllowed={isAuthenticated && isRecruiter}>
                <RecruiterJobListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/recruiter/jobs/:jobId"
            element={
              <ProtectedRoute isAllowed={isAuthenticated && isRecruiter}>
                <RecruiterJobDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/recruiter/jobs/:jobId/applications"
            element={
              <ProtectedRoute isAllowed={isAuthenticated && isRecruiter}>
                <RecruiterApplicantListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/recruiter/create/jobs"
            element={
              <ProtectedRoute isAllowed={isAuthenticated && isRecruiter}>
                <RecruiterCreateJobPage />
              </ProtectedRoute>
            }
          />

          {/* Pages for Job Hunter */}
          <Route
            path="/dashboard/job-hunter/jobs"
            element={
              <ProtectedRoute isAllowed={isAuthenticated && isJobHunter}>
                <JobHunterJobListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/job-hunter/jobs/:jobId"
            element={
              <ProtectedRoute isAllowed={isAuthenticated && isJobHunter}>
                <JobHunterJobDetailsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
