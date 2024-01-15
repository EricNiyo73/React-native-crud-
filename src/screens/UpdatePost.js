import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Pressable,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { globalStyles } from "../style/style";

const UpdatePost = ({ route }) => {
  const post = route.params;

  const [title, setTitle] = useState(post?.title);
  const [desc, setDescription] = useState(post?.desc);
  const [photo, setPhoto] = useState(post?.photo);

  const handleImagePicker = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });

        if (!result.canceled) {
          setPhoto(result.assets[0].uri);
        }
      } else {
        Alert.alert(
          "Permission Denied",
          "Please enable camera roll permissions in device settings."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async (id) => {
    try {
      console.log("Title:", title);
      console.log("Description:", desc);
      console.log("Photo:", photo);

      if (!title && !desc && !photo) {
        Alert.alert("Error", "Please fill in at least one field to update");
        return;
      }

      const formData = new FormData();
      if (title) formData.append("title", title);
      if (desc) formData.append("desc", desc);
      if (photo) {
        formData.append("photo", {
          uri: photo,
          type: "image/jpeg",
          name: "photo.jpg",
        });
      }

      const response = await fetch(`http://172.31.241.219:5000/api/v1/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        Alert.alert("Success", "Post updated successfully");
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.titleInput}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={globalStyles.titleInput}
        value={desc}
        onChangeText={(text) => setDescription(text)}
      />

      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 200, height: 200, marginBottom: 50 }}
        />
      )}
      <Button
        style={{ marginBottom: 50 }}
        title="Pick New Photo"
        onPress={handleImagePicker}
      />
      <Pressable
        style={globalStyles.button}
        onPress={() => handleUpdatePost(post?._id)}
      >
        <Text style={globalStyles.text}> Update post</Text>
      </Pressable>
    </View>
  );
};

export default UpdatePost;
