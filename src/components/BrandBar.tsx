import { View } from 'react-native';
import { palette, radius } from '@/theme';

/** A short accent rule, half red / half green — a quiet echo of the logo. */
export function BrandBar({ width = 56, height = 4 }: { width?: number; height?: number }) {
  return (
    <View style={{ flexDirection: 'row', width, height, borderRadius: radius.pill, overflow: 'hidden' }}>
      <View style={{ flex: 1, backgroundColor: palette.house }} />
      <View style={{ flex: 1, backgroundColor: palette.green }} />
    </View>
  );
}
