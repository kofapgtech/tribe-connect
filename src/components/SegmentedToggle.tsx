import { Pressable, View } from 'react-native';
import { Text } from './Text';
import { radius, useTheme } from '@/theme';

/** Two-or-more option segmented control. Selected = accent-tint + accent border. */
export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (key: T) => void;
}) {
  const c = useTheme().colors;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: c.surface,
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: c.border,
        padding: 4,
      }}
    >
      {options.map((o) => {
        const on = o.key === value;
        return (
          <Pressable key={o.key} onPress={() => onChange(o.key)} style={{ flex: 1 }}>
            <View
              style={{
                borderRadius: radius.pill,
                paddingVertical: 11,
                alignItems: 'center',
                backgroundColor: on ? `${c.accent}22` : 'transparent',
                borderWidth: 1,
                borderColor: on ? c.accent : 'transparent',
              }}
            >
              <Text variant="bodyStrong" color={on ? c.accent : c.textMuted}>
                {o.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
