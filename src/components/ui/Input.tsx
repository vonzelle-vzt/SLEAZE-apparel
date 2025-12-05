import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-cream/80 text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            w-full px-4 py-3 
            bg-cream/5 border border-cream/20 
            text-cream placeholder:text-cream/40 
            focus:outline-none focus:border-red 
            transition-colors
            ${error ? 'border-red' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red text-sm">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

