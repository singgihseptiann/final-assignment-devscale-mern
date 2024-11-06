import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useGetApplicantList } from '../hooks/useGetApplicantList';
import useApplicationStatusForm from '../hooks/useApplicantStatusForm';
import { ApplicationStatusType } from '../schema';
import { useUpdateApplicationStatus } from '../hooks/useUpdateApplicationStatus';
import { useApplicantColumn } from './applicant-column-table';
import { UpdateApplicationForm } from './update-application-form';

export default function RecruiterApplicantListPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: updateApplicationStatus, isPending: isUpdating } = useUpdateApplicationStatus();
  const form = useApplicationStatusForm();

  const dialogOpenRef = React.useRef<HTMLButtonElement>(null);
  const dialogCloseRef = React.useRef<HTMLButtonElement>(null);
  const handleClickChangeStatus = (applicationId: string, status: string) => {
    form.reset({ applicationId, status });
    dialogOpenRef.current?.click();
  };

  const handleSubmitUpdateStatus = async (formValue: ApplicationStatusType) => {
    try {
      console.log({ formValue });

      await updateApplicationStatus(formValue);

      toast({
        title: 'Success!',
        description: 'Successfully update application status',
      });

      form.reset();

      dialogCloseRef.current?.click();
      queryClient.invalidateQueries({ queryKey: ['applications', jobId] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Failed!',
        description: `Failed to update application status! ${error?.message}`,
        variant: 'destructive',
      });
    }
  };

  const { applicantColumns } = useApplicantColumn(handleClickChangeStatus);

  const { data: result } = useGetApplicantList(jobId || '');

  const table = useReactTable({
    data: result?.data ?? [],
    columns: applicantColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="w-full">
        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={applicantColumns.length} className="text-center">
                    No applicants available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog Change Applicant Status */}
      <UpdateApplicationForm
        form={form}
        onSubmit={handleSubmitUpdateStatus}
        isLoading={isUpdating}
        openRef={dialogOpenRef}
        closeRef={dialogCloseRef}
      />
    </>
  );
}
