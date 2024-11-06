import React from 'react';
import pdfToText from 'react-pdftotext';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ComboBox } from '@/components/ui/combo-box';
import { EDUCATION_LABEL } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { JobApplicationType } from '../schema';
import useJobApplicationForm from '../hooks/useJobApplicationForm';
import { useApplyJob } from '../hooks/useApplyJob';

interface JobApplicationFormProp {
  jobId: string;
}

export const JobApplicationForm = ({ jobId }: JobApplicationFormProp) => {
  const { toast } = useToast();

  const { mutateAsync: applyJob, isPending: isApplying } = useApplyJob(jobId);
  const form = useJobApplicationForm();

  const handleUploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;

      const pdfFile = e.target.files[0];

      const text = await pdfToText(pdfFile);

      form.setValue('resumeText', text);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({ title: 'Failed', description: `Failed to upload resume file! ${error?.message}` });
    }
  };

  const [newSkill, setNewSkill] = React.useState('');
  const handleInputSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      const currentRequiredSkills = form.getValues('skills');

      form.setValue('skills', [...currentRequiredSkills, newSkill], { shouldValidate: true });
      setNewSkill('');
      e.preventDefault();
    }
  };

  const handleRemoveSkill = (removedIndex: number) => {
    const updatedRequiredSkills = [...form.getValues('skills')];
    updatedRequiredSkills.splice(removedIndex, 1);
    form.setValue('skills', updatedRequiredSkills, { shouldValidate: true });
  };

  const handleApplyJob = async (formValue: JobApplicationType) => {
    try {
      await applyJob(formValue);

      toast({
        title: 'Success!',
        description: 'Successfully apply job',
      });

      form.reset();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Failed!',
        description: `Failed to apply job! ${error?.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-500 hover:bg-primary-400">Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply The Job</DialogTitle>
          <DialogDescription>Complete the following data to apply for this job.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleApplyJob)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="resumeText"
              render={() => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Resume</FormLabel>
                  <section className="col-span-3">
                    <FormControl>
                      <Input type="file" accept=".pdf" onChange={handleUploadResume} />
                    </FormControl>
                    <FormMessage />
                  </section>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Skills</FormLabel>
                  <section className="col-span-3">
                    <FormControl>
                      <Input
                        placeholder="Enter your skills"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleInputSkillKeyDown}
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </section>
                  <div className="col-span-3 col-start-2 row-start-2 flex flex-wrap items-center gap-2">
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearOfExperience"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Year of Experience</FormLabel>
                  <section className="col-span-3">
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </section>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Education</FormLabel>
                  <section className="col-span-3">
                    <FormControl>
                      <ComboBox
                        placeholder="Select your last education"
                        options={Object.entries(EDUCATION_LABEL).map(([value, label]) => ({ value, label }))}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </section>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="bg-primary-500 hover:bg-primary-400" disabled={isApplying}>
                {isApplying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
