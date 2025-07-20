import { styles } from '@/assets/styles/styles';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface PopularRecipe {
  id: string;
  title: string;
  image: string;
  time: string;
}

interface PopularRecipeCardProps {
  recipe: PopularRecipe;
}

const PopularRecipeCard: React.FC<PopularRecipeCardProps> = ({ recipe }) => (
  <TouchableOpacity style={styles.popularCard}>
    <Image source={{ uri: recipe.image }} style={styles.popularImage} />
    <Text style={styles.popularTitle} numberOfLines={2}>
      {recipe.title}
    </Text>
    <Text style={styles.popularTime}>{recipe.time}</Text>
  </TouchableOpacity>
);

export default PopularRecipeCard;