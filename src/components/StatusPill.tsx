import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { radius, useTheme } from '@/theme';

export type Status = 'review' | 'pending' | 'confirmed';

/**
 * Pending (accent) vs Confirmed (green), shown together so the guest always
 * knows what's set. Pairs with the HostCard. One source of truth for the
 * status language.
 */
export function StatusPill({ status }: { status: Status }) {
  const theme = useTheme();
  const c = theme.colors;

  const map = {
    confirmed: { color: c.secondary, icon: 'checkmark-circle' as const, label: 'Confirmed' },
    pending: { color: c.accent, icon: 'time-outline' as const, label: 'Pending' },
    review: { color: c.textMuted, icon: 'ellipse-outline' as const, label: 'In review' },
  };
  const { color, icon, label } = map[status];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.surfaceSoft,
        borderRadius: radius.pill,
        paddingVertical: 4,
        paddingHorizontal: 10,
      }}
    >
      <Ionicons name={icon} size={14} color={color} />
      <Text variant="small" color={color}>
        {label}
      </Text>
    </View>
  );
}
