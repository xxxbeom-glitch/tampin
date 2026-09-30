import type {
  AddRoutineExerciseInput,
  AddRoutineSetTemplateInput,
  CreateRoutineInput,
  RoutineExerciseRecord,
  RoutineRecord,
  RoutineSetTemplateRecord,
} from '../routine';
import type { AccountId, RoutineId } from '../ids';

export interface RoutineRepository {
  createRoutine(input: CreateRoutineInput): Promise<RoutineRecord>;
  getRoutine(accountId: AccountId, routineId: RoutineId): Promise<RoutineRecord | null>;
  listRoutines(accountId: AccountId): Promise<RoutineRecord[]>;
  addRoutineExercise(input: AddRoutineExerciseInput): Promise<RoutineExerciseRecord>;
  addRoutineSetTemplate(
    input: AddRoutineSetTemplateInput,
  ): Promise<RoutineSetTemplateRecord>;
}
