import { Stack } from "expo-router";
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
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
        <Stack.Screen
          name="(Profile)"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
      </Stack>
    </AuthProvider>
  );
}