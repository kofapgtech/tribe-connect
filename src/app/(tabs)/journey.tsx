import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { BrandRing } from '@/components/BrandRing';
import { countdownDays, storybookTitleForTribe } from '@/data/trip';
import { useOnboarding } from '@/state/onboarding';
import { useTrip } from '@/state/trip';
import { radius, useTheme } from '@/theme';

export default function Journey() {
  const theme = useTheme();
  const router = useRouter();
  const { tribe } = useOnboarding();
  const { hasPlan, hasBooking, chapters, companions, pendingCount, checklist, toggleChecklist } =
    useTrip();
  const title = storybookTitleForTribe(tribe?.archetype.id);
  const doneCount = checklist.filter((c) => c.done).length;

  return (
    <Screen scroll>
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Your journey
        </Text>
        <Text variant="h1">Akwaaba — your Ghana chapter</Text>
      </View>

      {tribe ? (
        <Card soft>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
            <BrandRing size={52} thickness={3}>
              <Ionicons
                name={tribe.archetype.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color={theme.colors.accent}
              />
            </BrandRing>
            <View style={{ flex: 1 }}>
              <Text variant="title">{tribe.archetype.name}</Text>
              <Text variant="small">{tribe.archetype.tagline}</Text>
            </View>
          </View>
        </Card>
      ) : (
        <Card>
          <Text variant="title">Discover your tribe</Text>
          <Text variant="muted">
            Choose a few interests and we will introduce you to your people.
          </Text>
          <Button label="Discover my tribe" onPress={() => router.replace('/welcome')} />
        </Card>
      )}

      {hasBooking ? (
        <>
          <View
            style={{
              borderRadius: radius.lg,
              backgroundColor: theme.colors.surfaceInverse,
              padding: theme.spacing.xl,
              alignItems: 'center',
              gap: theme.spacing.xs,
            }}
          >
            <Text variant="small" color={theme.colors.textInverse}>
              Ghana is getting closer
            </Text>
            <Text variant="display" color={theme.colors.textInverse} style={{ fontSize: 44, lineHeight: 52 }}>
              {countdownDays}
            </Text>
            <Text variant="small" color={theme.colors.textInverse}>
              days to your journey
            </Text>
            <Text variant="small" color={pendingCount === 0 ? theme.colors.secondary : theme.colors.accent}>
              {pendingCount === 0 ? 'All services confirmed' : `${pendingCount} pending`}
            </Text>
          </View>

          <Card>
            <Text variant="label" color={theme.colors.textMuted}>
              Before you arrive · {doneCount}/{checklist.length}
            </Text>
            {checklist.map((c) => (
              <Pressable key={c.id} onPress={() => toggleChecklist(c.id)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, paddingVertical: 6 }}>
                  <Ionicons
                    name={c.done ? 'checkbox' : 'square-outline'}
                    size={22}
                    color={c.done ? theme.colors.secondary : theme.colors.textMuted}
                  />
                  <Text variant="body" color={c.done ? theme.colors.textMuted : theme.colors.text}>
                    {c.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </Card>

          <Button label="Open today" onPress={() => router.push('/trip/today')} />
          <Button
            label="Meet your host"
            variant="secondary"
            onPress={() => router.push({ pathname: '/host/[id]', params: { id: 'host-abena' } })}
          />
        </>
      ) : hasPlan ? (
        <Card>
          <Text variant="label" color={theme.colors.textMuted}>
            Your storybook
          </Text>
          <Text variant="title">{title}</Text>
          <Text variant="muted">
            {chapters.length} chapters · {companions.length} traveler
            {companions.length === 1 ? '' : 's'}
          </Text>
          <View style={{ flexDirection: 'row', gap: theme.spacing.xs, marginVertical: theme.spacing.xs }}>
            {companions.map((c) => (
              <View
                key={c.id}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: theme.colors.surfaceSoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text variant="small" color={theme.colors.primary}>
                  {c.initial}
                </Text>
              </View>
            ))}
          </View>
          <Button label="Review dates + services" onPress={() => router.push('/trip/booking-review')} />
          <Button label="Review the plan" variant="ghost" onPress={() => router.push('/trip/vision-board')} />
        </Card>
      ) : (
        <Card>
          <Text variant="label" color={theme.colors.textMuted}>
            Plan your trip
          </Text>
          <Text variant="title">Shape your storybook</Text>
          <Text variant="muted">
            Pick a vibe and pace, draft your chapters, invite your group, and vote on dates together.
          </Text>
          <Button label="Start my storybook" onPress={() => router.push('/trip/ideal-journey')} />
        </Card>
      )}
    </Screen>
  );
}
