import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SegmentedToggle } from '@/components/SegmentedToggle';
import { TribeBadge, tribeName } from '@/components/TribeBadge';
import { Toast, useToast } from '@/components/Toast';
import { Rise } from '@/components/motion/Rise';
import { PressableScale } from '@/components/motion/PressableScale';
import {
  getExchange,
  type ActivityItem,
  type ActivityStatus,
  type CrewSplit,
  type ExchangeData,
  type ShopGood,
  type ShopService,
} from '@/data';
import { useOnboarding } from '@/state/onboarding';
import { radius, useTheme } from '@/theme';

type Lens = 'shop' | 'wallet';
type Category = 'all' | 'services' | 'goods' | 'makers';

export default function Exchange() {
  const theme = useTheme();
  const c = theme.colors;
  const sp = theme.spacing;
  const { tribe } = useOnboarding();
  const name = tribeName(tribe?.archetype.name);
  const toast = useToast();

  const [data, setData] = useState<ExchangeData | null>(null);
  const [lens, setLens] = useState<Lens>('shop');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');

  useEffect(() => {
    let active = true;
    getExchange().then((d) => {
      if (active) setData(d);
    });
    return () => {
      active = false;
    };
  }, []);

  const q = search.trim().toLowerCase();
  const services = useMemo(
    () => (data?.services ?? []).filter((s) => !q || s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q)),
    [data, q],
  );
  const goods = useMemo(
    () => (data?.goods ?? []).filter((g) => !q || g.name.toLowerCase().includes(q) || g.maker.toLowerCase().includes(q)),
    [data, q],
  );

  const showServices = category === 'all' || category === 'services';
  const showGoods = category === 'all' || category === 'goods' || category === 'makers';

  // ---- interactions (mock / local) --------------------------------------
  const addActivity = (item: ActivityItem) =>
    setData((d) => (d ? { ...d, activity: [item, ...d.activity] } : d));

  const orderService = (svc: ShopService) => {
    addActivity({
      id: `act-${svc.id}-${Date.now()}`,
      title: svc.name,
      subtitle: `${svc.provider} · awaiting confirm`,
      amount: -svc.from,
      status: 'pending',
      icon: svc.icon,
    });
    toast.show(`Order sent to ${svc.provider.split(' · ')[0]}`);
  };

  const buyGood = (good: ShopGood) => {
    setData((d) => {
      if (!d) return d;
      if (d.balance < good.price) {
        toast.show('Not enough balance — add funds first');
        return d;
      }
      toast.show(`Bought ${good.name} · −$${good.price}`);
      return {
        ...d,
        balance: d.balance - good.price,
        activity: [
          { id: `act-${good.id}-${Date.now()}`, title: good.name, subtitle: good.maker, amount: -good.price, status: 'paid', icon: good.icon },
          ...d.activity,
        ],
      };
    });
  };

  const payShare = (split: CrewSplit) => {
    setData((d) => {
      if (!d) return d;
      toast.show(`Paid $${split.amount} — settled`);
      return {
        ...d,
        balance: d.balance - split.amount,
        splits: d.splits.map((s) => (s.id === split.id ? { ...s, amount: 0, subtitle: 'Split · settled', status: 'settled' } : s)),
        activity: [
          { id: `act-${split.id}-${Date.now()}`, title: split.title, subtitle: 'Crew split', amount: -split.amount, status: 'settled', icon: 'people-outline' },
          ...d.activity,
        ],
      };
    });
  };

  const addFunds = () => {
    setData((d) => (d ? { ...d, balance: d.balance + 100 } : d));
    toast.show('Added $100 to your wallet');
  };

  const makeDefault = (id: string) => {
    setData((d) => (d ? { ...d, methods: d.methods.map((m) => ({ ...m, isDefault: m.id === id })) } : d));
    toast.show('Default payment method updated');
  };

  if (!data) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: sp.lg }}>
          <ActivityIndicator color={c.accent} />
          <Text variant="muted">Loading the Exchange…</Text>
        </View>
      </Screen>
    );
  }

  const pendingSplits = data.splits.filter((s) => s.status === 'pending').length;

  return (
    <>
      <Screen scroll>
        {/* header */}
        <Rise index={0}>
          <View style={{ gap: sp.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp.md }}>
              <View style={{ width: 44, height: 44, borderRadius: radius.md, backgroundColor: `${c.accent}26`, alignItems: 'center', justifyContent: 'center' }}>
                <Text variant="bodyStrong" color={c.accent}>
                  A
                </Text>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text variant="display">Exchange</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp.sm }}>
                  <TribeBadge label={name} />
                  <Text variant="small" color={c.textMuted}>
                    You · Amara
                  </Text>
                </View>
              </View>
              {lens === 'shop' ? (
                <PressableScale onPress={() => setLens('wallet')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: radius.pill, borderWidth: 1, borderColor: `${c.accent}59`, backgroundColor: c.surface, paddingVertical: 7, paddingHorizontal: 12 }}>
                    <Ionicons name="wallet-outline" size={15} color={c.accent} />
                    <Text variant="small" color={c.text} style={{ fontFamily: theme.fonts.bodyBold }}>
                      ${data.balance}
                    </Text>
                  </View>
                </PressableScale>
              ) : (
                <PressableScale onPress={() => toast.show('Transaction history — coming soon')}>
                  <View style={{ width: 40, height: 40, borderRadius: radius.md, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="receipt-outline" size={18} color={c.textMuted} />
                  </View>
                </PressableScale>
              )}
            </View>
            <LinearGradient
              colors={[`${c.accent}00`, `${c.accent}8C`, `${c.accent}00`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: 1, borderRadius: 1 }}
            />
          </View>
        </Rise>

        {/* shop / wallet toggle */}
        <Rise index={1}>
          <SegmentedToggle
            options={[
              { key: 'shop', label: 'Shop' },
              { key: 'wallet', label: 'Wallet' },
            ]}
            value={lens}
            onChange={setLens}
          />
        </Rise>

        {lens === 'shop' ? (
          <ShopView
            services={services}
            goods={goods}
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
            showServices={showServices}
            showGoods={showGoods}
            onOrder={orderService}
            onBuy={buyGood}
          />
        ) : (
          <WalletView
            data={data}
            pendingSplits={pendingSplits}
            onPay={payShare}
            onAddFunds={addFunds}
            onSend={() => toast.show('Send is coming soon')}
            onMakeDefault={makeDefault}
            onAddMethod={() => toast.show('Add payment method — coming soon')}
          />
        )}
      </Screen>
      <Toast message={toast.message} />
    </>
  );
}

