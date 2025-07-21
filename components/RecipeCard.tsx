import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { styles } from '@/assets/styles/styles';
import StarRating from './StarRating';
import { Recipe } from '@/assets/types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isGrid?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isGrid = false }) => {
  if (isGrid) {
    return (
      <TouchableOpacity style={styles.gridCard}>
        <Image source={{ uri: recipe.image }} style={styles.gridImage} />
        <View style={styles.gridContent}>
          <Text style={styles.gridTitle} numberOfLines={1} ellipsizeMode="tail">
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

export default RecipeCard;