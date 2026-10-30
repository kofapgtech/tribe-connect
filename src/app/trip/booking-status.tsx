import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HostCard } from '@/components/HostCard';
import { StatusPill } from '@/components/StatusPill';
import { hosts } from '@/data';
import { useTrip } from '@/state/trip';
import { useTheme } from '@/theme';

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
        const host = b.hostId ? hosts.find((h) => h.id === b.hostId) : null;

        if (host) {
          return (
            <HostCard
              key={b.id}
              host={host}
              context={b.detail}
              status={b.status}
              onPress={pending ? () => confirmPending() : undefined}
            />
          );
        }

        const row = (
          <Card soft={pending}>
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
          <View key={b.id}>{row}</View>
        );
      })}

      <Text variant="small">Payment state and service confirmation remain separate.</Text>
    </Screen>
  );
}
