// import React, { useCallback, useRef, useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   Alert,
//   Linking,
//   Pressable,
//   TouchableOpacity,
//   ScrollView,
//   Keyboard,
// } from "react-native";
// import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
// import BottomSheet, {
//   BottomSheetDraggableView,
//   BottomSheetFlashList,
//   BottomSheetFlatList,
//   BottomSheetModal,
//   BottomSheetScrollView,
//   BottomSheetTextInput,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import MapView, { Marker } from "react-native-maps";
// import useCurrentLocation from "../hooks/useCurrentLocation";
// import { Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useOrder } from "../context/OrderContext";
// import OrderModal from "../components/HomeComponents/OrderModal";

// const App = ({ navigation }) => {
//   const { location, errorMsg, mapRef, orders, loading } = useCurrentLocation();
//   const [destination, setDestination] = useState("");
//   const [isTableActive, setIsTableActive] = useState(false); // Track interaction state
//   const { selectedOrder, setSelectedOrder } = useOrder();
//   const [modalVisible, setModalVisible] = useState(false);

//   const openGoogleMaps = () => {
//     if (!location || !destination) {
//       Alert.alert(
//         "Error",
//         "Please enter a destination and ensure location is enabled."
//       );
//       return;
//     }
//     const origin = `${location.latitude},${location.longitude}`;
//     const destinationQuery = encodeURIComponent(destination);
//     const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destinationQuery}&travelmode=driving`;

//     Linking.openURL(url).catch(() =>
//       Alert.alert("Error", "Failed to open Google Maps")
//     );
//   };

//   const sheetRef = useRef<BottomSheet>(null);
//   const snapPoints = useMemo(() => ["5%", "25%", "50%", "90%"], []);

//   const handleOpen = useCallback((index: number) => {
//     // sheetRef.current?.snapToIndex(index);
//     // sheetRef.current?.expand();
//     sheetRef.current?.snapToIndex(index);
//   }, []);
//   const handleClosePress = useCallback(() => {
//     sheetRef.current?.close();
//   }, []);

//   if (!location && !errorMsg) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-lg font-medium text-gray-700">
//           Fetching location...
//         </Text>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (errorMsg) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-lg font-medium text-red-500">{errorMsg}</Text>
//       </View>
//     );
//   }

//   // Sample Table Data
//   const data = Array(20).fill({
//     name: "Karachi Chicken Biryani",
//     distRest: "2.5 km",
//     userDist: "4.0 km",
//     time: "15 mins",
//     price: "180 PKR",
//   });

//   return (
//     <GestureHandlerRootView className="flex-1">
//       {selectedOrder && (
//         <OrderModal
//           visible={!!selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//         />
//       )}

//       {/* Map View */}
//       <SafeAreaView className="flex-1 relative">
//         <MapView
//           ref={mapRef}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//           showsUserLocation={true}
//           followsUserLocation={true}
//           style={{ width: "100%", height: "100%", marginRight: 15, zIndex: 0 }}
//           // className="mr-4"
//         >
//           <Marker
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}
//             title="Your Location"
//           />
//         </MapView>

//         {/* Floating Button to Expand Bottom Sheet */}
//         <Pressable
//           style={{
//             position: "absolute",
//             top: 100,
//             left: 20,
//             backgroundColor: "gray",
//             padding: 10,
//             borderRadius: 40,
//             elevation: 10, // Deep shadow for Android
//             shadowColor: "#000",
//             shadowOffset: { width: 5, height: 20 },
//             shadowOpacity: 0.4,
//             shadowRadius: 10,
//           }}
//           onPress={() => handleOpen(1)}
//         >
//           <Ionicons name="chevron-up" size={24} color="white" />
//         </Pressable>
//         <Pressable
//           style={{
//             position: "absolute",
//             top: 40,
//             left: 20,
//             backgroundColor: "black",
//             padding: 10,
//             borderRadius: 40,
//             elevation: 20, // Deep shadow for Android
//             shadowColor: "#000",
//             shadowOffset: { width: 5, height: 20 },
//             shadowOpacity: 0.4,
//             shadowRadius: 10,
//           }}
//           onPress={() => navigation.toggleDrawer()} // Open/Close Drawer
//         >
//           <Ionicons name="menu" size={28} color="white" />
//         </Pressable>
//       </SafeAreaView>

//       {/* Bottom Sheet */}
//       <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints}
//       keyboardBehavior="fillParent">
//         {/* <BottomSheetView className="flex-1 p-6 bg-white rounded-t-3xl">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-2xl font-semibold text-gray-800">
//               Enter Destination:
//             </Text>
//             <Ionicons
//               name="close"
//               size={28}
//               className="text-gray-700"
//               onPress={handleClosePress}
//             />
//           </View>

