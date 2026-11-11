import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';
import { ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { OnboardingProvider } from '@/state/onboarding';
import { TripProvider } from '@/state/trip';
import { AppBackground } from '@/components/AppBackground';
import { useTheme } from '@/theme';

SplashScreen.preventAutoHideAsync();

// The app is locked dark; make every navigator scene transparent so the single
// root-mounted tribe glow shows through instead of React Navigation's default
// light theme background painting over it.
const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: 'transparent', card: 'transparent' },
};

export default function RootLayout() {
  const theme = useTheme();
  const [loaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
    ZenDots_400Regular,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <OnboardingProvider>
          <TripProvider>
            <StatusBar style={theme.isDark ? 'light' : 'dark'} />
            <View style={{ flex: 1 }}>
              <AppBackground />
              <ThemeProvider value={navTheme}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                    contentStyle: { backgroundColor: 'transparent' },
                  }}
                />
              </ThemeProvider>
            </View>
          </TripProvider>
        </OnboardingProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
