import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";

import "./global.css";
import SplashNavigator from "./navigation/SplashNavigator.js";
import { AuthProvider } from "./providers/AuthProviders";
import QueryProvider from "./providers/QueryProvider";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <QueryProvider>
            <SplashNavigator />
          </QueryProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