//           <BottomSheetTextInput
//             placeholder="Type destination here..."
//             value={destination}
//             onChangeText={setDestination}
//             className="border border-gray-300 p-4 rounded-lg text-lg bg-gray-100 w-full mb-4"
//           />
//           <View className="flex-1 items-center">
//             <Text
//               className="border border-red-500 text-black text-lg bg-blue-600 font-bold text-center p-3 rounded-full shadow-lg"
//               onPress={openGoogleMaps}
//             >
//               Navigate with Google Maps
//             </Text>
//           </View>
//         </BottomSheetView> */}

//         {/* < className="flex-1 p-6 bg-white rounded-t-3xl"> */}
//         {/* Header with Close Button */}
//         <BottomSheetView className={"p-6 bg-white rounded-t-3xl"}>
//           {/* Pressable wrapper to handle outside taps */}
//           {/* <Pressable
//             onPress={() => {
//               Keyboard.dismiss();
//               setIsTableActive(false);
//             }} // Close keyboard when tapping outside
//           > */}
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-2xl font-semibold text-gray-800">
//               Enter Destination:
//             </Text>
//             <Ionicons
//               name="close"
//               size={28}
//               className="text-gray-700"
//               onPress={handleClosePress}
//             />
//           </View>

//           {/* Destination Input */}
//           <BottomSheetTextInput
//             placeholder="Type destination here..."
//             value={destination}
//             onChangeText={setDestination}
//             className="border border-gray-300 p-4 rounded-lg text-lg bg-gray-100 w-full mb-4"
//           />

//           <Text className="text-8xl text-center">{orders.length}</Text>

//           {/* Google Maps Button */}
//           <View className="flex items-center mb-6">
//             <Text
//               className="border-4 border-blue-600 text-white text-lg font-bold text-center py-3 px-6 rounded-full shadow-lg w-4/5"
//               style={{ backgroundColor: "black" }}
//               onPress={openGoogleMaps}
//             >
//               Navigate with Google Maps
//             </Text>
//           </View>

//           {/* List of Available Orders */}
//           <View
//             className="p-4 rounded-lg"
//             style={{ backgroundColor: "#1E293B" }}
//           >
//             <Text className="text-white text-lg font-bold text-center">
//               List of Available Orders
//             </Text>
//           </View>

//           {/* Horizontal Scroll for Table */}
//           <BottomSheetScrollView
//             horizontal
//             showsHorizontalScrollIndicator={true}
//             keyboardShouldPersistTaps="handled"
//             className={"mt-8"}
//             scrollEnabled={!isTableActive} // Disable BottomSheet scroll when table is active
//           >
//             <View className="mb-12 mt-8 border border-gray-600 rounded-lg min-w-[500px]">
//               {/* ✅ Table Header */}
//               <View className="flex-row bg-gray-800 border-b border-gray-600 py-3 px-4">
//                 <Text className="text-white font-semibold text-sm w-40">
//                   Restaurant Name
//                 </Text>
//                 <Text className="text-white font-semibold text-sm w-24 text-center">
//                   Dist to Rest.
//                 </Text>
//                 <Text className="text-white font-semibold text-sm w-24 text-center">
//                   User Dist.
//                 </Text>
//                 <Text className="text-white font-semibold text-sm w-24 text-center">
//                   Estimated Time
//                 </Text>
//                 <Text className="text-white font-semibold text-sm w-24 text-center">
//                   Price
//                 </Text>
//               </View>

//               {/* ✅ Scrollable List for Table Data */}
//               <FlatList
//                 data={data}
//                 keyExtractor={(_, index) => index.toString()}
//                 showsVerticalScrollIndicator={true}
//                 keyboardShouldPersistTaps="handled"
//                 scrollEnabled={isTableActive} // Enable table scroll only when active
//                 onTouchStart={() => setIsTableActive(true)} // Activate table scroll when touched
//                 nestedScrollEnabled={true} // Enable scrolling inside BottomSheet
//                 keyboardDismissMode="on-drag"
//                 renderItem={({ item }) => (
//                   <Pressable
//                     onPress={() => setSelectedOrder(item)}
//                     className="flex-row items-center border-b border-gray-600 bg-gray-700 px-4 py-3"
//                   >
//                     <Text
//                       className="text-white text-sm w-40 truncate"
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                     >
//                       {item.name}
//                     </Text>
//                     <Text className="text-white text-sm w-24 text-center">
//                       {item.distRest}
//                     </Text>
//                     <Text className="text-white text-sm w-24 text-center">
//                       {item.userDist}
//                     </Text>
//                     <Text className="text-white text-sm w-24 text-center">
//                       {item.time}
//                     </Text>
//                     <Text className="text-white text-sm w-24 text-center">
//                       {item.price}
//                     </Text>
//                     {/* <Pressable
//                         className="bg-blue-500 px-4 py-2 rounded-lg"
//                         onPress={() => setSelectedOrder(item)}
//                       >
//                         <Text className="text-white font-bold">Accept</Text>
//                       </Pressable> */}
//                   </Pressable>
//                 )}
//               />
//             </View>
//           </BottomSheetScrollView>
//           {/* </Pressable> */}
//         </BottomSheetView>

