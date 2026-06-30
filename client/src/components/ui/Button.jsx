import { forwardRef } from 'react';

const VARIANT_CLASSES = {
  primary:
    'bg-orange text-white hover:bg-orange-hover hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-transparent border border-orange text-orange hover:bg-orange/10 hover:-translate-y-0.5',
  danger: 'bg-danger text-white hover:brightness-110 hover:-translate-y-0.5',
  success: 'bg-success text-white hover:brightness-110 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface',
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-small',
  md: 'px-6 py-3 text-body',
  lg: 'px-8 py-4 text-body',
};

/**
 * Reusable button component following ViceHub UI guidelines.
 * Primary: orange fill. Secondary: orange outline. Danger/Success: status colors.
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      type = 'button',
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-btn font-semibold
          transition-all duration-base ease-out
          shadow-btn
          disabled:cursor-not-allowed disabled:bg-surface disabled:text-text-muted disabled:border-none disabled:hover:translate-y-0
          ${VARIANT_CLASSES[variant]}
          ${SIZE_CLASSES[size]}
          ${className}
        `}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
