import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import useAuth from '@hooks/useAuth';
import { validateUsername, validateEmail, validatePassword } from '@utils/validators';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { ROUTES } from '@constants/routes';

/**
 * Register page. On success, the user is immediately logged in
 * (register() stores the token and sets user state) and redirected
 * to the dashboard.
 */
function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setFieldErrors(errors);
    return Object.values(errors).every((err) => !err);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    try {
      await register(formData);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-card border border-border bg-card p-8 shadow-card sm:p-10">
        <h1 className="text-pageTitle text-text-primary">Create Account</h1>
        <p className="mt-2 text-body text-text-secondary">
          Join ViceHub to save favorites and join the conversation.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
          <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            placeholder="VDude2026"
            value={formData.username}
            onChange={handleChange}
            error={fieldErrors.username}
            autoComplete="username"
          />

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
            placeholder="At least 8 characters, 1 number"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            autoComplete="new-password"
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
            <FaUserPlus size={14} />
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-8 text-center text-small text-text-secondary">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-orange hover:text-orange-hover">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
