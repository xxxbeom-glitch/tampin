import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../design-system/tokens';
import { CatalogList } from './components/CatalogList';
import { BasicInfoCatalogDetail } from './components/BasicInfoCatalogDetail';
import { DataLayerHealthDetail } from './components/DataLayerHealthDetail';
import { LoginCatalogDetail } from './components/LoginCatalogDetail';
import { RoutineDetailCatalogDetail } from './components/RoutineDetailCatalogDetail';
import { RoutineCreationCatalogDetail } from './components/RoutineCreationCatalogDetail';
import { RoutineMainCatalogDetail } from './components/RoutineMainCatalogDetail';
import { SplashCatalogDetail } from './components/SplashCatalogDetail';
import { bootstrapFake } from './fake/bootstrapFake';
import { basicInfoCatalogPresets } from './fake/basicInfoFake';
import { loginCatalogPresets } from './fake/loginFake';
import { routineDetailCatalogPresets } from './fake/routineDetailFake';
import { isRoutineCreationCatalogEntryId } from './fake/routineCreationFake';
import { routineMainCatalogPresets } from './fake/routineMainFake';
import type { CatalogEntry } from './registry';

type UiCatalogScreenProps = {
  onBack: () => void;
};

export function UiCatalogScreen({ onBack }: UiCatalogScreenProps) {
  const [selected, setSelected] = useState<CatalogEntry | null>(null);

  if (selected) {
    return (
      <View style={styles.root} testID="catalog-detail">
        <Pressable accessibilityRole="button" onPress={() => setSelected(null)}>
          <Text style={styles.link}>← Back to catalog</Text>
        </Pressable>
        <Text style={styles.title}>{selected.frameName}</Text>
        {selected.id === 'data-layer-health' ? (
          <DataLayerHealthDetail />
        ) : selected.id === '00-splash-default' ? (
          <SplashCatalogDetail
            entryId={selected.id}
            frameName={selected.frameName}
            stateLabel={selected.stateLabel}
          />
        ) : selected.id in loginCatalogPresets ? (
          <LoginCatalogDetail
            entryId={selected.id}
            frameName={selected.frameName}
            stateLabel={selected.stateLabel}
          />
        ) : selected.id in basicInfoCatalogPresets ? (
          <BasicInfoCatalogDetail
            entryId={selected.id}
            frameName={selected.frameName}
            stateLabel={selected.stateLabel}
          />
        ) : selected.id in routineMainCatalogPresets ? (
          <RoutineMainCatalogDetail
            entryId={selected.id}
            frameName={selected.frameName}
            stateLabel={selected.stateLabel}
          />
        ) : selected.id in routineDetailCatalogPresets ? (
          <RoutineDetailCatalogDetail
            entryId={selected.id}
            frameName={selected.frameName}
            stateLabel={selected.stateLabel}
          />
        ) : isRoutineCreationCatalogEntryId(selected.id) ? (
          <RoutineCreationCatalogDetail
            entryId={selected.id}
            frameName={selected.frameName}
            stateLabel={selected.stateLabel}
          />
        ) : (
          <Text style={styles.body}>{bootstrapFake.body}</Text>
        )}
        <Text style={styles.meta}>
          {selected.group} / {selected.stateLabel}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.root} testID="ui-catalog">
      <Pressable accessibilityRole="button" onPress={onBack}>
        <Text style={styles.link}>← Back</Text>
      </Pressable>
      <Text style={styles.title}>Tampin UI Catalog</Text>
      <Text style={styles.body}>
        Development-only shell. Canonical MVP screens are registered by later
        Issues.
      </Text>
      <CatalogList onSelect={setSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
    paddingTop: 48,
  },
  link: {
    color: colors.brandAction,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    paddingHorizontal: 16,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    paddingHorizontal: 16,
    marginTop: 12,
  },
});