// ======================================================================
// Shop
// ======================================================================
function ShopView({
  services,
  goods,
  search,
  onSearch,
  category,
  onCategory,
  showServices,
  showGoods,
  onOrder,
  onBuy,
}: {
  services: ShopService[];
  goods: ShopGood[];
  search: string;
  onSearch: (s: string) => void;
  category: Category;
  onCategory: (c: Category) => void;
  showServices: boolean;
  showGoods: boolean;
  onOrder: (s: ShopService) => void;
  onBuy: (g: ShopGood) => void;
}) {
  const theme = useTheme();
  const c = theme.colors;
  const sp = theme.spacing;

  const chips: { key: Category; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'services', label: 'Services' },
    { key: 'goods', label: 'Goods' },
    { key: 'makers', label: 'Makers' },
  ];

  return (
    <View style={{ gap: sp.lg }}>
      {/* search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp.sm, backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 1, borderColor: c.border, paddingHorizontal: sp.md }}>
        <Ionicons name="search" size={18} color={c.textMuted} />
        <TextInput
          value={search}
          onChangeText={onSearch}
          placeholder="Search goods & services"
          placeholderTextColor={c.textMuted}
          style={{ flex: 1, paddingVertical: 12, color: c.text, fontFamily: theme.fonts.body, fontSize: 15 }}
        />
      </View>

      {/* category chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: sp.sm }}>
        {chips.map((chip) => {
          const on = chip.key === category;
          return (
            <PressableScale key={chip.key} onPress={() => onCategory(chip.key)}>
              <View style={{ backgroundColor: on ? c.accent : c.surface, borderWidth: 1, borderColor: on ? c.accent : c.border, borderRadius: radius.pill, paddingVertical: 9, paddingHorizontal: 16 }}>
                <Text variant="small" color={on ? c.accentContent : c.textMuted} style={{ fontFamily: theme.fonts.bodyBold }}>
                  {chip.label}
                </Text>
              </View>
            </PressableScale>
          );
        })}
      </ScrollView>

      {/* services */}
      {showServices && services.length > 0 ? (
        <View style={{ gap: sp.sm }}>
          <SectionLabel label="Services" right="Order · a provider comes to you" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: sp.md, paddingBottom: 4 }}>
            {services.map((s) => (
              <ServiceCard key={s.id} svc={s} onOrder={onOrder} />
            ))}
          </ScrollView>
        </View>
      ) : null}

      {/* goods */}
      {showGoods && goods.length > 0 ? (
        <View style={{ gap: sp.sm }}>
          <SectionLabel label="Goods" right="Buy · artisan-made, delivered" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: sp.md }}>
            {goods.map((g) => (
              <GoodCard key={g.id} good={g} onBuy={onBuy} />
            ))}
          </View>
        </View>
      ) : null}

      {services.length === 0 && goods.length === 0 ? (
        <Text variant="muted" color={c.textMuted}>
          Nothing matches “{search}”.
        </Text>
      ) : null}
    </View>
  );
}

