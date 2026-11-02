import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { BottomTabBarProps } from 'expo-router/build/layouts/Tabs';
import { Text } from './Text';
import { TribeConnectIcon, MyJourneyIcon, MyTribeIcon, ExchangeIcon } from './TabIcons';
import { fonts, useTheme } from '@/theme';

/** route name -> its line icon. */
const ICONS: Record<string, (p: { color: string }) => React.JSX.Element> = {
  tribeconnect: TribeConnectIcon,
  journey: MyJourneyIcon,
  tribe: MyTribeIcon,
  exchange: ExchangeIcon,
};

/**
 * Custom main-app tab bar: four bespoke line icons on a bar that fades from
 * transparent into the ink ground, with a faint top hairline. Active = gold
 * accent, inactive = cream-faint. Colors come from tokens; the only literals
 * are token-derived alpha (transparent gradient stop, 7% hairline).
 */
export function TribeTabBar({ state, descriptors, navigateToTab, insets }: BottomTabBarProps) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: Math.max(insets.bottom, 10),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: `${c.text}12`, // ≈ cream at 7%
      }}
    >
      <LinearGradient
        colors={[`${c.background}00`, c.background]} // transparent -> ink ground
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = (options.title ?? route.name) as string;
        const focused = state.index === index;
        const color = focused ? c.accent : c.tabInactive;
        const Icon = ICONS[route.name];

        const onPress = () => {
          if (!focused) navigateToTab(route.key);
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={label}
            style={{ flex: 1, alignItems: 'center', gap: 5, paddingVertical: 2 }}
          >
            {Icon ? <Icon color={color} /> : null}
            <Text color={color} style={{ fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.4 }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
