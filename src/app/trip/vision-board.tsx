import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useTrip } from '@/state/trip';
import { radius, useTheme } from '@/theme';

export default function VisionBoard() {
  const router = useRouter();
  const theme = useTheme();
  const { companions, favorites, dateOptions, myVote, voteDate, createPlan } = useTrip();

  return (
    <Screen
      scroll
      footer={
        <Button
          label="Review dates + services"
          onPress={() => {
            createPlan();
            router.push('/trip/booking-review');
          }}
        />
      }
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Group vision board
        </Text>
        <Text variant="h1">Make it ours</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        {companions.map((c) => (
          <View key={c.id} style={{ alignItems: 'center', gap: 4 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: theme.colors.surfaceSoft,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: c.isMe ? 2 : 0,
                borderColor: theme.colors.secondary,
              }}
            >
              <Text variant="bodyStrong" color={theme.colors.primary}>
                {c.initial}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text variant="title">Shared favorites</Text>
      {favorites.map((f) => (
        <Card key={f.id} soft={f.optional}>
          <Text variant="bodyStrong">
            {f.optional ? 'Optional: ' : ''}
            {f.title}
          </Text>
          <Text variant="small" color={theme.colors.textMuted}>
            {f.mustDo} must do · {f.interested} interested
          </Text>
        </Card>
      ))}

      <Text variant="title" style={{ marginTop: theme.spacing.sm }}>
        Pick your dates
      </Text>
      <Text variant="small">Two proposed windows — mark your availability.</Text>
      {dateOptions.map((d) => {
        const mine = myVote === d.id;
        return (
          <Pressable key={d.id} onPress={() => voteDate(d.id)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: mine ? theme.colors.surfaceSoft : theme.colors.surface,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: mine ? theme.colors.secondary : theme.colors.border,
                padding: theme.spacing.lg,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
                <Ionicons
                  name={mine ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={mine ? theme.colors.secondary : theme.colors.textMuted}
                />
                <Text variant="bodyStrong">{d.range}</Text>
              </View>
              <Text variant="small" color={theme.colors.textMuted}>
                {d.votes} vote{d.votes === 1 ? '' : 's'}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </Screen>
  );
}
