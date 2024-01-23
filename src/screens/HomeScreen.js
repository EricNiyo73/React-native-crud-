import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Image, Button } from "react-native";
import { Card, Text } from "react-native-elements";
import { globalStyles } from "../style/style";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch("http://192.168.29.127:5000/api/v1")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data.data); // Log the data
        setPosts(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderItem = ({ item }) => {
    if (!item) {
      return null; // Skip rendering if the item is undefined or null
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PostDetails", { post: item })}
      >
        <Card containerStyle={globalStyles.card}>
          <Image source={{ uri: item.photo }} style={globalStyles.cardImage} />
          <Card.Title style={globalStyles.cardTitle}>{item.title}</Card.Title>
          <Card.Divider />
          <Text style={globalStyles.cardBody}>{item.desc}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  const handleAddPost = () => {
    navigation.navigate("AddPost");
  };

  return (
    <View>
      <View style={globalStyles.topSection}>
        <Text style={globalStyles.headerText}>Tech Blogs</Text>
        <Button
          style={globalStyles.addText}
          title="Add Post"
          onPress={handleAddPost}
        />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => (item ? item._id.toString() : null)} // Ensure a valid key
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
