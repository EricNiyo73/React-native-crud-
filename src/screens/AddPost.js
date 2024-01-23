import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { globalStyles } from "../style/style";

const AddPost = () => {
  const [error, setError] = useState("");
  const [desc, setDescription] = useState("");
  const [title, setTile] = useState("");
  const [photo, setImage] = useState(null);

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
          setImage(result.assets[0].uri);
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

  const onSubmit = async () => {
    try {
      console.log("Title:", title);
      console.log("Description:", desc);
      console.log("Photo:", photo);

      // Check if any of the required fields are null or empty
      if (!title || !desc || !photo) {
        Alert.alert("Error", "Please fill in all required fields");
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
      const response = await fetch("http://192.168.29.127:5000/api/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        Alert.alert("Success", "Post added successfully");
      } else {
        // Handle error
        Alert.alert("Error", data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error); // Log the entire error object
      console.log(error.response); // Log the response object if available
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <View style={globalStyles.containing}>
      <View>
        <Text>Title</Text>
        <TextInput
          style={globalStyles.titleInput}
          multiline
          placeholder="Enter Tile here..."
          value={title}
          onChangeText={(text) => setTile(text)}
        />

        <Text>{error}</Text>
      </View>
      <View>
        <Text>Description</Text>
        <TextInput
          style={globalStyles.titleInput}
          multiline
          placeholder="Enter description here..."
          value={desc}
          onChangeText={(desc) => setDescription(desc)}
        />
        <Text>{error}</Text>
      </View>
      <View>
        {photo && (
          <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
        )}
        <Button
          style={globalStyles.imaging}
          title="Pick Image"
          onPress={handleImagePicker}
        />
      </View>
      <View>
        <Button title="Create" onPress={() => onSubmit()} />
      </View>
    </View>
  );
};

export default AddPost;

// // AddPost.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';

// const AddPost = ({ navigation }) => {
//   const [newPost, setNewPost] = useState({ title: '', photo: '', desc: '' });

//     const handleImagePicker = async () => {
//       try {
//         const result = await DocumentPicker.getDocumentAsync({
//           type: 'image/*',
//         });
//           setNewPost({ ...newPost, photo: result.uri });
//           console.log('Document picker result:', result);

//       } catch (error) {
//         console.error('Document picker error:', error);
//       }
//     };
//     useEffect(() => {
//       // Run the effect once on mount
//       handleImagePicker();
//     }, []);

//  // Run the effect once on mount

//   const handleAddPost = async () => {
//     try {
//       // ... your existing code ...

//       if (newPost.photo) {
//         // If file selected then create FormData
//         // const fileToUpload = newPost.photo;
//         const formData = new FormData();
//         formData.append('title', newPost.title);
//         formData.append('photo', { uri: newPost.photo, name: 'image.jpg', type: 'image/jpeg' });
//         formData.append('desc', newPost.desc);

//         // Implement logic to add the new post to your API
//         const response = await fetch('https://crudinative.onrender.com/api/v1/create', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           body: formData,
//         });

//         const data = await response.json();
//         console.log('Post added:', data);

//         if (data.status === 1) {
//           Alert.alert('Upload Successful');
//         }
//       } else {
//         // If no file selected then show alert
//         Alert.alert('Please Select File first');
//       }

//       // Optionally, navigate back to the home screen or another screen
//       navigation.navigate('Home');
//     } catch (error) {
//       console.error('Error adding post:', error);
//     }
//   }
//     return (
//       <View>
//         <Text>Add New Post</Text>
//         <TextInput
//           placeholder="Title"
//           value={newPost.title}
//           onChangeText={(text) => setNewPost({ ...newPost, title: text })}
//         />
//         <Button title="Pick Image" onPress={handleImagePicker} />
//         {newPost.photo && <Image source={{ uri: newPost.photo }} style={{ width: 200, height: 200 }} />}
//         <TextInput
//           placeholder="Description"
//           value={newPost.desc}
//           onChangeText={(text) => setNewPost({ ...newPost, desc: text })}
//           multiline
//         />
//         <Button title="Add Post" onPress={handleAddPost} />
//       </View>
//     );
//   };

//   export default AddPost;
