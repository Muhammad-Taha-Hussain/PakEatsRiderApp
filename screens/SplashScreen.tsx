import React, { useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = ({navigation}) => {
  // const navigation = useNavigation();

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         navigation.navigate('Login');
  //     }, 1000);

  //     return () => clearTimeout(timer);
  // }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-grey-500">
      <Text className="text-black text-2xl font-bold">
        Welcome to RiderApp!
      </Text>
      <TouchableOpacity className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 absolute right-0 bottom-0"
      onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'AppMain' }],
      })}
      >
        <Text className="text-lg text-green-600 font-bold">Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SplashScreen;

// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import {
//   BottomSheetModal,
//   BottomSheetView,
//   BottomSheetModalProvider,
// } from '@gorhom/bottom-sheet';

// const App = () => {
//   // ref
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
//       <GestureHandlerRootView style={styles.container}>
//         <BottomSheetModalProvider>
//           <Button
//             onPress={handlePresentModalPress}
//             title="Present Modal"
//             color="black"
//           />
//           <BottomSheetModal
//             ref={bottomSheetModalRef}
//             onChange={handleSheetChanges}
//             name='bottomSheet'
//             stackBehavior='replace'
//           >
//             <BottomSheetView style={styles.contentContainer}>
//               <Text>Awesome 🎉</Text>
//             </BottomSheetView>
//         </BottomSheetModal>
//         </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default App;
