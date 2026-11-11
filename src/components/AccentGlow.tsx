import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/theme';

/** 0..1 opacity -> 2-digit hex alpha suffix. */
function alpha(n: number) {
  const v = Math.max(0, Math.min(255, Math.round(n * 255)));
  return v.toString(16).padStart(2, '0');
}

/**
 * A subtle tribe-accent glow over the ink ground, for the immersive screens
 * (Welcome, Tribe Reveal). The color follows theme.colors.accent, so it
 * tracks the revealed tribe. Absolutely positioned and non-interactive.
 *
 * Ambient: the glow slowly breathes (opacity + a few px of drift) on a ~6s
 * cycle so the immersive screens feel alive. Honors reduce-motion (static).
 */
export function AccentGlow({ intensity = 0.22 }: { intensity?: number }) {
  const theme = useTheme();
  const a = theme.colors.accent;
  const reduce = useReducedMotion();
  const breath = useSharedValue(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) {
      breath.set(1);
      return;
    }
    breath.set(
      withRepeat(withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }), -1, true),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const style = useAnimatedStyle(() => ({
    opacity: 0.68 + 0.32 * breath.get(),
    transform: [{ translateY: -5 + 5 * breath.get() }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, style]}
    >
      <LinearGradient
        colors={[`${a}${alpha(intensity)}`, `${a}${alpha(intensity * 0.35)}`, 'transparent']}
        locations={[0, 0.4, 0.8]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
}
