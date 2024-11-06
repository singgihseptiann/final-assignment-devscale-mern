import { useSearchParams } from 'react-router-dom';
import { Building, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CompanyCardSkeleton } from './components/company-card-skeleton';
import { useGetUserCompany } from './hooks/use-user-company';
import { useUpdateCompany } from './hooks/use-update-company';

export default function DashboardRecruiterCampany() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') ?? false;

  const { data: result, isLoading } = useGetUserCompany();

  const { form, mutation, handleSubmit } = useUpdateCompany(result?.data);
  const { control, reset } = form;
  const { isPending } = mutation;

  const toggleEditMode = (value?: boolean) => {
    const queryParams = new URLSearchParams();

    if (value) {
      queryParams.set('edit', String(value));
      setSearchParams(queryParams);
    } else {
      queryParams.delete('edit');
      setSearchParams(queryParams);

      reset({
        userId: result?.data.userId,
        name: result?.data.name,
        location: result?.data.location,
        industry: result?.data.industry,
        description: result?.data.description,
        logo: result?.data.logo,
      });
    }
  };

  return (
    <div className="mx-auto mt-16 flex w-3/5 flex-col gap-2">
      {!result && isLoading && <CompanyCardSkeleton />}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Form {...form}>
              <form className="flex w-full gap-2" onSubmit={handleSubmit}>
                <section className="flex w-1/4 justify-center">
                  <FormField
                    control={control}
                    name="logo"
                    render={({ field: { value } }) => (
                      <FormItem>
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={value} />
                          <AvatarFallback className="bg-secondary-500">
                            <Building size={60} />
                          </AvatarFallback>
                        </Avatar>
                      </FormItem>
                    )}
                  />
                </section>
                <section className="flex flex-auto flex-col gap-4">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company name" {...field} disabled={!isEdit} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company location" {...field} disabled={!isEdit} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company industry" {...field} disabled={!isEdit} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your company description" rows={1} {...field} disabled={!isEdit} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {isEdit ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Button type="button" variant="outline" onClick={() => toggleEditMode(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-primary-500 hover:bg-primary-400" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      className="bg-primary-500 hover:bg-primary-400"
                      onClick={() => toggleEditMode(true)}
                    >
                      Edit
                    </Button>
                  )}
                </section>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
