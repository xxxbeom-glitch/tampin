import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import {
  RoutineCreateScreen,
  RoutineFolderEntryScreen,
  beginRoutineCreateSession,
  endRoutineCreateSession,
  getRoutineCreateDraftExercises,
  routineFolderEntryDefaultFixture,
  type RoutineCreateDraftExercise,
} from '../../../features/routine';
import { setExerciseSelectionPurpose } from '../../../features/workout';
import type { RootStackParamList } from '../types';

type RoutineEditorNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'RoutineEditor'
>;

type CreationStep = 'folder' | 'create';

function sameDraftExercises(
  current: readonly RoutineCreateDraftExercise[],
  next: readonly RoutineCreateDraftExercise[],
): boolean {
  return (
    current.length === next.length &&
    current.every(
      (item, index) =>
        item.id === next[index]?.id && item.attachment === next[index]?.attachment,
    )
  );
}

export function RoutineEditorRouteScreen() {
  const navigation = useNavigation<RoutineEditorNavigation>();
  const [step, setStep] = useState<CreationStep>('folder');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [resolvedFolderName, setResolvedFolderName] = useState('');
  const [routineName, setRoutineName] = useState('');
  const [draftExercises, setDraftExercises] = useState<RoutineCreateDraftExercise[]>(
    [],
  );

  useEffect(() => {
    beginRoutineCreateSession();
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      const next = getRoutineCreateDraftExercises();
      setDraftExercises((current) => (sameDraftExercises(current, next) ? current : next));
    });
  }, [navigation]);

  useEffect(() => {
    return navigation.addListener('beforeRemove', () => {
      endRoutineCreateSession();
    });
  }, [navigation]);

  const handleContinue = () => {
    const selectedFolder = routineFolderEntryDefaultFixture.folders.find(
      (folder) => folder.id === selectedFolderId,
    );
    const folderName = selectedFolder?.label ?? newFolderName.trim();

    if (folderName.length === 0) {
      return;
    }

    setResolvedFolderName(folderName);
    setStep('create');
  };

  return (
    <View style={{ flex: 1 }} testID="flow-boundary-RoutineEditor">
      {step === 'folder' ? (
        <RoutineFolderEntryScreen
          folders={routineFolderEntryDefaultFixture.folders}
          newFolderName={newFolderName}
          onBack={() => {
            endRoutineCreateSession();
            navigation.goBack();
          }}
          onContinue={handleContinue}
          onNewFolderNameChange={(name) => {
            setNewFolderName(name);
            setSelectedFolderId(null);
          }}
          onSelectFolder={(folderId) => {
            setSelectedFolderId(folderId);
            setNewFolderName('');
          }}
          selectedFolderId={selectedFolderId}
        />
      ) : (
        <RoutineCreateScreen
          exercises={draftExercises}
          folderName={resolvedFolderName}
          onAddExercise={() => {
            setExerciseSelectionPurpose('routineCreate');
            navigation.navigate('ExerciseSelection');
          }}
          onBack={() => setStep('folder')}
          onRoutineNameChange={setRoutineName}
          routineName={routineName}
        />
      )}
    </View>
  );
}
