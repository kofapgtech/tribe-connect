import type { ReactNode } from 'react';
import { ScrollView, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  edges?: Edge[];
  style?: ViewStyle;
  footer?: ReactNode;
};

export function Screen({
  children,
  scroll = false,
  padded = true,
  edges = ['top', 'bottom'],
  style,
  footer,
}: Props) {
  const theme = useTheme();
  const padding = padded ? theme.layout.screenPadding : 0;

  const content = scroll ? (
    <ScrollView
      contentContainerStyle={{ padding, gap: theme.spacing.lg, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1, padding, gap: theme.spacing.lg }, style]}>{children}</View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={edges}>
      {content}
      {footer ? <View style={{ padding, paddingTop: theme.spacing.sm }}>{footer}</View> : null}
    </SafeAreaView>
  );
}
