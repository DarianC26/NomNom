import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout: React.FC = () => {
    return (
        <Stack>
            <Stack.Screen
                name="Profile"
                options={{ headerShown: false }}
            />
        </Stack>
    );
};

export default ProfileLayout;
