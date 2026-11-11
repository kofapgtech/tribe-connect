import { useEffect, useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { easing } from '@/theme';

/**
 * A light sheen that sweeps across a hero surface on a loop, with a long pause
 * between passes. The parent must clip overflow (`overflow: 'hidden'`). Fills
 * the parent and sits behind content. Honors reduce-motion (renders nothing).
 */
export function Sheen({
  color = 'rgba(255,255,255,0.14)',
  sweepMs = 1100,
  pauseMs = 4200,
}: {
  color?: string;
  sweepMs?: number;
  pauseMs?: number;
}) {
  const reduce = useReducedMotion();
  const p = useSharedValue(0);
  const [w, setW] = useState(0);

  useEffect(() => {
    if (reduce || w === 0) return;
    p.set(
      withRepeat(
        withSequence(
          withTiming(1, { duration: sweepMs, easing: easing.standard }),
          // hold off-screen, then snap back for the next pass
          withDelay(pauseMs, withTiming(0, { duration: 0 })),
        ),
        -1,
        false,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, w, sweepMs, pauseMs]);

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -90 + (w + 180) * p.get() }, { rotate: '18deg' }],
  }));

  if (reduce) return null;

  return (
    <View
      pointerEvents="none"
      onLayout={(e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width)}
      style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}
    >
      <Animated.View style={[{ position: 'absolute', top: -24, bottom: -24, left: 0, width: 64 }, barStyle]}>
        <LinearGradient
          colors={['transparent', color, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}
