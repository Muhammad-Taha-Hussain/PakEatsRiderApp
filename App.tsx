import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import SplashNavigator from "./navigation/SplashNavigator.js";
import { AuthProvider } from "./providers/AuthProviders";
import QueryProvider from "./providers/QueryProvider";
import { OrderProvider } from "./context/OrderContext";
import { LocationProvider } from "./providers/LocationProvider";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLISHABLE_KEY } from "@env"; // ✅ Use @env

export default function App() {
  console.log("Stripe Publishable Key:", STRIPE_PUBLISHABLE_KEY); // ✅ Debugging log
  console.log("Stripe Publishable Key:", process.env.STRIPE_PUBLISHABLE_KEY);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <QueryProvider>
              <LocationProvider>
                <SplashNavigator />
              </LocationProvider>
            </QueryProvider>
          </StripeProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
