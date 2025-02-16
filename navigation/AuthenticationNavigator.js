import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import LoginScreen from "../screens/Login SignUP Screens/Login";
import SignupScreen from "../screens/Login SignUP Screens/RegisterV1";
import ResetPassword from "../screens/ForgetPassword/ForgetPasswordScreen";
import EmailVerificationScreen from "../screens/ForgetPassword/EmailVerificationScreen";
import ChangePasswordScreen from "../screens/ForgetPassword/ChangePassword";

import RegisterV2 from "../screens/Login SignUP Screens/RegisterV2";
import RegisterV3 from "../screens/Login SignUP Screens/RegisterV3";
import OTPScreen from "../screens/Login SignUP Screens/OTPScreen";

import RegisterNavigation from "./RegisterNavigation";
import AppNavigator from "./AppNavigation";
import { RegistrationProvider } from "../providers/RegistrationContext";

//import providers
import { useAuth } from "../providers/AuthProviders";

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
  const navigation = useNavigation();
  const { profile } = useAuth();
  return (
    <RegistrationProvider>
      <Stack.Navigator
        {...(profile
          ? (initialRouteName = "Drawer")
          : (initialRouteName = "Login"))}
        // initialRouteName="Login"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts?.screen?.width || 0, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerificationScreen"
          component={EmailVerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterV2"
          component={RegisterV2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterV3"
          component={RegisterV3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterNavigation"
          component={RegisterNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Drawer"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </RegistrationProvider>
  );
};

export default AuthenticationNavigator;
