import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import PostDetails from "./src/screens/PostDetails";
import AddPost from "./src/screens/AddPost";
import UpdatePost from "./src/screens/UpdatePost";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Blog App",
            headerStyle: {
              backgroundColor: "#3498db",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen name="PostDetails" component={PostDetails} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="UpdatePost" component={UpdatePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

<StatusBar style="auto" />;
