import { Pressable, View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { radius, useTheme } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

/**
 * The one selection language for the app — interests, sub-interests, vibe,
 * and pace all use this. Selected = accent-tint fill + accent border +
 * readable (cream) text; unselected = surface + hairline border.
 *
 *   default   → a pill (vibe, pace)
 *   showCheck → a check/box leads the label (sub-interests)
 *   block     → a taller tile with a top icon + optional count (interests)
 */
export function SelectionPill({
  label,
  selected,
  onPress,
  icon,
  count,
  showCheck = false,
  block = false,
  style,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: IconName;
  count?: number;
  showCheck?: boolean;
  block?: boolean;
  style?: ViewStyle;
}) {
  const theme = useTheme();
  const c = theme.colors;

  // accent-tint fill (low-opacity accent over the ink ground)
  const fill = selected ? `${c.accent}22` : c.surface;
  const border = selected ? c.accent : c.border;
  const labelColor = c.text;

  if (block) {
    return (
      <Pressable onPress={onPress} style={style}>
        <View
          style={{
            backgroundColor: fill,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: border,
            padding: theme.spacing.lg,
            gap: theme.spacing.sm,
            minHeight: 108,
            justifyContent: 'space-between',
          }}
        >
          {icon ? (
            <Ionicons name={icon} size={26} color={selected ? c.accent : c.secondary} />
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text variant="title" color={labelColor}>
              {label}
            </Text>
            {count && count > 0 ? (
              <Text variant="small" color={c.accent}>
                {count}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={style}>
      <View
        style={{
          backgroundColor: fill,
          borderRadius: radius.pill,
          borderWidth: 1,
          borderColor: border,
          paddingVertical: 13,
          paddingHorizontal: theme.spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: showCheck ? 'flex-start' : 'center',
          gap: theme.spacing.sm,
        }}
      >
        {showCheck ? (
          <Ionicons
            name={selected ? 'checkmark-circle' : 'ellipse-outline'}
            size={20}
            color={selected ? c.accent : c.textMuted}
          />
        ) : null}
        <Text variant="bodyStrong" color={labelColor}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
