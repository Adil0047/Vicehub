import { Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import ProtectedRoute from '@components/common/ProtectedRoute';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Dashboard from '@pages/Dashboard';
import NotFound from '@pages/NotFound';

/**
 * Route map. Cheats, Guides, News, Vehicles, Weapons, Characters, Admin,
 * etc. are added in later phases per 07_DEVELOPMENT_PHASES.md — do not
 * add stub routes ahead of schedule.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
