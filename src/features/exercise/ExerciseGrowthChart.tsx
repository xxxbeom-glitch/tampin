import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily } from '../../design-system/tokens';
import type { ExerciseGrowthModel } from './types';

const CHART_WIDTH = 320;
const CHART_HEIGHT = 176;
const PLOT_LEFT = 52;
const PLOT_TOP = 40;
const PLOT_WIDTH = 252;
const PLOT_HEIGHT = 88;
const GRID_TOPS = [40, 68, 96, 124] as const;
const Y_LABEL_TOPS = [33, 61, 89, 117] as const;
const PERIODS = ['4주', '3개월', '1년'] as const;
const BRAND_SOFT = '#EAF0FF';
const TEXT_TERTIARY = '#929A98';

export function ExerciseGrowthChart({
  model,
  period = '4주',
  onPeriodChange,
}: {
  model: ExerciseGrowthModel;
  period?: (typeof PERIODS)[number];
  onPeriodChange?: (period: (typeof PERIODS)[number]) => void;
}) {
  return (
    <View style={styles.section} testID="exercise-detail-growth-trend">
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{model.title}</Text>
        <View style={styles.period}>
          {PERIODS.map((label) => {
            const selected = label === period;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={label}
                onPress={() => onPeriodChange?.(label)}
                style={[styles.periodItem, selected && styles.periodItemSelected]}
                testID={`exercise-detail-growth-period-${label}`}
              >
                <Text style={[styles.periodLabel, selected && styles.periodLabelSelected]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card} testID="exercise-detail-growth-chart">
        {model.insufficient ? (
          <View style={styles.cardEmpty} testID="exercise-detail-growth-insufficient">
            <Text style={styles.emptyTitle}>기록이 더 필요해요</Text>
            <Text style={styles.emptyBody}>
              같은 운동 기록이 2회 이상 쌓이면 변화가 표시돼요.
            </Text>
          </View>
        ) : (
          <TrendPlot model={model} />
        )}
      </View>
    </View>
  );
}

function TrendPlot({ model }: { model: ExerciseGrowthModel }) {
  const points = model.values.map((value, index) => {
    const bucketWidth = PLOT_WIDTH / model.values.length;
    const x = PLOT_LEFT + bucketWidth * index + bucketWidth / 2;
    const t = (model.yMax - value) / (model.yMax - model.yMin);
    const y = PLOT_TOP + t * PLOT_HEIGHT;
    return { x, y, latest: index === model.values.length - 1 };
  });

  return (
    <View style={styles.plot}>
      <Text style={styles.unit}>{model.unit}</Text>
      {GRID_TOPS.map((top) => (
        <View key={`grid-${top}`} style={[styles.gridLine, { top }]} />
      ))}
      {Y_LABEL_TOPS.map((top, index) => (
        <Text key={`y-${model.yLabels[index]}`} style={[styles.yLabel, { top }]}>
          {model.yLabels[index]}
        </Text>
      ))}
      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        const dx = next.x - point.x;
        const dy = next.y - point.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <View
            key={`seg-${index}`}
            style={[
              styles.segment,
              {
                left: (point.x + next.x) / 2 - length / 2,
                top: (point.y + next.y) / 2 - 1,
                width: length,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
        );
      })}
      {points.map((point, index) => (
        <View
          key={`point-${index}`}
          style={[
            point.latest ? styles.pointLatest : styles.point,
            {
              left: point.x - (point.latest ? 4 : 3),
              top: point.y - (point.latest ? 4 : 3),
            },
          ]}
          testID={`exercise-detail-growth-point-${index}`}
        />
      ))}
      <View style={styles.xAxis}>
        {model.xLabels.map((label) => (
          <Text key={label} style={styles.xLabel}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export function GrowthPersonalBest({
  rows,
}: {
  rows: ExerciseGrowthModel['personalBest'];
}) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <View style={styles.section} testID="exercise-detail-growth-pr">
      <View style={styles.bestHeader}>
        <Text style={styles.sectionTitle}>개인 최고 기록</Text>
        <Text style={styles.bestMeta}>전체 기록 기준</Text>
      </View>
      <View>
        {rows.map((row, index) => (
          <View key={row.label}>
            <View style={styles.bestRow}>
              <Text style={styles.bestLabel}>{row.label}</Text>
              <Text style={styles.bestValue}>{row.value}</Text>
            </View>
            {index < rows.length - 1 ? <View style={styles.bestDivider} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: CHART_WIDTH,
    gap: 12,
  },
  headerRow: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  period: {
    width: 144,
    height: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surface,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  periodItem: {
    flex: 1,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodItemSelected: {
    backgroundColor: BRAND_SOFT,
  },
  periodLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  periodLabelSelected: {
    color: colors.brandPrimary,
  },
  card: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    borderRadius: 20,
    backgroundColor: colors.surface,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  plot: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
  },
  unit: {
    position: 'absolute',
    left: 16,
    top: 16,
    width: 28,
    textAlign: 'right',
    fontFamily: fontFamily.medium,
    fontSize: 10,
    lineHeight: 12,
    color: TEXT_TERTIARY,
  },
  gridLine: {
    position: 'absolute',
    left: PLOT_LEFT,
    width: PLOT_WIDTH,
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  yLabel: {
    position: 'absolute',
    left: 16,
    width: 28,
    textAlign: 'right',
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    color: colors.textSecondary,
  },
  segment: {
    position: 'absolute',
    height: 2,
    backgroundColor: colors.brandPrimary,
  },
  point: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brandPrimary,
  },
  pointLatest: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brandPrimary,
  },
  xAxis: {
    position: 'absolute',
    left: PLOT_LEFT,
    top: 132,
    width: PLOT_WIDTH,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  xLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    color: colors.textSecondary,
  },
  bestHeader: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bestMeta: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  bestRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bestLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  bestValue: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  bestDivider: {
    height: 1,
    backgroundColor: colors.borderDefault,
  },
});
