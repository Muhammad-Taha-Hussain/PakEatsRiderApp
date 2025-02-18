import React, { useCallback, useRef, useMemo, useState } from "react";

import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView from "react-native-maps";
import useCurrentLocation from "../hooks/useCurrentLocation";

const App = () => {
  const { location, errorMsg } = useCurrentLocation();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  if (!location && !errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-medium text-gray-700">
          Fetching location...
        </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-medium text-red-500">{errorMsg}</Text>
      </View>
    );
  }

  // render
  return (
    <GestureHandlerRootView>
      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />
      <Text>he</Text>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
      >
        <BottomSheetView>
          <Text>Awesome 🔥</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default App;

// import React, { useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import BottomSheet from 'reanimated-bottom-sheet';
// import { Dimensions } from 'react-native';

// const App = () => {
//   const sheetRef = useRef(null);

//   // Sample marker data
//   const markers = [
//     { latitude: 37.78825, longitude: -122.4324, title: 'Marker 1', description: 'Description for Marker 1' },
//     { latitude: 37.78925, longitude: -122.4334, title: 'Marker 2', description: 'Description for Marker 2' }
//   ];

//   // Bottom sheet snap points (values)
//   const snapPoints = [0, Dimensions.get('window').height * 0.4, Dimensions.get('window').height * 0.6];

//   return (
//     <View style={styles.container}>
//       {/* MapView */}
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {markers.map((marker, index) => (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: marker.latitude,
//               longitude: marker.longitude,
//             }}
//             title={marker.title}
//             description={marker.description}
//           />
//         ))}
//       </MapView>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={snapPoints}
//         renderContent={() => (
//           <View style={styles.sheetContent}>
//             <Text style={styles.sheetText}>This is the Bottom Sheet</Text>
//             <TouchableOpacity style={styles.button} onPress={() => sheetRef.current.snapTo(0)}>
//               <Text style={styles.buttonText}>Close Sheet</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         initialSnap={0}
//       />

//       {/* Button to open bottom sheet */}
//       <TouchableOpacity
//         style={styles.openSheetButton}
//         onPress={() => sheetRef.current.snapTo(1)}
//       >
//         <Text style={styles.buttonText}>Open Bottom Sheet</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
//   sheetContent: {
//     padding: 20,
//     backgroundColor: 'white',
//     height: 250,
//   },
//   sheetText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   openSheetButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: '50%',
//     // transform: [{ translateX: -50% }],
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 5,
//   },
// });

// export default App;
