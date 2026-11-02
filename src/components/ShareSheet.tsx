import { Modal, Pressable, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { threads } from '@/data';
import { radius, toneColors, useTheme } from '@/theme';

/** "Send to MyTribe" sheet — share a moment to a chat or group. */
export function ShareSheet({
  visible,
  onClose,
  onSent,
}: {
  visible: boolean;
  onClose: () => void;
  onSent: (name: string) => void;
}) {
  const theme = useTheme();
  const c = theme.colors;
  const dests = threads.filter((t) => t.cat === 'group' || t.cat === 'connection');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: `${c.surfaceInverse}CC`, justifyContent: 'flex-end' }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} accessibilityLabel="Close" />
        <View style={{ backgroundColor: c.background, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, borderWidth: 1, borderColor: c.border, paddingBottom: theme.spacing.xl }}>
          <View style={{ alignItems: 'center', paddingVertical: theme.spacing.sm }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: c.border }} />
          </View>
          <Text variant="h2" center>
            Send to MyTribe
          </Text>
          <Text variant="small" color={c.textMuted} center style={{ marginTop: 4, marginBottom: theme.spacing.md }}>
            Share this moment with a chat or group
          </Text>
          <ScrollView style={{ maxHeight: 340 }} contentContainerStyle={{ paddingHorizontal: theme.spacing.md, gap: 2 }} showsVerticalScrollIndicator={false}>
            {dests.map((d) => {
              const [g1, g2] = toneColors(d.tone, c);
              return (
                <Pressable key={d.id} onPress={() => { onSent(d.name); onClose(); }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, padding: theme.spacing.sm, borderRadius: radius.md }}>
                    <LinearGradient colors={[g1, g2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 44, height: 44, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' }}>
                      {d.cat === 'group' ? (
                        <Ionicons name="people" size={18} color={c.textInverse} />
                      ) : (
                        <Text variant="bodyStrong" color={c.textInverse}>
                          {d.name.charAt(0)}
                        </Text>
                      )}
                    </LinearGradient>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyStrong">{d.name}</Text>
                      <Text variant="small" color={c.textMuted}>
                        {d.tag}
                      </Text>
                    </View>
                    <Ionicons name="arrow-forward" size={16} color={c.textMuted} />
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
