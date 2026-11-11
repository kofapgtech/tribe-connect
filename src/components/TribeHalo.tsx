import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

/**
 * The reveal halo: a soft accent radial glow behind two concentric accent
 * rings, with the tribe glyph centered on top. Ports the artifact's `.halo`
 * (radial glow at 50% 42%, accent → transparent by ~64%, plus inset rings).
 * Pure presentational; the reveal screen wraps this in the climax animation.
 */
export function TribeHalo({
  accent,
  size = 184,
  children,
}: {
  accent: string;
  size?: number;
  children?: ReactNode;
}) {
  const inset1 = Math.round(size * 0.08); // ≈14 at 184
  const inset2 = Math.round(size * 0.16); // ≈30 at 184

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="tribeHalo" cx="0.5" cy="0.42" rx="0.55" ry="0.55" fx="0.5" fy="0.42">
            <Stop offset="0" stopColor={accent} stopOpacity={0.34} />
            <Stop offset="0.64" stopColor={accent} stopOpacity={0} />
            <Stop offset="1" stopColor={accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#tribeHalo)" />
      </Svg>

      {/* two concentric accent rings (≈55% and ≈28% accent) */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: inset1,
          left: inset1,
          right: inset1,
          bottom: inset1,
          borderRadius: (size - inset1 * 2) / 2,
          borderWidth: 1.5,
          borderColor: `${accent}8C`,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: inset2,
          left: inset2,
          right: inset2,
          bottom: inset2,
          borderRadius: (size - inset2 * 2) / 2,
          borderWidth: 1,
          borderColor: `${accent}47`,
        }}
      />

      {children}
    </View>
  );
}
