import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CountryFlag from "react-native-country-flag";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
// import { router, useNavigation } from "@react-navigation/stack";

import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import RemoteImage from "../../components/RemoteImages/RemoteImage";
import { updateRiderDetail } from "../../api/profile";
// import { defaultPizzaImage } from "@/components/HomeComponent/DealListItem";
import { useAuth } from "../../providers/AuthProviders";
import { supabase } from "../../lib/supabase";

const PersonalInfoScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  // const route = useRoute();
  // const { profile } = route.params; // Retrieve the profile object

  const { profile } = useAuth();
  const [fullName, setFullName] = useState(profile?.name || "");
  const [isPhone, setIsPhone] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(); // State to store selected image

  const { mutate: insertRiderDetail } = updateRiderDetail();

  const originalState = {
    fullName: profile?.name || "",
    profileImage: profile?.image || null,
  };

  console.log("image type", typeof profile?.image);
  console.log("image", profile?.image);
  console.log("image", profileImage?.split("/").pop());

  useEffect(() => {
    const isNameChanged = fullName !== originalState.fullName;
    // Extract the filename from profile.image if it exists
    const profileImageNameFromProfile = profile?.image
      ? profile.image.split("/").pop()
      : "";

    // Extract the filename from profileImage if it exists
    const profileImageName = profileImage ? profileImage.split("/").pop() : "";

    // Log for debugging
    console.log("Image from profile:", profileImageNameFromProfile);
    console.log("Current profile image:", profileImageName);

    // Compare the two extracted filenames
    const isImageChanged = profileImageNameFromProfile !== profileImageName;

    // Output the comparison result
    console.log("Is image changed:", isImageChanged);

    setIsSaveEnabled(isNameChanged || isImageChanged);
  }, [fullName, profileImage]);

  console.log("mai profile", profile);

  //image code
  const onCreate = async () => {
    // if (!validateInput()) {
    //   return;
    // }
    setLoading(true);
    const imagePath = await uploadImage();
    console.log("Hello image update", imagePath);

    const id = profile?.id;
    console.log("Hello id", id);
    console.log("heloo fullname", fullName);

    // Save in the database
    insertRiderDetail(
      { id, fullName, image: imagePath },
      {
        onSuccess: () => {
          // resetFields();
          console.log("successfully word done");

          navigation.goBack();
        },
      }
    );
  };
  const uploadImage = async () => {
    if (!profileImage?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(profileImage, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("profile-images")
      .upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      return data.path;
    }
  };

  // Enable save button based on validation
  useEffect(() => {
    if (
      fullName.trim() !== "" && (isPhone)
    ) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [fullName]);
  // , dob, gender, contact

  // Function to handle image picking
  const pickImage = async () => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos to update your profile picture."
      );
      setProfileImage(null);
      return;
    }

    // Pick an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Update the selected image
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-8">
      {/* Header */}
      <View className="flex-row items-center justify-normal mb-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-gray-100 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-bold text-center">
          Personal Data
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Image */}
        <View className="items-center mb-4">
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="w-36 h-36 rounded-full"
              />
            ) : (
              <RemoteImage
                path={profile?.profile_image}
                fallback={"../../assets/profile.png"}
                className="w-36 h-36 rounded-full"
              />
            )}

            {/* <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../../assets/images/profile.jpg")
              }
              className="w-24 h-24 rounded-full"
            /> */}
            <View className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full">
              <Text className="text-black text-xs">📸</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Full Name */}
        <Text className="text-gray-700 mb-1">Full Name</Text>
        <TextInput
          // value={fullName}
          placeholder={fullName}
          onChangeText={setFullName}
          className="border p-2 rounded mb-4"
        />

        {/* Contact Input */}
        <Text className="text-gray-700 mb-1">
          {isPhone ? "Phone" : "Email"}
        </Text>
        <View
          className={`${
            isPhone ? "flex-row items-center border rounded mb-4" : "mb-4"
          }`}
        >
          {isPhone && (
            <View className="flex-row items-center px-2">
              <CountryFlag isoCode="PK" size={25} />
              <Text className="ml-2">+92</Text>
            </View>
          )}
          <TextInput
            // value={contact}
            editable={false} // Disable editing
            selectTextOnFocus={false} // Prevent text selection
            defaultValue={profile?.phone || profile?.email}
            // onChangeText={setContact}
            keyboardType={isPhone ? "numeric" : "email-address"}
            maxLength={isPhone ? 10 : undefined}
            placeholder={isPhone ? profile?.phone : profile?.email}
            className="flex-1 p-2 border rounded"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          disabled={!isSaveEnabled || loading}
          className={`p-3 rounded-full ${
            loading || !isSaveEnabled ? "bg-gray-400" : "bg-green-600"
          }`}
          onPress={onCreate}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-center">Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;


// import { View, Text } from 'react-native'
// import React from 'react'

// const PersonalInfoScreen = () => {
//   return (
//     <View>
//       <Text>PersonalInfoScreen</Text>
//     </View>
//   )
// }

// export default PersonalInfoScreen