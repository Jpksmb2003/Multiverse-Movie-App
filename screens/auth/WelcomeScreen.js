import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const backgroundImage = require("../../assets/multiverseBg.jpg");

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={backgroundImage} className="flex-1">
      <StatusBar style="light" />
      <View className="flex-1 justify-center items-center p-5 bg-black/70">
        <Text className="text-white text-6xl center font-bold mb-2">THE</Text>
        <Text className="text-white text-6xl center font-bold mb-8">
          MULTIVERSE
        </Text>
        <Text className="text-black bg-white text-2xl font-bold mb-6 px-3">
          All Movies in The World
        </Text>

        <Text className="text-white text-base text-center mb-10">
          " You can view the details of everything in the world."
        </Text>

        <TouchableOpacity
          className="w-full p-4 mb-4 bg-amber-500 rounded-lg"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text className="text-white text-center text-lg">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-white text-center text-lg">
            Already have an account?{" "}
            <Text className="text-blue-500">Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6", // gray-100
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#4B5563", // gray-600
  },
  loginButton: {
    width: "100%",
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#3B82F6", // blue-500
    borderRadius: 8,
    alignItems: "center",
  },
  signUpButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#22C55E", // green-500
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // white
    fontSize: 16,
    textAlign: "center",
  },
});
