import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EXPERIENCE_LEVEL_LABEL, JOB_STATUS_LABEL, JOB_TYPE_LABEL, PLACEMENT_TYPE_LABEL } from '@/constants';
import { IJob } from '@/types';

export const useJobColumn = (handleClickChangeStatus: (jobId: string, status: string) => void) => {
  const jobColumns: ColumnDef<IJob>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'experienceLevel',
      header: 'Experience Level',
      cell: ({ row }) => (
        <div className="capitalize">{EXPERIENCE_LEVEL_LABEL[row.getValue('experienceLevel') as string] ?? '-'}</div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => <div className="capitalize">{JOB_TYPE_LABEL[row.getValue('type') as string] ?? '-'}</div>,
    },
    {
      accessorKey: 'placementType',
      header: 'Placement',
      cell: ({ row }) => (
        <div className="capitalize">{PLACEMENT_TYPE_LABEL[row.getValue('placementType') as string] ?? '-'}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <div className="capitalize">{JOB_STATUS_LABEL[row.getValue('status') as string] ?? '-'}</div>,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }) => {
        const job = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link to={`/dashboard/recruiter/jobs/${job._id}`}>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Details
                </DropdownMenuItem>
              </Link>
              <Link to={`/dashboard/recruiter/jobs/${job._id}/applications`}>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Applications
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => handleClickChangeStatus(job._id, job.status)}>
                <Pencil className="mr-2 h-4 w-4" />
                Change Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { jobColumns };
};
