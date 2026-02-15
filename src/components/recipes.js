import { View, Text, Pressable, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
<ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          keyExtractor={(item) => item.idFood}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: hp(3) }}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={[styles.cardContainer, { paddingLeft: 20, paddingRight: 15}]} testID="articleDisplay"
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", item)}
        style={styles.cardTouchable}
      >
        <Image
          source={{ uri: item.recipeImage }}
          style={styles.articleImage}
          resizeMode="cover"
        />
        <Text style={styles.articleText} numberOfLines={2}>
          {item.recipeName}
        </Text>
        <Text style={styles.articleDescription} numberOfLines={2}>
          {item.cookingDescription || item.recipeInstructions.substring(0, 80) + "..."}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
    flex: 1, // Allows cards to grow and fill space evenly
  },
  cardTouchable: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  articleImage: {
    width: "100%",
    height: hp(15),
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  articleText: {
    fontSize: hp(1.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginLeft: wp(1),
    marginRight: wp(1),
    marginTop: hp(1),
    textAlign: "center",
  },
  articleDescription: {
    fontSize: hp(1.3),
    color: "#6B7280", // gray-500
    marginLeft: wp(1),
    marginRight: wp(1),
    marginTop: hp(0.5),
    marginBottom: hp(0.5),
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between", // Align columns evenly
  },
});
