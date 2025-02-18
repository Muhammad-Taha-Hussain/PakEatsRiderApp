import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from "./DrawerNavigator";
// import ChatListScreen from "../screens/Chats/ChatListScreen";
import ChatScreen from "../components/Chats/ChatScreen";
import AuthenticationNavigator from "./AuthenticationNavigator";
import ProfileSettingsScreen from "../screens/Settings copy/index";
import ChatListScreen from "../screens/Chats/ChatListScreen";

//settings imports
import Setting from "../screens/Settings copy/index";
import AppSetting from "../screens/Settings copy/AppSettingScreen";


const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Setting">
    {/* Embed Drawer Navigator */}
    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />
    {/* Stack Screen */}
    <Stack.Screen name="Setting" component={Setting} options={{headerShown: false}}  />
    <Stack.Screen name="AppSetting" component={AppSetting} options={{headerShown: false}}  />
    {/* <Stack.Screen name="ChatListScreen" component={ChatListScreen} /> */}
    <Stack.Screen name="SettingScreen" component={ProfileSettingsScreen} />
    <Stack.Screen name="Auth" component={AuthenticationNavigator} options={{headerShown: false}} />
  </Stack.Navigator>
  );
};

export default SettingNavigator;
