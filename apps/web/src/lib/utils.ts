import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge musi znać tokeny z index.css, inaczej np. text-h1 uzna za kolor
// i usunie go przy text-foreground. Nowy token rozmiaru/fontu/trackingu dopisz też tutaj.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "button", "label", "body", "body-sm", "data"],
      font: ["display", "heading", "data"],
      tracking: ["label", "button"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
