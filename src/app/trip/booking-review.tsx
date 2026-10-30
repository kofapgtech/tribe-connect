import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { priceSummary } from '@/data/trip';
import { useTrip } from '@/state/trip';
import { useTheme } from '@/theme';

export default function BookingReview() {
  const router = useRouter();
  const theme = useTheme();
  const { bookingItems, companions, submitBookings } = useTrip();

  return (
    <Screen
      scroll
      footer={
        <Button
          label="Review payment + confirm"
          onPress={() => {
            submitBookings();
            router.push('/trip/booking-status');
          }}
        />
      }
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Booking review
        </Text>
        <Text variant="h1">Review our plan</Text>
        <Text variant="muted">
          7 nights · {companions.length} travelers · 2 rooms
        </Text>
      </View>

      {bookingItems.map((b) => (
        <Card key={b.id}>
          <Text variant="title">{b.title}</Text>
          <Text variant="muted">{b.detail}</Text>
        </Card>
      ))}

      <Card soft>
        <Text variant="title">Price summary</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="muted">Total</Text>
          <Text variant="bodyStrong">{priceSummary.total}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="muted">Due now</Text>
          <Text variant="bodyStrong" color={theme.colors.secondary}>
            {priceSummary.dueNow}
          </Text>
        </View>
        <Text variant="small" color={theme.colors.textMuted}>
          {priceSummary.note}
        </Text>
      </Card>

      <Text variant="small">Review actual amounts and consent before submitting.</Text>
    </Screen>
  );
}
