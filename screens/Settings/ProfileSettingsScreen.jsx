import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import ProfileHeader from "../../components/SettingComponent/ProfileHeader";
import ProfileOption from "../../components/SettingComponent/ProfileOption";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  UserIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSettingsScreen = ({ navigation }) => {
  const handleOptionPress = (option) => {
    console.log(`Pressed: ${option}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-start mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-slate-300 rounded-full">
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 items-center text-center font-bold text-xl">Profile Settings</Text>
      </View>

      <ScrollView className="bg-white h-full">
        {/* Profile Header */}
        <ProfileHeader
          name="Albert Stevano Bajefski"
          email="Albertstevano@gmail.com"
          imageUrl="https://via.placeholder.com/150"
        />

        {/* Profile Section */}
        <View className="flex-col px-4 my-4">
            <Text className="font-light text-gray-600">Profile</Text>
          <ProfileOption
            title="Edit Personal Data"
            icon={UserIcon}
            onPress={() => handleOptionPress("Edit Personal Data")}
          />
          <ProfileOption
            title="Payment Details"
            icon={CreditCardIcon}
            onPress={() => handleOptionPress("Payment Details")}
          />
          <ProfileOption
            title="Earnings"
            icon={CurrencyDollarIcon}
            onPress={() => handleOptionPress("Earnings")}
          />
        </View>

        {/* Support Section */}
        <View className="flex-col px-4 my-4">
            <Text className="font-light text-gray-600">Support</Text>
          <ProfileOption
            title="Help Center"
            icon={QuestionMarkCircleIcon}
            onPress={() => handleOptionPress("Help Center")}
          />
          <ProfileOption
            title="Request Account Deletion"
            icon={TrashIcon}
            onPress={() => handleOptionPress("Request Account Deletion")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;
