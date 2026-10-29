import { Surreal } from "surrealdb";
import { env } from "../env";

export const db = new Surreal();

export async function connectDb() {
  await db.connect(env.SURREAL_URL, {
    namespace: env.SURREAL_NAMESPACE,
    database: env.SURREAL_DATABASE,
    authentication: { username: env.SURREAL_USER, password: env.SURREAL_PASS },
  });

  return db;
}
