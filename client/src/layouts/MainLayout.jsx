import { Outlet } from 'react-router-dom';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

/**
 * Wraps all public-facing pages with the shared Navbar and Footer.
 * Page content renders via the nested route Outlet.
 */
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background-primary">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
