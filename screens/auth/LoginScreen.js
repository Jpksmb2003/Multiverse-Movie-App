import React from "react";
import { View, Text, ImageBackground,StatusBar } from "react-native";
import AuthForm from "../../components/Auth/AuthForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Alert } from "react-native";

const backgroundImage = require("../../assets/multiverseBg.jpg");

export default function LoginScreen({ navigation }) {
  const handleSignIn = (email, password) => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.replace("Home");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          Alert.alert("Sign in failed", "No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Sign in failed", "Incorrect password.");
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Sign in failed", "Invalid email address.");
        } else if (error.code === "auth/invalid-credential") {
          Alert.alert("Sign in failed", "Email address or password Incorrect.");
        } else {
          Alert.alert("Sign in failed", error.message);
        }
      });
  };
  return (
    <ImageBackground source={backgroundImage} className="flex-1">
      <StatusBar style="light" />
      <View className="flex-1 justify-center p-5 bg-black/80">
        <Text className="text-white text-5xl font-bold text-center mb-5">
          Login
        </Text>
        <AuthForm submitButtonText="Login" onSubmit={handleSignIn} />
        <Text
          className="text-white text-lg text-center mt-5"
          onPress={() => navigation.navigate("SignUp")}
        >
          Don't have an account? <Text className="text-blue-500">Sign Up</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}
