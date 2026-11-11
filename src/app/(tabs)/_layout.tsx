import { Tabs } from 'expo-router';
import { TribeTabBar } from '@/components/TribeTabBar';

/**
 * The guest main app: TribeConnect (the feed) is the post-reveal landing,
 * then MyJourney, MyTribe, and Exchange (a "Soon" teaser). The bar itself is
 * the custom TribeTabBar (bespoke line icons + gradient-fade bar).
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        sceneStyle: { backgroundColor: 'transparent' },
      }}
      tabBar={(props) => <TribeTabBar {...props} />}
    >
      <Tabs.Screen name="tribeconnect" options={{ title: 'TribeConnect' }} />
      <Tabs.Screen name="journey" options={{ title: 'MyJourney' }} />
      <Tabs.Screen name="tribe" options={{ title: 'MyTribe' }} />
      <Tabs.Screen name="exchange" options={{ title: 'Exchange' }} />
    </Tabs>
  );
}
