import { query } from './client';

/**
 * Exchange — the in-app marketplace + wallet. Mock/local only: there is no
 * real money movement. Shop lists vetted services (a provider comes to you)
 * and artisan goods (bought and delivered); Wallet tracks a demo balance,
 * crew splits, payment methods, and recent activity. Screens mutate this
 * locally for the session; a real build swaps in Flutterwave + Supabase.
 */

export interface ShopService {
  id: string;
  name: string;
  provider: string;
  from: number; // starting price, USD
  icon: string; // Ionicons name
}

export interface ShopGood {
  id: string;
  name: string;
  maker: string;
  price: number; // USD
  icon: string;
}

export type ActivityStatus = 'confirmed' | 'settled' | 'pending' | 'paid';

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  amount: number; // negative = spent
  status: ActivityStatus;
  icon: string;
}

export type SplitStatus = 'pending' | 'settled';

export interface CrewSplit {
  id: string;
  title: string;
  subtitle: string;
  amount: number; // your share, USD (0 when settled)
  status: SplitStatus;
}

export interface PaymentMethod {
  id: string;
  label: string;
  icon: string;
  isDefault?: boolean;
}

export interface ExchangeData {
  balance: number;
  services: ShopService[];
  goods: ShopGood[];
  splits: CrewSplit[];
  methods: PaymentMethod[];
  activity: ActivityItem[];
}

const services: ShopService[] = [
  { id: 'svc-hair', name: 'Hair & Braiding', provider: 'Akosua · Osu', from: 45, icon: 'cut-outline' },
  { id: 'svc-kente', name: 'Kente Tailoring', provider: 'Kofi Threads · Osu', from: 80, icon: 'shirt-outline' },
  { id: 'svc-portrait', name: 'Portrait Shoot', provider: 'Lens by Nana', from: 120, icon: 'camera-outline' },
  { id: 'svc-chef', name: 'Personal Chef', provider: 'Chef Ama', from: 90, icon: 'restaurant-outline' },
];

const goods: ShopGood[] = [
  { id: 'good-tote', name: 'Adinkra Tote', maker: 'Ama Crafts', price: 40, icon: 'bag-handle-outline' },
  { id: 'good-shea', name: 'Shea Butter Set', maker: 'Tamale Co-op', price: 28, icon: 'cube-outline' },
  { id: 'good-necklace', name: 'Beaded Necklace', maker: 'Accra Beads', price: 35, icon: 'ellipse-outline' },
  { id: 'good-scarf', name: 'Kente Scarf', maker: 'Bonwire Weavers', price: 55, icon: 'layers-outline' },
];

const splits: CrewSplit[] = [
  { id: 'split-kente', title: 'Kente workshop', subtitle: 'Crew of 4 · you owe', amount: 35, status: 'pending' },
  { id: 'split-dinner', title: 'Group dinner · Buka', subtitle: 'Split 4 ways', amount: 0, status: 'settled' },
];

const methods: PaymentMethod[] = [
  { id: 'pm-visa', label: 'Visa ···· 4417', icon: 'card-outline', isDefault: true },
  { id: 'pm-momo', label: 'MTN MoMo ···· 088', icon: 'phone-portrait-outline' },
];

const activity: ActivityItem[] = [
  { id: 'act-car', title: 'Signature car', subtitle: 'Day 2 · Navigator Kwame', amount: -180, status: 'confirmed', icon: 'car-outline' },
  { id: 'act-fuel', title: 'Fuel', subtitle: 'Day 2 · pay-as-you-go', amount: -18, status: 'settled', icon: 'speedometer-outline' },
  { id: 'act-portrait', title: 'Portrait shoot', subtitle: 'Lens by Nana · awaiting confirm', amount: -120, status: 'pending', icon: 'camera-outline' },
  { id: 'act-tote', title: 'Adinkra tote', subtitle: 'Ama Crafts', amount: -40, status: 'paid', icon: 'bag-handle-outline' },
];

export function getExchange() {
  return query<ExchangeData>(() => ({
    balance: 420,
    services,
    goods,
    splits,
    methods,
    activity,
  }));
}
