import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { BrandRing } from '@/components/BrandRing';
import { AccentGlow } from '@/components/AccentGlow';
import { revealTribe } from '@/data';
import type { TribeReveal } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { radius, useTheme } from '@/theme';

export default function Reveal() {
  const router = useRouter();
  const theme = useTheme();
  const { selected, reveal } = useOnboarding();
  const [result, setResult] = useState<TribeReveal | null>(null);

  useEffect(() => {
    let active = true;
    reveal();
    revealTribe(selected).then((r) => {
      if (active) setResult(r);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!result) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.spacing.lg }}>
          <ActivityIndicator color={theme.colors.accent} />
          <Text variant="muted">Finding your tribe…</Text>
        </View>
      </Screen>
    );
  }

  const { archetype, reasons } = result;

  return (
    <Screen
      footer={
        <View style={{ gap: theme.spacing.md }}>
          <Button label="This feels like me" onPress={() => router.replace('/journey')} />
          <Button label="Revisit my choices" variant="ghost" onPress={() => router.back()} />
        </View>
      }
    >
      <AccentGlow intensity={0.28} />
      <View style={{ flex: 1, justifyContent: 'center', gap: theme.spacing.xl }}>
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
          <BrandRing size={132} thickness={7}>
            <View
              style={{
                width: 104,
                height: 104,
                borderRadius: 52,
                backgroundColor: theme.colors.background,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name={archetype.icon as keyof typeof Ionicons.glyphMap}
                size={52}
                color={theme.colors.accent}
              />
            </View>
          </BrandRing>
          <Text variant="label" color={theme.colors.accent}>
            Meet your tribe
          </Text>
          <Text variant="display" color={theme.colors.textInverse} center>
            {archetype.name}
          </Text>
          <Text variant="title" color={theme.colors.textInverse} center>
            {archetype.tagline}
          </Text>
        </View>

        <Text variant="body" center color={theme.colors.textMuted}>
          {archetype.blurb}
        </Text>

        {reasons.length > 0 ? (
          <Card soft>
            <Text variant="small" color={theme.colors.textMuted}>
              Suggested because you chose {reasons.join(', ')}. Your badge is an invitation to
              explore — all experiences stay open to you.
            </Text>
          </Card>
        ) : null}
      </View>
    </Screen>
  );
}
