import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from 'expo-router/build/layouts/Tabs';
import { Text } from './Text';
import { TribeConnectIcon, MyJourneyIcon, MyTribeIcon, ExchangeIcon } from './TabIcons';
import { duration, easing, fonts, useTheme } from '@/theme';

/** route name -> its line icon. */
const ICONS: Record<string, (p: { color: string }) => React.JSX.Element> = {
  tribeconnect: TribeConnectIcon,
  journey: MyJourneyIcon,
  tribe: MyTribeIcon,
  exchange: ExchangeIcon,
};

/**
 * One tab. The active tab's icon lifts, pops (a brief overshoot on select),
 * and sits over a soft accent glow halo. Honors reduce-motion.
 */
function TabButton({
  focused,
  color,
  accent,
  Icon,
  label,
  onPress,
}: {
  focused: boolean;
  color: string;
  accent: string;
  Icon?: (p: { color: string }) => React.JSX.Element;
  label: string;
  onPress: () => void;
}) {
  const reduce = useReducedMotion();
  const lift = useSharedValue(focused ? 1 : 0);
  const pop = useSharedValue(1);

  useEffect(() => {
    lift.set(withTiming(focused ? 1 : 0, { duration: duration.base, easing: easing.standard }));
    if (focused && !reduce) {
      pop.set(1.16);
      pop.set(withTiming(1, { duration: duration.enter, easing: easing.emphasis }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, reduce]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -2 * lift.get() }, { scale: pop.get() }],
  }));
  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.22 * lift.get(),
    transform: [{ scale: 0.6 + 0.6 * lift.get() }],
  }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={focused ? { selected: true } : {}}
      accessibilityLabel={label}
      style={{ flex: 1, alignItems: 'center', gap: 5, paddingVertical: 2 }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View
          pointerEvents="none"
          style={[
            { position: 'absolute', width: 34, height: 34, borderRadius: 17, backgroundColor: accent },
            haloStyle,
          ]}
        />
        <Animated.View style={iconStyle}>{Icon ? <Icon color={color} /> : null}</Animated.View>
      </View>
      <Text color={color} style={{ fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.4 }}>
        {label}
      </Text>
    </Pressable>
  );
}

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

        return (
          <TabButton
            key={route.key}
            focused={focused}
            color={focused ? c.accent : c.tabInactive}
            accent={c.accent}
            Icon={ICONS[route.name]}
            label={label}
            onPress={() => {
              if (!focused) navigateToTab(route.key);
            }}
          />
        );
      })}
    </View>
  );
}
