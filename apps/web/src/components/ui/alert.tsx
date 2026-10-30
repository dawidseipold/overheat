import { CircleCheckIcon, CircleXIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "./badge";

// Każdy rodzaj komunikatu ma swoją ikonę i kolor plakietki
const alertVariants = {
  success: { Icon: CircleCheckIcon, badge: "success" },
  danger: { Icon: CircleXIcon, badge: "danger" },
  warning: { Icon: TriangleAlertIcon, badge: "warning" },
  info: { Icon: InfoIcon, badge: "accent" },
} as const;

function Alert({
  className,
  variant = "info",
  label,
  children,
  ...props
}: React.ComponentProps<"div"> & { variant?: keyof typeof alertVariants; label?: string }) {
  const { Icon, badge } = alertVariants[variant];
  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-between gap-3 rounded-sm border border-border bg-card p-3",
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-3 text-body-sm">
        <Icon className="size-4 shrink-0" />
        {children}
      </span>
      {label && <Badge variant={badge}>{label}</Badge>}
    </div>
  );
}

export { Alert };
