import { useFonts } from 'expo-font';

/** Local bundled font sources — no runtime network fetch. */
export const suitFontSources = {
  [ 'SUIT-Regular' ]: require('../../../assets/fonts/SUIT-Regular.ttf'),
  [ 'SUIT-Medium' ]: require('../../../assets/fonts/SUIT-Medium.ttf'),
  [ 'SUIT-SemiBold' ]: require('../../../assets/fonts/SUIT-SemiBold.ttf'),
  [ 'SUIT-Bold' ]: require('../../../assets/fonts/SUIT-Bold.ttf'),
} as const;

export function useSuitFonts(): boolean {
  const [loaded] = useFonts(suitFontSources);
  return loaded;
}
