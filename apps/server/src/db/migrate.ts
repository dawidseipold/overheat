import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { db } from "./client";
import { env } from "../env";

const ns = env.SURREAL_NAMESPACE;
const dbName = env.SURREAL_DATABASE;
if (!ns || !dbName) {
  throw new Error(
    "Ustaw SURREAL_NAMESPACE i SURREAL_DATABASE w apps/server/.env",
  );
}

const dir = join(import.meta.dir, "../../db/schema");
const files = (await readdir(dir)).filter((f) => f.endsWith(".surql")).sort();

console.log(`→ ${env.SURREAL_URL} (ns: ${ns}, db: ${dbName})`);

// 1) Połącz się bez namespace/database i utwórz je, jeśli jeszcze nie istnieją
await db.connect(env.SURREAL_URL, {
  authentication: { username: env.SURREAL_USER, password: env.SURREAL_PASS },
});
await db.query(
  `DEFINE NAMESPACE IF NOT EXISTS \`${ns}\`;
   USE NS \`${ns}\`;
   DEFINE DATABASE IF NOT EXISTS \`${dbName}\`;`,
);

// 2) Zastosuj schematy po kolei. Każdy plik dostaje własne USE, więc nie zależy od stanu sesji.
for (const file of files) {
  const sql = await Bun.file(join(dir, file)).text();
  await db.query(`USE NS \`${ns}\` DB \`${dbName}\`;\n${sql}`);
  console.log(`✔ ${file}`);
}

const [, info] = await db.query<[unknown, { tables: Record<string, string> }]>(
  `USE NS \`${ns}\` DB \`${dbName}\`; INFO FOR DB;`,
);
console.log(`Tabele: ${Object.keys(info.tables).sort().join(", ")}`);

await db.close();
