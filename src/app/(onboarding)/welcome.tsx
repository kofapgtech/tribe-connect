import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Rise } from '@/components/motion/Rise';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { BrandBar } from '@/components/BrandBar';
import { AccentGlow } from '@/components/AccentGlow';
import { radius, useTheme } from '@/theme';

export default function Welcome() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Screen>
      <AccentGlow />
      <View style={{ flex: 1, justifyContent: 'center', gap: theme.spacing.xl }}>
        <Rise index={0}>
          <View
            style={{
              borderRadius: radius.xl,
              backgroundColor: theme.colors.surfaceInverse,
              paddingVertical: theme.spacing.xxl,
              paddingHorizontal: theme.spacing.xl,
              alignItems: 'center',
              gap: theme.spacing.md,
            }}
          >
            <Logo size={128} />
            <BrandBar />
            <Text variant="label" color={theme.colors.textInverse}>
              Diaspora Tribe & Trust
            </Text>
            <Text variant="display" color={theme.colors.textInverse} center>
              Tribe Connect
            </Text>
          </View>
        </Rise>

        <Rise index={1}>
          <View style={{ gap: theme.spacing.sm }}>
            <Text variant="h1">Find your people.{'\n'}Imagine your Ghana.</Text>
            <Text variant="muted">
              Explore experiences and connections through Diaspora Tribe and Trust.
            </Text>
          </View>
        </Rise>
      </View>

      <Rise index={2}>
        <View style={{ gap: theme.spacing.md }}>
          <Button label="Discover my tribe" onPress={() => router.push('/interests')} />
          <Button label="Explore Ghana first" variant="ghost" onPress={() => router.replace('/tribeconnect')} />
          <Text variant="small" center>
            Explore freely. Save when you are ready.
          </Text>
        </View>
      </Rise>
    </Screen>
  );
}
