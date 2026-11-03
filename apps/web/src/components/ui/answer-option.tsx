import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const answerOptionVariants = cva(
  "flex w-full items-center gap-4 rounded-md border p-4 text-left font-sans text-body text-foreground transition-colors duration-(--motion-micro) outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none",
  {
    variants: {
      state: {
        default: "border-border bg-card hover:border-oh-plasma/50",
        selected: "border-oh-violet bg-oh-violet/15",
        correct: "border-oh-success bg-oh-success/15",
        wrong: "border-oh-danger bg-oh-danger/15",
      },
    },
    defaultVariants: { state: "default" },
  },
);

// Ikona po prawej stronie dla stanów innych niż domyślny
const stateIndicators = {
  selected: { Icon: CheckIcon, className: "text-oh-plasma" },
  correct: { Icon: CheckIcon, className: "text-oh-success" },
  wrong: { Icon: XIcon, className: "text-oh-danger" },
};

function AnswerOption({
  className,
  state,
  letter,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof answerOptionVariants> & { letter: string }) {
  const indicator = state && state !== "default" ? stateIndicators[state] : null;
  return (
    <button
      type="button"
      aria-pressed={state === "selected"}
      className={cn(answerOptionVariants({ state, className }))}
      {...props}
    >
      <span className="font-data font-bold text-oh-plasma">{letter}</span>
      <span className="min-w-0">{children}</span>
      {indicator && <indicator.Icon className={cn("ml-auto size-4 shrink-0", indicator.className)} />}
    </button>
  );
}

export { AnswerOption, answerOptionVariants };
