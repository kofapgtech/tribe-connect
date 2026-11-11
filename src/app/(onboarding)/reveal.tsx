import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { BrandRing } from '@/components/BrandRing';
import { AccentGlow } from '@/components/AccentGlow';
import { Rise } from '@/components/motion/Rise';
import { revealTribe } from '@/data';
import type { TribeReveal } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { duration, easing, radius, useTheme } from '@/theme';

/**
 * The reveal climax: the brand halo scales in while the tribe glyph springs
 * up inside it with a short delay (emphasis overshoot). Honors reduce-motion.
 */
function RevealEmblem({ icon, accent, bg }: { icon: keyof typeof Ionicons.glyphMap; accent: string; bg: string }) {
  const reduce = useReducedMotion();
  const halo = useSharedValue(reduce ? 1 : 0);
  const glyph = useSharedValue(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) return;
    halo.set(withTiming(1, { duration: duration.hero, easing: easing.emphasis }));
    glyph.set(withDelay(160, withTiming(1, { duration: 460, easing: easing.emphasis })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const haloStyle = useAnimatedStyle(() => ({
    opacity: halo.get(),
    transform: [{ scale: 0.82 + 0.18 * halo.get() }],
  }));
  const glyphStyle = useAnimatedStyle(() => ({
    opacity: glyph.get(),
    transform: [{ scale: 0.5 + 0.5 * glyph.get() }],
  }));

  return (
    <Animated.View style={haloStyle}>
      <BrandRing size={132} thickness={7}>
        <Animated.View
          style={[
            { width: 104, height: 104, borderRadius: 52, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' },
            glyphStyle,
          ]}
        >
          <Ionicons name={icon} size={52} color={accent} />
        </Animated.View>
      </BrandRing>
    </Animated.View>
  );
}

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
          <Button label="This feels like me" variant="accent" onPress={() => router.replace('/tribeconnect')} />
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
          <RevealEmblem
            icon={archetype.icon as keyof typeof Ionicons.glyphMap}
            accent={theme.colors.accent}
            bg={theme.colors.background}
          />
          <Rise index={2}>
            <Text variant="label" color={theme.colors.accent} center>
              Meet your tribe
            </Text>
          </Rise>
          <Rise index={3}>
            <Text variant="display" color={theme.colors.textInverse} center>
              {archetype.name}
            </Text>
          </Rise>
          <Rise index={4}>
            <Text variant="title" color={theme.colors.textInverse} center>
              {archetype.tagline}
            </Text>
          </Rise>
        </View>

        <Rise index={5}>
          <Text variant="body" center color={theme.colors.textMuted}>
            {archetype.blurb}
          </Text>
        </Rise>

        {reasons.length > 0 ? (
          <Rise index={6}>
            <Card soft>
              <Text variant="small" color={theme.colors.textMuted}>
                Suggested because you chose {reasons.join(', ')}. Your badge is an invitation to
                explore — all experiences stay open to you.
              </Text>
            </Card>
          </Rise>
        ) : null}
      </View>
    </Screen>
  );
}
