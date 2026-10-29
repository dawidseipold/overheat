DEFINE TABLE OVERWRITE player_session SCHEMAFULL;

DEFINE FIELD OVERWRITE player_id ON player_session TYPE record<player>
  ASSERT record::exists($value)
  REFERENCE ON DELETE CASCADE;
DEFINE FIELD OVERWRITE token_hash ON player_session TYPE string
  ASSERT string::len($value) >= 1;
DEFINE FIELD OVERWRITE created_at ON player_session TYPE datetime
  DEFAULT time::now() READONLY;
DEFINE FIELD OVERWRITE expires_at ON player_session TYPE datetime;

DEFINE INDEX OVERWRITE player_session_player ON player_session FIELDS player_id UNIQUE;
DEFINE INDEX OVERWRITE player_session_token ON player_session FIELDS token_hash UNIQUE;