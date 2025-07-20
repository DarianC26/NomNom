import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E53E3E',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SavedScreen"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="UserProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}