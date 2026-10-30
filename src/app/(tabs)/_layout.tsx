import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fonts, useTheme } from '@/theme';

/**
 * Four branded tabs from the founder's IA: Journey / Connect / Tribe / Exchange.
 * Icons are Ionicons placeholders — the brand calls for Adinkra symbols
 * (arrow / broom / print / circle), an open design item.
 */
export default function TabsLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabActive,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBg,
          borderTopColor: theme.colors.borderInverse,
        },
        tabBarLabelStyle: { fontFamily: fonts.bodyBold, fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Journey',
          tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          title: 'Connect',
          tabBarIcon: ({ color, size }) => <Ionicons name="sparkles-outline" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="tribe"
        options={{
          title: 'Tribe',
          tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="exchange"
        options={{
          title: 'Exchange',
          tabBarIcon: ({ color, size }) => <Ionicons name="ellipse-outline" size={size} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