function ServiceCard({ svc, onOrder }: { svc: ShopService; onOrder: (s: ShopService) => void }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={{ width: 152, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, borderRadius: radius.lg, overflow: 'hidden' }}>
      <View style={{ height: 92, backgroundColor: `${c.accent}14`, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={svc.icon as keyof typeof Ionicons.glyphMap} size={30} color={c.accent} />
      </View>
      <View style={{ padding: 12, gap: 3 }}>
        <Text variant="bodyStrong" numberOfLines={1}>
          {svc.name}
        </Text>
        <Text variant="small" color={c.textMuted} numberOfLines={1}>
          {svc.provider}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <Text variant="small" style={{ fontFamily: theme.fonts.bodyBold }}>
            from ${svc.from}
          </Text>
          <PressableScale onPress={() => onOrder(svc)}>
            <View style={{ borderWidth: 1, borderColor: c.accent, borderRadius: radius.pill, paddingVertical: 6, paddingHorizontal: 13 }}>
              <Text variant="small" color={c.accent} style={{ fontFamily: theme.fonts.bodyBold }}>
                Order
              </Text>
            </View>
          </PressableScale>
        </View>
      </View>
    </View>
  );
}

function GoodCard({ good, onBuy }: { good: ShopGood; onBuy: (g: ShopGood) => void }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={{ width: '48%', backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, borderRadius: radius.lg, overflow: 'hidden' }}>
      <View style={{ height: 100, backgroundColor: `${c.text}0A`, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={good.icon as keyof typeof Ionicons.glyphMap} size={30} color={c.textMuted} />
      </View>
      <View style={{ padding: 11, gap: 2 }}>
        <Text variant="bodyStrong" numberOfLines={1}>
          {good.name}
        </Text>
        <Text variant="small" color={c.textMuted} numberOfLines={1}>
          {good.maker}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <Text variant="small" style={{ fontFamily: theme.fonts.bodyBold }}>
            ${good.price}
          </Text>
          <PressableScale onPress={() => onBuy(good)}>
            <View style={{ backgroundColor: c.primary, borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 15 }}>
              <Text variant="small" color={c.primaryContent} style={{ fontFamily: theme.fonts.bodyBlack }}>
                Buy
              </Text>
            </View>
          </PressableScale>
        </View>
      </View>
    </View>
  );
}

// ======================================================================
// Wallet
// ======================================================================
function WalletView({
  data,
  pendingSplits,
  onPay,
  onAddFunds,
  onSend,
  onMakeDefault,
  onAddMethod,
}: {
  data: ExchangeData;
  pendingSplits: number;
  onPay: (s: CrewSplit) => void;
  onAddFunds: () => void;
  onSend: () => void;
  onMakeDefault: (id: string) => void;
  onAddMethod: () => void;
}) {
  const theme = useTheme();
  const c = theme.colors;
  const sp = theme.spacing;

  return (
    <View style={{ gap: sp.lg }}>
      {/* balance card */}
      <View style={{ position: 'relative', overflow: 'hidden', backgroundColor: c.surface, borderWidth: 1, borderColor: `${c.accent}38`, borderRadius: radius.xl, padding: sp.lg }}>
        <LinearGradient
          colors={[`${c.accent}00`, `${c.accent}99`, `${c.accent}00`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2 }}
        />
        <Text variant="small" color={c.accent} style={{ fontFamily: theme.fonts.bodyBold, letterSpacing: 1.4 }}>
          TRIBE WALLET
        </Text>
        <Text variant="display" style={{ marginTop: 10 }}>
          ${data.balance.toFixed(2)}
        </Text>
        <Text variant="small" color={c.textMuted} style={{ marginTop: 4 }}>
          Available balance · USD
        </Text>
        <View style={{ flexDirection: 'row', gap: sp.sm, marginTop: sp.md }}>
          <View style={{ flex: 1 }}>
            <Button label="Add funds" onPress={onAddFunds} />
          </View>
          <View style={{ flex: 1 }}>
            <Button label="Send" variant="ghost" onPress={onSend} />
          </View>
        </View>
      </View>

      {/* crew splits */}
      <View style={{ gap: sp.sm }}>
        <SectionLabel label="Crew splits" right={`${pendingSplits} pending`} />
        {data.splits.map((s) => (
          <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', gap: sp.md, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, borderRadius: radius.lg, padding: sp.md }}>
            <IconTile icon={s.status === 'settled' ? 'checkmark' : 'people-outline'} color={s.status === 'settled' ? c.secondary : c.accent} />
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong">{s.title}</Text>
              <Text variant="small" color={c.textMuted}>
                {s.subtitle}
              </Text>
            </View>
            {s.status === 'pending' ? (
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <Text variant="bodyStrong">${s.amount}</Text>
                <PressableScale onPress={() => onPay(s)}>
                  <View style={{ backgroundColor: c.primary, borderRadius: radius.pill, paddingVertical: 6, paddingHorizontal: 12 }}>
                    <Text variant="small" color={c.primaryContent} style={{ fontFamily: theme.fonts.bodyBlack }}>
                      Pay share
                    </Text>
                  </View>
                </PressableScale>
              </View>
            ) : (
              <Text variant="small" color={c.secondary} style={{ fontFamily: theme.fonts.bodyBold }}>
                Settled
              </Text>
            )}
          </View>
        ))}
      </View>

      {/* payment methods */}
      <View style={{ gap: sp.sm }}>
        <SectionLabel label="Payment methods" />
        {data.methods.map((m) => (
          <PressableScale key={m.id} onPress={() => onMakeDefault(m.id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp.md, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, borderRadius: radius.md, paddingVertical: 13, paddingHorizontal: sp.md }}>
              <Ionicons name={m.icon as keyof typeof Ionicons.glyphMap} size={22} color={c.textMuted} />
              <Text variant="bodyStrong" style={{ flex: 1 }}>
                {m.label}
              </Text>
              {m.isDefault ? (
                <Text variant="small" color={c.accent} style={{ fontFamily: theme.fonts.bodyBold }}>
                  Default
                </Text>
              ) : null}
            </View>
          </PressableScale>
        ))}
        <PressableScale onPress={onAddMethod}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: sp.sm, borderWidth: 1, borderStyle: 'dashed', borderColor: `${c.text}33`, borderRadius: radius.md, paddingVertical: 13 }}>
            <Ionicons name="add" size={18} color={c.textMuted} />
            <Text variant="small" color={c.textMuted} style={{ fontFamily: theme.fonts.bodyBold }}>
              Add payment method
            </Text>
          </View>
        </PressableScale>
      </View>

      {/* recent activity */}
      <View style={{ gap: sp.md }}>
        <SectionLabel label="Recent activity" />
        {data.activity.map((a) => (
          <ActivityRow key={a.id} item={a} />
        ))}
      </View>
    </View>
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const theme = useTheme();
  const c = theme.colors;
  const pendingAmount = item.status === 'pending';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
      <IconTile icon={item.icon as keyof typeof Ionicons.glyphMap} color={c.textMuted} muted />
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong" numberOfLines={1}>
          {item.title}
        </Text>
        <Text variant="small" color={c.textMuted} numberOfLines={1}>
          {item.subtitle}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 5 }}>
        <Text variant="bodyStrong" color={pendingAmount ? c.textMuted : c.text}>
          {item.amount < 0 ? '−' : ''}${Math.abs(item.amount)}
        </Text>
        <StatusChip status={item.status} />
      </View>
    </View>
  );
}

