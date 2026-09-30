/** SUIT static faces bundled under assets/fonts (sun-typeface/SUIT, OFL-1.1). */
export const fontFamily = {
  regular: 'SUIT-Regular',
  medium: 'SUIT-Medium',
  semiBold: 'SUIT-SemiBold',
  bold: 'SUIT-Bold',
} as const;

export type SuitFontFamily = (typeof fontFamily)[keyof typeof fontFamily];

/** Maps legacy fontWeight values used in Figma-aligned screens to bundled SUIT faces. */
export function suitFamilyForWeight(
  weight?: string | number,
): SuitFontFamily {
  switch (String(weight)) {
    case '700':
    case 'bold':
      return fontFamily.bold;
    case '600':
      return fontFamily.semiBold;
    case '500':
      return fontFamily.medium;
    default:
      return fontFamily.regular;
  }
}
