DEFINE TABLE OVERWRITE message SCHEMAFULL;

DEFINE FIELD OVERWRITE user ON message TYPE string
  ASSERT string::len($value) >= 1 AND string::len($value) <= 32;
DEFINE FIELD OVERWRITE text ON message TYPE string
  ASSERT string::len($value) >= 1 AND string::len($value) <= 500;
DEFINE FIELD OVERWRITE created_at ON message TYPE datetime
  DEFAULT time::now() READONLY;