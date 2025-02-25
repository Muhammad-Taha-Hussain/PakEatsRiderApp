import React, {useState, useEffect} from "react";
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
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
  const navigation = useNavigation();
  const { profile } = useAuth();

  const [prevScreen, setPrevScreen] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      const currentScreen = e.data.state.routes[e.data.state.index].name;
      setPrevScreen(currentScreen);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <RegistrationProvider>
      <Stack.Navigator
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: ({ current, next, layouts }) => {
          const isForward =
          (prevScreen === "Login" && route.name === "Signup") ||
          (prevScreen === "RegisterV1" && route.name === "RegisterV2") ||
          (prevScreen === "RegisterV2" && route.name === "RegisterV3");
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: isForward
                      ? [layouts.screen.width, 0] // Login → Signup (Right to Left)
                      : [-layouts.screen.width, 0], // Signup → Login (Left to Right)
                  }),
                },
              ],
            },
          };
        },
      })}
      >
        {/* {profile ? (
          <Stack.Screen name="Drawer" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthenticationNavigator} />
        )} */}
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
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </RegistrationProvider>
  );
};

export default AuthenticationNavigator;
