import { Stack } from "expo-router";
import { supabase } from '../lib/supabase';
import { useEffect } from "react";
import { AppState } from "react-native";

export default function RootLayout() {
  
  useEffect(() => {
        const handleAppStateChange = (state: string) => {
            if (state === 'active') {
                supabase.auth.startAutoRefresh();
            } else {
                supabase.auth.stopAutoRefresh();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription?.remove();
        };
    }, []);

  return (
    <Stack>
      <Stack.Screen
      name="index"
      options={{
      headerShown: false,
      gestureEnabled: false
    }}
    />
    <Stack.Screen
      name="(Auth)"
      options={{
      headerShown: false,
      gestureEnabled: true
    }}
    />
    </Stack>
    )
}
