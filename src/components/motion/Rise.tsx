import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useEntrance } from './useEntrance';

type Props = {
  children: ReactNode;
  /** Stagger position — higher values enter later. Default 0. */
  index?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Wraps content in a staggered fade + rise entrance that replays on focus.
 * Drop it around the main blocks of a screen and give each an increasing
 * `index` to stagger them in.
 */
export function Rise({ children, index = 0, style }: Props) {
  const anim = useEntrance(index);
  return <Animated.View style={[style, anim]}>{children}</Animated.View>;
}
