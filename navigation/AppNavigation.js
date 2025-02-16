import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from "./DrawerNavigator";
import ChatListScreen from "../screens/Chats/ChatListScreen";
import ChatScreen from "../components/Chats/ChatScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
    {/* Embed Drawer Navigator */}
    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />
    {/* Stack Screen */}
    <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
  </Stack.Navigator>
  );
};

export default AppNavigator;
