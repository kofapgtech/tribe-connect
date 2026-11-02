import { Modal, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { radius, useTheme } from '@/theme';

const OPTIONS: { icon: keyof typeof Ionicons.glyphMap; label: string; sub: string }[] = [
  { icon: 'call-outline', label: 'Call Dispatch', sub: "We pick up, day or night" },
  { icon: 'chatbubble-ellipses-outline', label: 'Message Dispatch', sub: 'Chat with the 24/7 team' },
  { icon: 'warning-outline', label: 'Report an issue', sub: 'Something went wrong — tell us' },
  { icon: 'location-outline', label: 'Share my location', sub: 'Send where you are right now' },
];

/** The Dispatch / 24-7 help sheet. */
export function DispatchSheet({
  visible,
  onClose,
  onPick,
}: {
  visible: boolean;
  onClose: () => void;
  onPick: (label: string) => void;
}) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: `${c.surfaceInverse}CC`, justifyContent: 'flex-end' }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} accessibilityLabel="Close" />
        <View style={{ backgroundColor: c.background, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, borderWidth: 1, borderColor: c.border, padding: theme.spacing.xl, paddingTop: theme.spacing.sm, gap: theme.spacing.md }}>
          <View style={{ alignItems: 'center', paddingBottom: theme.spacing.xs }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: c.border }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
            <View style={{ width: 44, height: 44, borderRadius: radius.md, backgroundColor: `${c.house}22`, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="alert-circle" size={22} color={c.house} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="h2" color={c.house}>
                Dispatch
              </Text>
              <Text variant="small" color={c.textMuted}>
                24/7 help line · we&apos;re here any time
              </Text>
            </View>
          </View>

          {OPTIONS.map((o) => (
            <Pressable key={o.label} onPress={() => { onPick(o.label); onClose(); }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 1, borderColor: c.border, padding: theme.spacing.md }}>
                <Ionicons name={o.icon} size={20} color={c.accent} />
                <View style={{ flex: 1 }}>
                  <Text variant="bodyStrong">{o.label}</Text>
                  <Text variant="small" color={c.textMuted}>
                    {o.sub}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={c.textMuted} />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}
