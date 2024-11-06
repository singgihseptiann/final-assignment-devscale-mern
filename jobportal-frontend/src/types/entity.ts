import { z } from 'zod';

export const inputCompanySchema = z.object({
  userId: z.string(),
  name: z.string(),
  location: z.string(),
  industry: z.string(),
  description: z.string(),
  logo: z.string().optional(),
});

export type TInputCompany = z.infer<typeof inputCompanySchema>;

export interface ICompany extends TInputCompany {
  _id: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICompanySimple {
  _id: string;
  userId: string;
  name: string;
  location: string;
  industry: string;
  description: string;
  logo: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IJobSimple {
  _id: string;
  userId: string;
  companyId: string;
  title: string;
  description: string;
  requiredSkills: string[];
  experienceLevel: 'junior' | 'mid_level' | 'senior';
  type: 'full_time' | 'part_time' | 'contract' | 'internship';
  placementType: 'on_site' | 'remote' | 'hybrid';
  location?: string;
  status: 'draft' | 'published' | 'closed';
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IJob {
  _id: string;
  userId: string;
  companyId: ICompanySimple;
  title: string;
  description: string;
  experienceLevel: 'junior' | 'mid_level' | 'senior';
  requiredSkills: string[];
  type: 'full_time' | 'part_time' | 'contract' | 'internship';
  placementType: 'on_site' | 'remote' | 'hybrid';
  location: string;
  status: 'draft' | 'published' | 'closed';
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IResume {
  _id: string;
  userId: string;
  resumeText: string;
  skills: string[];
  yearOfExperience: number;
  education: string;
  createdAt: string;
  updatedAt: string;
}

export interface IApplication {
  _id: string;
  userId: IUser;
  jobId: IJob;
  resumeId: IResume;
  status: string;
  relevancyScore: number;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
}

export type TJobHunterApplication = Omit<IApplication, 'relevancyScore'>;

export interface IApplicationSimple {
  _id: string;
  userId: string;
  jobId: string;
  resumeId: string;
  status: string;
  relevancyScore: number;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
}