//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// export default App;

// import React, { useCallback, useRef, useMemo, useState } from "react";
// import { StyleSheet, Modal, View, Text, Button, Pressable } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import BottomSheet, {
//   BottomSheetFlatList,
//   BottomSheetScrollView,
//   BottomSheetVirtualizedList,
// } from "@gorhom/bottom-sheet";

// const App = () => {
//   const isBottomSheetScrollableRef = useRef(true);
//   const sheetRef = useRef<BottomSheet>(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

//   const handleSnapPress = useCallback((index) => {
//     sheetRef.current?.snapToIndex(index);
//   }, []);

//   const handleClosePress = useCallback(() => {
//     sheetRef.current?.close();
//   }, []);

//   const data1 = Array(10).fill({
//     name: "Karachi Chicken Biryani",
//     distRest: "2.5 km",
//     userDist: "4.0 km",
//     time: "15 mins",
//     price: "180 PKR",
//   });

//   const handleOrderPress = (item) => {
//     setSelectedOrder(item);
//     setModalVisible(true);
//   };

//   const renderItem = useCallback(
//     ({ item }) => (
//       <BottomSheetScrollView
//         horizontal
//         showsHorizontalScrollIndicator={true}
//         onScrollBeginDrag={() => {
//           isBottomSheetScrollableRef.current = false;
//         }}
//         onScrollEndDrag={() => {
//           isBottomSheetScrollableRef.current = true;
//         }}
//       >
//         <Pressable
//           className="flex-row items-center border-b border-gray-600 bg-gray-700 px-4 py-3"
//           onPress={() => handleOrderPress(item)}
//         >
//           <Text className="text-white text-sm w-40 truncate">{item.name}</Text>
//           <Text className="text-white text-sm w-24 text-center">{item.distRest}</Text>
//           <Text className="text-white text-sm w-24 text-center">{item.userDist}</Text>
//           <Text className="text-white text-sm w-24 text-center">{item.time}</Text>
//           <Text className="text-white text-sm w-24 text-center">{item.price}</Text>
//           <Text className="text-white font-bold">Accept</Text>
//         </Pressable>
//       </BottomSheetScrollView>
//     ),
//     []
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
//       <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
//       <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
//       <Button title="Close" onPress={() => handleClosePress()} />

//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={snapPoints}
//         enableDynamicSizing={false}
//         enableContentPanningGesture={isBottomSheetScrollableRef.current}
//       >
//         <View style={{ padding: 16 }}>
//           <Text>Sheet Content</Text>
//           <BottomSheetVirtualizedList
//             scrollEnabled={isBottomSheetScrollableRef.current}
//             data={data1}
//             keyExtractor={(item, index) => index.toString()}
//             getItemCount={(data) => data.length}
//             getItem={(data, index) => data[index]}
//             renderItem={renderItem}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         </View>
//       </BottomSheet>

//       {/* Modal for Accept/Reject */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
//           <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
//             <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Order Details</Text>
//             {selectedOrder && (
//               <>
//                 <Text>{selectedOrder.name}</Text>
//                 <Text>{selectedOrder.price}</Text>
//               </>
//             )}
//             <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
//               <Button title="Accept" onPress={() => setModalVisible(false)} color="green" />
//               <Button title="Reject" onPress={() => setModalVisible(false)} color="red" />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </GestureHandlerRootView>
//   );
// };

// import React, { useCallback, useMemo, useRef, useState } from "react";
// import { View, Text, Button, Pressable } from "react-native";
// import BottomSheet, {
//   BottomSheetFlatList,
//   BottomSheetModal,
//   BottomSheetModalProvider,
//   BottomSheetScrollView,
//   BottomSheetView,
//   BottomSheetVirtualizedList,
// } from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Modal from "react-native-modal"; // Use react-native-modal for better overlay handling

// const App = () => {
//   const isBottomSheetScrollableRef = useRef(true);
//   const sheetRef = useRef(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // ref
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log("handleSheetChanges", index);
//   }, []);

