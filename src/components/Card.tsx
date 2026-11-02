import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { radius, useTheme } from '@/theme';

export function Card({
  children,
  soft,
  style,
}: {
  children: ReactNode;
  soft?: boolean;
  style?: ViewStyle;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: soft ? theme.colors.surfaceSoft : theme.colors.surface,
          borderRadius: radius.lg,
          padding: theme.spacing.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          gap: theme.spacing.sm,
          ...theme.elevation.card,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
