import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { MomentCard } from '@/components/MomentCard';
import { MomentDetail } from '@/components/MomentDetail';
import { NewPostSheet } from '@/components/NewPostSheet';
import { SegmentedToggle } from '@/components/SegmentedToggle';
import { TribeBadge, tribeName } from '@/components/TribeBadge';
import { getMoments, getPinnedLead, hosts } from '@/data';
import type { MediaMoment, Moment, PinnedLead } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { radius, toneColors, useTheme } from '@/theme';

function PinnedLeadCard({ lead, onPress }: { lead: PinnedLead; onPress: () => void }) {
  const theme = useTheme();
  const c = theme.colors;
  const host = hosts.find((h) => h.id === lead.hostId);
  if (!host) return null;
  const [g1, g2] = toneColors(lead.tone, c);

  return (
    <View style={{ borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: c.border, ...theme.elevation.card }}>
      <LinearGradient colors={[g1, g2]} start={{ x: 0, y: 0 }} end={{ x: 0.6, y: 1 }} style={{ padding: theme.spacing.lg, gap: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: c.surfaceInverse, borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 11 }}>
            <Ionicons name="star" size={11} color={c.accent} />
            <Text variant="small" color={c.accent} style={{ fontFamily: theme.fonts.bodyBold }}>
              Pinned · your Lead
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
          <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: c.surfaceInverse, alignItems: 'center', justifyContent: 'center' }}>
            <Text variant="bodyStrong" color={c.accent}>
              {host.name.charAt(0)}
            </Text>
          </View>
          <Text variant="bodyStrong" color={c.textInverse}>
            {host.name}
          </Text>
          <Text variant="small" color={c.accent}>
            {host.role}
          </Text>
        </View>

        <Text variant="h1" color={c.textInverse}>
          {lead.headline}
        </Text>
        <Text variant="muted" color={c.textInverse}>
          {lead.body}
        </Text>

        <Pressable onPress={onPress}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 8, borderRadius: radius.pill, borderWidth: 1, borderColor: c.accent, paddingVertical: 10, paddingHorizontal: 16 }}>
            <Text variant="bodyStrong" color={c.accent}>
              {lead.cta}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={c.accent} />
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

export default function TribeConnect() {
  const theme = useTheme();
  const router = useRouter();
  const c = theme.colors;
  const { tribe } = useOnboarding();
  const [moments, setMoments] = useState<Moment[]>([]);
  const [lead, setLead] = useState<PinnedLead | null>(null);
  const [selected, setSelected] = useState<MediaMoment | null>(null);
  const [composer, setComposer] = useState(false);
  const [lens, setLens] = useState<'tribe' | 'everyone'>('tribe');

  useEffect(() => {
    getMoments().then(setMoments);
    getPinnedLead().then(setLead);
  }, []);

  const name = tribeName(tribe?.archetype.name);

  return (
    <View style={{ flex: 1 }}>
      <Screen scroll>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: theme.spacing.md }}>
          <Text variant="display">TribeConnect</Text>
          <TribeBadge label={name} />
        </View>
        <Text variant="muted">A never-ending journey — your people and places, always close.</Text>

        <SegmentedToggle
          options={[
            { key: 'tribe', label: `My tribe · ${name}s` },
            { key: 'everyone', label: 'Everyone' },
          ]}
          value={lens}
          onChange={setLens}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
          <Ionicons name="shield-checkmark" size={15} color={c.secondary} />
          <Text variant="small" color={c.textMuted}>
            Every Ghanaian here is vetted by Tribe Connect.
          </Text>
        </View>

        {lead ? <PinnedLeadCard lead={lead} onPress={() => router.push('/tribe')} /> : null}

        {moments.map((m) => (
          <MomentCard key={m.id} moment={m} onOpen={(mm) => mm.type === 'media' && setSelected(mm)} />
        ))}
      </Screen>

      <Pressable
        onPress={() => setComposer(true)}
        accessibilityLabel="New post"
        accessibilityRole="button"
        style={{ position: 'absolute', right: 20, bottom: 20 }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: c.primary,
            alignItems: 'center',
            justifyContent: 'center',
            ...theme.elevation.card,
          }}
        >
          <Ionicons name="add" size={28} color={c.primaryContent} />
        </View>
      </Pressable>

      <NewPostSheet visible={composer} onClose={() => setComposer(false)} />
      <MomentDetail moment={selected} onClose={() => setSelected(null)} />
    </View>
  );
}
