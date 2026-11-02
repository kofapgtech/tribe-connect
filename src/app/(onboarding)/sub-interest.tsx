import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SelectionPill } from '@/components/SelectionPill';
import { getCategory } from '@/data';
import type { InterestCategory, InterestCategoryId } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { useTheme } from '@/theme';

export default function SubInterest() {
  const { category } = useLocalSearchParams<{ category: InterestCategoryId }>();
  const router = useRouter();
  const theme = useTheme();
  const { isSelected, toggle, countForCategory } = useOnboarding();
  const [cat, setCat] = useState<InterestCategory | null>(null);

  useEffect(() => {
    if (category) getCategory(category).then(setCat);
  }, [category]);

  const count = category ? countForCategory(category) : 0;

  return (
    <Screen
      scroll
      footer={
        <Button label="Add interests + return" onPress={() => router.back()} />
      }
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="h1">{cat?.label ?? 'Loading…'}</Text>
        <Text variant="muted">{cat?.blurb ?? 'Pick the experiences you would enjoy.'}</Text>
      </View>

      <View style={{ gap: theme.spacing.md }}>
        {cat?.subInterests.map((s) => (
          <SelectionPill
            key={s.id}
            showCheck
            label={s.label}
            selected={isSelected(s.id)}
            onPress={() => toggle(s.id)}
          />
        ))}
      </View>

      <Text variant="small" center>
        {count} selected in {cat?.label ?? 'this area'}
      </Text>
    </Screen>
  );
}
