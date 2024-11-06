import { NavLink, Outlet } from 'react-router-dom';
import { BriefcaseBusiness } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/use-logout';
import { useAuth } from '@/components/shared/auth-provider';
import { ROLE } from '@/constants';

export const DashboardLayout = () => {
  const { user } = useAuth();
  const { handleLogout, isPending } = useLogout();

  return (
    <div className="flex h-screen">
      <NavigationMenu className="flex flex-col justify-between border-slate-100 bg-gradient-to-b from-rose-50 to-rose-100 p-6">
        <NavigationMenuList className="flex w-[240px] flex-col gap-2">
          <NavigationMenuItem className="mb-4 flex w-full items-center gap-2 px-4 py-2">
            <BriefcaseBusiness size={28} />
            <span className="font-semibold">SeekYourJob</span>
          </NavigationMenuItem>

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => {
              return `${isActive ? 'bg-secondary-500' : 'bg-transparent'} w-full rounded-md px-4 py-2 text-sm font-medium hover:cursor-pointer hover:bg-secondary-400`;
            }}
          >
            Dashboard
          </NavLink>

          {user?.role === ROLE.RECRUITER && (
            <>
              <NavLink
                to="/dashboard/recruiter/company"
                end
                className={({ isActive }) => {
                  return `${isActive ? 'bg-secondary-500' : 'bg-transparent'} w-full rounded-md px-4 py-2 text-sm font-medium hover:cursor-pointer hover:bg-secondary-400`;
                }}
              >
                Company
              </NavLink>
              <NavLink
                to="/dashboard/recruiter/jobs"
                end
                className={({ isActive }) => {
                  return `${isActive ? 'bg-secondary-500' : 'bg-transparent'} w-full rounded-md px-4 py-2 text-sm font-medium hover:cursor-pointer hover:bg-secondary-400`;
                }}
              >
                Jobs
              </NavLink>
            </>
          )}

          {user?.role === ROLE.JOB_HUNTER && (
            <NavLink
              to="/dashboard/job-hunter/jobs"
              end
              className={({ isActive }) => {
                return `${isActive ? 'bg-secondary-500' : 'bg-transparent'} w-full rounded-md px-4 py-2 text-sm font-medium hover:cursor-pointer hover:bg-secondary-400`;
              }}
            >
              Applied Jobs
            </NavLink>
          )}
        </NavigationMenuList>

        <Button onClick={handleLogout} className="w-full bg-primary-500 hover:bg-primary-400" disabled={isPending}>
          Log Out
        </Button>
      </NavigationMenu>

      <main className="w-[calc(100vw-240px)] p-6">
        <Outlet />
      </main>

      <Toaster />
    </div>
  );
};
