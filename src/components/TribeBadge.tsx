import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { fonts, radius, useTheme } from '@/theme';

/** The member's tribe badge — a gold ◆ outline pill (e.g. "◆ Seeker"). */
export function TribeBadge({ label }: { label: string }) {
  const c = useTheme().colors;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignSelf: 'flex-start',
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: c.accent,
        paddingVertical: 5,
        paddingHorizontal: 12,
      }}
    >
      <Ionicons name="diamond" size={10} color={c.accent} />
      <Text variant="small" color={c.accent} style={{ fontFamily: fonts.bodyBold }}>
        {label}
      </Text>
    </View>
  );
}

/** Member's tribe name helpers, with a Seeker default before reveal. */
export function tribeName(archetypeName: string | undefined): string {
  if (!archetypeName) return 'Seeker';
  return archetypeName.replace(/^The\s+/, '');
}
