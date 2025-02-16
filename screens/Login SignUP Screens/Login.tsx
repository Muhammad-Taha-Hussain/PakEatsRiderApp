import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"; // Install heroicons package
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../providers/AuthProviders";

const LoginScreen = ({ navigation }) => {
  const { login, profile } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>(""); // State to hold password input
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle state for visibility

  async function signInWithEmail() {
    setLoading(true);
    try {
      await login(email, password);
      navigation.replace("Drawer"); // Redirect to Drawer Navigation
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <TouchableOpacity
          className="mx-2 my-2"
          onPress={() => navigation.navigate("Drawer")}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="close" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 pt-12">
        {/* Heading Text Login */}
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Welcome Back, Rider!
        </Text>
        <Text className="text-base text-gray-500 mb-8">
          Please sign in to your account
        </Text>
        {/* Email Field */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Email Address / Phone No
          </Text>
          <TextInput
            className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
            placeholder="Enter your email or phone number"
            keyboardType="email-address"
            autoCapitalize={"none"}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        {/* Password Field */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Password
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
            {/* Password Input */}
            <TextInput
              className="flex-1 py-3 text-lg"
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible} // Mask password
              onChangeText={(text) => setPassword(text)}
              value={password}
              autoCapitalize={"none"}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"} // Toggle icon
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forget Password */}
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text className="text-right text-green-600 text-sm mb-6">
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity
          disabled={loading} // Disable button when loading
          className={`bg-green-500 rounded-full py-3 ${loading ? "opacity-50" : ""}`}
          onPress={() => signInWithEmail()}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-center text-lg">Sign In</Text>}
        </TouchableOpacity>

        {/* Dont have an account */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-sm text-gray-500">Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className="text-sm text-green-600 font-bold">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
