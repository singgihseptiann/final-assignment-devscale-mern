import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ComboBox } from '@/components/ui/combo-box';
import { EXPERIENCE_LEVEL_LABEL, JOB_TYPE_LABEL, PLACEMENT_TYPE_LABEL } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { useCreateJobForm } from './hooks/useCreateJobForm';
import { JobDescriptionInputSchema, useGenerateJobDescription } from '../hooks/useGenerateJobDescription';
import { JobFormSchemaType } from './schema/job';
import { useCreateJob } from './hooks/useCreateJob';

export default function CreateNewJobPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useCreateJobForm();
  const { mutateAsync: generateJobDescription, isPending: isGeneratingJobDescription } = useGenerateJobDescription();
  const { mutateAsync: createJob, isPending: isSubmitting } = useCreateJob();

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

  const handleCreateJob = async (formValue: JobFormSchemaType) => {
    try {
      await createJob(formValue);

      toast({
        title: 'Success!',
        description: 'Successfully create job',
      });

      navigate('/dashboard/recruiter/jobs');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Failed!',
        description: `Failed to submit job! ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mx-auto flex h-screen flex-col gap-4 overflow-scroll pb-12">
      <span>
        <h1 className="text-2xl font-bold">Create a New Job</h1>
        <h2 className="text-zinc-500">Let Our AI Work For You</h2>
      </span>

      <Card className="border-primary-500 pt-6">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateJob)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job title" {...field} />
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
                    <FormControl>
                      <Input
                        placeholder="Enter required skills"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleInputSkillKeyDown}
                      />
                    </FormControl>
                    <div className="flex flex-wrap items-center gap-2">
                      {field.value.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 whitespace-nowrap rounded-md bg-secondary-100 px-2 py-1 text-xs"
                        >
                          {skill}{' '}
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-auto p-0"
                            onClick={() => handleRemoveSkill(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
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
                      <Input placeholder="Enter location" {...field} />
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
                    </div>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/recruiter/jobs')}
                  disabled={isGeneratingJobDescription || isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-400"
                  disabled={isGeneratingJobDescription || isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

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
