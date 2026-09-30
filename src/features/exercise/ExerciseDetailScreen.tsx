import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily } from '../../design-system/tokens';
import { ExerciseScreenChrome } from './ExerciseScreenChrome';
import type { ExerciseDetailModel, ExerciseDetailTab, RecordingType } from './types';

export type ExerciseDetailScreenProps = {
  model: ExerciseDetailModel;
  tab: ExerciseDetailTab;
  onBack?: () => void;
  onTabChange?: (tab: ExerciseDetailTab) => void;
  readOnly?: boolean;
};

function historyColumns(type: RecordingType): { primary: string; secondary: string | null } {
  switch (type) {
    case 'reps':
      return { primary: '횟수', secondary: null };
    case 'duration':
      return { primary: '시간', secondary: null };
    case 'assisted':
      return { primary: '보조중량', secondary: '횟수' };
    default:
      return { primary: '중량', secondary: '횟수' };
  }
}

export function ExerciseDetailScreen({
  model,
  tab,
  onBack,
  onTabChange,
  readOnly = false,
}: ExerciseDetailScreenProps) {
  const interactive = !readOnly;
  const columns = historyColumns(model.recordingType);

  return (
    <ExerciseScreenChrome
      onBack={onBack}
      readOnly={readOnly}
      testID="exercise-detail-screen"
      title={model.name}
    >
      <View style={styles.tabs}>
        {(
          [
            ['info', '운동 정보'],
            ['history', '최근 기록'],
            ['growth', '성장'],
          ] as const
        ).map(([id, label]) => {
          const active = tab === id;
          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              disabled={!interactive}
              key={id}
              onPress={() => onTabChange?.(id)}
              style={[styles.tab, active && styles.tabActive]}
              testID={`exercise-detail-tab-${id}`}
            >
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {tab === 'info' ? <InfoTab model={model} /> : null}
      {tab === 'history' ? (
        <HistoryTab columns={columns} history={model.history} />
      ) : null}
      {tab === 'growth' ? <GrowthTab model={model} /> : null}
    </ExerciseScreenChrome>
  );
}

function InfoTab({ model }: { model: ExerciseDetailModel }) {
  return (
    <ScrollView contentContainerStyle={styles.infoContent} style={styles.scroll}>
      <View style={styles.media}>
        <Text style={styles.mediaLabel}>운동 이미지 / 영상</Text>
      </View>
      <View>
        <FlatRow label="장비" value={model.equipment} />
        <View style={styles.flatDivider} />
        <FlatRow label="주 타겟 근육" value={model.primaryMuscle} />
        <View style={styles.flatDivider} />
        <FlatRow
          label="보조 타겟 근육"
          value={model.secondaryMuscles.length > 0 ? model.secondaryMuscles : '없음'}
        />
      </View>
      {model.method.length > 0 ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>운동 방법</Text>
          {model.method.map((line) => (
            <Text key={line} style={styles.blockBody}>
              {line}
            </Text>
          ))}
        </View>
      ) : null}
      {model.checkpoints.length > 0 ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>핵심 체크포인트</Text>
          {model.checkpoints.map((line) => (
            <Text key={line} style={styles.blockBody}>
              {line}
            </Text>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

function HistoryTab({
  history,
  columns,
}: {
  history: ExerciseDetailModel['history'];
  columns: { primary: string; secondary: string | null };
}) {
  if (history.length === 0) {
    return (
      <View style={styles.empty} testID="exercise-detail-history-empty">
        <Text style={styles.emptyTitle}>아직 운동 기록이 없어요</Text>
        <Text style={styles.emptyBody}>운동을 완료하면 여기에 기록이 쌓여요.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.historyContent} style={styles.scroll}>
      {history.map((session) => (
        <View key={session.dateLabel} style={styles.session}>
          <Text style={styles.dateLabel}>{session.dateLabel}</Text>
          <View style={styles.setHeader}>
            <Text style={styles.setHeaderCellNarrow}>세트</Text>
            <Text style={styles.setHeaderCellGrow}>{columns.primary}</Text>
            {columns.secondary ? (
              <Text style={styles.setHeaderCellNarrow}>{columns.secondary}</Text>
            ) : null}
          </View>
          {session.sets.map((set) => (
            <View key={`${session.dateLabel}-${set.set}`} style={styles.setRow}>
              <Text style={styles.setCellNarrow}>{set.set}</Text>
              <Text style={styles.setCellGrow}>{set.primary}</Text>
              {columns.secondary ? (
                <Text style={styles.setCellNarrow}>{set.secondary}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

function GrowthTab({ model }: { model: ExerciseDetailModel }) {
  if (model.history.length === 0) {
    return (
      <View style={styles.empty} testID="exercise-detail-growth-empty">
        <Text style={styles.emptyTitle}>아직 성장 데이터가 없어요</Text>
        <Text style={styles.emptyBody}>기록이 쌓이면 여기에 표시돼요.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.growthContent} style={styles.scroll}>
      <View style={styles.prCard} testID="exercise-detail-growth-pr">
        <Text style={styles.prLabel}>{model.growth.prLabel}</Text>
        <Text style={styles.prValue}>{model.growth.prValue}</Text>
      </View>
      {model.growth.insufficient ? (
        <Text style={styles.growthHint} testID="exercise-detail-growth-insufficient">
          추이를 보려면 비교 가능한 기록이 2회 이상 필요해요.
        </Text>
      ) : model.growth.trend ? (
        <Text style={styles.growthHint}>{model.growth.trend}</Text>
      ) : null}
    </ScrollView>
  );
}

function FlatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.flatRow}>
      <Text style={styles.flatLabel}>{label}</Text>
      <Text style={styles.flatValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.brandPrimary,
  },
  tabLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.brandPrimary,
  },
  scroll: {
    flex: 1,
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 24,
  },
  media: {
    height: 220,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  flatRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  flatValue: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  flatDivider: {
    height: 1,
    backgroundColor: colors.borderDefault,
  },
  block: {
    gap: 12,
  },
  blockTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  blockBody: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  historyContent: {
    paddingVertical: 20,
    gap: 32,
  },
  session: {
    gap: 8,
  },
  dateLabel: {
    paddingHorizontal: 20,
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  setHeader: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  setHeaderCellNarrow: {
    width: 40,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    color: '#929A98',
  },
  setHeaderCellGrow: {
    flex: 1,
    textAlign: 'right',
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    color: '#929A98',
  },
  setRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  setCellNarrow: {
    width: 40,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  setCellGrow: {
    flex: 1,
    textAlign: 'right',
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 8,
  },
  emptyTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyBody: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  growthContent: {
    padding: 20,
    gap: 16,
  },
  prCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  prLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  prValue: {
    marginTop: 8,
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 32,
    color: colors.textPrimary,
  },
  growthHint: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
});
