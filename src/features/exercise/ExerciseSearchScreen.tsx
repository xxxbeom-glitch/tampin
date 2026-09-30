import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import { AddToggle, ExerciseScreenChrome } from './ExerciseScreenChrome';
import { filterExerciseCatalog } from './exerciseCatalog';
import type { ExerciseCatalogItem } from './types';

export type ExerciseSearchScreenProps = {
  query: string;
  equipmentFilter: string;
  bodyPartFilter: string;
  selectedIds: string[];
  catalog: ExerciseCatalogItem[];
  onQueryChange?: (query: string) => void;
  onBack?: () => void;
  onCreate?: () => void;
  onOpenEquipmentFilter?: () => void;
  onOpenBodyPartFilter?: () => void;
  onToggleExercise?: (id: string) => void;
  onOpenDetail?: (id: string) => void;
  onRemoveSelected?: (id: string) => void;
  onConfirm?: () => void;
  readOnly?: boolean;
};

function thumbnailFor(item: ExerciseCatalogItem) {
  return figmaAssets.thumbnails[item.thumbnailKey];
}

function SearchIcon() {
  return (
    <View accessibilityElementsHidden style={styles.searchIcon}>
      <View style={styles.searchCircle} />
      <View style={styles.searchHandle} />
    </View>
  );
}

