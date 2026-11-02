import { Modal, Pressable, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from './Text';
import { Button } from './Button';
import { HostCard } from './HostCard';
import { hosts } from '@/data';
import type { MediaMoment, MomentActionDest } from '@/data/types';
import { palette, radius, useTheme } from '@/theme';

const destRoute: Record<MomentActionDest, '/journey' | '/exchange' | '/tribe'> = {
  MyJourney: '/journey',
  Exchange: '/exchange',
  MyTribe: '/tribe',
};

function toneColors(tone: 'gold' | 'warm' | 'cool', accent: string, surfaceInverse: string): [string, string] {
  if (tone === 'gold') return [accent, palette.ochre];
  if (tone === 'warm') return [palette.ochre, surfaceInverse];
  return [accent, surfaceInverse];
}

/** "Read more" detail overlay for a media moment: full caption, the maker as
 *  a HostCard, and the action button(s). */
export function MomentDetail({ moment, onClose }: { moment: MediaMoment | null; onClose: () => void }) {
  const theme = useTheme();
  const router = useRouter();
  const c = theme.colors;
  const host = moment ? hosts.find((h) => h.id === moment.hostId) ?? null : null;

  const act = (dest: MomentActionDest) => {
    onClose();
    router.push(destRoute[dest]);
  };

  const [c1, c2] = moment ? toneColors(moment.tone, c.accent, c.surfaceInverse) : [c.accent, c.surfaceInverse];

  return (
    <Modal visible={!!moment} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: `${c.surfaceInverse}CC`, justifyContent: 'flex-end' }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} accessibilityLabel="Close" />
        <View
          style={{
            maxHeight: '88%',
            backgroundColor: c.background,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          <View style={{ alignItems: 'center', paddingVertical: theme.spacing.sm }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: c.border }} />
          </View>

          {moment && host ? (
            <ScrollView
              contentContainerStyle={{ padding: theme.spacing.xl, paddingTop: theme.spacing.sm, gap: theme.spacing.lg }}
              showsVerticalScrollIndicator={false}
            >
              <LinearGradient
                colors={[c1, c2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ height: 210, borderRadius: radius.lg, padding: theme.spacing.md, justifyContent: 'flex-end' }}
              >
                <Text variant="small" color={c.textInverse}>
                  {moment.mediaCaption}
                </Text>
              </LinearGradient>

              {moment.price ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                  <Ionicons name="pricetag-outline" size={16} color={c.accent} />
                  <Text variant="title" color={c.accent}>
                    {moment.price}
                  </Text>
                </View>
              ) : null}

              <Text variant="body">{moment.caption}</Text>

              <View style={{ gap: theme.spacing.xs }}>
                <Text variant="label" color={c.accent}>
                  The person behind it
                </Text>
                <HostCard
                  host={host}
                  onPress={() => {
                    onClose();
                    router.push({ pathname: '/host/[id]', params: { id: host.id } });
                  }}
                />
              </View>

              {moment.action ? (
                <Button label={moment.action.label} onPress={() => act(moment.action!.dest)} />
              ) : null}
              <Button label="Close" variant="ghost" onPress={onClose} />
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
