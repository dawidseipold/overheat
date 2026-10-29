import * as React from "react";

import { cn } from "@/lib/utils";

import { Text } from "./typography";

// Pole formularza: etykieta + kontrolka + opis/błąd, z odstępem 8px między nimi
function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <Text variant="label" tone="muted" asChild>
      <label className={className} {...props} />
    </Text>
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <Text variant="body-sm" tone="secondary" className={className} {...props} />;
}

// Przyjmuje błędy prosto z TanStack Form (field.state.meta.errors): teksty albo obiekty z message
function FieldError({
  errors,
  className,
  ...props
}: React.ComponentProps<"p"> & {
  errors?: ReadonlyArray<string | { message?: string } | null | undefined>;
}) {
  const message = errors
    ?.map((error) => (typeof error === "string" ? error : error?.message))
    .find(Boolean);
  if (!message) return null;
  return (
    <Text variant="body-sm" tone="danger" role="alert" className={className} {...props}>
      {message}
    </Text>
  );
}

export { Field, FieldDescription, FieldError, FieldLabel };
