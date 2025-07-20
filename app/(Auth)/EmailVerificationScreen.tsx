// Auth/EmailVerificationScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';

interface EmailVerificationScreenProps {
  email: string;
}

const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({ email }) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Cooldown timer for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // User has verified their email and is now signed in
        console.log('Email verified, user signed in:', session.user);
        router.replace('/(Profile)/Profile');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleResendEmail = async () => {
    setIsResending(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Email Sent', 
          'We\'ve sent you another verification email. Please check your inbox.'
        );
        setResendCooldown(60); // 60 second cooldown
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend verification email');
      console.error('Resend email error:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerificationStatus = async () => {
    setIsCheckingStatus(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && user.email_confirmed_at) {
        // Email is verified, redirect to profile
        router.replace('/(Profile)/Profile');
      } else {
        Alert.alert(
          'Not Verified Yet',
          'Your email hasn\'t been verified yet. Please check your email and click the verification link.'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check verification status');
      console.error('Check verification error:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleBackToSignIn = () => {
    router.replace('/SignInScreen');
  };

  return (
    <LinearGradient
      colors={['#FFF7ED', '#FEF2F2']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={['#F97316', '#EF4444']}
              style={styles.iconContainer}
            >
              <Ionicons name="mail" size={32} color="white" />
            </LinearGradient>
            <Text style={styles.title}>Check Your Email</Text>
            <Text style={styles.subtitle}>
              We sent a verification link to
            </Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>1</Text>
              </View>
              <Text style={styles.instructionText}>
                Open your email app and look for our verification email
              </Text>
            </View>
            
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>2</Text>
              </View>
              <Text style={styles.instructionText}>
                Click the verification link in the email
              </Text>
            </View>
            
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>3</Text>
              </View>
              <Text style={styles.instructionText}>
                You'll be automatically signed in and redirected
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.checkButton}
              onPress={handleCheckVerificationStatus}
              disabled={isCheckingStatus}
            >
              {isCheckingStatus ? (
                <ActivityIndicator color="#F97316" />
              ) : (
                <>
                  <Ionicons name="refresh" size={20} color="#F97316" />
                  <Text style={styles.checkButtonText}>Check Status</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.resendButton,
                (isResending || resendCooldown > 0) && styles.resendButtonDisabled
              ]}
              onPress={handleResendEmail}
              disabled={isResending || resendCooldown > 0}
            >
              {isResending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.resendButtonText}>
                  {resendCooldown > 0 
                    ? `Resend in ${resendCooldown}s` 
                    : 'Resend Email'
                  }
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Help Text */}
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Can't find the email? Check your spam folder or try a different email address.
            </Text>
          </View>

          {/* Back to Sign In */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToSignIn}
          >
            <Ionicons name="arrow-back" size={20} color="#6B7280" />
            <Text style={styles.backButtonText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F97316',
    textAlign: 'center',
  },
  instructionsContainer: {
    marginBottom: 40,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  stepText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 32,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#F97316',
    backgroundColor: 'white',
    gap: 8,
  },
  checkButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F97316',
  },
  resendButton: {
    backgroundColor: '#F97316',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  helpContainer: {
    marginBottom: 24,
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default EmailVerificationScreen;