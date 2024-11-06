// src/components/JobList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { EXPERIENCE_LEVEL_LABEL, JOB_TYPE_LABEL, PLACEMENT_TYPE_LABEL } from '@/constants';
import { IJob } from '@/types/entity';
import { useGetJobs } from '../../hooks/useGetJob';
import { JobListSkeleton } from './JobListSkeleton';

export const JobList: React.FC = () => {
  const { data, isLoading, error } = useGetJobs();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <JobListSkeleton />
        <JobListSkeleton />
        <JobListSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching jobs: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data?.data.map((job: IJob) => (
        <Link key={job._id} to={`/job-vacancy/${job._id}`}>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={job.companyId.logo} />
                <AvatarFallback className="bg-zinc-200">
                  <Building size={30} />
                </AvatarFallback>
              </Avatar>
              <section>
                <CardTitle className="mb-1">{job.title}</CardTitle>
                <h4 className="text-zinc-400">
                  {job.companyId.name} &#x2022; {job.location}
                </h4>
                <p className="mb-2">
                  {PLACEMENT_TYPE_LABEL[job.placementType]} &#x2022; {JOB_TYPE_LABEL[job.type]} &#x2022;{' '}
                  {EXPERIENCE_LEVEL_LABEL[job.experienceLevel]}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 whitespace-nowrap rounded-md bg-zinc-200 px-2 py-1 text-xs"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </section>
              <section className="flex-auto">
                <p className="text-right">{new Date(job.createdAt).toLocaleDateString()}</p>
              </section>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
