DEFINE TABLE OVERWRITE room_member SCHEMAFULL;

DEFINE FIELD OVERWRITE room_id ON room_member TYPE record<room>
  ASSERT record::exists($value)
  REFERENCE ON DELETE CASCADE;
DEFINE FIELD OVERWRITE player_id ON room_member TYPE record<player>
  ASSERT record::exists($value)
  REFERENCE ON DELETE CASCADE;
DEFINE FIELD OVERWRITE joined_at ON room_member TYPE datetime
  DEFAULT time::now() READONLY;
DEFINE FIELD OVERWRITE connection_state ON room_member TYPE 'connected' | 'disconnected'
  DEFAULT 'connected';
DEFINE FIELD OVERWRITE disconnected_at ON room_member TYPE datetime | null
  DEFAULT null;
DEFINE FIELD OVERWRITE is_ready ON room_member TYPE bool
  DEFAULT false;

-- Odpowiednik klucza głównego (room_id, player_id)
DEFINE INDEX OVERWRITE room_member_pk ON room_member FIELDS room_id, player_id UNIQUE;