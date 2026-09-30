import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import {
  BODY_PART_FILTER_OPTIONS,
  ConfirmDialogOverlay,
  CUSTOM_EQUIPMENT_OPTIONS,
  CUSTOM_MUSCLE_OPTIONS,
  CustomExerciseFormScreen,
  DELETE_CONFIRM_COPY,
  EQUIPMENT_FILTER_OPTIONS,
  ExerciseAttachmentSheet,
  ExerciseDetailScreen,
  ExerciseFilterPageScreen,
  ExerciseSearchScreen,
  RECORDING_TYPE_OPTIONS,
  SECONDARY_MUSCLE_OPTIONS,
  UNSAVED_CONFIRM_COPY,
  emptyCustomDraftFixture,
  exerciseCatalogFixture,
  isCustomDraftValid,
  resolveExerciseDetail,
  type CustomExerciseDraft,
  type ExerciseCatalogItem,
  type ExerciseDetailTab,
} from '../../../features/exercise';
import {
  getRoutineCreateDraftExercises,
  setRoutineCreateDraftExercises,
  toRoutineCreateDraftExercise,
} from '../../../features/routine';
import type { RootStackParamList } from '../types';

type ExerciseSelectionNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'ExerciseSelection'
>;

type ViewName =
  | 'search'
  | 'equipmentFilter'
  | 'bodyPartFilter'
  | 'detail'
  | 'customCreate'
  | 'customEdit'
  | 'customEquipment'
  | 'customPrimary'
  | 'customSecondary'
  | 'customRecording'
  | 'attachment'
  | 'attachmentInput';

