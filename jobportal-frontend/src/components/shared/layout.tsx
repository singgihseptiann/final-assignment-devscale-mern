import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/shared/navbar';
import { Toaster } from '@/components/ui/toaster';
import Footer from './footer';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};
