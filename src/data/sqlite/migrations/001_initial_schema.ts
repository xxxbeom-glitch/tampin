export const MIGRATION_001_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY NOT NULL,
  applied_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS routines (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'dirty',
  server_version INTEGER,
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS routine_exercises (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  routine_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  exercise_name_snapshot TEXT NOT NULL,
  recording_type TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'dirty',
  server_version INTEGER,
  deleted_at TEXT,
  FOREIGN KEY (routine_id) REFERENCES routines(id)
);

CREATE TABLE IF NOT EXISTS routine_set_templates (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  routine_exercise_id TEXT NOT NULL,
  set_index INTEGER NOT NULL,
  target_weight_kg REAL,
  target_reps INTEGER,
  target_duration_seconds INTEGER,
  target_assisted_weight_kg REAL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'dirty',
  server_version INTEGER,
  deleted_at TEXT,
  FOREIGN KEY (routine_exercise_id) REFERENCES routine_exercises(id)
);

CREATE TABLE IF NOT EXISTS workout_sessions (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  status TEXT NOT NULL,
  source_routine_id TEXT,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'dirty',
  server_version INTEGER,
  deleted_at TEXT,
  FOREIGN KEY (source_routine_id) REFERENCES routines(id)
);

CREATE TABLE IF NOT EXISTS session_exercises (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  exercise_name_snapshot TEXT NOT NULL,
  recording_type_snapshot TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'dirty',
  server_version INTEGER,
  deleted_at TEXT,
  FOREIGN KEY (session_id) REFERENCES workout_sessions(id)
);

CREATE TABLE IF NOT EXISTS set_records (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  session_exercise_id TEXT NOT NULL,
  set_index INTEGER NOT NULL,
  weight_kg REAL,
  reps INTEGER,
  duration_seconds INTEGER,
  assisted_weight_kg REAL,
  is_completed INTEGER NOT NULL DEFAULT 0,
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'dirty',
  server_version INTEGER,
  deleted_at TEXT,
  FOREIGN KEY (session_exercise_id) REFERENCES session_exercises(id)
);

CREATE TABLE IF NOT EXISTS completed_workouts (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  session_id TEXT NOT NULL UNIQUE,
  completed_at TEXT NOT NULL,
  title_snapshot TEXT,
  source_routine_id_snapshot TEXT,
  source_routine_name_snapshot TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'dirty',
  server_version INTEGER,
  deleted_at TEXT,
  FOREIGN KEY (session_id) REFERENCES workout_sessions(id)
);

CREATE TABLE IF NOT EXISTS completed_workout_exercises (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  completed_workout_id TEXT NOT NULL,
  session_exercise_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  exercise_name_snapshot TEXT NOT NULL,
  recording_type_snapshot TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (completed_workout_id) REFERENCES completed_workouts(id),
  FOREIGN KEY (session_exercise_id) REFERENCES session_exercises(id)
);

CREATE TABLE IF NOT EXISTS completed_set_snapshots (
  id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  completed_workout_exercise_id TEXT NOT NULL,
  set_record_id TEXT NOT NULL,
  set_index INTEGER NOT NULL,
  weight_kg REAL,
  reps INTEGER,
  duration_seconds INTEGER,
  assisted_weight_kg REAL,
  is_completed INTEGER NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (completed_workout_exercise_id) REFERENCES completed_workout_exercises(id),
  FOREIGN KEY (set_record_id) REFERENCES set_records(id)
);

CREATE TABLE IF NOT EXISTS sync_outbox (
  mutation_id TEXT PRIMARY KEY NOT NULL,
  account_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  operation TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  retry_count INTEGER NOT NULL DEFAULT 0,
  last_attempt_at TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_routines_account ON routines(account_id);
CREATE INDEX IF NOT EXISTS idx_routine_exercises_routine ON routine_exercises(routine_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_account_status ON workout_sessions(account_id, status);
CREATE INDEX IF NOT EXISTS idx_session_exercises_session ON session_exercises(session_id);
CREATE INDEX IF NOT EXISTS idx_set_records_session_exercise ON set_records(session_exercise_id);
CREATE INDEX IF NOT EXISTS idx_sync_outbox_account_status ON sync_outbox(account_id, status);
`.trim();
