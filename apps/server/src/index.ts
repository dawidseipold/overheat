import { app } from "./app";
import { env } from "./env";

app.listen(env.PORT);

console.log(`🦊 Server: http://${app.server?.hostname}:${app.server?.port}/api/health`);
