import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from "./DrawerNavigator";
// import ChatListScreen from "../screens/Chats/ChatListScreen";
import ChatScreen from "../components/Chats/ChatScreen";
import AuthenticationNavigator from "./AuthenticationNavigator";
import ProfileSettingsScreen from "../screens/Settings/PersonalInfoScreen";
import ChatListScreen from "../screens/Chats/ChatListScreen";

//settings imports
import Setting from "../screens/Settings/index";
import AppSetting from "../screens/Settings/AppSettingScreen";
import PaymentNavigator from "./PaymentNavigator";


const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Setting">
    {/* Stack Screen */}
    <Stack.Screen name="PaymentFlow" component={PaymentNavigator} options={{headerShown: false}} />
    <Stack.Screen name="Setting" component={Setting} options={{headerShown: false}}  />
    <Stack.Screen name="AppSetting" component={AppSetting} options={{headerShown: false}}  />
    {/* <Stack.Screen name="ChatListScreen" component={ChatListScreen} /> */}
    <Stack.Screen name="ProfileSettingsScreen" component={ProfileSettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Auth" component={AuthenticationNavigator} options={{headerShown: false}} />
  </Stack.Navigator>
  );
};

export default SettingNavigator;
