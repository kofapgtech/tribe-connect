import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme';

/** 0..1 opacity -> 2-digit hex alpha suffix. */
function alpha(n: number) {
  const v = Math.max(0, Math.min(255, Math.round(n * 255)));
  return v.toString(16).padStart(2, '0');
}

/**
 * A subtle tribe-accent glow over the ink ground, for the immersive screens
 * (Welcome, Tribe Reveal). The color follows theme.colors.accent, so it
 * tracks the revealed tribe. Absolutely positioned and non-interactive — it
 * sits behind the screen content. Expo Go-compatible (expo-linear-gradient).
 */
export function AccentGlow({ intensity = 0.22 }: { intensity?: number }) {
  const theme = useTheme();
  const a = theme.colors.accent;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <LinearGradient
        colors={[`${a}${alpha(intensity)}`, `${a}${alpha(intensity * 0.35)}`, 'transparent']}
        locations={[0, 0.4, 0.8]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
