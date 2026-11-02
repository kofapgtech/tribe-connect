import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useTrip } from '@/state/trip';
import { radius, useTheme } from '@/theme';

export default function Invite() {
  const router = useRouter();
  const theme = useTheme();
  const { joinRequests, acceptRequest, declineRequest, companions } = useTrip();
  const [copied, setCopied] = useState(false);

  return (
    <Screen
      scroll
      footer={
        <Button label="Open group planning" onPress={() => router.push('/trip/vision-board')} />
      }
    >
      <View style={{ gap: theme.spacing.xs }}>
        <Text variant="label" color={theme.colors.accent}>
          Share + invite
        </Text>
        <Text variant="h1">Who is coming?</Text>
      </View>

      <Card>
        <Text variant="title">Share a storybook preview</Text>
        <Text variant="muted">Link-accessible preview. Private details stay within the group.</Text>
      </Card>

      <Pressable onPress={() => setCopied(true)}>
        <View
          style={{
            backgroundColor: theme.colors.surfaceSoft,
            borderRadius: radius.pill,
            paddingVertical: 14,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: theme.spacing.sm,
          }}
        >
          <Ionicons
            name={copied ? 'checkmark' : 'link-outline'}
            size={18}
            color={theme.colors.primary}
          />
          <Text variant="bodyStrong" color={theme.colors.primary}>
            {copied ? 'Invite link copied' : 'Copy invite link'}
          </Text>
        </View>
      </Pressable>

      <Text variant="title" style={{ marginTop: theme.spacing.sm }}>
        Requests to join
      </Text>

      {joinRequests.length === 0 ? (
        <Card soft>
          <Text variant="muted">
            No pending requests. {companions.length} traveler{companions.length === 1 ? '' : 's'} in
            the group.
          </Text>
        </Card>
      ) : (
        joinRequests.map((r) => (
          <Card key={r.id}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
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
                  {r.initial}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{r.name} wants to join</Text>
                <Text variant="small" color={theme.colors.textMuted}>
                  {r.note}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Button label="Accept" onPress={() => acceptRequest(r.id)} />
              </View>
              <View style={{ flex: 1 }}>
                <Button label="Decline" variant="ghost" onPress={() => declineRequest(r.id)} />
              </View>
            </View>
          </Card>
        ))
      )}

      <Text variant="small">Only accepted travelers can collaborate on the plan.</Text>
    </Screen>
  );
}