export function ExerciseSelectionRouteScreen() {
  const navigation = useNavigation<ExerciseSelectionNavigation>();
  const [view, setView] = useState<ViewName>('search');
  const [query, setQuery] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('전체');
  const [bodyPartFilter, setBodyPartFilter] = useState('전체');
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    getRoutineCreateDraftExercises().map((item) => item.id),
  );
  const [catalog, setCatalog] = useState<ExerciseCatalogItem[]>(exerciseCatalogFixture);
  const [detailId, setDetailId] = useState('bench-press');
  const [detailTab, setDetailTab] = useState<ExerciseDetailTab>('info');
  const [customDraft, setCustomDraft] = useState<CustomExerciseDraft>(emptyCustomDraftFixture);
  const [customBaseline, setCustomBaseline] = useState<CustomExerciseDraft>(emptyCustomDraftFixture);
  const historyLocked = false;
  const [pendingAttachmentId, setPendingAttachmentId] = useState<string | null>(null);
  const [customAttachment, setCustomAttachment] = useState('');
  const [dialog, setDialog] = useState<'unsaved' | 'delete' | null>(null);

  const attachmentExercise = catalog.find((item) => item.id === pendingAttachmentId);
  const customDirty = useMemo(
    () => JSON.stringify(customDraft) !== JSON.stringify(customBaseline),
    [customBaseline, customDraft],
  );

  const searchProps = {
    catalog,
    query,
    equipmentFilter,
    bodyPartFilter,
    selectedIds,
    onBack: () => navigation.goBack(),
    onQueryChange: setQuery,
    onCreate: () => {
      setCustomDraft(emptyCustomDraftFixture);
      setCustomBaseline(emptyCustomDraftFixture);
      setView('customCreate');
    },
    onOpenEquipmentFilter: () => setView('equipmentFilter'),
    onOpenBodyPartFilter: () => setView('bodyPartFilter'),
    onToggleExercise: (id: string) => {
      const item = catalog.find((exercise) => exercise.id === id);
      if (item?.needsAttachment && !selectedIds.includes(id)) {
        setPendingAttachmentId(id);
        setView('attachment');
        return;
      }
      setSelectedIds((current) =>
        current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
      );
    },
    onOpenDetail: (id: string) => {
      setDetailId(id);
      setDetailTab('info');
      setView('detail');
    },
    onRemoveSelected: (id: string) => {
      setSelectedIds((current) => current.filter((value) => value !== id));
    },
    onConfirm: () => {
      const selected = selectedIds
        .map((id) => catalog.find((item) => item.id === id))
        .filter((item): item is ExerciseCatalogItem => Boolean(item))
        .map(toRoutineCreateDraftExercise);
      setRoutineCreateDraftExercises(selected);
      navigation.goBack();
    },
  };

  const leaveCustom = () => {
    if (customDirty) {
      setDialog('unsaved');
      return;
    }
    setView('search');
  };

  const saveCustom = () => {
    if (!isCustomDraftValid(customDraft)) {
      return;
    }

    const id = `custom-${customDraft.name.trim()}`;
    const nextItem: ExerciseCatalogItem = {
      id,
      name: customDraft.name.trim(),
      equipment: customDraft.equipment || '기타',
      bodyPart: customDraft.primaryMuscle || '기타',
      primaryMuscle: customDraft.primaryMuscle,
      secondaryMuscles: customDraft.secondaryMuscle,
      recordingType: customDraft.recordingType,
      recent: true,
      needsAttachment: false,
      thumbnailKey: 'romanianDeadlift',
    };

    setCatalog((current) => {
      const without = current.filter((item) => item.id !== id);
      return [nextItem, ...without];
    });
    setSelectedIds((current) => (current.includes(id) ? current : [id, ...current]));
    setCustomBaseline(customDraft);
    setView('search');
  };

  return (
    <View style={{ flex: 1 }} testID="flow-boundary-ExerciseSelection">
      {view === 'search' ? <ExerciseSearchScreen {...searchProps} /> : null}

      {view === 'equipmentFilter' ? (
        <ExerciseFilterPageScreen
          onBack={() => setView('search')}
          onSelect={(value) => {
            setEquipmentFilter(value);
            setView('search');
          }}
          options={EQUIPMENT_FILTER_OPTIONS}
          selected={equipmentFilter}
          testID="exercise-equipment-filter"
          title="장비 선택"
        />
      ) : null}

      {view === 'bodyPartFilter' ? (
        <ExerciseFilterPageScreen
          onBack={() => setView('search')}
          onSelect={(value) => {
            setBodyPartFilter(value);
            setView('search');
          }}
          options={BODY_PART_FILTER_OPTIONS}
          selected={bodyPartFilter}
          testID="exercise-body-part-filter"
          title="부위 선택"
        />
      ) : null}

      {view === 'detail' ? (
        <ExerciseDetailScreen
          model={resolveExerciseDetail(detailId)}
          onBack={() => setView('search')}
          onTabChange={setDetailTab}
          tab={detailTab}
        />
      ) : null}

      {view === 'customCreate' || view === 'customEdit' ? (
        <CustomExerciseFormScreen
          dirty={customDirty}
          draft={customDraft}
          historyLocked={historyLocked}
          mode={view === 'customCreate' ? 'create' : 'edit'}
          onBack={leaveCustom}
          onDelete={() => setDialog('delete')}
          onNameChange={(name) => setCustomDraft((current) => ({ ...current, name }))}
          onOpenEquipment={() => setView('customEquipment')}
          onOpenPrimaryMuscle={() => setView('customPrimary')}
          onOpenRecordingType={() => setView('customRecording')}
          onOpenSecondaryMuscle={() => setView('customSecondary')}
          onSave={saveCustom}
        />
      ) : null}

      {view === 'customEquipment' ? (
        <ExerciseFilterPageScreen
          onBack={() => setView(historyLocked ? 'customEdit' : 'customCreate')}
          onSelect={(value) => {
            setCustomDraft((current) => ({ ...current, equipment: value }));
            setView(historyLocked ? 'customEdit' : 'customCreate');
          }}
          options={CUSTOM_EQUIPMENT_OPTIONS}
          selected={customDraft.equipment}
          testID="custom-equipment-select"
          title="장비 선택"
        />
      ) : null}

      {view === 'customPrimary' ? (
        <ExerciseFilterPageScreen
          onBack={() => setView(historyLocked ? 'customEdit' : 'customCreate')}
          onSelect={(value) => {
            setCustomDraft((current) => ({ ...current, primaryMuscle: value }));
            setView(historyLocked ? 'customEdit' : 'customCreate');
          }}
          options={CUSTOM_MUSCLE_OPTIONS}
          selected={customDraft.primaryMuscle}
          testID="custom-primary-muscle-select"
          title="주 타겟 근육 선택"
        />
      ) : null}

      {view === 'customSecondary' ? (
        <ExerciseFilterPageScreen
          onBack={() => setView(historyLocked ? 'customEdit' : 'customCreate')}
          onSelect={(value) => {
            setCustomDraft((current) => ({
              ...current,
              secondaryMuscle: value === '선택 안 함' ? '' : value,
            }));
            setView(historyLocked ? 'customEdit' : 'customCreate');
          }}
          options={SECONDARY_MUSCLE_OPTIONS}
          selected={customDraft.secondaryMuscle || '선택 안 함'}
          testID="custom-secondary-muscle-select"
          title="보조 타겟 근육 선택"
        />
      ) : null}

      {view === 'customRecording' ? (
        <ExerciseFilterPageScreen
          onBack={() => setView(historyLocked ? 'customEdit' : 'customCreate')}
          onSelect={(value) => {
            const next = RECORDING_TYPE_OPTIONS.find((option) => option.label === value);
            if (next) {
              setCustomDraft((current) => ({ ...current, recordingType: next.id }));
            }
            setView(historyLocked ? 'customEdit' : 'customCreate');
          }}
          options={RECORDING_TYPE_OPTIONS.map((option) => option.label)}
          selected={
            RECORDING_TYPE_OPTIONS.find((option) => option.id === customDraft.recordingType)
              ?.label ?? '중량 + 횟수'
          }
          testID="custom-recording-type-select"
          title="기록 방식 선택"
        />
      ) : null}

      {view === 'attachment' || view === 'attachmentInput' ? (
        <ExerciseAttachmentSheet
          {...searchProps}
          customAttachment={customAttachment}
          exerciseName={attachmentExercise?.name ?? '운동'}
          mode={view === 'attachmentInput' ? 'input' : 'select'}
          onConfirmCustomAttachment={() => {
            if (pendingAttachmentId) {
              setSelectedIds((current) =>
                current.includes(pendingAttachmentId)
                  ? current
                  : [...current, pendingAttachmentId],
              );
            }
            setPendingAttachmentId(null);
            setCustomAttachment('');
            setView('search');
          }}
          onCustomAttachmentChange={setCustomAttachment}
          onSelectAttachment={(value) => {
            if (value === '직접 입력') {
              setView('attachmentInput');
              return;
            }
            if (pendingAttachmentId) {
              setSelectedIds((current) =>
                current.includes(pendingAttachmentId)
                  ? current
                  : [...current, pendingAttachmentId],
              );
            }
            setPendingAttachmentId(null);
            setView('search');
          }}
        />
      ) : null}

      {dialog === 'unsaved' ? (
        <ConfirmDialogOverlay
          copy={UNSAVED_CONFIRM_COPY}
          onPrimary={() => setDialog(null)}
          onSecondary={() => {
            setDialog(null);
            setCustomDraft(customBaseline);
            setView('search');
          }}
          testID="custom-unsaved-confirm"
        />
      ) : null}

      {dialog === 'delete' ? (
        <ConfirmDialogOverlay
          copy={DELETE_CONFIRM_COPY}
          onPrimary={() => {
            setDialog(null);
            setView('search');
          }}
          onSecondary={() => setDialog(null)}
          testID="custom-delete-confirm"
        />
      ) : null}
    </View>
  );
}
