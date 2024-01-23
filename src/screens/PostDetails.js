import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Card, Button } from "react-native-elements";
import { globalStyles } from "../style/style";

const PostDetails = ({ route, navigation }) => {
  const { post } = route.params;
  const { id } = route.params;
  const handleUpdatePost = () => {
    navigation.navigate("UpdatePost", post);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.29.127:5000/api/v1/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);

      if (response.ok) {
        // Alert.alert("Item deleted successfully");
        navigation.navigate("Home");
      } else {
        const data = await response.json();
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <View>
      <Card containerStyle={globalStyles.card}>
        <Image source={{ uri: post.photo }} style={globalStyles.cardImage} />
        <Card.Title style={globalStyles.cardTitle}>{post.title}</Card.Title>
        <Card.Divider />
        <Text style={globalStyles.cardBody}>{post.desc}</Text>
        <View style={globalStyles.buttonContainer}>
          <Button title="Update" onPress={handleUpdatePost} />

          <Button
            onPress={() => handleDelete(post?._id)}
            title="Delete"
            buttonStyle={globalStyles.deleteButton}
          />
        </View>
      </Card>
    </View>
  );
};

export default PostDetails;
