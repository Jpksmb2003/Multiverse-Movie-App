import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);

export default function AuthForm({ isSignUp, onSubmit, submitButtonText }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Invalid", "Make sure to fill in all fields");
      return;
    }
    
    if (isSignUp && password !== passwordConfirm) {
      Alert.alert("Invalid", "Passwords do not match.");
      return;
    }
    
    setErrorMessage("");
    setIsLoading(true);

    try {
      await onSubmit(email, password);
    } catch (error) {
      setErrorMessage("Error. Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledView className="mb-2">
      <StyledTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full mb-4 p-3 bg-white rounded-lg shadow-sm text-lg"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#bbb"
      />
      <StyledTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full mb-4 p-3 bg-white rounded-lg shadow-sm text-lg"
        placeholderTextColor="#bbb"
      />
      
      {isSignUp && (
        <StyledTextInput
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
          className="w-full mb-4 p-3 bg-white rounded-lg shadow-sm text-lg"
          placeholderTextColor="#bbb"
        />
      )}

      {errorMessage ? (
        <StyledText className="text-red-500 text-center mb-2 text-lg italic font-bold">
          {errorMessage}
        </StyledText>
      ) : null}
      <View className="p-2 rounded-lg">
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Button
            title={submitButtonText}
            className="w-full p-4 bg-amber-500 rounded-lg"
            onPress={handleSubmit}
            titleStyle={{
              fontSize: 20,
              color: "#fff",
            }}
          />
        )}
      </View>
    </StyledView>
  );
}
