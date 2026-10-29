import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircleIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-transparent font-heading text-button font-bold uppercase tracking-button transition-colors duration-(--motion-micro) outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-35 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Biały CTA, np. "+ CREATE ROOM"
        default:
          "border-primary bg-primary text-primary-foreground hover:border-oh-plasma hover:bg-oh-plasma",
        // Fioletowa ramka, np. "→ JOIN ROOM"
        outline:
          "border-oh-violet bg-oh-base text-foreground hover:border-oh-plasma hover:bg-oh-violet/25",
        // Ciemny z ramką, np. "SETTINGS"
        secondary:
          "border-border bg-transparent text-foreground hover:border-oh-plasma hover:bg-oh-violet/25",
        destructive: "border-destructive bg-destructive text-oh-void hover:bg-destructive/90",
        ghost: "text-foreground hover:bg-accent",
        link: "text-oh-violet underline-offset-4 hover:text-oh-plasma hover:underline",
      },
      size: {
        default: "h-12 px-6", // 48px, minimalny touch target z design systemu
        lg: "h-14 px-8",
        sm: "h-10 px-4", // tylko tam, gdzie nie klika się palcem (gęste panele desktop)
        icon: "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <LoaderCircleIcon className="animate-spin" />}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
