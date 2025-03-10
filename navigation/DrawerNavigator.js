import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import LoginField from "../screens/LoginField";
import DrawerContent from "../components/DrawerContent/DrawerContent";
import ChatListScreen from "../screens/Chats/ChatListScreen";
import ChatScreen from "../components/Chats/ChatScreen";
import AuthenticationNavigator from "./AuthenticationNavigator";
import ProfileSettingsScreen from "../screens/Settings copy/index";
import SettingNavigator from "./SettingNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OrderProvider } from "../context/OrderContext";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#aa18ea",
        drawerInactiveBackgroundColor: "#e0e0e0",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerItemStyle: {
          borderRadius: 0,
          marginVertical: 10,
        },
        drawerPosition: "right",
        drawerLabelStyle: {
          marginLeft: -5,
          fontFamily: "Roboto-Medium",
          fontSize: 15,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />

      {/* <Drawer.Screen name="Settings" component={LoginField} />
      <Drawer.Screen name="ChatListScreen" component={ChatListScreen} /> */}
      <Drawer.Screen
        name="Setting"
        component={ProfileSettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ChatScreens"
        component={ChatScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ChatScreenss"
        component={ChatScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen name="AuthenticationNavigator" component={AuthenticationNavigator} options={{ headerShown: false }} /> */}
      <Drawer.Screen
        name="SettingScreen"
        component={SettingNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />

      {/* <Drawer.Screen name="SettingScreen" component={ProfileSettingsScreen} options={{ headerShown: false }} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