export function ExerciseSearchScreen({
  query,
  equipmentFilter,
  bodyPartFilter,
  selectedIds,
  catalog,
  onQueryChange,
  onBack,
  onCreate,
  onOpenEquipmentFilter,
  onOpenBodyPartFilter,
  onToggleExercise,
  onOpenDetail,
  onRemoveSelected,
  onConfirm,
  readOnly = false,
}: ExerciseSearchScreenProps) {
  const interactive = !readOnly;
  const visible = filterExerciseCatalog(
    catalog,
    query,
    equipmentFilter,
    bodyPartFilter,
  );
  const recent = visible.filter((item) => item.recent);
  const all = visible.filter((item) => !item.recent);
  const selected = selectedIds
    .map((id) => catalog.find((item) => item.id === id))
    .filter((item): item is ExerciseCatalogItem => Boolean(item));
  const empty = visible.length === 0;

  return (
    <ExerciseScreenChrome
      onBack={onBack}
      readOnly={readOnly}
      right={
        <Pressable
          accessibilityLabel="직접 운동 만들기"
          accessibilityRole="button"
          disabled={!interactive}
          onPress={onCreate}
          testID="exercise-search-create"
        >
          <FigmaImage height={24} source={figmaAssets.icons.plus} width={24} />
        </Pressable>
      }
      testID="exercise-search-screen"
      title="운동 추가"
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          selected.length > 0 ? styles.contentWithFooter : null,
        ]}
        style={styles.scroll}
      >
        <View style={styles.toolbar}>
          <View style={styles.searchField}>
            <SearchIcon />
            <TextInput
              accessibilityLabel="운동 이름 검색"
              editable={interactive}
              onChangeText={onQueryChange}
              placeholder="운동 이름 검색"
              placeholderTextColor={colors.textSecondary}
              style={styles.searchInput}
              testID="exercise-search-query"
              value={query}
            />
          </View>
          <View style={styles.filterRow}>
            <Pressable
              accessibilityRole="button"
              disabled={!interactive}
              onPress={onOpenEquipmentFilter}
              style={styles.filterButton}
              testID="exercise-search-equipment-filter"
            >
              <Text numberOfLines={1} style={styles.filterLabel}>
                {equipmentFilter === '전체' ? '장비 전체' : equipmentFilter}
              </Text>
              <FigmaImage
                height={16}
                source={figmaAssets.icons.chevronRight}
                style={styles.filterChevron}
                width={16}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              disabled={!interactive}
              onPress={onOpenBodyPartFilter}
              style={styles.filterButton}
              testID="exercise-search-body-part-filter"
            >
              <Text numberOfLines={1} style={styles.filterLabel}>
                {bodyPartFilter === '전체' ? '부위 전체' : bodyPartFilter}
              </Text>
              <FigmaImage
                height={16}
                source={figmaAssets.icons.chevronRight}
                style={styles.filterChevron}
                width={16}
              />
            </Pressable>
          </View>
        </View>

        {selected.length > 0 ? (
          <View style={styles.selectedBlock} testID="exercise-search-selected-chips">
            <Text style={styles.sectionLabel}>선택한 운동 ({selected.length}개)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipRow}>
                {selected.map((item) => (
                  <Pressable
                    accessibilityRole="button"
                    disabled={!interactive}
                    key={item.id}
                    onPress={() => onRemoveSelected?.(item.id)}
                    style={styles.chip}
                    testID={`exercise-selected-chip-${item.id}`}
                  >
                    <Text numberOfLines={1} style={styles.chipLabel}>
                      {item.name}
                    </Text>
                    <Text style={styles.chipClose}>×</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : null}

        {empty ? (
          <View style={styles.empty} testID="exercise-search-empty">
            <Text style={styles.emptyTitle}>검색 결과가 없어요</Text>
            <Text style={styles.emptyBody}>
              다른 이름으로 검색하거나 필터를 조정해보세요.
            </Text>
            <Pressable
              accessibilityRole="button"
              disabled={!interactive}
              onPress={onCreate}
              style={styles.emptyCta}
              testID="exercise-search-empty-create"
            >
              <Text style={styles.emptyCtaLabel}>직접 운동 만들기</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            {recent.length > 0 ? (
              <View>
                <Text style={styles.sectionLabel}>최근 운동</Text>
                {recent.map((item, index) => (
                  <ExerciseRow
                    divider={index < recent.length - 1}
                    interactive={interactive}
                    item={item}
                    key={`recent-${item.id}`}
                    onOpenDetail={onOpenDetail}
                    onToggle={onToggleExercise}
                    selected={selectedIds.includes(item.id)}
                  />
                ))}
              </View>
            ) : null}
            {all.length > 0 ? (
              <View>
                <Text style={styles.sectionLabel}>전체 운동</Text>
                {all.map((item, index) => (
                  <ExerciseRow
                    divider={index < all.length - 1}
                    interactive={interactive}
                    item={item}
                    key={`all-${item.id}`}
                    onOpenDetail={onOpenDetail}
                    onToggle={onToggleExercise}
                    selected={selectedIds.includes(item.id)}
                  />
                ))}
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>

      {selected.length > 0 ? (
        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            disabled={!interactive}
            onPress={onConfirm}
            style={styles.confirmButton}
            testID="exercise-search-confirm"
          >
            <Text style={styles.confirmLabel}>{selected.length}개 운동 추가</Text>
          </Pressable>
        </View>
      ) : null}
    </ExerciseScreenChrome>
  );
}

function ExerciseRow({
  item,
  selected,
  divider,
  interactive,
  onToggle,
  onOpenDetail,
}: {
  item: ExerciseCatalogItem;
  selected: boolean;
  divider: boolean;
  interactive: boolean;
  onToggle?: (id: string) => void;
  onOpenDetail?: (id: string) => void;
}) {
  return (
    <View>
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          disabled={!interactive}
          onPress={() => onOpenDetail?.(item.id)}
          style={styles.rowMain}
          testID={`exercise-row-open-${item.id}`}
        >
          <FigmaImage
            height={52}
            source={thumbnailFor(item)}
            style={styles.thumbnail}
            width={52}
          />
          <View style={styles.rowCopy}>
            <Text numberOfLines={1} style={styles.rowTitle}>
              {item.name}
            </Text>
            <Text numberOfLines={1} style={styles.rowMeta}>
              {item.primaryMuscle} · {item.equipment}
            </Text>
          </View>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected }}
          disabled={!interactive}
          onPress={() => onToggle?.(item.id)}
          testID={`exercise-row-toggle-${item.id}`}
        >
          <AddToggle selected={selected} />
        </Pressable>
      </View>
      {divider ? <View style={styles.fullDivider} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 24,
  },
  contentWithFooter: {
    paddingBottom: 120,
  },
  toolbar: {
    gap: 12,
  },
  searchField: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    marginTop: 2,
    marginLeft: 1,
  },
  searchHandle: {
    position: 'absolute',
    width: 7,
    height: 1.5,
    backgroundColor: colors.textSecondary,
    right: 2,
    bottom: 3,
    transform: [{ rotate: '45deg' }],
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    padding: 0,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textPrimary,
  },
  filterChevron: {
    transform: [{ rotate: '90deg' }],
  },
  selectedBlock: {
    gap: 8,
  },
  sectionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: '#929A98',
    paddingTop: 12,
    paddingBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chipLabel: {
    maxWidth: 140,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textPrimary,
  },
  chipClose: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textSecondary,
  },
  row: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  rowCopy: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  rowMeta: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    color: colors.textSecondary,
  },
  fullDivider: {
    height: 1,
    marginHorizontal: -20,
    backgroundColor: colors.borderDefault,
  },
  empty: {
    minHeight: 360,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 20,
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
  emptyCta: {
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCtaLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textOnBrand,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.canvas,
  },
  confirmButton: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandAction,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textOnBrand,
  },
});
