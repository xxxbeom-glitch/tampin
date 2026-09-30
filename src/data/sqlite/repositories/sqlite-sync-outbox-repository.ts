import type {
  EnqueueOutboxInput,
  SyncOutboxRepository,
} from '../../contracts/repositories/sync-outbox-repository';
import type { SyncOutboxEntry } from '../../contracts/sync-metadata';
import {
  createId,
  type AccountId,
  type MutationId,
} from '../../contracts/ids';
import type { SqliteConnection } from '../connection';
import { nowIso } from '../time';

type OutboxRow = {
  mutation_id: string;
  account_id: string;
  entity_type: string;
  entity_id: string;
  operation: string;
  payload_json: string;
  created_at: string;
  retry_count: number;
  last_attempt_at: string | null;
  status: string;
};

function mapOutbox(row: OutboxRow): SyncOutboxEntry {
  return {
    mutationId: row.mutation_id,
    accountId: row.account_id,
    entityType: row.entity_type,
    entityId: row.entity_id,
    operation: row.operation as SyncOutboxEntry['operation'],
    payloadJson: row.payload_json,
    createdAt: row.created_at,
    retryCount: row.retry_count,
    lastAttemptAt: row.last_attempt_at,
    status: row.status as SyncOutboxEntry['status'],
  };
}

export class SqliteSyncOutboxRepository implements SyncOutboxRepository {
  constructor(private readonly connection: SqliteConnection) {}

  async enqueue(input: EnqueueOutboxInput): Promise<SyncOutboxEntry> {
    const mutationId = createId<MutationId>();
    const timestamp = nowIso();
    const payloadJson = JSON.stringify(input.payload);

    this.connection.run(
      `INSERT INTO sync_outbox (
        mutation_id, account_id, entity_type, entity_id, operation,
        payload_json, created_at, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        mutationId,
        input.accountId,
        input.entityType,
        input.entityId,
        input.operation,
        payloadJson,
        timestamp,
      ],
    );

    const row = this.connection.getFirst<OutboxRow>(
      'SELECT * FROM sync_outbox WHERE mutation_id = ?',
      [mutationId],
    );
    if (!row) {
      throw new Error('Failed to enqueue sync outbox entry.');
    }
    return mapOutbox(row);
  }

  async listPending(accountId: AccountId): Promise<SyncOutboxEntry[]> {
    return this.connection
      .getAll<OutboxRow>(
        `SELECT * FROM sync_outbox
         WHERE account_id = ? AND status = 'pending'
         ORDER BY created_at ASC`,
        [accountId],
      )
      .map(mapOutbox);
  }

  async markSent(mutationId: MutationId): Promise<void> {
    this.connection.run(
      `UPDATE sync_outbox
       SET status = 'sent', last_attempt_at = ?
       WHERE mutation_id = ?`,
      [nowIso(), mutationId],
    );
  }
}
