import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import { ExerciseScreenChrome } from './ExerciseScreenChrome';

export type ExerciseFilterPageScreenProps = {
  title: string;
  options: readonly string[];
  selected: string;
  onBack?: () => void;
  onSelect?: (value: string) => void;
  readOnly?: boolean;
  testID?: string;
};

export function ExerciseFilterPageScreen({
  title,
  options,
  selected,
  onBack,
  onSelect,
  readOnly = false,
  testID = 'exercise-filter-page',
}: ExerciseFilterPageScreenProps) {
  const interactive = !readOnly;

  return (
    <ExerciseScreenChrome
      onBack={onBack}
      readOnly={readOnly}
      testID={testID}
      title={title}
    >
      <ScrollView contentContainerStyle={styles.content} style={styles.scroll}>
        <View style={styles.card}>
          {options.map((option, index) => {
            const isSelected = option === selected;
            return (
              <View key={option}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  disabled={!interactive}
                  onPress={() => onSelect?.(option)}
                  style={styles.row}
                  testID={`${testID}-option-${option}`}
                >
                  <Text style={[styles.label, isSelected && styles.labelSelected]}>
                    {option}
                  </Text>
                  {isSelected ? (
                    <FigmaImage height={24} source={figmaAssets.icons.check} width={24} />
                  ) : null}
                </Pressable>
                {index < options.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ExerciseScreenChrome>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    minHeight: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  labelSelected: {
    fontFamily: fontFamily.bold,
    color: colors.brandPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
});
