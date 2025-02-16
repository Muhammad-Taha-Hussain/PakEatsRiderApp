import React, { useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = ({navigation}) => {
  // const navigation = useNavigation();

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         navigation.navigate('Login');
  //     }, 1000);

  //     return () => clearTimeout(timer);
  // }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-grey-500">
      <Text className="text-black text-2xl font-bold">
        Welcome to RiderApp!
      </Text>
      <TouchableOpacity className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 absolute right-0 bottom-0" 
      onPress={() => navigation.navigate('AppMain')}
      >
        <Text className="text-lg text-green-600 font-bold">Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SplashScreen;
