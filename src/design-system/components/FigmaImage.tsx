import { Image, type ImageSourcePropType, type ImageStyle, type StyleProp } from 'react-native';

type FigmaImageProps = {
  source: ImageSourcePropType;
  width: number;
  height: number;
  style?: StyleProp<ImageStyle>;
  testID?: string;
  /** When false, image stays in the accessibility tree (e.g. wordmarks). */
  decorative?: boolean;
  accessibilityLabel?: string;
};

/** Local bundled raster from Figma export — no network URI. */
export function FigmaImage({
  source,
  width,
  height,
  style,
  testID,
  decorative = true,
  accessibilityLabel,
}: FigmaImageProps) {
  return (
    <Image
      accessibilityElementsHidden={decorative && !accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={decorative ? undefined : 'image'}
      importantForAccessibility={decorative ? 'no-hide-descendants' : 'yes'}
      resizeMode="contain"
      source={source}
      style={[{ width, height }, style]}
      testID={testID}
    />
  );
}