// ======================================================================
// shared bits
// ======================================================================
function SectionLabel({ label, right }: { label: string; right?: string }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text variant="small" color={c.accent} style={{ fontFamily: theme.fonts.bodyBold, letterSpacing: 1.4, textTransform: 'uppercase' }}>
        {label}
      </Text>
      {right ? (
        <Text variant="small" color={c.textMuted}>
          {right}
        </Text>
      ) : null}
    </View>
  );
}

function IconTile({ icon, color, muted }: { icon: keyof typeof Ionicons.glyphMap; color: string; muted?: boolean }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={{ width: 40, height: 40, borderRadius: radius.md, backgroundColor: muted ? `${c.text}0A` : `${color}1F`, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
  );
}

function StatusChip({ status }: { status: ActivityStatus }) {
  const theme = useTheme();
  const c = theme.colors;
  const map: Record<ActivityStatus, { bg: string; color: string; label: string }> = {
    confirmed: { bg: `${c.secondary}26`, color: c.secondary, label: 'Confirmed' },
    paid: { bg: `${c.secondary}26`, color: c.secondary, label: 'Paid' },
    settled: { bg: `${c.text}12`, color: c.textMuted, label: 'Settled' },
    pending: { bg: `${c.accent}2B`, color: c.accent, label: 'Pending' },
  };
  const s = map[status];
  return (
    <View style={{ backgroundColor: s.bg, borderRadius: radius.pill, paddingVertical: 2, paddingHorizontal: 8 }}>
      <Text variant="small" color={s.color} style={{ fontFamily: theme.fonts.bodyBold, fontSize: 10 }}>
        {s.label}
      </Text>
    </View>
  );
}
