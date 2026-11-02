import { useState } from 'react';
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SelectionPill } from '@/components/SelectionPill';
import { SegmentedToggle } from '@/components/SegmentedToggle';
import { StatusPill } from '@/components/StatusPill';
import { Toast, useToast } from '@/components/Toast';
import { tribeName } from '@/components/TribeBadge';
import { exploreCategories, explorePicks, itineraryDays, liveMapCopy, navWeek, services } from '@/data';
import type { ExplorePick, ItineraryDay, ItineraryItem, Service } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { radius, toneColors, useTheme } from '@/theme';

function PickCard({ pick, onAdd }: { pick: ExplorePick; onAdd: (p: ExplorePick) => void }) {
  const theme = useTheme();
  const c = theme.colors;
  const [g1, g2] = toneColors(pick.tone, c);
  const anytime = pick.bookable === 'anytime';
  return (
    <View style={{ width: 230, backgroundColor: c.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: c.border, overflow: 'hidden', ...theme.elevation.card }}>
      <LinearGradient colors={[g1, g2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 140, padding: theme.spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: c.surfaceInverse, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="heart-outline" size={16} color={c.textInverse} />
        </View>
        <View style={{ backgroundColor: c.surfaceInverse, borderRadius: radius.pill, paddingVertical: 4, paddingHorizontal: 9 }}>
          <Text variant="small" color={c.textInverse}>
            {pick.kind.toUpperCase()}
          </Text>
        </View>
      </LinearGradient>
      <View style={{ padding: theme.spacing.md, gap: 5 }}>
        <Text variant="bodyStrong" numberOfLines={1}>
          {pick.title}
        </Text>
        <Text variant="small" color={c.textMuted}>
          {pick.meta}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: anytime ? c.secondary : c.accent }} />
          <Text variant="small" color={anytime ? c.secondary : c.accent}>
            {pick.availability}
          </Text>
        </View>
        <Pressable style={{ marginTop: theme.spacing.sm }} onPress={() => onAdd(pick)} accessibilityRole="button">
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: radius.pill, borderWidth: 1, borderColor: c.accent, paddingVertical: 9 }}>
            <Ionicons name="add" size={15} color={c.accent} />
            <Text variant="small" color={c.accent}>
              Add to a day
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function PickRow({ picks, onAdd }: { picks: ExplorePick[]; onAdd: (p: ExplorePick) => void }) {
  const theme = useTheme();
  const c = theme.colors;
  if (picks.length === 0) {
    return (
      <Text variant="muted" color={c.textMuted}>
        Nothing here matches that filter.
      </Text>
    );
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.md, paddingRight: theme.spacing.xl }}>
      {picks.map((p) => (
        <PickCard key={p.id} pick={p} onAdd={onAdd} />
      ))}
    </ScrollView>
  );
}

function ServiceRow({ service, onAction }: { service: Service; onAction: (s: Service) => void }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
        <View style={{ width: 42, height: 42, borderRadius: radius.md, backgroundColor: c.surfaceSoft, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={service.icon as keyof typeof Ionicons.glyphMap} size={22} color={c.accent} />
        </View>
        <Text variant="title" style={{ flex: 1 }}>
          {service.name}
        </Text>
      </View>
      <Text variant="muted" color={c.textMuted}>
        {service.desc}
      </Text>
      {service.hint ? (
        <Text variant="small" color={c.accent}>
          {service.hint}
        </Text>
      ) : null}
      <Button label={service.action} variant={service.hot ? 'primary' : 'ghost'} onPress={() => onAction(service)} />
    </Card>
  );
}

function TimelineItem({ item, last, onAdd }: { item: ItineraryItem; last: boolean; onAdd: (i: ItineraryItem) => void }) {
  const theme = useTheme();
  const c = theme.colors;
  const empty = item.kind === 'empty';
  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
      <View style={{ alignItems: 'center', width: 18 }}>
        <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: item.status === 'conf' ? c.secondary : c.accent }} />
        {!last ? <View style={{ flex: 1, width: 2, backgroundColor: c.border, marginTop: 2 }} /> : null}
      </View>
      <View style={{ flex: 1, paddingBottom: theme.spacing.lg }}>
        <Text variant="bodyStrong" color={c.textMuted} style={{ marginBottom: 6 }}>
          {item.time}
        </Text>
        <Card soft={empty}>
          <Text variant="title">{item.title}</Text>
          {empty ? (
            <Text variant="muted" color={c.textMuted}>
              {item.detail}
            </Text>
          ) : (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
                <StatusPill status={item.status === 'conf' ? 'confirmed' : 'pending'} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: c.surfaceSoft, borderRadius: radius.pill, paddingVertical: 4, paddingHorizontal: 10 }}>
                  <Ionicons name="person-outline" size={12} color={c.textMuted} />
                  <Text variant="small" color={c.textMuted}>
                    {item.audience === 'you' ? 'Just you' : 'Whole crew'}
                  </Text>
                </View>
              </View>
              {item.addLabel ? (
                <Pressable style={{ alignSelf: 'flex-start', marginTop: theme.spacing.sm }} onPress={() => onAdd(item)} accessibilityRole="button">
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: radius.pill, borderWidth: 1, borderStyle: 'dashed', borderColor: c.border, paddingVertical: 8, paddingHorizontal: 13 }}>
                    <Ionicons name="add" size={14} color={c.accent} />
                    <Text variant="small" color={c.accent}>
                      {item.addLabel}
                    </Text>
                  </View>
                </Pressable>
              ) : null}
            </>
          )}
        </Card>
      </View>
    </View>
  );
}

