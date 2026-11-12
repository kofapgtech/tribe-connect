import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
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
import { AccentGlow } from '@/components/AccentGlow';
import { TribeHalo } from '@/components/TribeHalo';
import { TribeGlyph } from '@/components/TribeGlyph';
import { Rise } from '@/components/motion/Rise';
import { familyForTribe, revealTribe } from '@/data';
import type { TribeArchetypeId, TribeReveal } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { duration, easing, fonts, radius, useTheme } from '@/theme';

/**
 * The reveal climax: the accent halo scales in while the tribe glyph springs
 * up inside it with a short delay (emphasis overshoot). Honors reduce-motion.
 */
function RevealEmblem({ id, accent }: { id: TribeArchetypeId; accent: string }) {
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
      <TribeHalo accent={accent} size={184}>
        <Animated.View style={glyphStyle}>
          <TribeGlyph id={id} color={accent} size={82} />
        </Animated.View>
      </TribeHalo>
    </Animated.View>
  );
}

/** Accent trait pills — the interests that led to this tribe. */
function ReasonPills({ reasons, accent, text }: { reasons: string[]; accent: string; text: string }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
      {reasons.map((r) => (
        <View
          key={r}
          style={{
            borderRadius: radius.pill,
            borderWidth: 1,
            borderColor: `${accent}73`, // ≈45% accent
            backgroundColor: `${accent}1A`, // ≈10% accent
            paddingVertical: 7,
            paddingHorizontal: 13,
          }}
        >
          <Text variant="small" color={text} style={{ fontFamily: fonts.bodyBold }}>
            {r}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function Reveal() {
  const router = useRouter();
  const theme = useTheme();
  const c = theme.colors;
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
          <ActivityIndicator color={c.accent} />
          <Text variant="muted">Finding your tribe…</Text>
        </View>
      </Screen>
    );
  }

  const { archetype, reasons } = result;
  const fam = familyForTribe(archetype.id);

  return (
    <Screen
      footer={
        <View style={{ gap: theme.spacing.md }}>
          <Button label="This feels like me" variant="accent" onPress={() => router.replace('/tribeconnect')} />
          <Button label="Revisit my choices" variant="ghost" onPress={() => router.back()} />
        </View>
      }
    >
      <AccentGlow intensity={0.26} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: theme.spacing.md }}>
        <Rise index={1}>
          <Text variant="label" color={c.accent} center>
            Meet your tribe
          </Text>
        </Rise>

        <RevealEmblem id={archetype.id} accent={c.accent} />

        <Rise index={2}>
          <Text variant="label" color={c.accent} center>
            {fam.family} family · {fam.note}
          </Text>
        </Rise>
        <Rise index={2}>
          <Text variant="display" color={c.text} center>
            {archetype.name}
          </Text>
        </Rise>
        <Rise index={3}>
          <Text variant="body" color={c.textMuted} center style={{ maxWidth: 320 }}>
            {archetype.blurb}
          </Text>
        </Rise>

        {reasons.length > 0 ? (
          <Rise index={4}>
            <View style={{ marginTop: theme.spacing.xs }}>
              <ReasonPills reasons={reasons} accent={c.accent} text={c.text} />
            </View>
          </Rise>
        ) : null}
      </View>
    </Screen>
  );
}
