import React from "react";
import { View, Text, StyleSheet, ImageBackground, Alert,StatusBar } from "react-native";
import AuthForm from "../../components/Auth/AuthForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const backgroundImage = require("../../assets/multiverseBg.jpg");

export default function SignUpScreen({ navigation }) {
  const handleSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.replace("Home");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert(
            "Registration failed",
            "This email is already registered."
          );
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Registration failed", "Invalid email address.");
        } else if (error.code === "auth/weak-password") {
          Alert.alert("Registration failed", "Password is too weak.");
        } else {
          Alert.alert("Registration failed", error.message);
        }
      });
  };

  return (
    
    <ImageBackground source={backgroundImage} className="flex-1">
      <StatusBar style="light" />
      <View className="flex-1 justify-center p-5 bg-black/50">
        <Text className="text-white text-5xl font-bold text-center mb-5">
          SignUp
        </Text>
        <AuthForm
          submitButtonText="Sign Up"
          isSignUp={true}
          onSubmit={handleSignUp}
        />
        <Text
          className="text-white text-lg text-center mt-5"
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account? <Text className="text-blue-500">Log In</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}
