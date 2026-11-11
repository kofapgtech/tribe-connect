import type { ReactNode } from 'react';
import { Pressable, type GestureResponderEvent, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { duration, easing } from '@/theme';

type Props = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** scale at full press (default 0.98) */
  scaleTo?: number;
};

/**
 * A Pressable that gently scales its content on press — the card-level
 * counterpart to Button's press feedback. Honors reduce-motion.
 */
export function PressableScale({ children, style, scaleTo = 0.98, onPressIn, onPressOut, ...rest }: Props) {
  const reduce = useReducedMotion();
  const pressed = useSharedValue(0);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: 1 - pressed.get() * (1 - scaleTo) }] }));

  return (
    <Pressable
      {...rest}
      onPressIn={(e: GestureResponderEvent) => {
        if (!reduce) pressed.set(withTiming(1, { duration: duration.micro, easing: easing.standard }));
        onPressIn?.(e);
      }}
      onPressOut={(e: GestureResponderEvent) => {
        if (!reduce) pressed.set(withTiming(0, { duration: duration.base, easing: easing.standard }));
        onPressOut?.(e);
      }}
    >
      <Animated.View style={[style, anim]}>{children}</Animated.View>
    </Pressable>
  );
}
