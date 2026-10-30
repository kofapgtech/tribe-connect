import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { storybookTitleForTribe } from '@/data/trip';
import { useOnboarding } from '@/state/onboarding';
import { useTrip } from '@/state/trip';
import { radius, useTheme } from '@/theme';

export default function Storybook() {
  const router = useRouter();
  const theme = useTheme();
  const { tribe } = useOnboarding();
  const { chapters, createPlan } = useTrip();
  const title = storybookTitleForTribe(tribe?.archetype.id);

  return (
    <Screen
      scroll
      footer={
        <Button
          label="Save + invite people"
          onPress={() => {
            createPlan();
            router.push('/trip/invite');
          }}
        />
      }
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Your storybook
        </Text>
        <Text variant="h1">{title}</Text>
      </View>

      <View
        style={{
          height: 150,
          borderRadius: radius.lg,
          backgroundColor: theme.colors.surfaceSoft,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <Ionicons name="image-outline" size={40} color={theme.colors.secondary} />
        <Text variant="small" color={theme.colors.textMuted} style={{ marginTop: theme.spacing.sm }}>
          A vision to shape together
        </Text>
      </View>

      <View style={{ gap: theme.spacing.md }}>
        {chapters.map((c) => (
          <View
            key={c.id}
            style={{
              flexDirection: 'row',
              gap: theme.spacing.md,
              paddingBottom: theme.spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }}
          >
            <Text variant="h2" color={theme.colors.secondary}>
              {String(c.order).padStart(2, '0')}
            </Text>
            <View style={{ flex: 1 }}>
              <Text variant="title">{c.title}</Text>
              <Text variant="muted">{c.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text variant="small" color={theme.colors.secondary}>
        Edit · Reorder · Add a chapter
      </Text>
    </Screen>
  );
}