/** Small switch used for "Just my plans". */
function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <Pressable onPress={onToggle} accessibilityRole="switch" accessibilityState={{ checked: on }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: c.border, paddingVertical: 10, paddingHorizontal: theme.spacing.lg }}>
        <Text variant="bodyStrong">{label}</Text>
        <View style={{ width: 44, height: 26, borderRadius: 13, padding: 3, backgroundColor: on ? `${c.accent}33` : c.surfaceSoft, borderWidth: 1, borderColor: on ? c.accent : c.border, alignItems: on ? 'flex-end' : 'flex-start' }}>
          <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: on ? c.accent : c.textMuted }} />
        </View>
      </View>
    </Pressable>
  );
}

export default function MyJourney() {
  const theme = useTheme();
  const router = useRouter();
  const c = theme.colors;
  const { tribe } = useOnboarding();
  const name = tribeName(tribe?.archetype.name);
  const { message, show } = useToast();

  const [view, setView] = useState<'explore' | 'journey'>('explore');
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [dayIdx, setDayIdx] = useState(0);
  const [justMine, setJustMine] = useState(false);
  const [days, setDays] = useState<ItineraryDay[]>(itineraryDays);
  const [addPick, setAddPick] = useState<ExplorePick | null>(null);
  const dnToIdx: Record<number, number> = { 18: 0, 19: 1, 20: 2 };
  const day = days[dayIdx];
  const items = justMine ? day.items.filter((i) => i.audience === 'you') : day.items;

  const q = query.trim().toLowerCase();
  const matchPicks = (section: 'picks' | 'excursions') =>
    explorePicks.filter(
      (p) =>
        p.section === section &&
        (cat === 'all' || p.kind === cat) &&
        (q === '' || p.title.toLowerCase().includes(q) || p.meta.toLowerCase().includes(q)),
    );

  const addToDay = (pick: ExplorePick, targetIdx: number) => {
    setDays((prev) =>
      prev.map((d, i) =>
        i === targetIdx
          ? { ...d, items: [...d.items, { time: 'Added', title: pick.title, detail: pick.meta, status: 'await', kind: pick.kind, audience: 'you' }] }
          : d,
      ),
    );
    setDayIdx(targetIdx);
    setAddPick(null);
    show(`Added “${pick.title}” to ${days[targetIdx].rel}`);
  };

  const planEntry = (
    <Card soft>
      <Text variant="label" color={c.textMuted}>
        Plan a trip
      </Text>
      <Text variant="muted">Shape a storybook, invite your group, and vote on dates together.</Text>
      <Button label="Plan a trip" variant="ghost" onPress={() => router.push('/trip/ideal-journey')} />
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <Screen scroll>
        <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: radius.pill, borderWidth: 1, borderStyle: 'dashed', borderColor: c.border, paddingVertical: 7, paddingHorizontal: 14 }}>
          <View style={{ backgroundColor: `${c.accent}22`, borderRadius: radius.pill, paddingVertical: 2, paddingHorizontal: 7 }}>
            <Text variant="small" color={c.accent} style={{ fontFamily: theme.fonts.bodyBold }}>
              DEMO
            </Text>
          </View>
          <Text variant="small" color={c.textMuted}>
            You&apos;re <Text variant="small" color={c.text}>not in Ghana</Text> · tap to flip
          </Text>
        </View>

        <SegmentedToggle
          options={[
            { key: 'explore', label: 'Explore' },
            { key: 'journey', label: 'Journey' },
          ]}
          value={view}
          onChange={setView}
        />

        {view === 'explore' ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, backgroundColor: c.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: c.border, paddingVertical: 4, paddingHorizontal: theme.spacing.lg }}>
              <Ionicons name="search" size={18} color={c.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Add to your trip…"
                placeholderTextColor={c.textMuted}
                style={{ flex: 1, paddingVertical: 10, color: c.text, fontFamily: theme.fonts.body, fontSize: 16 }}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.sm, paddingRight: theme.spacing.xl }}>
              {exploreCategories.map((cc) => (
                <SelectionPill key={cc.id} label={cc.label} selected={cat === cc.id} onPress={() => setCat(cc.id)} />
              ))}
            </ScrollView>

            <View style={{ gap: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: c.accent }} />
                <Text variant="label" color={c.accent}>
                  Chosen for your tribe
                </Text>
              </View>
              <Text variant="h1">For the {name} in you</Text>
              <Text variant="muted">Excursions, activities, spaces and events — picked for {name}s.</Text>
            </View>
            <PickRow picks={matchPicks('picks')} onAdd={setAddPick} />

            <View style={{ gap: 2, marginTop: theme.spacing.xs }}>
              <Text variant="h2">Excursions</Text>
              <Text variant="muted">Full-day journeys your concierge organizes — booked ahead, not on a whim.</Text>
            </View>
            <PickRow picks={matchPicks('excursions')} onAdd={setAddPick} />

            {planEntry}
          </>
        ) : (
          <>
            <View style={{ borderRadius: radius.lg, borderWidth: 1, borderStyle: 'dashed', borderColor: c.border, backgroundColor: c.surface, padding: theme.spacing.lg, flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
              <Ionicons name="airplane-outline" size={20} color={c.accent} />
              <Text variant="small" color={c.textMuted} style={{ flex: 1 }}>
                {liveMapCopy}
              </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.sm }}>
              {navWeek.map((d) => {
                const idx = dnToIdx[d.dn];
                const inTrip = idx !== undefined;
                const active = inTrip && idx === dayIdx;
                return (
                  <Pressable key={d.dn} disabled={!inTrip} onPress={() => { if (idx !== undefined) setDayIdx(idx); }}>
                    <View style={{ width: 44, height: 58, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', gap: 3, backgroundColor: active ? `${c.accent}22` : c.surface, borderWidth: 1, borderColor: active ? c.accent : c.border, opacity: inTrip ? 1 : 0.45 }}>
                      <Text variant="small" color={c.textMuted}>
                        {d.wd}
                      </Text>
                      <Text variant="bodyStrong" color={active ? c.accent : c.text}>
                        {d.dn}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <Text variant="display">{dayIdx === 0 ? 'Day 1' : day.rel}</Text>
              <Text variant="muted" color={c.textMuted}>
                {day.date}
              </Text>
            </View>

            <Toggle on={justMine} onToggle={() => setJustMine((v) => !v)} label="Just my plans" />

            <View style={{ marginTop: theme.spacing.xs }}>
              {items.length === 0 ? (
                <Text variant="muted" color={c.textMuted}>
                  No plans that are just yours on this day.
                </Text>
              ) : (
                items.map((it, i) => (
                  <TimelineItem key={it.time + it.title} item={it} last={i === items.length - 1} onAdd={(x) => show(`${x.addLabel} requested — your concierge will confirm.`)} />
                ))
              )}
            </View>

            <View style={{ gap: 2, marginTop: theme.spacing.sm }}>
              <Text variant="h2">Services</Text>
              <Text variant="muted">Add a car, a table, or recovery to any day — your concierge arranges it.</Text>
            </View>
            {services.map((s) => (
              <ServiceRow key={s.id} service={s} onAction={(x) => show(`${x.action} — request sent to your concierge ✓`)} />
            ))}

            {planEntry}
          </>
        )}
      </Screen>

      <Modal visible={!!addPick} transparent animationType="slide" onRequestClose={() => setAddPick(null)}>
        <View style={{ flex: 1, backgroundColor: `${c.surfaceInverse}CC`, justifyContent: 'flex-end' }}>
          <Pressable style={{ flex: 1 }} onPress={() => setAddPick(null)} accessibilityLabel="Close" />
          <View style={{ backgroundColor: c.background, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, borderWidth: 1, borderColor: c.border, padding: theme.spacing.xl, paddingTop: theme.spacing.sm, gap: theme.spacing.md }}>
            <View style={{ alignItems: 'center', paddingBottom: theme.spacing.xs }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: c.border }} />
            </View>
            <Text variant="h2">Add to which day?</Text>
            {addPick ? (
              <Text variant="muted" color={c.textMuted}>
                {addPick.title}
              </Text>
            ) : null}
            {days.map((d, i) => (
              <Pressable key={d.rel} onPress={() => addPick && addToDay(addPick, i)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 1, borderColor: c.border, padding: theme.spacing.md }}>
                  <View>
                    <Text variant="bodyStrong">{d.rel}</Text>
                    <Text variant="small" color={c.textMuted}>
                      {d.date}
                    </Text>
                  </View>
                  <Ionicons name="add-circle-outline" size={20} color={c.accent} />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      <Toast message={message} />
    </View>
  );
}
