// import { Alert } from 'react-native';
// import { supabase } from './supabase';
// import {
//   initPaymentSheet,
//   presentPaymentSheet,
// } from '@stripe/stripe-react-native';

// const fetchPaymentSheetParams = async (amount: number) => {
//   const { data, error } = await supabase.functions.invoke('stripe-checkout', {
//     body: { amount },
//   });
//   if (data) {
//     console.log(data);
//     return data;
//   }
//   Alert.alert('Error fetching payment sheet params');
//   return {};
// };

// export const initializePaymentSheet = async (amount: number) => {
//   console.log('Initializing payment sheet, for: ', amount);

//   const { paymentIntent, publishableKey } =
//     await fetchPaymentSheetParams(amount);

//   if (!paymentIntent || !publishableKey) return;

//   const result = await initPaymentSheet({
//     merchantDisplayName: 'Taha Hussain',
//     paymentIntentClientSecret: paymentIntent,
//     // customerId: customer,
//     // customerEphemeralKeySecret: ephemeralKey,
//     defaultBillingDetails: {
//       name: 'Default Name',
//     },
//   });
//   console.log(result);
// };

// export const openPaymentSheet = async () => {
//   const { error } = await presentPaymentSheet();

//   if (error) {
//     Alert.alert(error.message);
//     return false;
//   }
//   return true;
// };