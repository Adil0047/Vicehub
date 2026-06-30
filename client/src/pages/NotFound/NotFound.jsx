import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Button from '@components/ui/Button';
import { ROUTES } from '@constants/routes';

/**
 * 404 page: dark illustration area, helpful message, home button.
 * Per UI guidelines section 26.
 */
function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div
        className="flex h-40 w-40 items-center justify-center rounded-full border border-border bg-surface"
        aria-hidden="true"
      >
        <span className="text-[64px] font-bold text-orange">404</span>
      </div>

      <h1 className="text-pageTitle text-text-primary">Page Not Found</h1>
      <p className="max-w-md text-body text-text-secondary">
        The page you're looking for doesn't exist or may have been moved. Let's get you back
        on track.
      </p>

      <Link to={ROUTES.HOME}>
        <Button variant="primary" size="md">
          <FaHome size={16} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
