import { forwardRef } from 'react';

/**
 * Reusable text input following UI guidelines section 10:
 * rounded, dark background, orange border on focus, muted placeholder.
 * Renders an inline error message beneath the field when `error` is set.
 */
const Input = forwardRef(({ label, id, error, className = '', ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-small font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          w-full rounded-input border bg-background-secondary
          px-4 py-3 text-body text-text-primary
          placeholder:text-text-muted
          transition-colors duration-base
          focus:outline-none focus:ring-2
          ${error ? 'border-danger focus:ring-danger/25' : 'border-border focus:border-orange focus:ring-orange/25'}
          ${className}
        `}
        {...rest}
      />
      {error && (
        <span id={`${id}-error`} className="text-small text-danger">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