//   const data1 = Array(10).fill({
//     name: "Karachi Chicken Biryani",
//     distRest: "2.5 km",
//     userDist: "4.0 km",
//     time: "15 mins",
//     price: "180 PKR",
//   });

//   const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

//   const handleSnapPress = useCallback((index) => {
//     sheetRef.current?.snapToIndex(index);
//   }, []);

//   const handleClosePress = useCallback(() => {
//     sheetRef.current?.close();
//   }, []);

//   const handleOpenModal = (order) => {
//     setSelectedOrder(order);
//     setIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//   };

//   const ModalSee = () => {
//     <BottomSheetModalProvider>
//       <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
//         <BottomSheetView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//           <Text>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheetModal>
//     </BottomSheetModalProvider>;
//   };

//   const renderItem = useCallback(
//     ({ item }) => (
//       <BottomSheetScrollView
//         horizontal
//         showsHorizontalScrollIndicator={true}
//         onScrollBeginDrag={() => {
//           isBottomSheetScrollableRef.current = false;
//         }}
//         onScrollEndDrag={() => {
//           isBottomSheetScrollableRef.current = true;
//         }}
//       >
//         <Pressable
//           className="flex-row items-center border-b border-gray-600 bg-gray-700 px-4 py-3"
//           onPress={() => ModalSee()} // Open modal on press
//         >
//           <Text className="text-white text-sm w-40 truncate">{item.name}</Text>
//           <Text className="text-white text-sm w-24 text-center">
//             {item.distRest}
//           </Text>
//           <Text className="text-white text-sm w-24 text-center">
//             {item.userDist}
//           </Text>
//           <Text className="text-white text-sm w-24 text-center">
//             {item.time}
//           </Text>
//           <Text className="text-white text-sm w-24 text-center">
//             {item.price}
//           </Text>
//           <Text className="text-white font-bold">Accept</Text>
//         </Pressable>
//       </BottomSheetScrollView>
//     ),
//     []
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
//       <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
//       <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
//       <Button title="Close" onPress={() => handleClosePress()} />

//       {/* Modal for Accept/Reject */}
//       {/* <BottomSheetModal
//         // isVisible={isModalVisible}
//         // onBackdropPress={handleCloseModal}
//       >
//         <View className="flex-1 justify-center items-center">
//           <View className="bg-white p-6 rounded-lg w-[90%] max-w-[400px]">
//             <Text className="text-lg font-bold mb-3 text-center">
//               Order Details
//             </Text>
//             {selectedOrder && (
//               <>
//                 <Text className="text-gray-800">
//                   Name: {selectedOrder.name}
//                 </Text>
//                 <Text className="text-gray-800">
//                   Distance: {selectedOrder.distRest} from Rest,{" "}
//                   {selectedOrder.userDist} from You
//                 </Text>
//                 <Text className="text-gray-800">ETA: {selectedOrder.time}</Text>
//                 <Text className="text-gray-800">
//                   Price: {selectedOrder.price}
//                 </Text>
//               </>
//             )}
//             <View className="flex-row mt-4 justify-between">
//               <Pressable
//                 className="bg-red-500 px-4 py-2 rounded-lg"
//                 onPress={handleCloseModal}
//               >
//                 <Text className="text-white">Reject</Text>
//               </Pressable>
//               <Pressable
//                 className="bg-green-500 px-4 py-2 rounded-lg"
//                 onPress={() => {
//                   handleCloseModal();
//                   alert("Order Accepted!");
//                 }}
//               >
//                 <Text className="text-white">Accept</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </BottomSheetModal> */}

//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={snapPoints}
//         enableDynamicSizing={false}
//         enableContentPanningGesture={isBottomSheetScrollableRef.current}
//       >
//         <View style={{ padding: 10 }}>
//           <Text className="text-lg font-bold mb-2">Orders</Text>
//           <BottomSheetVirtualizedList
//             scrollEnabled={isBottomSheetScrollableRef.current}
//             data={data1}
//             keyExtractor={(item, index) => index.toString()}
//             getItemCount={(data) => data.length}
//             getItem={(data, index) => data[index]}
//             renderItem={renderItem}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         </View>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// export default App;

// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { View, Text, Button, Pressable, FlatList } from 'react-native';
// import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
// import Modal from 'react-native-modal';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const App = () => {
//   const sheetRef = useRef(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

//   const data = Array.from({ length: 10 }, (_, index) => ({
//     id: index.toString(),
//     name: `Order ${index + 1}`,
//     distRest: '2.5 km',
//     userDist: '4.0 km',
//     time: '15 mins',
//     price: '180 PKR',
//   }));

