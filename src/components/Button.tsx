import { Pressable, type PressableProps, View } from 'react-native';
import { radius, useTheme } from '@/theme';
import { Text } from './Text';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: Variant;
  disabled?: boolean;
};

export function Button({ label, variant = 'primary', disabled, ...rest }: Props) {
  const theme = useTheme();
  const bg =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
        ? theme.colors.surfaceSoft
        : 'transparent';
  const fg =
    variant === 'primary'
      ? theme.colors.primaryContent
      : theme.colors.primary;

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
          borderColor: variant === 'secondary' ? theme.colors.border : bg,
        }}
      >
        <Text variant="bodyStrong" color={fg}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
