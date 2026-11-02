import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SelectionPill } from '@/components/SelectionPill';
import { paceOptions, vibeOptions } from '@/data/trip';
import { useTrip } from '@/state/trip';
import { useTheme } from '@/theme';

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
        {vibeOptions.map((v) => (
          <SelectionPill
            key={v.id}
            label={v.label}
            selected={vibe.includes(v.id)}
            onPress={() => toggleVibe(v.id)}
            style={{ width: '47%' }}
          />
        ))}
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="title">Pace</Text>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
          {paceOptions.map((p) => (
            <SelectionPill
              key={p.id}
              label={p.label}
              selected={pace === p.id}
              onPress={() => setPace(p.id)}
              style={{ flex: 1 }}
            />
          ))}
        </View>
      </View>

      <Text variant="small">Dates can come later. Budget and access needs can be added privately.</Text>
    </Screen>
  );
}
