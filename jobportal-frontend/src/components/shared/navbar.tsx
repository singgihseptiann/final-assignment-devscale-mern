import { Link, NavLink } from 'react-router-dom';
import { BriefcaseBusiness, LayoutDashboard, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { useAuth } from '@/components/shared/auth-provider';
import { getFirstLetters } from '@/lib/strings';
import { useLogout } from '@/hooks/use-logout';

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { handleLogout } = useLogout();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex w-screen items-center justify-between px-16 py-6">
        <section>
          <NavigationMenuItem>
            <NavLink to="/" className="flex items-center gap-2">
              <BriefcaseBusiness size={28} />
              <span className="font-semibold">SeekYourJob</span>
            </NavLink>
          </NavigationMenuItem>
        </section>

        <section className="flex gap-5">
          <NavigationMenuItem>
            <NavLink
              to="/"
              end
              className={({ isActive }) => {
                return `hover:border-b-secondary-500 inline-flex h-10 items-center justify-center bg-transparent px-4 py-2 text-sm font-medium hover:border-b-2 ${isActive ? 'border-b-secondary-500 border-b-2' : 'border-b-0'}`;
              }}
            >
              Home
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/job-vacancy"
              end
              className={({ isActive }) => {
                return `hover:border-b-secondary-500 inline-flex h-10 items-center justify-center bg-transparent px-4 py-2 text-sm font-medium hover:border-b-2 ${isActive ? 'border-b-secondary-500 border-b-2' : 'border-b-0'}`;
              }}
            >
              Job Vacancy
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/about"
              end
              className={({ isActive }) => {
                return `hover:border-b-secondary-500 inline-flex h-10 items-center justify-center bg-transparent px-4 py-2 text-sm font-medium hover:border-b-2 ${isActive ? 'border-b-secondary-500 border-b-2' : 'border-b-0'}`;
              }}
            >
              About Us
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/contact"
              end
              className={({ isActive }) => {
                return `hover:border-b-secondary-500 inline-flex h-10 items-center justify-center bg-transparent px-4 py-2 text-sm font-medium hover:border-b-2 ${isActive ? 'border-b-secondary-500 border-b-2' : 'border-b-0'}`;
              }}
            >
              Contact Us
            </NavLink>
          </NavigationMenuItem>
        </section>

        <section className="flex gap-5">
          {isAuthenticated && user ? (
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border-none px-4 py-2 text-sm font-medium">
                  {/* <Button variant="outline" > */}
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.picture} />
                    <AvatarFallback className="bg-secondary-500">
                      {getFirstLetters(user.name).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                  {/* </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          ) : (
            <>
              <NavigationMenuItem>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-transparent"
                >
                  Login
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/register"
                  className="bg-secondary-500 hover:bg-secondary-400 inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium"
                >
                  Register
                </Link>
              </NavigationMenuItem>
            </>
          )}
        </section>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
