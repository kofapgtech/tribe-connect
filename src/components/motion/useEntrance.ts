import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { duration, easing, entrance } from '@/theme/motion';

/**
 * Drives a fade + rise entrance that REPLAYS on every focus — not just first
 * mount. Tab screens stay mounted in the navigator, so a mount-only animation
 * would never re-run on tab switches; keying off `useFocusEffect` makes the
 * entrance fire each time the view becomes active, matching the mockup where
 * switching screens re-runs the rise.
 *
 * `index` staggers children: each step adds `entrance.stagger` ms of delay.
 * Honors the OS "reduce motion" setting by snapping straight to visible.
 */
export function useEntrance(index = 0) {
  const reduce = useReducedMotion();
  const progress = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      if (reduce) {
        progress.set(1);
        return;
      }
      progress.set(0);
      progress.set(
        withDelay(
          index * entrance.stagger,
          withTiming(1, { duration: duration.enter, easing: easing.standard }),
        ),
      );
    }, [reduce, index, progress]),
  );

  return useAnimatedStyle(() => ({
    opacity: progress.get(),
    transform: [{ translateY: (1 - progress.get()) * entrance.riseDistance }],
  }));
}
