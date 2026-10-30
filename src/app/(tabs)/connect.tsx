import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { getExperiences, hostForExperienceSync } from '@/data';
import type { Experience } from '@/data/types';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme';

export default function Connect() {
  const theme = useTheme();
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    getExperiences().then(setExperiences);
  }, []);

  return (
    <Screen scroll>
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Connect
        </Text>
        <Text variant="h1">Trusted, and always a person</Text>
        <Text variant="muted">Every experience comes with the human behind it.</Text>
      </View>

      {experiences.map((exp) => {
        const host = hostForExperienceSync(exp);
        return (
          <Pressable
            key={exp.id}
            onPress={() => host && router.push({ pathname: '/host/[id]', params: { id: host.id } })}
          >
          <Card>
            <Text variant="title">{exp.title}</Text>
            <Text variant="muted">{exp.summary}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: theme.spacing.xs }}>
              <Text variant="small" color={theme.colors.textMuted}>
                {exp.location}
              </Text>
              <Text variant="small" color={theme.colors.secondary}>
                {exp.priceLabel}
              </Text>
            </View>
            {host ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.spacing.md,
                  marginTop: theme.spacing.sm,
                  paddingTop: theme.spacing.md,
                  borderTopWidth: 1,
                  borderTopColor: theme.colors.border,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: theme.colors.surfaceSoft,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text variant="bodyStrong" color={theme.colors.primary}>
                    {host.name.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text variant="bodyStrong">{host.name}</Text>
                    {host.verified ? (
                      <Ionicons name="shield-checkmark" size={14} color={theme.colors.secondary} />
                    ) : null}
                  </View>
                  <Text variant="small" color={theme.colors.textMuted}>
                    {host.role} · {host.rating.toFixed(1)} ({host.reviewCount})
                  </Text>
                </View>
              </View>
            ) : null}
          </Card>
          </Pressable>
        );
      })}
    </Screen>
  );
}
