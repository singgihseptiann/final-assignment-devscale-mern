import React, { useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Lightbulb, Loader2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Editor } from '@/components/shared/editor';
import { EditorPreview } from '@/components/shared/editor-preview';
import { ComboBox } from '@/components/ui/combo-box';
import { EXPERIENCE_LEVEL_LABEL, JOB_TYPE_LABEL, PLACEMENT_TYPE_LABEL } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { JobDescriptionInputSchema, useGenerateJobDescription } from '../hooks/useGenerateJobDescription';
import { JobFormSchemaType } from '../create-job/schema/job';
import { useUpdateJob } from './hooks/useUpdateJob';
import { useGetJobDetails } from './hooks/useGetJobDetails';
import { useUpdateJobForm } from './hooks/useUpdateJobForm';
import { JobDetailsSkeleton } from './components/job-details-skeleton';

export default function RecruiterJobDetailsPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { jobId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') ?? false;

  const { data: jobDetails, isLoading: isLoadingJobDetails } = useGetJobDetails(jobId ?? '');

  const form = useUpdateJobForm(jobDetails?.data);
  const { mutateAsync: generateJobDescription, isPending: isGeneratingJobDescription } = useGenerateJobDescription();
  const { mutateAsync: updateJob, isPending: isSubmitting } = useUpdateJob(jobId ?? '');

  const btnAlertRef = React.useRef<HTMLButtonElement>(null);
  const [tempJobDescription, setTempJobDescription] = React.useState('');
  const [newSkill, setNewSkill] = React.useState('');
  const handleInputSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      const currentRequiredSkills = form.getValues('requiredSkills');

      form.setValue('requiredSkills', [...currentRequiredSkills, newSkill], { shouldValidate: true });
      setNewSkill('');
      e.preventDefault();
    }
  };

  const handleRemoveSkill = (removedIndex: number) => {
    const updatedRequiredSkills = [...form.getValues('requiredSkills')];
    updatedRequiredSkills.splice(removedIndex, 1);
    form.setValue('requiredSkills', updatedRequiredSkills, { shouldValidate: true });
  };

  const handleGenerateDescription = async () => {
    try {
      form.clearErrors();

      const { title, experienceLevel, requiredSkills } = form.getValues();

      const validationResult = JobDescriptionInputSchema.safeParse({ title, experienceLevel, requiredSkills });

      if (!validationResult.success) {
        validationResult.error.issues.forEach(({ path, message }) => {
          form.setError(path[0] as keyof JobFormSchemaType, { message, type: 'custom' });
        });
        return;
      }

      const res = await generateJobDescription({ title, experienceLevel, requiredSkills });
      setTempJobDescription(res.data);

      toast({ title: 'Success!', description: 'Successfully generete job description' });
      btnAlertRef.current?.click();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Failed!',
        description: `Failed to generate job description! ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const handleCopyJobDescription = () => {
    navigator.clipboard.writeText(tempJobDescription);
    toast({ title: 'Copied to clipboard' });
  };

  const handleUpdateJob = async (formValue: JobFormSchemaType) => {
    try {
      await updateJob(formValue);

      toast({
        title: 'Success!',
        description: 'Successfully update job',
      });

      queryClient.invalidateQueries({ queryKey: ['get-user-company'] });

      const queryParams = new URLSearchParams();
      queryParams.delete('edit');
      setSearchParams(queryParams);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Failed!',
        description: `Failed to update job! ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const toggleEditMode = useCallback(
    (value?: boolean) => {
      const queryParams = new URLSearchParams();

      if (value) {
        queryParams.set('edit', String(value));
        setSearchParams(queryParams);
      } else if (!value && jobDetails) {
        const {
          userId,
          companyId,
          title,
          experienceLevel,
          requiredSkills,
          description,
          type,
          placementType,
          location,
          status,
        } = jobDetails.data;

        form.reset({
          userId,
          companyId: companyId._id,
          title,
          experienceLevel,
          requiredSkills,
          description,
          type,
          placementType,
          location,
          status,
        });

        queryParams.delete('edit');
        setSearchParams(queryParams);
      }
    },
    [form, jobDetails, setSearchParams],
  );

  return (
    <div className="mx-auto flex h-screen flex-col gap-4 overflow-scroll pb-12">
      <span>
        <h1 className="text-2xl font-bold">Job Details</h1>
      </span>

      {isLoadingJobDetails ? (
        <JobDetailsSkeleton />
      ) : (
        <Card className="border-primary-500 pt-6">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateJob)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title" disabled={!isEdit} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <FormControl>
                        <ComboBox
                          placeholder="Select experience level"
                          options={Object.entries(EXPERIENCE_LEVEL_LABEL).map(([value, label]) => ({ value, label }))}
                          disabled={!isEdit}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requiredSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      {isEdit && (
                        <FormControl>
                          <Input
                            placeholder="Enter required skills"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={handleInputSkillKeyDown}
                            disabled={!isEdit}
                          />
                        </FormControl>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        {field.value.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 whitespace-nowrap rounded-md bg-secondary-100 px-2 py-1 text-xs"
                          >
                            {skill}{' '}
                            {isEdit && (
                              <Button
                                type="button"
                                variant="ghost"
                                className="h-auto p-0"
                                onClick={() => handleRemoveSkill(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <ComboBox
                          placeholder="Select job type"
                          options={Object.entries(JOB_TYPE_LABEL).map(([value, label]) => ({ value, label }))}
                          disabled={!isEdit}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="placementType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placement Type</FormLabel>
                      <FormControl>
                        <ComboBox
                          placeholder="Select placement type"
                          options={Object.entries(PLACEMENT_TYPE_LABEL).map(([value, label]) => ({ value, label }))}
                          disabled={!isEdit}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" disabled={!isEdit} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col items-center justify-between md:flex-row">
                        <FormLabel>Description</FormLabel>
                        {isEdit && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                size="icon"
                                className="bg-secondary-500 hover:bg-secondary-400"
                                onClick={handleGenerateDescription}
                                disabled={isGeneratingJobDescription}
                              >
                                {isGeneratingJobDescription ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Lightbulb className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Generate Description using AI</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <FormControl>
                        {isEdit ? <Editor {...field} /> : <EditorPreview value={field.value} />}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  {isEdit ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => toggleEditMode(false)}
                        disabled={isGeneratingJobDescription || isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        key="btn-submit"
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-400"
                        disabled={isGeneratingJobDescription || isSubmitting}
                      >
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="button" variant="outline" onClick={() => navigate('/dashboard/recruiter/jobs')}>
                        Cancel
                      </Button>
                      <Button
                        key="btn-edit"
                        type="button"
                        className="bg-primary-500 hover:bg-primary-400"
                        onClick={() => toggleEditMode(true)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Dialog to show generated job description */}
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" ref={btnAlertRef} className="hidden">
            Open
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generated Job Description</DialogTitle>
            <DialogDescription>
              Copy and paste the following job description into the editor provided!
            </DialogDescription>
          </DialogHeader>
          <div className="text-muted-foreground relative mt-4 h-96 max-h-96 w-full overflow-scroll rounded-md bg-white p-3">
            {tempJobDescription}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleCopyJobDescription}
              className="bg-secondary-800 hover:bg-secondary-700"
            >
              Copy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
