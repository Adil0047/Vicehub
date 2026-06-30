import { Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

/**
 * Phase 1 route map. Only Home and 404 are wired so far.
 * Cheats, Guides, News, Auth, Admin, etc. are added in later phases
 * per 07_DEVELOPMENT_PHASES.md — do not add stub routes ahead of schedule.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
