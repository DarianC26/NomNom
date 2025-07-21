import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [isListening, setIsListening] = useState(false);
  const [floatAnim] = useState(new Animated.Value(0));
  const [glowAnim] = useState(new Animated.Value(0.3));
  const [orbScale] = useState(new Animated.Value(1));

  useEffect(() => {
    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleOrbPress = () => {
    setIsListening(!isListening);
    
    Animated.sequence([
      Animated.timing(orbScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(orbScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const suggestedRecipes = [
    { name: "Quick Pasta", time: "15 min", emoji: "🍝", difficulty: "Easy" },
    { name: "Chicken Tacos", time: "20 min", emoji: "🌮", difficulty: "Easy" },
    { name: "Veggie Stir Fry", time: "12 min", emoji: "🥘", difficulty: "Easy" },
    { name: "Pancakes", time: "18 min", emoji: "🥞", difficulty: "Easy" },
  ];

  const quickActions = [
  { icon: 'schedule', text: "Quick meal", color1: '#7738ffff', color2: '#1e29f7ff' },
  { icon: 'people', text: "Family dinner", color1: '#FF8E53', color2: '#FF6B35' },
  { icon: 'auto-awesome', text: "Surprise me", color1: '#F7931E', color2: '#FFAB00' },
    ];

  const floatingTransform = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>I'm NomNom - Your AI Cooking Assistant</Text>
            <Text style={styles.welcomeSubtitle}>What should we cook today?</Text>
          </View>

          {/* Floating Orb */}
          <View style={styles.orbContainer}>
            <Animated.View 
              style={[
                styles.orbWrapper,
                { 
                  transform: [
                    { translateY: floatingTransform },
                    { scale: orbScale }
                  ] 
                }
              ]}
            >
              {/* Glow Effect */}
              <Animated.View 
                style={[
                  styles.orbGlow,
                  { opacity: glowAnim }
                ]}
              >
                <LinearGradient
                  colors={['#5bd3ff75', '#2fb6ff7c']}
                  style={styles.glowGradient}
                />
              </Animated.View>

              {/* Main Orb */}
              <TouchableOpacity onPress={handleOrbPress} style={styles.orbTouchable}>
                <LinearGradient
                  colors={isListening ? ['#5bd3ffff', '#2fb6ffff'] : ['#5bd3ffff', '#2fb6ffff']}
                  style={styles.orb}
                >
                  <View style={styles.orbInner}>
                    {isListening ? (
                      <View style={styles.listeningIndicator}>
                        <View style={[styles.listeningBar, { height: 20 }]} />
                        <View style={[styles.listeningBar, { height: 28 }]} />
                        <View style={[styles.listeningBar, { height: 16 }]} />
                        <View style={[styles.listeningBar, { height: 24 }]} />
                      </View>
                    ) : (
                      <Icon name="mic" size={40} color="white" />
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionButton}>
                <View
                  style={styles.quickActionGradient}
                >
                  <Icon name={action.icon} size={20} color="white" />
                  <Text style={styles.quickActionText}>{action.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Browse Button */}
          <TouchableOpacity style={styles.browseButton}>
            <View style={styles.browseButtonContent}>
              <Icon name="search" size={20} color="black" />
              <Text style={styles.browseButtonText}>Browse all recipes</Text>
            </View>
          </TouchableOpacity>

          {/* Suggested Recipes */}
          <View style={styles.recipesSection}>
            <Text style={styles.sectionTitle}>Try these recipes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipesScroll}>
              {suggestedRecipes.map((recipe, index) => (
                <TouchableOpacity key={index} style={styles.recipeCard}>
                  <View style={styles.recipeEmoji}>
                    <Text style={styles.recipeEmojiText}>{recipe.emoji}</Text>
                  </View>
                  <Text style={styles.recipeName}>{recipe.name}</Text>
                  <View style={styles.recipeDetails}>
                    <Text style={styles.recipeTime}>{recipe.time}</Text>
                    <Text style={styles.recipeDifficulty}>{recipe.difficulty}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'#efe4ffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingTop: '5%',
    paddingBottom: '3%',
    shadowColor: '#000',           // black shadow
    shadowOffset: { width: 0, height: 2 },  // shadow below the header
    shadowOpacity: 0.1,            // low opacity for subtlety
    shadowRadius: 4,               // how blurry the shadow is
    elevation: 3,                  // android shadow
    zIndex: 10,                   // keep header above other content
    },
  menuButton: {
    width: '10%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLine: {
    width: '50%',
    height: 2,
    backgroundColor: '#FF6B35',
    marginVertical: 2,
    borderRadius: 1,
  },
  settingsButton: {
    width: '10%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,

  },
  welcomeContainer: {
    alignItems: 'center',
    paddingTop: '8%',
    marginBottom: '10%',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 8,
    fontFamily: 'Fredoka_400Regular',
    textAlign: 'center'
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#CD853F',
    fontWeight: '500',
    fontFamily: 'Fredoka_400Regular'
  },
  orbContainer: {
    alignItems: 'center',
    marginBottom: '15%',
    height: '25%',
    justifyContent: 'center',
  },
  orbWrapper: {
    position: 'relative',
  },
  orbGlow: {
    position: 'absolute',
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: width * 0.275,
    top: -width * 0.1,
    left: -width * 0.1,
  },
  glowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.275,
  },
  orbTouchable: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.175,
  },
  orb: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.175,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  orbInner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  listeningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  listeningBar: {
    width: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: '6%',
    marginBottom: '8%',
  },
  quickActionButton: {
    flex: 1,
    maxWidth: '30%',
  },
  quickActionGradient: {
    paddingVertical: '4%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    minHeight: 80,
    backgroundColor: '#3568ffff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 0,
  },
  browseButton: {
    marginHorizontal: '6%',
    marginBottom: '10%',
  },
  browseButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '4%',
    paddingHorizontal: '6%',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#c6d5ff64',
    shadowColor: '#eff3ff52',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  browseButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginLeft: 10,
  },
  recipesSection: {
    marginBottom: '10%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: '5%',
    paddingHorizontal: '6%',
  },
  recipesScroll: {
    paddingLeft: '6%',
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: '4%',
    marginRight: '4%',
    width: width * 0.35,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  recipeEmoji: {
    width: '36%',
    aspectRatio: 1,
    backgroundColor: '#FFF8F0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8%',
  },
  recipeEmojiText: {
    fontSize: 24,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: '5%',
    textAlign: 'center',
  },
  recipeDetails: {
    alignItems: 'center',
  },
  recipeTime: {
    fontSize: 13,
    color: '#CD853F',
    marginBottom: 2,
  },
  recipeDifficulty: {
    fontSize: 12,
    color: '#DEB887',
    fontWeight: '500',
  },
});