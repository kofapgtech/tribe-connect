import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Rise } from '@/components/motion/Rise';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { radius, useTheme } from '@/theme';

export default function Exchange() {
  const theme = useTheme();
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: theme.spacing.lg }}>
        <Rise index={0}>
          <Ionicons name="wallet-outline" size={48} color={theme.colors.textMuted} />
        </Rise>
        <Rise index={1}>
          <View
            style={{
              borderRadius: radius.pill,
              borderWidth: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surfaceSoft,
              paddingVertical: 5,
              paddingHorizontal: 14,
            }}
          >
            <Text variant="label" color={theme.colors.textMuted}>
              Soon
            </Text>
          </View>
        </Rise>
        <Rise index={2}>
          <Text variant="h1" center>
            Exchange
          </Text>
        </Rise>
        <Rise index={3}>
          <Text variant="muted" center>
            Wallet, shared trip expenses, and the curated shop live here. Deferred for this demo —
            a teaser only.
          </Text>
        </Rise>
        <Rise index={4} style={{ marginTop: theme.spacing.md }}>
          <Card soft>
            <Text variant="small" color={theme.colors.textMuted}>
              Open item: this tab is named “Invest” in the direction email and “Exchange” in the
              wireframe. Working name: Exchange.
            </Text>
          </Card>
        </Rise>
      </View>
    </Screen>
  );
}
