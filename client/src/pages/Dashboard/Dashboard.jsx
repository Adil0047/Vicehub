import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import useAuth from '@hooks/useAuth';
import Button from '@components/ui/Button';
import { ROUTES } from '@constants/routes';

/**
 * Dashboard — landing page for authenticated users, and the destination
 * ProtectedRoute redirects to after login. Displays real account data
 * from AuthContext. Favorites, comments, and profile editing arrive in
 * Phase 4 per 07_DEVELOPMENT_PHASES.md; this page intentionally stays
 * scoped to what Phase 2 (authentication) actually delivers.
 */
function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="container-page py-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar}
            alt={`${user?.username}'s avatar`}
            className="h-16 w-16 rounded-full border border-border object-cover"
          />
          <div>
            <h1 className="text-pageTitle text-text-primary">Welcome, {user?.username}</h1>
            <p className="text-body text-text-secondary">{user?.email}</p>
          </div>
        </div>

        <Button variant="secondary" onClick={handleLogout}>
          <FaSignOutAlt size={14} />
          Log Out
        </Button>
      </div>

      <div className="mt-12 max-w-md">
        <div className="rounded-card border border-border bg-card p-6">
          <FaUserCircle className="text-orange" size={24} />
          <h2 className="mt-4 text-cardTitle text-text-primary">Account</h2>
          <dl className="mt-4 flex flex-col gap-2 text-small text-text-secondary">
            <div className="flex justify-between">
              <dt>Username</dt>
              <dd className="text-text-primary">{user?.username}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Email</dt>
              <dd className="text-text-primary">{user?.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Role</dt>
              <dd className="capitalize text-text-primary">{user?.role}</dd>
            </div>
            {memberSince && (
              <div className="flex justify-between">
                <dt>Member since</dt>
                <dd className="text-text-primary">{memberSince}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
