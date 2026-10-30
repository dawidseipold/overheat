DEFINE TABLE OVERWRITE player SCHEMAFULL;

DEFINE FIELD OVERWRITE nickname ON player TYPE string
  ASSERT string::len($value) >= 1 AND string::len($value) <= 32;
DEFINE FIELD OVERWRITE created_at ON player TYPE datetime
  DEFAULT time::now() READONLY;
DEFINE FIELD OVERWRITE last_seen_at ON player TYPE datetime
  DEFAULT time::now();
