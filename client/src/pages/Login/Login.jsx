import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import useAuth from '@hooks/useAuth';
import { validateEmail, validateRequired } from '@utils/validators';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { ROUTES } from '@constants/routes';

/**
 * Login page. On success, redirects to the page the user was trying
 * to reach before being sent to login (via ProtectedRoute), or to
 * the dashboard by default.
 */
function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const redirectTo = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {
      email: validateEmail(formData.email),
      password: validateRequired(formData.password, 'Password'),
    };
    setFieldErrors(errors);
    return Object.values(errors).every((err) => !err);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    try {
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-card border border-border bg-card p-8 shadow-card sm:p-10">
        <h1 className="text-pageTitle text-text-primary">Welcome Back</h1>
        <p className="mt-2 text-body text-text-secondary">
          Log in to access your favorites, comments, and profile.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            autoComplete="email"
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            autoComplete="current-password"
          />

          {submitError && (
            <div
              role="alert"
              className="rounded-input border border-danger/40 bg-danger/10 px-4 py-3 text-small text-danger"
            >
              {submitError}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" disabled={isLoading} className="mt-2">
            <FaLock size={14} />
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="mt-8 text-center text-small text-text-secondary">
          Don't have an account?{' '}
          <Link to={ROUTES.REGISTER} className="font-medium text-orange hover:text-orange-hover">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
