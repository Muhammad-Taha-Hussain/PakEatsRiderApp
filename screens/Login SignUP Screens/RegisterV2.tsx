import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"; // Install heroicons package
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRegistration } from "../../providers/RegistrationContext";

const RegisterV2 = ({ navigation }) => {
  const { registrationData, updateData } = useRegistration();
  const { vehicleType, cnicFrontImage, cnicBackImage } = registrationData;

  const isFormValid = vehicleType.trim() !== "";

  const pickImage = async (imageType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateData(imageType, result.assets[0].uri);
    }
  };

  const removeImage = (imageType) => {
    updateData(imageType, null);
  };

  const handleNext = () => {
    navigation.navigate("RegisterV3"); // Redirect to Drawer Navigation
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-12">
      {/* Heading Text Register */}
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        Let's get you on the road - Provide Your Vehicle Details
      </Text>
      <Text className="text-base text-gray-500 mb-8">
        Add your vehicle information to start delivering
      </Text>

      {/* Vehicle Type */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Select Vehicle Type
        </Text>
        <View className="border border-gray-300 rounded-lg">
          <RNPickerSelect
            onValueChange={(value) => updateData("vehicleType", value)}
            items={[
              { label: "Bike", value: "bike" },
              { label: "Car", value: "car" },
              { label: "Scooter", value: "scooter" },
              { label: "Truck", value: "truck" },
              { label: "Other", value: "other" },
            ]}
            placeholder={{ label: "Select Vehicle Type", value: null }}
            value={vehicleType}
            style={{
              inputIOS: {
                padding: 12,
                fontSize: 16,
                color: "#333",
              },
              inputAndroid: {
                padding: 12,
                fontSize: 16,
                color: "#333",
              },
            }}
          />
        </View>
      </View>

      {/* CNIC Front Image Upload */}
      <View className="mb-4 relative">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Upload CNIC Front Image
        </Text>
        <TouchableOpacity
          onPress={() => pickImage("cnicFrontImage")}
          className="border border-gray-300 h-32 w-full flex items-center justify-center rounded-lg"
        >
          {cnicFrontImage ? (
            <>
              <Image
                source={{ uri: cnicFrontImage }}
                className="w-full h-full rounded-lg"
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => removeImage("cnicFrontImage")}
                className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
              >
                <Icon name="close" size={20} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <Text>Upload CNIC Front Image</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* CNIC Back Image Upload */}
      <View className="mb-4 relative">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Upload CNIC Rear Image
        </Text>
        <TouchableOpacity
          onPress={() => pickImage("cnicBackImage")}
          className="border border-gray-300 h-32 w-full flex items-center justify-center rounded-lg"
        >
          {cnicBackImage ? (
            <>
              <Image
                source={{ uri: cnicBackImage }}
                className="w-full h-full rounded-lg"
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => removeImage("cnicBackImage")}
                className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
              >
                <Icon name="close" size={20} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <Text>Upload CNIC Back Image</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Model */}
      {/* <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Model</Text>
        <TextInput
          className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
          placeholder="Enter Model"
          keyboardType="email-address"
          value={vehicleModel}
          onChangeText={(text) => updateData("vehicleModel", text)}
        />
      </View> */}

      {/* Year of Manufacture */}
      {/* <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Year of Manufacture
        </Text>
        <TextInput
          className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
          placeholder="10 / 08 / 2015 Year of Manufacture"
          keyboardType="email-address"
          value={manufactureYear}
          onChangeText={(text) => updateData("manufactureYear", text)}
        />
      </View> */}

      {/* Licensed Plate Number */}
      {/* <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Licensed Plate Number
        </Text>
        <TextInput
          className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
          placeholder="LEA-1234"
          keyboardType="email-address"
        />
      </View> */}

      {/* Vehicle Registration Number */}
      {/* <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Vehicle Registration Number
        </Text>
        <TextInput
          className="flex-row items-center border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
          placeholder="Reg-123456"
          keyboardType="email-address"
        />
      </View> */}

      {/* Button */}
      <TouchableOpacity
        disabled={!isFormValid}
        className={`rounded-full py-3 ${
          isFormValid ? "bg-green-500" : "bg-gray-400"
        }`}
        onPress={handleNext}
      >
        <Text className="text-center text-white font-bold text-lg">Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterV2;
