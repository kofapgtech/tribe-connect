import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HostCard } from '@/components/HostCard';
import { seedToday } from '@/data/trip';
import { hosts } from '@/data';
import { radius, useTheme } from '@/theme';

export default function Today() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Screen scroll footer={<Button label="Message concierge" variant="ghost" onPress={() => {}} />}>
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Today
        </Text>
        <Text variant="h1">Welcome to Ghana</Text>
      </View>

      <View
        style={{
          height: 120,
          borderRadius: radius.lg,
          backgroundColor: theme.colors.surfaceInverse,
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.xs,
        }}
      >
        <Ionicons name="map-outline" size={30} color={theme.colors.textInverse} />
        <Text variant="small" color={theme.colors.textInverse}>
          Map + meeting points
        </Text>
      </View>

      {seedToday.map((item) => {
        const host = item.hostId ? hosts.find((h) => h.id === item.hostId) : null;
        return (
          <View key={item.id} style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <Text variant="bodyStrong" color={theme.colors.secondary}>
              {item.time}
            </Text>
            <View style={{ flex: 1 }}>
              {host ? (
                <HostCard
                  host={host}
                  context={item.detail ? `${item.title} · ${item.detail}` : item.title}
                  onPress={() => router.push({ pathname: '/host/[id]', params: { id: host.id } })}
                />
              ) : (
                <Card>
                  <Text variant="title">{item.title}</Text>
                  {item.detail ? <Text variant="muted">{item.detail}</Text> : null}
                </Card>
              )}
            </View>
          </View>
        );
      })}
    </Screen>
  );
}
