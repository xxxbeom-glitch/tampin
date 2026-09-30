import manifest from '../../../assets/figma/manifest.json';

export type FigmaExportedAsset = {
  id: string;
  figmaNodeId: string;
  figmaName: string;
  path: string;
  usedBy: string[];
};

export type FigmaNotExportedAsset = {
  figmaNodeId: string;
  figmaName: string;
  reason: string;
};

export const figmaAssetManifest = manifest as {
  figmaFileKey: string;
  figmaPage: string;
  exported: FigmaExportedAsset[];
  notExported: FigmaNotExportedAsset[];
};

export const exportedAssetPaths = figmaAssetManifest.exported.map((entry) => entry.path);
