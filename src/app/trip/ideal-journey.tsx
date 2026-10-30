import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { paceOptions, vibeOptions } from '@/data/trip';
import { useTrip } from '@/state/trip';
import { radius, useTheme } from '@/theme';

export default function IdealJourney() {
  const router = useRouter();
  const theme = useTheme();
  const { vibe, toggleVibe, pace, setPace } = useTrip();

  return (
    <Screen
      scroll
      footer={<Button label="Create my storybook" onPress={() => router.push('/trip/storybook')} />}
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Your ideal journey
        </Text>
        <Text variant="h1">How will it feel?</Text>
        <Text variant="muted">For this trip, I am drawn to…</Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
        {vibeOptions.map((v) => {
          const on = vibe.includes(v.id);
          return (
            <Pressable key={v.id} onPress={() => toggleVibe(v.id)} style={{ width: '47%' }}>
              <View
                style={{
                  backgroundColor: on ? theme.colors.primary : theme.colors.surface,
                  borderColor: on ? theme.colors.primary : theme.colors.border,
                  borderWidth: 1,
                  borderRadius: radius.pill,
                  paddingVertical: 14,
                  alignItems: 'center',
                }}
              >
                <Text variant="bodyStrong" color={on ? theme.colors.primaryContent : theme.colors.text}>
                  {v.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="title">Pace</Text>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
          {paceOptions.map((p) => {
            const on = pace === p.id;
            return (
              <Pressable key={p.id} onPress={() => setPace(p.id)} style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: on ? theme.colors.surfaceSoft : theme.colors.surface,
                    borderColor: on ? theme.colors.secondary : theme.colors.border,
                    borderWidth: 1,
                    borderRadius: radius.md,
                    paddingVertical: 12,
                    alignItems: 'center',
                  }}
                >
                  <Text variant="bodyStrong" color={on ? theme.colors.primary : theme.colors.textMuted}>
                    {p.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Text variant="small">Dates can come later. Budget and access needs can be added privately.</Text>
    </Screen>
  );
}
