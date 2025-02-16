import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"; // Install heroicons package
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState(""); // State to hold password input
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle state for visibility

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-12">

      {/* Heading Text Login */}
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        Forgot Password?
      </Text>
      <Text className="text-base text-gray-500 mb-8">
        Enter your valid email address and we'll send you confirmation code to reset your password
      </Text>

        {/* Email address / Phone no */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Email Address / Phone No
        </Text>
        <TextInput
          className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
          placeholder="Enter your email or phone number"
          keyboardType="email-address"
        />
      </View>


      {/* Button */}
      <TouchableOpacity
        className="bg-green-500 rounded-full py-3"
        onPress={() => navigation.navigate('EmailVerificationScreen')}
      >
        <Text className="text-center text-white font-bold text-lg">
          Continue
        </Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
};

export default ResetPassword;
