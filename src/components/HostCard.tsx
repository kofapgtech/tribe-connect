import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { Text } from './Text';
import { BrandRing } from './BrandRing';
import { StatusPill, type Status } from './StatusPill';
import { labelForCategory } from '@/data';
import type { Host } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { radius, useTheme } from '@/theme';

/**
 * The host card — the most important object in the app. One polished,
 * reusable component for the person behind every service: avatar in the
 * house red/green arc ring, name, role, DTT-verified check, rating + review
 * count, and shared-interest chips. Pairs with a StatusPill where relevant.
 * Used in Connect discovery, booking review, and "Today."
 */
export function HostCard({
  host,
  context,
  status,
  onPress,
}: {
  host: Host;
  context?: string;
  status?: Status;
  onPress?: () => void;
}) {
  const theme = useTheme();
  const c = theme.colors;
  const { selectedCategories } = useOnboarding();
  const shared = host.interests.filter((i) => selectedCategories.includes(i));

  const body = (
    <Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
        <BrandRing size={52} thickness={3}>
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
            <Text variant="h2" color={c.accent}>
              {host.name.charAt(0)}
            </Text>
          </View>
        </BrandRing>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text variant="title">{host.name}</Text>
            {host.verified ? (
              <Ionicons name="shield-checkmark" size={14} color={c.secondary} />
            ) : null}
          </View>
          <Text variant="small" color={c.textMuted}>
            {host.role} · {host.rating.toFixed(1)} ({host.reviewCount})
          </Text>
        </View>

        {status ? <StatusPill status={status} /> : null}
      </View>

      {context ? (
        <Text variant="muted" color={c.textMuted}>
          {context}
        </Text>
      ) : null}

      {host.interests.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: theme.spacing.sm,
            marginTop: theme.spacing.xs,
          }}
        >
          {host.interests.map((i) => {
            const isShared = shared.includes(i);
            return (
              <View
                key={i}
                style={{
                  backgroundColor: isShared ? `${c.accent}22` : c.surfaceSoft,
                  borderRadius: radius.pill,
                  borderWidth: 1,
                  borderColor: isShared ? c.accent : c.border,
                  paddingVertical: 5,
                  paddingHorizontal: 11,
                }}
              >
                <Text variant="small" color={c.text}>
                  {labelForCategory(i)}
                </Text>
              </View>
            );
          })}
          {shared.length > 0 ? (
            <Text variant="small" color={c.accent}>
              Shared: {shared.length} interest{shared.length === 1 ? '' : 's'}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        {body}
      </Pressable>
    );
  }
  return body;
}
