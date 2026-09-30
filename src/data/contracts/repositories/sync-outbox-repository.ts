import type { AccountId, MutationId } from '../ids';
import type { OutboxOperation, SyncOutboxEntry } from '../sync-metadata';

export type EnqueueOutboxInput = {
  accountId: AccountId;
  entityType: string;
  entityId: string;
  operation: OutboxOperation;
  payload: Record<string, unknown>;
};

export interface SyncOutboxRepository {
  enqueue(input: EnqueueOutboxInput): Promise<SyncOutboxEntry>;
  listPending(accountId: AccountId): Promise<SyncOutboxEntry[]>;
  markSent(mutationId: MutationId): Promise<void>;
}
