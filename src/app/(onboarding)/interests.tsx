import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { getInterestCategories } from '@/data';
import type { InterestCategory } from '@/data/types';
import { useOnboarding } from '@/state/onboarding';
import { radius, useTheme } from '@/theme';

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
        {categories.map((cat) => {
          const count = countForCategory(cat.id);
          const active = count > 0;
          return (
            <Pressable
              key={cat.id}
              onPress={() => router.push({ pathname: '/sub-interest', params: { category: cat.id } })}
              style={{ width: '47%' }}
            >
              <View
                style={{
                  backgroundColor: active ? theme.colors.surfaceInverse : theme.colors.surface,
                  borderRadius: radius.lg,
                  borderWidth: 1,
                  borderColor: active ? theme.colors.borderInverse : theme.colors.border,
                  padding: theme.spacing.lg,
                  gap: theme.spacing.sm,
                  minHeight: 108,
                  justifyContent: 'space-between',
                }}
              >
                <Ionicons
                  name={cat.icon as keyof typeof Ionicons.glyphMap}
                  size={26}
                  color={active ? theme.colors.textInverse : theme.colors.secondary}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text variant="title" color={active ? theme.colors.textInverse : theme.colors.text}>
                    {cat.label}
                  </Text>
                  {count > 0 ? (
                    <Text variant="small" color={theme.colors.accent}>
                      {count}
                    </Text>
                  ) : null}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Text variant="small" center>
        {selectedCount} interest{selectedCount === 1 ? '' : 's'} saved
      </Text>
    </Screen>
  );
}
