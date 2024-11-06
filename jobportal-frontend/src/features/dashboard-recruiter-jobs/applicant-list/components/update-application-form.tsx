import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APPLICATION_STATUS_LABEL } from '@/constants';
import { ComboBox } from '@/components/ui/combo-box';
import { DialogHeader, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ApplicationStatusType } from '../schema';

interface Props {
  form: UseFormReturn<ApplicationStatusType>;
  isLoading: boolean;
  onSubmit: (value: ApplicationStatusType) => void;
  openRef: React.RefObject<HTMLButtonElement>;
  closeRef: React.RefObject<HTMLButtonElement>;
}
export const UpdateApplicationForm = ({ form, isLoading, onSubmit, openRef, closeRef }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={openRef} className="hidden">
          Open Dialog Change Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Application Status</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="applicationId"
              render={({ field }) => (
                <FormItem className="hidden grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Application ID</FormLabel>
                  <section className="col-span-3">
                    <FormControl>
                      <Input type="text" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </section>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Status</FormLabel>
                  <section className="col-span-3">
                    <FormControl>
                      <ComboBox
                        placeholder="Select new application status"
                        options={Object.entries(APPLICATION_STATUS_LABEL).map(([value, label]) => ({
                          value,
                          label,
                        }))}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </section>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button ref={closeRef} type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-primary-500 hover:bg-primary-400" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
