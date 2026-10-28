import { treaty } from "@elysiajs/eden";
import type { App } from "@app/server";

/**
 * Typowany klient API (Eden Treaty) — typy pochodzą bezpośrednio z backendu.
 * W dev żądania `/api/*` (w tym WebSocket) proxuje Vite.
 */
export const api = treaty<App>(window.location.origin);