//   const handleOpenModal = (order) => {
//     sheetRef.current?.close();
//     setSelectedOrder(order);
//     setIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//   };

//   const renderItem = ({ item }) => (
//     <Pressable
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderColor: 'gray',
//         padding: 10,
//         backgroundColor: 'lightgray',
//       }}
//       onPress={() => handleOpenModal(item)}
//     >
//       <Text style={{ flex: 1 }}>{item.name}</Text>
//       <Text style={{ flex: 1, textAlign: 'center' }}>{item.distRest}</Text>
//       <Text style={{ flex: 1, textAlign: 'center' }}>{item.userDist}</Text>
//       <Text style={{ flex: 1, textAlign: 'center' }}>{item.time}</Text>
//       <Text style={{ flex: 1, textAlign: 'center' }}>{item.price}</Text>
//     </Pressable>
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Text className={`flex-1 items-center justify-center`} onPress={() => sheetRef.current?.snapToIndex(0)}>Open Sheet</Text>

//       <BottomSheet ref={sheetRef} snapPoints={snapPoints} enableDynamicSizing={false}>
//         <View style={{ padding: 10 }}>
//           <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Orders</Text>
//           <FlatList
//             data={data}
//             keyExtractor={(item) => item.id}
//             renderItem={renderItem}
//           />
//         </View>
//       </BottomSheet>

//       <Modal isVisible={isModalVisible} onBackdropPress={handleCloseModal}>
//         <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
//           <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Order Details</Text>
//           {selectedOrder && (
//             <>
//               <Text>Name: {selectedOrder.name}</Text>
//               <Text>Distance: {selectedOrder.distRest} from Rest, {selectedOrder.userDist} from You</Text>
//               <Text>ETA: {selectedOrder.time}</Text>
//               <Text>Price: {selectedOrder.price}</Text>
//             </>
//           )}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
//             <Pressable
//               style={{
//                 backgroundColor: 'red',
//                 padding: 10,
//                 borderRadius: 5,
//                 alignItems: 'center',
//                 flex: 1,
//                 marginRight: 5,
//               }}
//               onPress={handleCloseModal}
//             >
//               <Text style={{ color: 'white' }}>Reject</Text>
//             </Pressable>
//             <Pressable
//               style={{
//                 backgroundColor: 'green',
//                 padding: 10,
//                 borderRadius: 5,
//                 alignItems: 'center',
//                 flex: 1,
//                 marginLeft: 5,
//               }}
//               onPress={() => {
//                 handleCloseModal();
//                 alert('Order Accepted!');
//               }}
//             >
//               <Text style={{ color: 'white' }}>Accept</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </GestureHandlerRootView>
//   );
// };

// export default App;

// import BottomSheet from "@gorhom/bottom-sheet";
// import React, { useMemo, useRef, useState } from "react";
// import { View, Text, Pressable, Modal, FlatList } from "react-native";

// const App = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//     const sheetRef = useRef(null);
//   // const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

//   const data = Array.from({ length: 10 }, (_, index) => ({
//     id: index.toString(),
//     name: `Order ${index + 1}`,
//     distRest: '2.5 km',
//     userDist: '4.0 km',
//     time: '15 mins',
//     price: '180 PKR',
//   }));

//   const handleOpenModal = () => {
//     sheetRef.current?.close();
//     // setSelectedOrder(order);
//     setIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//   };

//   const renderItem = ({ item }) => (
//     <Pressable
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderColor: 'gray',
//         padding: 10,
//         backgroundColor: 'lightgray',
//       }}
//       onPress={() => handleOpenModal()}
//     >
//       <Text style={{ flex: 1 }}>{item.name}</Text>
//       <Text style={{ flex: 1, textAlign: 'center' }}>{item.distRest}</Text>
//       <Text style={{ flex: 1, textAlign: 'center' }}>{item.userDist}</Text>
//       <Text style={{ flex: 1, textAlign: 'center' }}>{item.time}</Text>
//       <Text style={{ flex: 1, textAlign: 'center' }}>{item.price}</Text>
//     </Pressable>
//   );

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       {/* Button to Open Modal */}
//       <Pressable
//         style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
//         onPress={() => handleOpenModal()}
//       >
//         <Text style={{ color: "white" }}>Open Modal</Text>
//       </Pressable>

//       {/* Modal */}
//       <Modal visible={isModalVisible} transparent animationType="slide">
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "rgba(0,0,0,0.5)",
//           }}
//         >
//           <View
//             style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
//           >
//             <Text style={{ fontSize: 18, marginBottom: 20 }}>
//               Do you accept?
//             </Text>

