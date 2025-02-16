import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterV2 from "../screens/Login SignUP Screens/RegisterV2";
import RegisterV3 from "../screens/Login SignUP Screens/RegisterV3";
import AppNavigator from "./AppNavigation";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const RegisterNavigation = () => {
  return (
      <Stack.Navigator
        initialRouteName="RegisterV2"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: ({ current, next, inverted, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
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
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default RegisterNavigation;
