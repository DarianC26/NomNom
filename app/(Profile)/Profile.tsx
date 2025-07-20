import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please log in to view profile</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text>Welcome, {session.user.email}</Text>
      <Text>User ID: {session.user.id}</Text>
      <Text>Full Name: {session.user.user_metadata.full_name}</Text>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      {/* Add your profile content here */}
    </SafeAreaView>
  );
}
