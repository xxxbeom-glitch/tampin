export type SyncState = 'clean' | 'dirty' | 'pending_delete' | 'conflict';

export type OutboxStatus = 'pending' | 'sent' | 'failed';

export type OutboxOperation = 'upsert' | 'delete';

export type SyncOutboxEntry = {
  mutationId: string;
  accountId: string;
  entityType: string;
  entityId: string;
  operation: OutboxOperation;
  payloadJson: string;
  createdAt: string;
  retryCount: number;
  lastAttemptAt: string | null;
  status: OutboxStatus;
};
