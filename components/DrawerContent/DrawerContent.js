import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DrawerContent = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text className="text-black-500 mb-2">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Text className="text-black-500 mb-2">hom</Text>
        </TouchableOpacity>
      </View>
      <View className="">
      <TouchableOpacity onPress={() => navigation.navigate("ChatListScreen")}>
        <Text className="text-black-500 mb-2">Conversations</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SettingScreen")}>
        <Text className="text-black-500 mb-2">Settings</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
