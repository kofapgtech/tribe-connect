import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import type { BookingItem } from '@/data/trip';
import { useTrip } from '@/state/trip';
import { radius, useTheme } from '@/theme';

function StatusPill({ status }: { status: BookingItem['status'] }) {
  const theme = useTheme();
  const confirmed = status === 'confirmed';
  const color = confirmed ? theme.colors.secondary : theme.colors.accent;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.surfaceSoft,
        borderRadius: radius.pill,
        paddingVertical: 4,
        paddingHorizontal: 10,
      }}
    >
      <Ionicons name={confirmed ? 'checkmark-circle' : 'time-outline'} size={14} color={color} />
      <Text variant="small" color={color}>
        {confirmed ? 'Confirmed' : 'Pending'}
      </Text>
    </View>
  );
}

export default function BookingStatus() {
  const router = useRouter();
  const theme = useTheme();
  const { bookingItems, confirmPending, pendingCount } = useTrip();

  // Concierge-confirm demo mechanic: the pending partner auto-confirms after a
  // short beat (and a pending card is tappable to confirm it live on stage).
  useEffect(() => {
    if (pendingCount === 0) return;
    const t = setTimeout(() => confirmPending(), 4000);
    return () => clearTimeout(t);
  }, [pendingCount, confirmPending]);

  return (
    <Screen
      scroll
      footer={<Button label="View my trip" onPress={() => router.dismissAll()} />}
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Booking status
        </Text>
        <Text variant="h1">Know what is set</Text>
        <Text variant="muted">
          {pendingCount === 0
            ? 'Everything is confirmed. Your concierge has you covered.'
            : 'Confirmed and pending items, together. Tap a pending item to confirm.'}
        </Text>
      </View>

      {bookingItems.map((b) => {
        const pending = b.status === 'pending';
        const row = (
          <Card key={b.id} soft={pending}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text variant="title">{b.title}</Text>
              <StatusPill status={b.status} />
            </View>
            <Text variant="muted">{b.detail}</Text>
          </Card>
        );
        return pending ? (
          <Pressable key={b.id} onPress={() => confirmPending()}>
            {row}
          </Pressable>
        ) : (
          row
        );
      })}

      <Text variant="small">Payment state and service confirmation remain separate.</Text>
    </Screen>
  );
}
