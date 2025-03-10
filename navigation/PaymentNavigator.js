import { createStackNavigator } from "@react-navigation/stack";
import PaymentDetailsScreen from "../screens/Settings/PaymentDetailsScreen";

const PaymentStack = createStackNavigator();

const PaymentNavigator = () => {
  return (
    <PaymentStack.Navigator>
      <PaymentStack.Screen name="PaymentDetails" component={PaymentDetailsScreen} options={{ headerShown: false, gestureEnabled: false }} />
    </PaymentStack.Navigator>
  );
};

export default PaymentNavigator;
