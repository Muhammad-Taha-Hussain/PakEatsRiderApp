import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import AuthenticationNavigator from "./AuthenticationNavigator";
import Cart from "../screens/Cart/CartScreen";

const Stack = createStackNavigator();

const SplashNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
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
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="CartScreen"
        component={Cart}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="AppMain"
        component={AuthenticationNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SplashNavigator;
