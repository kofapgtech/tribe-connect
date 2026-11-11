import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Text } from './Text';
import { duration, easing, radius, useTheme } from '@/theme';

export type Status = 'review' | 'pending' | 'confirmed';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const CHECK_LEN = 30; // >= path length so the dash fully hides it

/** A checkmark that draws itself in when `play`, else shows fully drawn. */
function AnimatedCheck({ color, play }: { color: string; play: boolean }) {
  const d = useSharedValue(play ? 0 : 1);
  useEffect(() => {
    if (play) {
      d.set(0);
      d.set(withTiming(1, { duration: duration.base, easing: easing.standard }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);
  const props = useAnimatedProps(() => ({ strokeDashoffset: CHECK_LEN * (1 - d.get()) }));
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24">
      <AnimatedPath
        d="M4 12.5 L9.5 18 L20 6.5"
        stroke={color}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={CHECK_LEN}
        animatedProps={props}
      />
    </Svg>
  );
}

/**
 * Pending (accent) vs Confirmed (green), shown together so the guest always
 * knows what's set. When a pill transitions to Confirmed during the session
 * (e.g. the concierge confirms a pending item) the check draws itself in and
 * the pill gives a brief green flash. Honors reduce-motion.
 */
export function StatusPill({ status }: { status: Status }) {
  const theme = useTheme();
  const c = theme.colors;
  const reduce = useReducedMotion();

  // detect a transition INTO confirmed (not an already-confirmed first mount)
  const prev = useRef(status);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (prev.current !== 'confirmed' && status === 'confirmed' && !reduce) setPlay(true);
    prev.current = status;
  }, [status, reduce]);

  const flash = useSharedValue(0);
  useEffect(() => {
    if (play) {
      flash.set(
        withSequence(
          withTiming(1, { duration: 70 }),
          withTiming(0, { duration: 640, easing: easing.standard }),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);
  const flashStyle = useAnimatedStyle(() => ({ opacity: flash.get() }));

  const map = {
    confirmed: { color: c.secondary, icon: 'checkmark-circle' as const, label: 'Confirmed' },
    pending: { color: c.accent, icon: 'time-outline' as const, label: 'Pending' },
    review: { color: c.textMuted, icon: 'ellipse-outline' as const, label: 'In review' },
  };
  const entry = map[status];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        alignSelf: 'flex-start',
        backgroundColor: c.surfaceSoft,
        borderRadius: radius.pill,
        paddingVertical: 4,
        paddingHorizontal: 10,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: `${c.secondary}3A` }, flashStyle]}
      />
      {status === 'confirmed' ? (
        <AnimatedCheck color={entry.color} play={play} />
      ) : (
        <Ionicons name={entry.icon} size={14} color={entry.color} />
      )}
      <Text variant="small" color={entry.color}>
        {entry.label}
      </Text>
    </View>
  );
}
