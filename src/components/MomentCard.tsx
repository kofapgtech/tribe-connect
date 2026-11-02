import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from './Text';
import { Button } from './Button';
import { hosts } from '@/data';
import type { Moment, MomentActionDest } from '@/data/types';
import { palette, radius, useTheme } from '@/theme';

/** Each feed action sends the member to a main-app tab. */
const destRoute: Record<MomentActionDest, '/journey' | '/exchange' | '/tribe'> = {
  MyJourney: '/journey',
  Exchange: '/exchange',
  MyTribe: '/tribe',
};

/** Placeholder-media gradient tones, built from existing tokens only. */
function toneColors(tone: 'gold' | 'warm' | 'cool', accent: string, surfaceInverse: string): [string, string] {
  if (tone === 'gold') return [accent, palette.ochre];
  if (tone === 'warm') return [palette.ochre, surfaceInverse];
  return [accent, surfaceInverse]; // cool — accent fades into deep ink
}

function AddToTribe({ name }: { name: string }) {
  const theme = useTheme();
  const c = theme.colors;
  const [added, setAdded] = useState(false);
  return (
    <Pressable onPress={() => setAdded((v) => !v)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          borderRadius: radius.pill,
          borderWidth: 1,
          borderColor: added ? c.accent : c.border,
          backgroundColor: added ? `${c.accent}22` : 'transparent',
          paddingVertical: 11,
        }}
      >
        <Ionicons name={added ? 'checkmark' : 'add'} size={16} color={added ? c.accent : c.textMuted} />
        <Text variant="small" color={added ? c.accent : c.textMuted}>
          {added ? `${name} is in your tribe` : `Add ${name} to your tribe`}
        </Text>
      </View>
    </Pressable>
  );
}

function Avatars({ initials }: { initials: string[] }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={{ flexDirection: 'row' }}>
      {initials.map((ini, i) => (
        <View
          key={i}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: c.surfaceSoft,
            borderWidth: 1,
            borderColor: c.background,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: i === 0 ? 0 : -8,
          }}
        >
          <Text variant="small" color={c.textMuted}>
            {ini}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function MomentCard({ moment, onOpen }: { moment: Moment; onOpen: (m: Moment) => void }) {
  const theme = useTheme();
  const router = useRouter();
  const c = theme.colors;

  const go = (dest: MomentActionDest) => router.push(destRoute[dest]);

  // ---- NOTE ----
  if (moment.type === 'note') {
    return (
      <Pressable onPress={() => router.push('/tribe')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.md,
            backgroundColor: c.surface,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: c.border,
            padding: theme.spacing.lg,
            ...theme.elevation.card,
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: c.surfaceSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={c.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">{moment.title}</Text>
            <Text variant="small" color={c.textMuted}>
              {moment.text}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={c.textMuted} />
        </View>
      </Pressable>
    );
  }

  // ---- GATHERING ----
  if (moment.type === 'gathering') {
    return (
      <Pressable onPress={() => go(moment.action.dest)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.md,
            backgroundColor: c.surface,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: c.border,
            padding: theme.spacing.lg,
            ...theme.elevation.card,
          }}
        >
          <View
            style={{
              width: 54,
              height: 54,
              borderRadius: radius.md,
              backgroundColor: c.surfaceSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text variant="bodyStrong" color={c.accent}>
              {moment.day}
            </Text>
            <Text variant="small" color={c.textMuted}>
              {moment.place}
            </Text>
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            <Text variant="bodyStrong">{moment.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
              <Avatars initials={moment.attendees} />
              <Text variant="small" color={c.textMuted}>
                {moment.going} going
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={c.textMuted} />
        </View>
      </Pressable>
    );
  }

  // ---- MEDIA ----
  const host = hosts.find((h) => h.id === moment.hostId);
  if (!host) return null;
  const [c1, c2] = toneColors(moment.tone, c.accent, c.surfaceInverse);

  return (
    <Pressable onPress={() => onOpen(moment)}>
      <View
        style={{
          backgroundColor: c.surface,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: c.border,
          overflow: 'hidden',
          ...theme.elevation.card,
        }}
      >
        <LinearGradient
          colors={[c1, c2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ height: 190, padding: theme.spacing.md, justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row' }}>
            {host.verified ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: c.surfaceInverse,
                  borderRadius: radius.pill,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                }}
              >
                <Ionicons name="shield-checkmark" size={12} color={c.secondary} />
                <Text variant="small" color={c.secondary}>
                  Vetted
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: c.surfaceInverse,
                  borderRadius: radius.pill,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                }}
              >
                <Text variant="small" color={c.textMuted}>
                  Traveler
                </Text>
              </View>
            )}
          </View>
          <Text variant="small" color={c.textInverse}>
            {moment.mediaCaption}
          </Text>
        </LinearGradient>

        <View style={{ padding: theme.spacing.lg, gap: theme.spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: c.surfaceSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text variant="bodyStrong" color={c.accent}>
                {host.name.charAt(0)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong">{host.name}</Text>
              <Text variant="small" color={c.textMuted}>
                {host.role}
              </Text>
            </View>
            {moment.price ? (
              <Text variant="bodyStrong" color={c.accent}>
                {moment.price}
              </Text>
            ) : (
              <Text variant="small" color={c.textMuted}>
                View ›
              </Text>
            )}
          </View>

          <Text variant="muted" color={c.textMuted} numberOfLines={2}>
            {moment.caption}
          </Text>

          {moment.action ? (
            <Button label={moment.action.label} onPress={() => go(moment.action!.dest)} />
          ) : null}
          <AddToTribe name={host.name} />
        </View>
      </View>
    </Pressable>
  );
}
