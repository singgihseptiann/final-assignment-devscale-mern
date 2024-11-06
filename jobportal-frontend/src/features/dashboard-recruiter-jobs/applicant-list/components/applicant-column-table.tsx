import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { APPLICATION_STATUS_LABEL } from '@/constants';
import { IApplication } from '@/types';

export const useApplicantColumn = (handleClickChangeStatus: (applicationId: string, status: string) => void) => {
  const applicantColumns: ColumnDef<IApplication>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Applied Date',
      cell: ({ row }) => <div>{new Date(row.getValue('createdAt')).toLocaleDateString()}</div>,
    },
    {
      accessorKey: 'userId.name',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const {
          userId: { name },
        } = row.original;
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: 'userId.email',
      header: 'Email',
      cell: ({ row }) => {
        const {
          userId: { email },
        } = row.original;
        return <div>{email}</div>;
      },
    },
    {
      accessorKey: 'resumeId.yearOfExperience',
      header: 'YoE',
      cell: ({ row }) => {
        const {
          resumeId: { yearOfExperience },
        } = row.original;
        return <div>{yearOfExperience} yrs</div>;
      },
    },
    {
      accessorKey: 'resumeId.education',
      header: 'Education',
      cell: ({ row }) => {
        const {
          resumeId: { education },
        } = row.original;
        return <div>{education}</div>;
      },
    },
    {
      accessorKey: 'relevancyScore',
      header: 'Relevancy Score',
      cell: ({ row }) => <div>{row.getValue('relevancyScore')}%</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <div>{APPLICATION_STATUS_LABEL[row.getValue('status') as string]}</div>,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }) => {
        const { _id, status } = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleClickChangeStatus(_id, status)}>
                <Pencil className="mr-2 h-4 w-4" />
                Change Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { applicantColumns };
};
