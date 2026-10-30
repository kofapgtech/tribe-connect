import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { useTheme } from '@/theme';

export default function Tribe() {
  const theme = useTheme();
  return (
    <Screen scroll>
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Tribe
        </Text>
        <Text variant="h1">Your people + support</Text>
      </View>

      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
          <Ionicons name="chatbubbles-outline" size={26} color={theme.colors.primary} />
          <View style={{ flex: 1 }}>
            <Text variant="title">Concierge</Text>
            <Text variant="small">A local team, always within reach — no booking required.</Text>
          </View>
        </View>
      </Card>

      <Card soft>
        <Text variant="label" color={theme.colors.textMuted}>
          Next in the build
        </Text>
        <Text variant="muted">
          Group chat, companions, and a moderated concierge thread land with the group-planning
          phase.
        </Text>
      </Card>
    </Screen>
  );
}
