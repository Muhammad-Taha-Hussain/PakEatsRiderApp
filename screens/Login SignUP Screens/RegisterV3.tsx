import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"; // Install heroicons package
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRegistration } from "../../providers/RegistrationContext";
import { useAuth } from "../../providers/AuthProviders";

const RegisterV3 = ({ navigation }) => {
  // const [password, setPassword] = useState(""); // State to hold password input
  const { registrationData, updateData } = useRegistration();
  const {signUp, loading, sendOTP } = useAuth()
  const { vehicleFrontImage, vehicleBackImage, ridinglicenseimage, profileImage } =
    registrationData;

  const pickImage = async (imageType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      updateData(imageType, result.assets[0].uri);
    }
  };

  const removeImage = (imageType) => {
    updateData(imageType, null);
  };

  const handleRegister = async () => {
    console.log("Registration Data is: ", registrationData);
    // try {
    // const result = await signUp(registrationData); // Spread the object properly
    // if(result.success) {
    //   navigation.replace('Drawer')
    // } else {
    //   alert(result.message)
    // }

    // if (result.success) {
    //   console.log("User successfully registered in Supabase");
    // } else {
    //   console.error("Registration failed:", result.message);
    // }
  // } catch (error) {
  //   console.error("Registration failed", error);
  // }
  // };
  
    // const response = await sendOTP(registrationData.phone);
    const phone = registrationData.phone;
    const response = await signUp(registrationData)
    if (response.success) {
      navigation.navigate("OTPScreen", { phone });
    } else {
      Alert.alert("Registration Failed", response.message);
    }
  };

  // const handleNext = () => {
  //   navigation.replace("Drawer"); // Redirect to Drawer Navigation
  // };
  // const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-12">
      <ScrollView>
        {/* Heading Text Register */}
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Let's get you on the road - Provide Your Vehicle Details
        </Text>
        <Text className="text-base text-gray-500 mb-8">
          Add your vehicle information to start delivering
        </Text>

        {/* Vehicle Front Image Upload */}
        <View className="mb-4 relative">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Upload Vehicle Front Image
          </Text>
          <TouchableOpacity
            onPress={() => pickImage("vehicleFrontImage")}
            className="border border-gray-300 h-40 w-full flex items-center justify-center rounded-lg overflow-hidden"
          >
            {vehicleFrontImage ? (
              <>
                <Image
                  source={{ uri: vehicleFrontImage }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => removeImage("vehicleFrontImage")}
                  className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
                >
                  <Icon name="close" size={20} color="white" />
                </TouchableOpacity>
              </>
            ) : (
              <Text>Upload Vehicle Front Image</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Vehicle Rear Image Upload */}
        <View className="mb-4 relative">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Upload Vehicle Rear Image
          </Text>
          <TouchableOpacity
            onPress={() => pickImage("vehicleBackImage")}
            className="border border-gray-300 h-32 w-full flex items-center justify-center rounded-lg"
          >
            {vehicleBackImage ? (
              <>
                <Image
                  source={{ uri: vehicleBackImage }}
                  className="w-full h-full rounded-lg"
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => removeImage("vehicleBackImage")}
                  className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
                >
                  <Icon name="close" size={20} color="white" />
                </TouchableOpacity>
              </>
            ) : (
              <Text>Upload Vehicle Front Image</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* License Image Upload */}
        <View className="mb-4 relative">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Upload License Image
          </Text>
          <TouchableOpacity
            onPress={() => pickImage("ridinglicenseimage")}
            className="border border-gray-300 h-32 w-full flex items-center justify-center rounded-lg"
          >
            {ridinglicenseimage ? (
              <>
                <Image
                  source={{ uri: ridinglicenseimage }}
                  className="w-full h-full rounded-lg"
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => removeImage("ridinglicenseimage")}
                  className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
                >
                  <Icon name="close" size={20} color="white" />
                </TouchableOpacity>
              </>
            ) : (
              <Text>License Image</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Driver License Image */}
        {/* <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Upload Driver License Image
          </Text>
          <TextInput
            className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
            placeholder="10 / 08 / 2015"
            keyboardType="email-address"
          />
        </View> */}

        {/* Button */}
        <TouchableOpacity
          className="bg-green-500 rounded-full py-3"
          onPress={() => handleRegister()}
        >
          {!loading ? <Text className="text-center text-white font-bold text-lg">
            Register Now
          </Text> : <ActivityIndicator size={24} className="text-center text-white font-bold text-lg" />}
          
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterV3;
