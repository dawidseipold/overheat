import * as v from "valibot";

export const UuidSchema = v.pipe(v.string(), v.uuid());
export const TimestampSchema = v.pipe(v.string(), v.isoTimestamp());