//             {/* Accept Button */}
//             <Pressable
//               style={{
//                 backgroundColor: "green",
//                 padding: 10,
//                 borderRadius: 5,
//                 alignItems: "center",
//               }}
//               onPress={() => setIsModalVisible(false)}
//             >
//               <Text style={{ color: "white" }}>Accept</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import { StyleSheet, View, ScrollView } from 'react-native';
// import { Table, TableWrapper, Row } from 'react-native-table-component';

// const App = () => {
//   const [tableHead] = useState([
//     'Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'
//   ]);

//   const [widthArr] = useState([40, 60, 80, 100, 120, 140, 160, 180, 200]);

//   const tableData = Array.from({ length: 30 }, (_, i) =>
//     Array.from({ length: 9 }, (_, j) => `${i}${j}`)
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView horizontal alwaysBounceVertical={false}>
//         <View>
//           <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
//             <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
//           </Table>
//           <ScrollView style={styles.dataWrapper}>
//             <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
//               {tableData.map((rowData, index) => (
//                 <Row
//                   key={index}
//                   data={rowData}
//                   widthArr={widthArr}
//                   // style={index % 2 ? [styles.row, styles.alternateRow] : styles.row}
//                   style={StyleSheet.flatten([styles.row, index % 2 ? styles.alternateRow : {}])}
//                   textStyle={styles.text}
//                 />
//               ))}
//             </Table>
//           </ScrollView>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   header: { height: 50, backgroundColor: '#537791' },
//   text: { textAlign: 'center', fontWeight: '100' },
//   dataWrapper: { marginTop: -1 },
//   row: { height: 40, backgroundColor: '#E7E6E1' },
//   alternateRow: { backgroundColor: '#F7F6E7' }
// });

// export default App;

// import { Cell, Section, TableView } from "react-native-tableview-simple";

// const CellVariant = (props) => (
//   <Cell
//     {...props}
//     cellContentView={
//       <View
//         style={{
//           alignItems: "center",
//           flexDirection: "row",
//           flex: 1,
//           paddingVertical: 10,
//         }}
//       >
//         <Text
//           allowFontScaling
//           numberOfLines={1}
//           style={{ flex: 1, fontSize: 20 }}
//         >
//           {props.title}
//         </Text>
//       </View>
//     }
//   />
// );

// // ...

// import { View, Text } from "react-native";
// import React from "react";

// const HomeScreen = () => {
//   return (
//     <TableView>
//       <Section>
//         <CellVariant title="Element 1" />
//         <CellVariant title="Element 2" />
//         <CellVariant title="Element 3" />
//         <CellVariant title="Element 4" />
//       </Section>
//     </TableView>
//   );
// };

// export default HomeScreen;

// import * as React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import Table from 'react-native-table-element';

// export default function App() {
//   const tableData = Array.from({ length: 50 }, (_, index) => [
//     index + 1,
//     `Song Title ${index + 1}`,
//     `Artist ${index + 1}`,
//     1970 + (index % 50),
//   ]);

//   return (
//     <ScrollView horizontal style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//       <Table
//         containerStyle={{ margin: 10 }}
//         header={['#', 'Song', 'Artist', 'Year']}
//         columnsWidth={[30, 160, 150, 50]}
//         columnsAlign={['center', 'left', 'left', 'right']}
//         data={tableData}
//         borderColor="#000"
//         borderWidth={1}
//         headerStyle={{
//           backgroundColor: '#2168db',
//         }}
//         headerTextStyle={{
//           fontWeight: 'bold',
//           color: '#fff',
//         }}
//         textStyle={{
//           color: '#333',
//         }}
//       />
//       </ScrollView>
//     </ScrollView>
//   );
// }



