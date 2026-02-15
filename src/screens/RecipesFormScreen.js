import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saverecipe = async () => {
    try {
      // Initialize a new recipe object
      const newrecipe = {
        id: recipeToEdit ? recipeToEdit.id : Date.now().toString(), // Generate unique ID for new recipes
        title,
        image,
        description,
        dateCreated: recipeToEdit ? recipeToEdit.dateCreated : new Date().toISOString(),
        dateModified: new Date().toISOString(),
      };

      // Retrieve existing recipes from AsyncStorage
      const existingrecipes = await AsyncStorage.getItem("customrecipes");
      let recipes = [];
      
      if (existingrecipes) {
        recipes = JSON.parse(existingrecipes);
      }

      // Update or add a recipe
      if (recipeToEdit && recipeIndex !== undefined) {
        // Editing an existing recipe
        recipes[recipeIndex] = newrecipe;
        console.log("Updated existing recipe at index:", recipeIndex);
      } else {
        // Adding a new recipe
        recipes.push(newrecipe);
        console.log("Added new recipe");
      }

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));

      // Handle callbacks
      if (recipeToEdit && onrecipeEdited) {
        onrecipeEdited(); // Notify parent component about the edit
      }

      // Navigate back to the previous screen
      navigation.goBack();
      
    } catch (error) {
      console.error("Error saving recipe:", error);
      // You could add user-friendly error handling here
      // For example, show an alert or toast message
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
