import type { ReactNode } from 'react';
import { View } from 'react-native';
import { palette } from '@/theme';

/**
 * The logo's signature: a ring split red (left) / green (right).
 * Built from a rotated bordered circle so the two colors meet at top/bottom.
 */
export function BrandRing({
  size = 128,
  thickness = 6,
  children,
}: {
  size?: number;
  thickness?: number;
  children?: ReactNode;
}) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: thickness,
          borderTopColor: palette.house,
          borderLeftColor: palette.house,
          borderRightColor: palette.green,
          borderBottomColor: palette.green,
          transform: [{ rotate: '45deg' }],
        }}
      />
      {children}
    </View>
  );
}
