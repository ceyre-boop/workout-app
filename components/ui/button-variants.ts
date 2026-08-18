import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "font-body inline-flex items-center justify-center gap-2 uppercase tracking-wide text-sm font-semibold rounded-app transition-colors disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:opacity-90 active:opacity-80",
        secondary:
          "bg-transparent text-text border border-border hover:border-primary hover:text-primary",
        ghost: "bg-transparent text-text-muted hover:text-text",
        destructive: "bg-danger text-white hover:opacity-90",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11 shrink-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);
