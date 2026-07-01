import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { ROUTES } from '@constants/routes';

/**
 * Guards nested routes behind authentication. Redirects unauthenticated
 * users to Login, preserving the originally-requested location so Login
 * can send them back after a successful sign-in.
 *
 * Shows nothing (a blank frame) during the initial auth check on refresh,
 * to avoid a flash of the login page before the stored token is verified.
 */
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-orange"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