import React, {
    useCallback,
    useRef,
    useEffect,
    useState,
    useMemo,
  } from "react";
  import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    BackHandler,
    ActivityIndicator,
    Pressable,
    Dimensions,
  } from "react-native";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetTextInput,
    BottomSheetScrollView,
    BottomSheetFlatList,
  } from "@gorhom/bottom-sheet";
  import { AntDesign, Ionicons } from "@expo/vector-icons";
  import useCurrentLocation from "../hooks/useCurrentLocation";
  import { SafeAreaView } from "react-native-safe-area-context";
  import SecondModal from "../components/HomeComponents/SecondModal";
  import MapView, { Marker } from "react-native-maps";
  import { NativeViewGestureHandler } from 'react-native-gesture-handler';

  
  const CustomHandle = () => (
    <View style={styles1.handleContainer}>
      <View style={styles1.handleIndicator} />
    </View>
  );
  
  const styles1 = StyleSheet.create({
    handleContainer: {
      alignItems: "center",
      paddingVertical: 20, // Increased padding for taller handle
      backgroundColor: "#f0f0f0",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    handleIndicator: {
      width: 40,
      height: 6,
      borderRadius: 3,
      backgroundColor: "#ccc",
    },
  });
  
  const App = () => {
    const { orders, location, mapRef, errorMsg } = useCurrentLocation();
    const [destination, setDestination] = useState("");
    const snapPoints = useMemo(() => ["25%", "5%", "50%", "90%"], []);
    const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [contentHeight, setContentHeight] = useState(0);
    console.log("location is", location);
  
    // Refs for modals
    const firstModalRef = useRef<BottomSheetModal>(null);
    const secondModalRef = useRef<BottomSheetModal>(null);
  
    const handleOpen = useCallback((index: number) => {
      // sheetRef.current?.snapToIndex(index);
      // sheetRef.current?.expand();
      firstModalRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
      firstModalRef.current?.dismiss();
    }, []);
  
    // Open first modal
    const openFirstModal = useCallback(() => {
      setSelectedOrder(null);
      firstModalRef.current?.present();
    }, []);
  
    // Open second modal and close first modal (push effect)
    const openSecondModal = useCallback((order) => {
      setSelectedOrder(order);
      firstModalRef.current?.dismiss();
      secondModalRef.current?.present();
    }, []);
  
    // Handle going back to first modal
    const goBackToFirstModal = useCallback(() => {
      secondModalRef.current?.dismiss();
      firstModalRef.current?.present();
    }, []);
  
    // Handle Android hardware back button
    useEffect(() => {
      const backAction = () => {
        if (secondModalRef.current) {
          goBackToFirstModal();
          return true; // Prevent app from closing
        }
        return false; // Allow default back behavior
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, [goBackToFirstModal]);
  
    // Sample Table Data
    const data = Array(20).fill({
      name: "Karachi Chicken Biryani",
      distRest: "2.5 km",
      userDist: "4.0 km",
      time: "15 mins",
      price: "180 PKR",
    });
  
    const acceptOrder = (order) => {
      console.log("Order Accepted:", order);
      // Handle order acceptance logic (e.g., update status in Supabase)
    };
  
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
  
    return (
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <MapView
            ref={mapRef}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
            />
          </MapView>
          {/* <Button
            title="Open First Modal"
            onPress={openFirstModal}
            color="black"
          /> */}
          {/* Floating Button to Expand Bottom Sheet */}
          <Pressable
            style={{
              position: "absolute",
              top: 80,
              left: 20,
              backgroundColor: "gray",
              padding: 10,
              borderRadius: 40,
              elevation: 10, // Deep shadow for Android
              shadowColor: "#000",
              shadowOffset: { width: 5, height: 20 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
            }}
            onPress={() => openFirstModal()}
          >
            <Ionicons name="chevron-up" size={24} color="white" />
          </Pressable>
  
          {/* First Modal */}
          <BottomSheetModal
            ref={firstModalRef}
            name="firstModal"
            stackBehavior="replace"
            enableDynamicSizing={true}
            handleComponent={CustomHandle}
            snapPoints={["25%", "50%", "90%"]} // Opens at 25% initially
            enableContentPanningGesture={false} // ❌ Prevent modal scrolling inside content
            enableHandlePanningGesture={true} // ✅ Allow dragging only on the header
          >
            <SafeAreaView>
              <BottomSheetScrollView
                contentContainerStyle={{ padding: 16 }}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                scrollEnabled={outerScrollEnabled} // ✅ Controlled by state
                onLayout={(event) => {
                  const height = event.nativeEvent.layout.height;
                  setContentHeight(height);
                }}
              >
                <Ionicons
                  name="close"
                  size={28}
                  className="absolute top-0 right-2 text-gray-700"
                  onPress={handleClosePress}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  First Modal 🎉
                </Text>
  
                {/* Destination Input */}
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-2xl font-semibold text-gray-800">
                    Enter Destination:
                  </Text>
                </View>
                <BottomSheetTextInput
                  placeholder="Type destination here..."
                  value={destination}
                  onChangeText={setDestination}
                  className="border border-gray-300 p-4 rounded-lg text-lg bg-gray-100 w-full mb-4"
                />
  
                <Text className="text-8xl text-center">{orders.length}</Text>
  
                {/* List of Available Orders Header */}
                <View className="p-4 rounded-lg bg-gray-800">
                  <Text className="text-white text-lg font-bold text-center">
                    List of Available Orders
                  </Text>
                </View>

                <NativeViewGestureHandler disallowInterruption={true}>
  
                {/* Horizontal Scroll for Table */}
                <BottomSheetScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  className="mb-8 mt-8 border border-gray-600 rounded-lg max-w-[500px]"
                >
                  <View className="border border-gray-600 rounded-lg min-w-[500px]">
                    {/* ✅ Table Header */}
                    <View className="flex-row bg-gray-800 border-b border-gray-600 py-3 px-4 h-auto">
                      <Text className="text-white font-semibold text-sm w-40">
                        Restaurant Name
                      </Text>
                      <Text className="text-white font-semibold text-sm w-24 text-center">
                        Dist to Rest.
                      </Text>
                      <Text className="text-white font-semibold text-sm w-24 text-center">
                        User Dist.
                      </Text>
                      <Text className="text-white font-semibold text-sm w-24 text-center">
                        Estimated Time
                      </Text>
                      <Text className="text-white font-semibold text-sm w-24 text-center">
                        Price
                      </Text>
                      <Text className="text-white font-semibold text-sm w-24 text-center">
                        User Name
                      </Text>
                      <Text className="text-white font-semibold text-sm w-24 text-center">
                        User Email
                      </Text>
                    </View>
  
                    {/* ✅ Scrollable List for Table Data */}
                    <BottomSheetFlatList
                      data={orders}
                      keyExtractor={(_, index) => index.toString()}
                      showsVerticalScrollIndicator={true}
                      nestedScrollEnabled={true} // ✅ Ensures FlatList scrolls independently
                      keyboardShouldPersistTaps="handled"
                      scrollEnabled={true} // ✅ Allow FlatList to scroll vertically
                      onTouchStart={() => setOuterScrollEnabled(false)} // ⛔ Disable outer scroll when interacting with FlatList
                      onMomentumScrollEnd={() => setOuterScrollEnabled(true)} // ✅ Enable outer scroll when FlatList stops scrolling
                      style={{ height: "100%" }} // ✅ Set table height
                      renderItem={({ item }) => (
                        <Pressable
                          onPress={() => openSecondModal(item)}
                          className="flex-row items-center border-b border-gray-600 bg-gray-700 px-4 py-3"
                        >
                          <Text
                            className="text-white text-sm w-40 truncate"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item.restaurant.restaurantname}
                          </Text>
                          <Text className="text-white text-sm w-24 text-center">
                            {item.restaurant.rating}
                          </Text>
                          <Text className="text-white text-sm w-24 text-center">
                            {item.paymentmethod}
                          </Text>
                          <Text className="text-white text-sm w-24 text-center">
                            {item.status}
                          </Text>
                          <Text className="text-white text-sm w-24 text-center">
                            {item.totalamount}
                          </Text>
                          <Text className="text-white text-sm w-24 text-center">
                            {item.customer.name}
                          </Text>
                          <Text className="text-white text-sm w-24 text-center">
                            {item.customer.email}
                          </Text>
                          <Pressable className="bg-blue-500 px-4 py-2 rounded-lg">
                            <Text className="text-white font-bold">Accept</Text>
                          </Pressable>
                        </Pressable>
                      )}
                    />
                  </View>
                </BottomSheetScrollView>

                </NativeViewGestureHandler>
                <Button
                  title="Go to Second Modal"
                  onPress={openSecondModal}
                  color="black"
                />
              </BottomSheetScrollView>
            </SafeAreaView>
          </BottomSheetModal>
  
          {/* Second Modal with Back Arrow */}
          <BottomSheetModal
            ref={secondModalRef}
            name="secondModal"
            stackBehavior="replace"
            snapPoints={["85%"]} // Opens at 25% initially
            handleComponent={CustomHandle}
            enableContentPanningGesture={true} // ❌ Prevent modal scrolling inside content
            enableHandlePanningGesture={true} // ✅ Allow dragging only on the header
          >
            {/* <SafeAreaView> */}
              <SecondModal
                orderData={selectedOrder}
                goBackToFirstModal={openFirstModal}
                acceptOrder={acceptOrder}
              />
            {/* </SafeAreaView> */}
            {/* <BottomSheetView style={styles.contentContainer}>
              Back Arrow Button
              <TouchableOpacity
                style={styles.backButton}
                onPress={goBackToFirstModal}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.text}>Second Modal 🚀</Text>
            </BottomSheetView> */}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 24,
      justifyContent: "center",
      // backgroundColor: "grey",
    },
    contentContainer: {
      padding: 20,
      alignItems: "center",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    backButton: {
      position: "absolute",
      top: 10,
      left: 15,
      padding: 10,
    },
  
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
  });
  
  export default App;
  