import { Modal, Pressable, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { conversations } from '@/data';
import type { Thread } from '@/data/types';
import { radius, toneColors, useTheme } from '@/theme';

/** A simple mock conversation view for a thread, with a back action. */
export function ConversationView({ thread, onClose }: { thread: Thread | null; onClose: () => void }) {
  const theme = useTheme();
  const c = theme.colors;
  const messages = thread ? conversations[thread.id] ?? [] : [];
  const [g1, g2] = thread ? toneColors(thread.tone, c) : [c.accent, c.surfaceInverse];

  return (
    <Modal visible={!!thread} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: c.background }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, paddingTop: 56, paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.md, borderBottomWidth: 1, borderBottomColor: c.border }}>
          <Pressable onPress={onClose} accessibilityLabel="Back" accessibilityRole="button">
            <Ionicons name="chevron-back" size={26} color={c.text} />
          </Pressable>
          {thread ? (
            <>
              <LinearGradient colors={[g1, g2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 38, height: 38, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' }}>
                {thread.cat === 'group' ? (
                  <Ionicons name="people" size={16} color={c.textInverse} />
                ) : (
                  <Text variant="bodyStrong" color={c.textInverse}>
                    {thread.name.charAt(0)}
                  </Text>
                )}
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text variant="title">{thread.name}</Text>
                <Text variant="small" color={c.accent}>
                  {thread.tag}
                </Text>
              </View>
            </>
          ) : null}
        </View>

        <ScrollView contentContainerStyle={{ padding: theme.spacing.lg, gap: theme.spacing.md }} showsVerticalScrollIndicator={false}>
          {messages.map((m, i) => {
            if (m.from === 'sys') {
              return (
                <Text key={i} variant="small" color={c.textMuted} center>
                  {m.text}
                </Text>
              );
            }
            const mine = m.from === 'me';
            return (
              <View key={i} style={{ maxWidth: '82%', alignSelf: mine ? 'flex-end' : 'flex-start' }}>
                <View
                  style={{
                    backgroundColor: mine ? `${c.accent}22` : c.surface,
                    borderWidth: 1,
                    borderColor: mine ? c.accent : c.border,
                    borderRadius: radius.lg,
                    paddingVertical: 10,
                    paddingHorizontal: theme.spacing.md,
                  }}
                >
                  <Text variant="body" color={c.text}>
                    {m.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, padding: theme.spacing.lg, paddingBottom: theme.spacing.xxl, borderTopWidth: 1, borderTopColor: c.border }}>
          <View style={{ flex: 1, backgroundColor: c.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: c.border, paddingVertical: 11, paddingHorizontal: theme.spacing.lg }}>
            <Text variant="small" color={c.textMuted}>
              Message…
            </Text>
          </View>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="arrow-up" size={18} color={c.primaryContent} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
