import { Stack } from "expo-router";

export default function RootLayout() {
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
