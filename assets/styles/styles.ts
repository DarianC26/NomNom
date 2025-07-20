import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { height: screenHeight } = Dimensions.get("window");

export const styles = StyleSheet.create({
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
    borderColor: 'black'
  },
  popularTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  popularTime: {
    color: 'black',
    fontSize: 14,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  gridItemContainer: {
    width: '48%',
    marginBottom: 20,
    marginRight: '4%', // Add this line for horizontal gap
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
})