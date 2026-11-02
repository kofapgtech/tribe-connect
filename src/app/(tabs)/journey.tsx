import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
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
import { tribeName } from '@/components/TribeBadge';
import {
  exploreCategories,
  explorePicks,
  itineraryDays,
  liveMapCopy,
  navWeek,
  services,
} from '@/data';
import type { ExplorePick, ItineraryItem, Service } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { radius, toneColors, useTheme } from '@/theme';

function PickCard({ pick }: { pick: ExplorePick }) {
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
        <Pressable style={{ marginTop: theme.spacing.sm }}>
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

function PickRow({ section }: { section: 'picks' | 'excursions' }) {
  const theme = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.md, paddingRight: theme.spacing.xl }}>
      {explorePicks.filter((p) => p.section === section).map((p) => (
        <PickCard key={p.id} pick={p} />
      ))}
    </ScrollView>
  );
}

function ServiceRow({ service }: { service: Service }) {
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
      <Button label={service.action} variant={service.hot ? 'primary' : 'ghost'} onPress={() => {}} />
    </Card>
  );
}

function TimelineItem({ item, last }: { item: ItineraryItem; last: boolean }) {
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
                <Pressable style={{ alignSelf: 'flex-start', marginTop: theme.spacing.sm }}>
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

export default function MyJourney() {
  const theme = useTheme();
  const router = useRouter();
  const c = theme.colors;
  const { tribe } = useOnboarding();
  const name = tribeName(tribe?.archetype.name);

  const [view, setView] = useState<'explore' | 'journey'>('explore');
  const [cat, setCat] = useState('all');
  const [dayIdx, setDayIdx] = useState(0);
  const dnToIdx: Record<number, number> = { 18: 0, 19: 1, 20: 2 };
  const day = itineraryDays[dayIdx];

  // keep the existing planning flow reachable
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, backgroundColor: c.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: c.border, paddingVertical: 12, paddingHorizontal: theme.spacing.lg }}>
            <Ionicons name="search" size={18} color={c.textMuted} />
            <Text variant="body" color={c.textMuted}>
              Add to your trip…
            </Text>
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
          <PickRow section="picks" />

          <View style={{ gap: 2, marginTop: theme.spacing.xs }}>
            <Text variant="h2">Excursions</Text>
            <Text variant="muted">Full-day journeys your concierge organizes — booked ahead, not on a whim.</Text>
          </View>
          <PickRow section="excursions" />

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
            <Text variant="display">{day.rel === 'Today' ? 'Day 1' : day.rel}</Text>
            <Text variant="muted" color={c.textMuted}>
              {day.date}
            </Text>
          </View>

          <View style={{ marginTop: theme.spacing.xs }}>
            {day.items.map((it, i) => (
              <TimelineItem key={it.time + it.title} item={it} last={i === day.items.length - 1} />
            ))}
          </View>

          <View style={{ gap: 2, marginTop: theme.spacing.sm }}>
            <Text variant="h2">Services</Text>
            <Text variant="muted">Add a car, a table, or recovery to any day — your concierge arranges it.</Text>
          </View>
          {services.map((s) => (
            <ServiceRow key={s.id} service={s} />
          ))}

          {planEntry}
        </>
      )}
    </Screen>
  );
}
