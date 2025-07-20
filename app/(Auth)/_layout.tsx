import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout: React.FC = () => {
    return (
        <Stack>
            <Stack.Screen
                name="SignInScreen"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUpScreen"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EmailVerificationScreen"
                options={{
                    headerShown: false,
                    gestureEnabled: true
                 }}
            />
        </Stack>
    );
};

export default AuthLayout;
