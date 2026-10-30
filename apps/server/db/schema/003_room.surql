DEFINE TABLE OVERWRITE room SCHEMAFULL;

DEFINE FIELD OVERWRITE code ON room TYPE string
  ASSERT string::len($value) >= 1 AND string::len($value) <= 16;
-- REJECT: nie da się usunąć gracza, który jest hostem pokoju
DEFINE FIELD OVERWRITE host_player_id ON room TYPE record<player>
  ASSERT record::exists($value)
  REFERENCE ON DELETE REJECT;
DEFINE FIELD OVERWRITE created_at ON room TYPE datetime
  DEFAULT time::now() READONLY;

DEFINE INDEX OVERWRITE room_code ON room FIELDS code UNIQUE;