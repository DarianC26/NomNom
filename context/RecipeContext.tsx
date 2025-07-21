import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  time: string;
  rating: number;
  reviews?: number;
}

interface RecipeContextType {
  currentRecipe: Recipe | null;
  setCurrentRecipe: (recipe: Recipe) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Recipe[];
  setSearchResults: (results: Recipe[]) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  return (
    <RecipeContext.Provider value={{
      currentRecipe,
      setCurrentRecipe,
      searchQuery,
      setSearchQuery,
      searchResults,
      setSearchResults,
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within RecipeProvider');
  }
  return context;
};