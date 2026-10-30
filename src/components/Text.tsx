import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { textVariants, useTheme, type TextVariant } from '@/theme';

type Props = RNTextProps & {
  variant?: TextVariant;
  color?: string;
  center?: boolean;
};

export function Text({ variant = 'body', color, center, style, ...rest }: Props) {
  const theme = useTheme();
  const v = textVariants[variant];
  const defaultColor = variant === 'muted' || variant === 'small' ? theme.colors.textMuted : theme.colors.text;
  return (
    <RNText
      style={[
        {
          fontFamily: v.fontFamily,
          fontSize: v.fontSize,
          lineHeight: v.lineHeight,
          letterSpacing: v.letterSpacing,
          textTransform: v.textTransform,
          color: color ?? defaultColor,
          textAlign: center ? 'center' : undefined,
        },
        style,
      ]}
      {...rest}
    />
  );
}
