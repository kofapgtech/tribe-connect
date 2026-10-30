import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { useTheme } from '@/theme';

export default function Exchange() {
  const theme = useTheme();
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: theme.spacing.lg }}>
        <Ionicons name="wallet-outline" size={48} color={theme.colors.textMuted} />
        <Text variant="h1" center>
          Exchange
        </Text>
        <Text variant="muted" center>
          Wallet, shared trip expenses, and the curated shop live here. Deferred for this demo —
          a teaser only.
        </Text>
        <Card soft style={{ marginTop: theme.spacing.md }}>
          <Text variant="small" color={theme.colors.textMuted}>
            Open item: this tab is named “Invest” in the direction email and “Exchange” in the
            wireframe. Working name: Exchange.
          </Text>
        </Card>
      </View>
    </Screen>
  );
}
