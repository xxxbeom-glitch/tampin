import { fireEvent, render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import {
  ROUTINE_DETAIL_LAYOUT,
  RoutineDetailScreen,
  routineDetailCatalogFixture,
} from '../src/features/routine';

describe('DEV-011 RoutineDetailScreen', () => {
  it('renders header, summary strip, four exercise cards, and start CTA', async () => {
    const { getByTestId, getByText } = await render(
      <RoutineDetailScreen detail={routineDetailCatalogFixture} readOnly />,
    );

    expect(getByTestId('routine-detail-screen')).toBeTruthy();
    expect(getByTestId('routine-detail-header')).toBeTruthy();
    expect(getByText('상체 루틴 A')).toBeTruthy();
    expect(getByTestId('routine-detail-summary')).toBeTruthy();
    expect(getByText('4개')).toBeTruthy();
    expect(getByText('45분')).toBeTruthy();
    expect(getByText('12세트')).toBeTruthy();
    expect(getByTestId('routine-detail-exercise-smith-bench-press')).toBeTruthy();
    expect(getByTestId('routine-detail-exercise-barbell-rdl')).toBeTruthy();
    expect(getByTestId('routine-detail-exercise-seated-calf-raise')).toBeTruthy();
    expect(getByTestId('routine-detail-exercise-dumbbell-lateral-raise')).toBeTruthy();
    expect(getByTestId('routine-detail-start-workout')).toBeTruthy();
    expect(getByText('운동 시작')).toBeTruthy();
  });

  it('uses Figma canonical inner content width geometry for exercise list', async () => {
    const { getByTestId } = await render(
      <RoutineDetailScreen detail={routineDetailCatalogFixture} readOnly />,
    );

    expect(ROUTINE_DETAIL_LAYOUT.innerContentWidth).toBe(320);

    const contentStyle = StyleSheet.flatten(
      getByTestId('routine-detail-content').props.style,
    );
    expect(contentStyle.paddingHorizontal).toBe(ROUTINE_DETAIL_LAYOUT.horizontalInset);
    expect(contentStyle.maxWidth).toBe(ROUTINE_DETAIL_LAYOUT.canonicalViewportWidth);
  });

  it('exposes accessibility roles for back, edit affordance, and start CTA', async () => {
    const { getByTestId } = await render(
      <RoutineDetailScreen
        detail={routineDetailCatalogFixture}
        onBack={jest.fn()}
        onStartWorkout={jest.fn()}
      />,
    );

    expect(getByTestId('routine-detail-back').props.accessibilityRole).toBe('button');
    expect(getByTestId('routine-detail-edit-affordance').props.accessibilityRole).toBe(
      'button',
    );
    expect(getByTestId('routine-detail-edit-affordance').props.accessibilityState.disabled).toBe(
      true,
    );
    expect(getByTestId('routine-detail-start-workout').props.accessibilityRole).toBe(
      'button',
    );
  });

  it('invokes back and start callbacks when interactive', async () => {
    const onBack = jest.fn();
    const onStartWorkout = jest.fn();
    const { getByTestId } = await render(
      <RoutineDetailScreen
        detail={routineDetailCatalogFixture}
        onBack={onBack}
        onStartWorkout={onStartWorkout}
      />,
    );

    await fireEvent.press(getByTestId('routine-detail-back'));
    await fireEvent.press(getByTestId('routine-detail-start-workout'));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onStartWorkout).toHaveBeenCalledTimes(1);
  });

  it('uses shared brand blue for the start CTA', async () => {
    const { getByTestId } = await render(
      <RoutineDetailScreen detail={routineDetailCatalogFixture} readOnly />,
    );

    const ctaStyle = StyleSheet.flatten(
      getByTestId('routine-detail-start-workout').props.style,
    );
    expect(ctaStyle.backgroundColor).toBe('#2563D6');
  });
});
