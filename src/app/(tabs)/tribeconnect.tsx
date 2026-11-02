import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { MomentCard } from '@/components/MomentCard';
import { MomentDetail } from '@/components/MomentDetail';
import { getMoments } from '@/data';
import type { MediaMoment, Moment } from '@/data/types';
import { useTheme } from '@/theme';

export default function TribeConnect() {
  const theme = useTheme();
  const [moments, setMoments] = useState<Moment[]>([]);
  const [selected, setSelected] = useState<MediaMoment | null>(null);

  useEffect(() => {
    getMoments().then(setMoments);
  }, []);

  const openMoment = (m: Moment) => {
    if (m.type === 'media') setSelected(m);
  };

  return (
    <Screen scroll>
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          TribeConnect
        </Text>
        <Text variant="h1">Your tribe, today</Text>
        <Text variant="muted">Moments from makers, members, and your concierge.</Text>
      </View>

      {moments.map((m) => (
        <MomentCard key={m.id} moment={m} onOpen={openMoment} />
      ))}

      <MomentDetail moment={selected} onClose={() => setSelected(null)} />
    </Screen>
  );
}
