import { useRef, useState } from 'react';
import { Pressable, type GestureResponderEvent, type PressableProps } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { duration, easing, radius, useTheme } from '@/theme';
import { Text } from './Text';

/**
 * Buttons color by role:
 *   primary — green fill, the forward action (Confirm booking, Open today).
 *   accent  — tribe-accent fill, for identity choices inside the member's
 *             journey ("This feels like me" on the Tribe Reveal).
 *   ghost   — low-pressure secondary (Explore Ghana first, Back to trip).
 *   house   — red outline only, reserved for true house/brand moments —
 *             never an ordinary action.
 *
 * Touch feedback: a press scales the button to 0.97 and a soft ripple expands
 * from the touch point. Both respect the OS reduce-motion setting.
 */
type Variant = 'primary' | 'accent' | 'ghost' | 'house';

type Props = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: Variant;
  disabled?: boolean;
};

const RIPPLE = 180;

function Ripple({ x, y, color, onDone }: { x: number; y: number; color: string; onDone: () => void }) {
  const p = useSharedValue(0);
  // start the expand on first render
  if (p.get() === 0) {
    p.set(
      withTiming(1, { duration: 480, easing: easing.standard }, (finished) => {
        'worklet';
        if (finished) runOnJS(onDone)();
      }),
    );
  }
  const style = useAnimatedStyle(() => ({
    opacity: 0.28 * (1 - p.get()),
    transform: [{ translateX: -RIPPLE / 2 }, { translateY: -RIPPLE / 2 }, { scale: 0.2 + p.get() * 1.7 }],
  }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        { position: 'absolute', left: x, top: y, width: RIPPLE, height: RIPPLE, borderRadius: RIPPLE / 2, backgroundColor: color },
        style,
      ]}
    />
  );
}

export function Button({ label, variant = 'primary', disabled, ...rest }: Props) {
  const theme = useTheme();
  const c = theme.colors;
  const reduce = useReducedMotion();
  const pressed = useSharedValue(0);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);
  const rid = useRef(0);

  const bg =
    variant === 'primary' ? c.primary : variant === 'accent' ? c.accent : 'transparent';
  const fg =
    variant === 'primary'
      ? c.primaryContent
      : variant === 'accent'
        ? c.accentContent
        : variant === 'house'
          ? c.house
          : c.primary; // ghost text = green
  const borderColor = variant === 'house' ? c.house : variant === 'ghost' ? 'transparent' : bg;

  const scaleStyle = useAnimatedStyle(() => ({ transform: [{ scale: 1 - pressed.get() * 0.03 }] }));

  const onPressIn = (e: GestureResponderEvent) => {
    if (reduce) return;
    pressed.set(withTiming(1, { duration: duration.micro, easing: easing.standard }));
    const { locationX, locationY } = e.nativeEvent;
    const id = ++rid.current;
    setRipple({ x: locationX, y: locationY, id });
  };
  const onPressOut = () => {
    if (reduce) return;
    pressed.set(withTiming(0, { duration: duration.base, easing: easing.standard }));
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      {...rest}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed: p }) => ({ opacity: disabled ? 0.4 : p ? 0.9 : 1 })}
    >
      <Animated.View
        style={[
          {
            backgroundColor: bg,
            borderRadius: radius.pill,
            paddingVertical: 15,
            paddingHorizontal: theme.spacing.xl,
            alignItems: 'center',
            borderWidth: variant === 'ghost' ? 0 : 1,
            borderColor,
            overflow: 'hidden',
          },
          scaleStyle,
        ]}
      >
        {ripple ? (
          <Ripple
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            color={fg}
            onDone={() => setRipple((r) => (r && r.id === ripple.id ? null : r))}
          />
        ) : null}
        <Text variant="bodyStrong" color={fg} style={{ fontFamily: theme.fonts.bodyBlack }}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
