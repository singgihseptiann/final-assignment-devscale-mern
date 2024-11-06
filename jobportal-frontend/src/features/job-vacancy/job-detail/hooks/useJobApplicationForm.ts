import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobApplicationSchema, JobApplicationType } from '../schema';

export default function useJobApplicationForm() {
  const form = useForm<JobApplicationType>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      resumeText: '',
      skills: [],
      yearOfExperience: 0,
      education: '',
    },
  });

  return form;
}
