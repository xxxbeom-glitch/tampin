import { StyleSheet, Text, View } from 'react-native';
import { useTampinDataLayerHealth } from '../../../app/providers/data-layer/useTampinDataLayer';
import { colors } from '../../../design-system/tokens';

/** Read-only dev observability — no database writes, seeds, or deletes. */
export function DataLayerHealthDetail() {
  const health = useTampinDataLayerHealth();

  return (
    <View style={styles.root} testID="data-layer-health-detail">
      <Text style={styles.label}>Initialization status</Text>
      <Text style={styles.value} testID="data-layer-health-status">
        {health.status}
      </Text>

      {health.status === 'ready' ? (
        <>
          <Text style={styles.label}>Schema version</Text>
          <Text style={styles.value} testID="data-layer-health-schema-version">
            {health.schemaVersion}
          </Text>
        </>
      ) : null}

      {health.status === 'error' ? (
        <>
          <Text style={styles.label}>Error</Text>
          <Text style={styles.error} testID="data-layer-health-error">
            {health.message}
          </Text>
        </>
      ) : null}

      <Text style={styles.note}>
        Read-only health entry. User records are not read, seeded, or mutated.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  error: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  note: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 16,
  },
});
