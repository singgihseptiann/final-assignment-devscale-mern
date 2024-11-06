import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobStatusSchema, JobStatusType } from '../schema';

export default function useJobStatusForm() {
  const form = useForm<JobStatusType>({
    resolver: zodResolver(JobStatusSchema),
    defaultValues: {
      jobId: '',
      status: '',
    },
  });

  return form;
}
