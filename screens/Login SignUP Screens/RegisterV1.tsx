import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"; // Install heroicons package
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRegistration } from "../../providers/RegistrationContext";

const RegisterScreen = ({ navigation }) => {
  // const [password, setPassword] = useState(""); // State to hold password input
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle state for visibility
  // const [phone, setPhoneNo] = useState(""); // State to hold phone number input
  // const [name, setRiderName] = useState(""); // State to hold rider name input
  // const [isFieldEmpty, setIsFieldEmpty] = useState(false); // State to check if any field is empty
  // const [isPhoneValid, setIsPhoneValid] = useState(false); // State to check if
  // const [isPasswordValid, setIsPasswordValid] = useState(false); // State to check if password is valid
  // const [isRiderNameValid, setIsRiderNameValid] = useState(false); //

  const { registrationData, updateData } = useRegistration();
  const { phone, name, password } = registrationData;

  const isFormValid =
    phone.length === 11 && password.length >= 6 && name.length >= 3;

  // Validate phone number
  // const validatePhone = () => {
  //   if (phoneNo.length < 11) {
  //     setIsPhoneValid(false);
  //   } else {
  //     setIsPhoneValid(true);
  //   }
  // }

  // Validate password
  // const validatePassword = () => {
  //   if (password.length < 6) {
  //     setIsPasswordValid(false);
  //   } else {
  //     setIsPasswordValid(true);
  //   }
  // }

  // Validate rider name
  // const validateRiderName = () => {
  //   if (riderName.length < 3) {
  //     setIsRiderNameValid(false);
  //   } else {
  //     setIsRiderNameValid(true);
  //   }
  // }

  // Handle Next Button
  const handleNext = () => {
    navigation.navigate("RegisterV2"); // Redirect to Drawer Navigation
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-12">
      {/* Heading Text Register */}
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        Become a rider and Deliver with PakEats
      </Text>
      <Text className="text-base text-gray-500 mb-8">
        Sign up and take control of you own Buisness
      </Text>

      {/* PhoneNo */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Phone No
        </Text>
        <TextInput
          className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
          placeholder="Enter phone number"
          keyboardType="number-pad"
          value={phone}
          autoCapitalize={"none"}
          onChangeText={(text) => updateData("phone", text)}
        />
      </View>

      {/* Rider Name */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Rider Name per CNIC
        </Text>
        <TextInput
          className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
          placeholder="Rider's Name"
          keyboardType="email-address"
          value={name}
          autoCapitalize={"none"}
          onChangeText={(text) => updateData("name", text)}
        />
      </View>

      {/* Password */}
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
            value={password}
            onChangeText={(text) => updateData("password", text)}
            autoCapitalize={"none"}
          />

          {/* Password Visibility Toggle */}
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
      
      {/* Term of Service Password */}
      <TouchableOpacity>
        <Text className="text-center text-green-600 text-sm mb-6">
          I agree with Terms of Service and Privacy Policy
        </Text>
      </TouchableOpacity>

      {/* Button */}
      <TouchableOpacity
        // disabled={isFieldEmpty || !isPhoneValid || !isPasswordValid || !isRiderNameValid}
        disabled={!isFormValid}
        className="bg-green-500 rounded-full py-3"
        onPress={() => handleNext()}
      >
        <Text className="text-center text-white font-bold text-lg">Next</Text>
      </TouchableOpacity>

      {/* Have an account */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-sm text-gray-500">Have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            // setPassword("");
            // setPhoneNo("");
            // setRiderName("");
            navigation.goBack();
          }}
        >
          <Text className="text-sm text-green-600 font-bold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
