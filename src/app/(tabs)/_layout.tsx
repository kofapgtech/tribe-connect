import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fonts, useTheme } from '@/theme';

/**
 * The guest main app: TribeConnect (the feed) is the post-reveal landing,
 * then MyJourney, MyTribe, and Exchange (a "Soon" teaser).
 * Icons are Ionicons placeholders — custom Adinkra symbols are a later task.
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
        name="tribeconnect"
        options={{
          title: 'TribeConnect',
          tabBarIcon: ({ color, size }) => <Ionicons name="sparkles-outline" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: 'MyJourney',
          tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="tribe"
        options={{
          title: 'MyTribe',
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
