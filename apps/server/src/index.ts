import { app } from "./app";
import { connectDb } from "./db/client";
import { env } from "./env";

await connectDb();
app.listen(env.PORT);

console.log(`🦊 Server: http://${app.server?.hostname}:${app.server?.port}/api/health`);
