import type { ReactNode } from 'react';
import { ScrollView, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useScreenFade } from '@/components/motion/useScreenFade';
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
  const fade = useScreenFade();

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

  // Transparent background so the app-wide tribe-tinted glow (mounted at the
  // root) shows through; a gentle whole-screen fade runs on every focus so
  // views cross-fade in rather than hard-cutting.
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={edges}>
      <Animated.View style={[{ flex: 1 }, fade]}>
        {content}
        {footer ? <View style={{ padding, paddingTop: theme.spacing.sm }}>{footer}</View> : null}
      </Animated.View>
    </SafeAreaView>
  );
}
