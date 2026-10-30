import { DateTime, eq, RecordId, Table, Uuid } from "surrealdb";
import * as v from "valibot";
import { db } from "./client";

type ObjectSchema = v.ObjectSchema<any, any>;

export function createRepo<Row extends ObjectSchema, Create extends ObjectSchema>(
  name: string,
  schemas: {
    row: Row;
    create: Create;
    /** Klucze obce: pole -> tabela, na którą wskazuje (w API to UUID, w bazie referencja) */
    refs?: Record<string, string>;
  },
) {
  type RowT = v.InferOutput<Row>;
  const table = new Table(name);
  const refs = schemas.refs ?? {};

  // Pola z isoTimestamp to w bazie typ datetime, więc tekst trzeba zamienić na DateTime
  const hasTimestamp = (s: any): boolean =>
    s?.type === "nullable" ? hasTimestamp(s.wrapped) : !!s?.pipe?.some((a: any) => a.type === "iso_timestamp");

  const toDbValue = (field: string, val: unknown) => {
    if (typeof val !== "string") return val;
    if (refs[field]) return new RecordId(refs[field], new Uuid(val));
    if (hasTimestamp(schemas.row.entries[field])) return new DateTime(val);
    return val;
  };
  const toDb = (data: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(data).map(([k, val]) => [k, toDbValue(k, val)]));

  const key = (id: string) => {
    try {
      return new RecordId(name, new Uuid(id));
    } catch {
      return null;
    }
  };

  const toRow = (raw: any): RowT => {
    const plain = JSON.parse(JSON.stringify(raw));
    plain.id = String(raw.id.id);
    for (const field of Object.keys(refs)) plain[field] = String(raw[field].id);
    return v.parse(schemas.row, plain);
  };

  const list = async (opts: { where?: Partial<RowT>; limit?: number; start?: number } = {}) => {
    let q = db.select(table);
    for (const [field, value] of Object.entries(opts.where ?? {})) {
      q = q.where(eq(field, toDbValue(field, value)));
    }
    if (opts.limit) q = q.limit(opts.limit);
    if (opts.start) q = q.start(opts.start);
    return (await q).map(toRow);
  };

  return {
    list,

    async find(where: Partial<RowT>) {
      return (await list({ where, limit: 1 }))[0] ?? null;
    },

    async get(id: string) {
      const k = key(id);
      const row = k && (await db.select(k));
      return row ? toRow(row) : null;
    },

    async create(data: v.InferInput<Create>) {
      const input = v.parse(schemas.create, data);
      const row = await db.create(new RecordId(name, Uuid.v7())).content(toDb(input));
      return toRow(row);
    },

    async update(id: string, patch: Partial<Omit<RowT, "id">>) {
      const k = key(id);
      if (!k) return null;
      const { id: _ignored, ...input } = v.parse(v.partial(schemas.row), patch);
      const row = await db.update(k).merge(toDb(input));
      return row ? toRow(row) : null;
    },

    async remove(id: string) {
      const k = key(id);
      const row = k && (await db.delete(k));
      return row ? toRow(row) : null;
    },
  };
}