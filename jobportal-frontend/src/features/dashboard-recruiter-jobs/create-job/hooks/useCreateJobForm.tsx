import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormSchema, JobFormSchemaType } from '../schema/job';
import { JOB_STATUS } from '@/constants';

export function useCreateJobForm() {
  const form = useForm<JobFormSchemaType>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      title: '',
      experienceLevel: '',
      requiredSkills: [],
      description: '',
      type: '',
      placementType: '',
      location: '',
      status: JOB_STATUS.DRAFT,
    },
  });

  return form;
}
