import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import {
  RoutineCreateScreen,
  RoutineFolderEntryScreen,
  routineFolderEntryDefaultFixture,
} from '../../../features/routine';
import type { RootStackParamList } from '../types';

type RoutineEditorNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'RoutineEditor'
>;

type CreationStep = 'folder' | 'create';

export function RoutineEditorRouteScreen() {
  const navigation = useNavigation<RoutineEditorNavigation>();
  const [step, setStep] = useState<CreationStep>('folder');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [resolvedFolderName, setResolvedFolderName] = useState('');
  const [routineName, setRoutineName] = useState('');

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
          onBack={() => navigation.goBack()}
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
          folderName={resolvedFolderName}
          onAddExercise={() => navigation.navigate('ExerciseSelection')}
          onBack={() => setStep('folder')}
          onRoutineNameChange={setRoutineName}
          routineName={routineName}
        />
      )}
    </View>
  );
}
