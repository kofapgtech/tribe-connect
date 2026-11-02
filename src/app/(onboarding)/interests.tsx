import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SelectionPill } from '@/components/SelectionPill';
import { getInterestCategories } from '@/data';
import type { InterestCategory } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { useTheme } from '@/theme';

export default function Interests() {
  const router = useRouter();
  const theme = useTheme();
  const { selectedCount, countForCategory } = useOnboarding();
  const [categories, setCategories] = useState<InterestCategory[]>([]);

  useEffect(() => {
    getInterestCategories().then(setCategories);
  }, []);

  return (
    <Screen
      scroll
      footer={
        <Button
          label={selectedCount > 0 ? 'Meet my tribe' : 'Pick a few to begin'}
          disabled={selectedCount === 0}
          onPress={() => router.push('/reveal')}
        />
      }
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="h1">What draws you in?</Text>
        <Text variant="muted">Choose a few areas to explore. Tap one to go deeper.</Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
        {categories.map((cat) => (
          <SelectionPill
            key={cat.id}
            block
            label={cat.label}
            icon={cat.icon as keyof typeof Ionicons.glyphMap}
            count={countForCategory(cat.id)}
            selected={countForCategory(cat.id) > 0}
            onPress={() => router.push({ pathname: '/sub-interest', params: { category: cat.id } })}
            style={{ width: '47%' }}
          />
        ))}
      </View>

      <Text variant="small" center>
        {selectedCount} interest{selectedCount === 1 ? '' : 's'} saved
      </Text>
    </Screen>
  );
}
