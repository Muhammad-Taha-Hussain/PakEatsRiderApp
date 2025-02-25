import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../providers/AuthProviders";
import { useRouter } from "expo-router";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const DrawerContent = (props) => {
  const navigation = useNavigation();
  const router = useRouter();
  const { logout } = useAuth(); // Assuming you have an AuthProvider managing authentication state

  const handleLogout = async () => {
    await logout(); // Perform logout operation

    console.log("Logging out...");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // This should match the name of the AuthenticationNavigator's screen
    });

    // Reset navigation to AuthenticationNavigator
    // navigation.navigate("AuthenticationNavigator");
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "AuthStack" }], // Navigate to Auth stack properly
    // });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#efefef" }}
      >
        <ImageBackground
          source={require("../../assets/images/dark-background.jpg")}
          className="flex-1 justify-center items-center p-4"
        >
          <Image
            source={require("../../assets/download.jpg")}
            className="w-24 h-24 rounded-full"
            style={{ resizeMode: 'contain' }}
          />
          <View className="flex-col items-center justify-center p-2">
            <Text className="text-white text-lg font-semibold mb-2">
              Taha Hussain
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              <Text className="text-blue-500 text-lg font-bold">
                &lt; View Profile &gt;
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View className="flex-1 bg-white p-4 mt-6">
          <DrawerItemList {...props} />
        </View>

        <View className="flex-col justify-start items-start p-4 mt-4 border-t border-solid border-gray-400">
        {/* Share App Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row justify-start items-center p-2"
        >
          <Ionicons name="share-social-outline" size={24} color="black" />
          <Text className="text-black text-lg ml-2">Share this app</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row justify-start items-center p-2 mt-2"
        >
          <Ionicons name="exit-outline" size={24} color="red" />
          <Text className="text-red-500 text-lg ml-2">Logout</Text>
        </TouchableOpacity>
      </View>
      </DrawerContentScrollView>
      {/* Profile Section */}
      {/* <View className="items-center mb-6">
        <Image source={require("../../assets/icon.png")} className="w-24 h-24 rounded-full mb-2" />
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Text className="text-blue-500 text-lg font-semibold">View Profile</Text>
        </TouchableOpacity>
      </View> */}

      {/* Navigation Buttons */}
      {/* <View className="gap-4">
        <TouchableOpacity onPress={() => navigation.navigate("Home")} className="p-3 bg-gray-200 rounded-lg">
          <Text className="text-black text-base">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChatListScreen")} className="p-3 bg-gray-200 rounded-lg">
          <Text className="text-black text-base">Conversations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Setting")} className="p-3 bg-gray-200 rounded-lg">
          <Text className="text-black text-base">Setting Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} className="p-3 bg-gray-200 rounded-lg">
          <Text className="text-black text-base">Chat Screen</Text>
        </TouchableOpacity>
      </View> */}

      {/* Logout Button */}
      
    </SafeAreaView>
  );
};

export default DrawerContent;
