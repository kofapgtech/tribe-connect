import { Pressable, type PressableProps, View } from 'react-native';
import { radius, useTheme } from '@/theme';
import { Text } from './Text';

/**
 * Buttons color by role:
 *   primary — green fill, the forward action (Confirm booking, Open today).
 *   accent  — tribe-accent fill, for identity choices inside the member's
 *             journey ("This feels like me" on the Tribe Reveal).
 *   ghost   — low-pressure secondary (Explore Ghana first, Back to trip).
 *   house   — red outline only, reserved for true house/brand moments —
 *             never an ordinary action.
 */
type Variant = 'primary' | 'accent' | 'ghost' | 'house';

type Props = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: Variant;
  disabled?: boolean;
};

export function Button({ label, variant = 'primary', disabled, ...rest }: Props) {
  const theme = useTheme();
  const c = theme.colors;

  const bg =
    variant === 'primary'
      ? c.primary
      : variant === 'accent'
        ? c.accent
        : 'transparent'; // ghost + house
  const fg =
    variant === 'primary'
      ? c.primaryContent
      : variant === 'accent'
        ? c.accentContent
        : variant === 'house'
          ? c.house
          : c.primary; // ghost text = green
  const borderColor =
    variant === 'house' ? c.house : variant === 'ghost' ? 'transparent' : bg;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => ({ opacity: disabled ? 0.4 : pressed ? 0.85 : 1 })}
      {...rest}
    >
      <View
        style={{
          backgroundColor: bg,
          borderRadius: radius.pill,
          paddingVertical: 15,
          paddingHorizontal: theme.spacing.xl,
          alignItems: 'center',
          borderWidth: variant === 'ghost' ? 0 : 1,
          borderColor,
        }}
      >
        <Text variant="bodyStrong" color={fg} style={{ fontFamily: theme.fonts.bodyBlack }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
