import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { HostCard } from '@/components/HostCard';
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
        if (!host) return null;
        return (
          <HostCard
            key={exp.id}
            host={host}
            context={`${exp.title} · ${exp.priceLabel}`}
            onPress={() => router.push({ pathname: '/host/[id]', params: { id: host.id } })}
          />
        );
      })}
    </Screen>
  );
}
