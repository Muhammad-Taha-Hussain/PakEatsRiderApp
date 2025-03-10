// import React from "react";
// import { createStackNavigator } from '@react-navigation/stack';
// import DrawerNavigator from "./DrawerNavigator";
// // import ChatListScreen from "../screens/Chats/ChatListScreen";
// import ChatScreen from "../components/Chats/ChatScreen";
// import AuthenticationNavigator from "./AuthenticationNavigator";
// import ProfileSettingsScreen from "../screens/Settings/index";
// import ChatListScreen from "../screens/Chats/ChatListScreen";


// //settings imports
// import Setting from "../screens/Settings/index";
// import AppSetting from "../screens/Settings/AppSettingScreen";
// import SettingNavigator from "./SettingNavigator";

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="DrawerNavigator">
//     {/* Embed Drawer Navigator */}
//     <Stack.Screen
//       name="DrawerNavigator"
//       component={DrawerNavigator}
//       options={{ headerShown: false }}
//     />
//     {/* Stack Screen */}
//     <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
//     <Stack.Screen name="ChatScreen" component={ChatScreen} />
//     {/* <Stack.Screen name="ChatListScreen" component={ChatListScreen} /> */}
//     {/* <Stack.Screen name="SettingScreen" component={ProfileSettingsScreen} /> */}

//     {/* Setting Screens */}
//     <Stack.Screen name="Setting" component={SettingNavigator} options={{ headerShown: false }} />
//     <Stack.Screen name="AppSetting" component={AppSetting} options={{headerShown: false}}  />

//     <Stack.Screen name="Auth" component={AuthenticationNavigator} options={{headerShown: false}} />
//   </Stack.Navigator>
//   );
// };

// export default AppNavigator;
