import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { duration, easing } from '@/theme/motion';

/**
 * A gentle whole-screen fade that replays on every focus. Opacity only — no
 * translate — so it layers cleanly under per-block `Rise` children (which add
 * the vertical travel) without double-moving the content. Applied by `Screen`
 * so every view cross-fades in instead of hard-cutting. Honors reduce-motion.
 */
export function useScreenFade() {
  const reduce = useReducedMotion();
  const opacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      if (reduce) {
        opacity.set(1);
        return;
      }
      opacity.set(0);
      opacity.set(withTiming(1, { duration: duration.base, easing: easing.standard }));
    }, [reduce, opacity]),
  );

  return useAnimatedStyle(() => ({ opacity: opacity.get() }));
}
