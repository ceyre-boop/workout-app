import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const reactId = useId();
    const fieldId = id ?? reactId;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId}
          className="font-body text-xs font-semibold uppercase tracking-wide text-text-muted"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn(
            "font-body h-12 rounded-app border bg-surface px-4 text-sm text-text placeholder:text-text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            error ? "border-danger" : "border-border",
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={errorId} role="alert" className="font-body text-xs text-danger">
            {error}
          </p>
        ) : hint ? (
          <p className="font-body text-xs text-text-muted">{hint}</p>
        ) : null}
      </div>
    );
  },
);
Field.displayName = "Field";
