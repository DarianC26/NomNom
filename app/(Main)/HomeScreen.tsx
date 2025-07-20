import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_RECIPES = [
  {
    id: '1',
    title: 'Pepperoni Potato Salad',
    description: 'This recipe uses pepperoni instead of bacon and shallots instead of onion, as well as a salty-spicy-tangy dressing with oregano and sage.',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=300&fit=crop',
    time: '30 minutes',
    rating: 5,
    reviews: 8,
  },
  {
    id: '2',
    title: 'Mediterranean Pasta Bowl',
    description: 'Fresh pasta tossed with sun-dried tomatoes, olives, and feta cheese in a light herb dressing.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    time: '25 minutes',
    rating: 4,
    reviews: 12,
  },
  {
    id: '3',
    title: 'Honey Glazed Salmon',
    description: 'Perfectly flaked salmon with a sweet and savory glaze, served with roasted vegetables.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    time: '35 minutes',
    rating: 5,
    reviews: 15,
  },
  {
    id: '4',
    title: 'Chicken Tikka Masala',
    description: 'Tender chicken in a rich, creamy tomato-based sauce with aromatic Indian spices.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    time: '45 minutes',
    rating: 4,
    reviews: 20,
  },
  {
    id: '5',
    title: 'Avocado Toast Supreme',
    description: 'Perfectly ripe avocado on artisan bread topped with everything seasoning and microgreens.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    time: '10 minutes',
    rating: 4,
    reviews: 8,
  },
  {
    id: '6',
    title: 'Thai Green Curry',
    description: 'Aromatic green curry with coconut milk, Thai basil, and your choice of protein.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    time: '40 minutes',
    rating: 5,
    reviews: 18,
  },
];

const POPULAR_RECIPES = [
  {
    id: '7',
    title: 'Beef Bourguignon',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop',
    time: '2 hours',
  },
  {
    id: '8',
    title: 'Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop',
    time: '35 minutes',
  },
  {
    id: '9',
    title: 'Fish Tacos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop',
    time: '20 minutes',
  },
  {
    id: '10',
    title: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300&h=200&fit=crop',
    time: '25 minutes',
  },
];

const StarRating = ({ rating, size = 16 }) => {
  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? 'star' : 'star-outline'}
          size={size}
          color="#FFD700"
        />
      ))}
    </View>
  );
};

const RecipeCard = ({ recipe, isGrid = false }) => {
  if (isGrid) {
    return (
      <TouchableOpacity style={styles.gridCard}>
        <Image source={{ uri: recipe.image }} style={styles.gridImage} />
        <View style={styles.gridContent}>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {recipe.title}
          </Text>
          <View style={styles.gridMeta}>
            <StarRating rating={recipe.rating} size={14} />
            <Text style={styles.gridTime}>{recipe.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Text style={styles.recipeDescription}>{recipe.description}</Text>
        <View style={styles.recipeMeta}>
          <View style={styles.ratingRow}>
            <StarRating rating={recipe.rating} />
            <Text style={styles.reviews}>{recipe.reviews}</Text>
          </View>
          <Text style={styles.time}>{recipe.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PopularRecipeCard = ({ recipe }) => (
  <TouchableOpacity style={styles.popularCard}>
    <Image source={{ uri: recipe.image }} style={styles.popularImage} />
    <Text style={styles.popularTitle} numberOfLines={2}>
      {recipe.title}
    </Text>
    <Text style={styles.popularTime}>{recipe.time}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const featuredRecipe = DUMMY_RECIPES[0];
  const gridRecipes = DUMMY_RECIPES.slice(1);

  const renderGridItem = ({ item, index }) => (
    <View style={styles.gridItemContainer}>
      <RecipeCard recipe={item} isGrid={true} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.logo}>🍳 Cooking</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.subscribeBar}>
          <Text style={styles.subscribeText}>Get access to all recipes</Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Recipe of the Day */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECIPE OF THE DAY</Text>
          <RecipeCard recipe={featuredRecipe} />
        </View>

        {/* Popular Recipes Horizontal Scroll */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>POPULAR DISHES TODAY</Text>
          <FlatList
            data={POPULAR_RECIPES}
            renderItem={({ item }) => <PopularRecipeCard recipe={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Grid Recipes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MORE RECIPES</Text>
          <FlatList
            data={gridRecipes}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subscribeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
  },
  subscribeText: {
    color: '#fff',
    fontSize: 16,
  },
  subscribeButton: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#E53E3E',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 15,
  },
  recipeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeContent: {
    padding: 20,
  },
  recipeTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeDescription: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
  },
  recipeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviews: {
    color: '#ccc',
    marginLeft: 8,
    fontSize: 16,
  },
  time: {
    color: '#ccc',
    fontSize: 16,
  },
  horizontalList: {
    paddingRight: 20,
  },
  popularCard: {
    marginRight: 15,
    width: 180,
  },
  popularImage: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  popularTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  popularTime: {
    color: '#ccc',
    fontSize: 14,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  gridItemContainer: {
    width: '48%',
    marginBottom: 20,
  },
  gridCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: 120,
  },
  gridContent: {
    padding: 12,
  },
  gridTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  gridMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridTime: {
    color: '#ccc',
    fontSize: 12,
  },
});