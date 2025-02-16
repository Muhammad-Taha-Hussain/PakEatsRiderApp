import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import LoginField from "../screens/LoginField";
import DrawerContent from "../components/DrawerContent/DrawerContent";
import ChatListScreen from "../screens/Chats/ChatListScreen";
import ChatScreen from "../components/Chats/ChatScreen";
// import ProfileSettingsScreen from "../screens/Settings copy/index";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Settings" component={LoginField} /> */}
      <Drawer.Screen name="ChatListScreen" component={ChatListScreen} />
      <Drawer.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="SettingScreen" component={ProfileSettingsScreen} options={{ headerShown: false }} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
