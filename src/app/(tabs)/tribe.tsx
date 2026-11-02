import { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { SelectionPill } from '@/components/SelectionPill';
import { TribeBadge, tribeName } from '@/components/TribeBadge';
import { ConversationView } from '@/components/ConversationView';
import { DispatchSheet } from '@/components/DispatchSheet';
import { Toast, useToast } from '@/components/Toast';
import { dispatch, getThreads, tribeFilters } from '@/data';
import type { Thread } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { radius, toneColors, useTheme } from '@/theme';

function Tag({ label, tone }: { label: string; tone: 'accent' | 'green' | 'muted' }) {
  const c = useTheme().colors;
  const color = tone === 'accent' ? c.accent : tone === 'green' ? c.secondary : c.textMuted;
  return (
    <View style={{ backgroundColor: c.surfaceSoft, borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 8 }}>
      <Text variant="small" color={color} style={{ fontSize: 10 }}>
        {label}
      </Text>
    </View>
  );
}

function ThreadRow({ thread, onPress }: { thread: Thread; onPress: () => void }) {
  const theme = useTheme();
  const c = theme.colors;
  const [g1, g2] = toneColors(thread.tone, c);
  const tagTone = thread.cat === 'group' ? 'green' : thread.cat === 'connection' ? 'muted' : 'accent';

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
          backgroundColor: thread.pinned ? c.surface : 'transparent',
          borderRadius: radius.lg,
          borderWidth: thread.pinned ? 1 : 0,
          borderColor: c.border,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: thread.pinned ? theme.spacing.md : 0,
        }}
      >
        <LinearGradient colors={[g1, g2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 48, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' }}>
          {thread.cat === 'group' ? (
            <Ionicons name="people" size={20} color={c.textInverse} />
          ) : (
            <Text variant="bodyStrong" color={c.textInverse}>
              {thread.name.charAt(0)}
            </Text>
          )}
        </LinearGradient>

        <View style={{ flex: 1, gap: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Text variant="bodyStrong" numberOfLines={1} style={{ maxWidth: 150 }}>
              {thread.name}
            </Text>
            {thread.vetted && thread.cat === 'concierge' ? (
              <Ionicons name="shield-checkmark" size={12} color={c.secondary} />
            ) : null}
            <Tag label={thread.tag} tone={tagTone} />
            {thread.crew ? <Tag label="+ Crew" tone="green" /> : null}
            {thread.pinned ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <Ionicons name="pin" size={11} color={c.textMuted} />
                <Text variant="small" color={c.textMuted} style={{ fontSize: 10 }}>
                  Pinned
                </Text>
              </View>
            ) : null}
          </View>
          <Text variant="small" color={c.textMuted} numberOfLines={1}>
            {thread.last}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end', gap: 6 }}>
          <Text variant="small" color={c.textMuted}>
            {thread.time}
          </Text>
          {thread.unread ? (
            <View style={{ minWidth: 20, height: 20, borderRadius: 10, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>
              <Text variant="small" color={c.primaryContent} style={{ fontSize: 11 }}>
                {thread.unread}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export default function MyTribe() {
  const theme = useTheme();
  const c = theme.colors;
  const { tribe } = useOnboarding();
  const name = tribeName(tribe?.archetype.name);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [openThread, setOpenThread] = useState<Thread | null>(null);
  const [dispatchOpen, setDispatchOpen] = useState(false);
  const { message, show } = useToast();

  useEffect(() => {
    getThreads().then(setThreads);
  }, []);

  const q = search.trim().toLowerCase();
  const shown = threads.filter((t) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'group' ? t.crew || t.cat === 'group' : t.cat === filter;
    const matchesSearch = q === '' || t.name.toLowerCase().includes(q) || t.last.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const [ag1, ag2] = toneColors('cool', c);

  return (
    <View style={{ flex: 1 }}>
    <Screen scroll>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
        <LinearGradient colors={[ag1, ag2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 52, height: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="h2" color={c.textInverse}>
            A
          </Text>
        </LinearGradient>
        <View style={{ flex: 1, gap: 4 }}>
          <Text variant="display">MyTribe</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
            <TribeBadge label={name} />
            <Text variant="small" color={c.textMuted}>
              You · Amara
            </Text>
          </View>
        </View>
        <View style={{ width: 40, height: 40, borderRadius: radius.md, borderWidth: 1, borderColor: c.border, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="qr-code-outline" size={18} color={c.textMuted} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, backgroundColor: c.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: c.border, paddingVertical: 4, paddingHorizontal: theme.spacing.lg }}>
        <Ionicons name="search" size={18} color={c.textMuted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search your tribe"
          placeholderTextColor={c.textMuted}
          style={{ flex: 1, paddingVertical: 10, color: c.text, fontFamily: theme.fonts.body, fontSize: 16 }}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {tribeFilters.map((f) => (
          <SelectionPill key={f.id} label={f.label} selected={filter === f.id} onPress={() => setFilter(f.id)} />
        ))}
      </View>

      <View style={{ gap: theme.spacing.xs }}>
        {shown.map((t) => (
          <ThreadRow key={t.id} thread={t} onPress={() => setOpenThread(t)} />
        ))}
        {shown.length === 0 ? (
          <Text variant="muted" color={c.textMuted}>
            No one matches that.
          </Text>
        ) : null}
      </View>

      <Pressable onPress={() => setDispatchOpen(true)} accessibilityRole="button">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, backgroundColor: `${c.house}1A`, borderRadius: radius.lg, borderWidth: 1, borderColor: `${c.house}55`, padding: theme.spacing.lg }}>
          <View style={{ width: 44, height: 44, borderRadius: radius.md, backgroundColor: `${c.house}22`, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="alert-circle" size={22} color={c.house} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong" color={c.house}>
              {dispatch.title}
            </Text>
            <Text variant="small" color={c.textMuted}>
              {dispatch.subtitle}
            </Text>
          </View>
          <Text variant="small" color={c.house} style={{ fontFamily: theme.fonts.bodyBold }}>
            {dispatch.cta} ›
          </Text>
        </View>
      </Pressable>
    </Screen>

      <ConversationView thread={openThread} onClose={() => setOpenThread(null)} />
      <DispatchSheet
        visible={dispatchOpen}
        onClose={() => setDispatchOpen(false)}
        onPick={(label) => show(`${label} — Dispatch is on it ✓`)}
      />
      <Toast message={message} />
    </View>
  );
}
