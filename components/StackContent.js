import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DrawerContent = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className="text-blue-500 mb-2">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text className="text-blue-500 mb-2">Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Drawer")}>
        <Text className="text-blue-500 mb-2">Drawer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DrawerContent;
