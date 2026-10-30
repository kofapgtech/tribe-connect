import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { BrandRing } from '@/components/BrandRing';
import { getHost, labelForCategory } from '@/data';
import type { Host } from '@/data/types';
import { radius, useTheme } from '@/theme';

export default function HostProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [host, setHost] = useState<Host | null>(null);

  useEffect(() => {
    if (id) getHost(id).then(setHost);
  }, [id]);

  if (!host) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={theme.colors.accent} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      footer={
        <View style={{ gap: theme.spacing.md }}>
          <Button label={`Message ${host.name}`} onPress={() => {}} />
          <Button label="Back to trip" variant="ghost" onPress={() => router.back()} />
        </View>
      }
    >
      <View
        style={{
          borderRadius: radius.xl,
          backgroundColor: theme.colors.surfaceInverse,
          paddingVertical: theme.spacing.xxl,
          paddingHorizontal: theme.spacing.xl,
          alignItems: 'center',
          gap: theme.spacing.md,
        }}
      >
        <BrandRing size={120} thickness={6}>
          <View
            style={{
              width: 94,
              height: 94,
              borderRadius: 47,
              backgroundColor: theme.colors.background,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text variant="display" color={theme.colors.accent}>
              {host.name.charAt(0)}
            </Text>
          </View>
        </BrandRing>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text variant="display" color={theme.colors.textInverse}>
            {host.name}
          </Text>
          {host.verified ? (
            <Ionicons name="shield-checkmark" size={18} color={theme.colors.secondary} />
          ) : null}
        </View>
        <Text variant="muted" color={theme.colors.textInverse}>
          {host.role} · {host.rating.toFixed(1)} ({host.reviewCount} reviews)
        </Text>
      </View>

      <Text variant="body">{host.bio}</Text>

      <Card soft>
        <Text variant="label" color={theme.colors.textMuted}>
          Shared interests
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginTop: theme.spacing.xs }}>
          {host.interests.map((i) => (
            <View
              key={i}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: radius.pill,
                borderWidth: 1,
                borderColor: theme.colors.border,
                paddingVertical: 6,
                paddingHorizontal: 12,
              }}
            >
              <Text variant="small">{labelForCategory(i)}</Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
        <Ionicons name="shield-checkmark-outline" size={16} color={theme.colors.secondary} />
        <Text variant="small" color={theme.colors.textMuted}>
          DTT-verified · recent guest feedback is strong
        </Text>
      </View>
    </Screen>
  );
}
