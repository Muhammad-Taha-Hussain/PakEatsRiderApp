import { Alert } from 'react-native';
import { supabase } from './supabase';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke('stripe-checkout', {
    body: { amount },
  });
  if (data) {
    console.log(data);
    return data;
  }
  Alert.alert('Error fetching payment sheet params');
  return {};
};

export const initializePaymentSheet = async (amount: number) => {
  console.log("Initializing payment sheet for amount:", amount);

  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(amount);
  // console.log(paymentIntent);
  // console.log(publishableKey);
  

  console.log("Fetched params:", paymentIntent, publishableKey); // Debugging log
//|| !publishableKey
  if (!paymentIntent ) {
    console.error("Missing paymentIntent or publishableKey");
    return;
  }
  const { error} = await initPaymentSheet({
    merchantDisplayName: 'Taha Hussain',
    paymentIntentClientSecret: paymentIntent,
    // customerId: customer,
    // customerEphemeralKeySecret: ephemeralKey,
    defaultBillingDetails: {
      name: 'Default Name',
    },
  });

  if (error) {
    console.error("initPaymentSheet Error:", error);
    Alert.alert("Error initializing payment sheet", error.message);
  } else {
    console.log("Payment sheet initialized successfully!");
  }

  // console.log(result);
};

export const openPaymentSheet = async () => {
  console.log("Opening payment sheet...");

  const { error } = await presentPaymentSheet();

  if (error) {
    console.error("presentPaymentSheet Error:", error);
    Alert.alert("Payment failed", error.message);
    return false;
  }

  console.log("Payment successful!");
  return true;
};