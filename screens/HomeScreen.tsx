import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const App = ({ navigation }) => {
  const { location, errorMsg, mapRef, orders, loading } = useCurrentLocation();
  const [destination, setDestination] = useState("");
  const [isTableActive, setIsTableActive] = useState(false); // Track interaction state


  const openGoogleMaps = () => {
    if (!location || !destination) {
      Alert.alert(
        "Error",
        "Please enter a destination and ensure location is enabled."
      );
      return;
    }
    const origin = `${location.latitude},${location.longitude}`;
    const destinationQuery = encodeURIComponent(destination);
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destinationQuery}&travelmode=driving`;

    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Failed to open Google Maps")
    );
  };

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "25%", "50%", "90%"], []);

  const handleOpen = useCallback((index: number) => {
    // sheetRef.current?.snapToIndex(index);
    // sheetRef.current?.expand();
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

  // Sample Table Data
  const data = Array(20).fill({
    name: "Karachi Chicken Biryani",
    distRest: "2.5 km",
    userDist: "4.0 km",
    time: "15 mins",
    price: "180 PKR",
  });

  return (
    <GestureHandlerRootView className="flex-1">
      {/* Map View */}
      <SafeAreaView className="flex-1 relative">
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
          style={{ width: "100%", height: "100%", marginRight: 15, zIndex: 0 }}
          // className="mr-4"
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
          />
        </MapView>

        {/* Floating Button to Expand Bottom Sheet */}
        <Pressable
          style={{
            position: "absolute",
            top: 100,
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
          onPress={() => handleOpen(1)}
        >
          <Ionicons name="chevron-up" size={24} color="white" />
        </Pressable>
        <Pressable
          style={{
            position: "absolute",
            top: 40,
            left: 20,
            backgroundColor: "black",
            padding: 10,
            borderRadius: 40,
            elevation: 20, // Deep shadow for Android
            shadowColor: "#000",
            shadowOffset: { width: 5, height: 20 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
          }}
          onPress={() => navigation.toggleDrawer()} // Open/Close Drawer
        >
          <Ionicons name="menu" size={28} color="white" />
        </Pressable>
      </SafeAreaView>

      {/* Bottom Sheet */}
      <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints}>
        {/* <BottomSheetView className="flex-1 p-6 bg-white rounded-t-3xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-semibold text-gray-800">
              Enter Destination:
            </Text>
            <Ionicons
              name="close"
              size={28}
              className="text-gray-700"
              onPress={handleClosePress}
            />
          </View>

          <BottomSheetTextInput
            placeholder="Type destination here..."
            value={destination}
            onChangeText={setDestination}
            className="border border-gray-300 p-4 rounded-lg text-lg bg-gray-100 w-full mb-4"
          />
          <View className="flex-1 items-center">
            <Text
              className="border border-red-500 text-black text-lg bg-blue-600 font-bold text-center p-3 rounded-full shadow-lg"
              onPress={openGoogleMaps}
            >
              Navigate with Google Maps
            </Text>
          </View>
        </BottomSheetView> */}

        {/* < className="flex-1 p-6 bg-white rounded-t-3xl"> */}
        {/* Header with Close Button */}
        <BottomSheetView className={"p-6 bg-white rounded-t-3xl"}>
          {/* Pressable wrapper to handle outside taps */}
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              setIsTableActive(false)}
            } // Close keyboard when tapping outside
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-semibold text-gray-800">
                Enter Destination:
              </Text>
              <Ionicons
                name="close"
                size={28}
                className="text-gray-700"
                onPress={handleClosePress}
              />
            </View>

            {/* Destination Input */}
            <BottomSheetTextInput
              placeholder="Type destination here..."
              value={destination}
              onChangeText={setDestination}
              className="border border-gray-300 p-4 rounded-lg text-lg bg-gray-100 w-full mb-4"
            />

            <Text className="text-8xl text-center">{orders.length}</Text>

            {/* Google Maps Button */}
            <View className="flex items-center mb-6">
              <Text
                className="border-4 border-blue-600 text-white text-lg font-bold text-center py-3 px-6 rounded-full shadow-lg w-4/5"
                style={{ backgroundColor: "black" }}
                onPress={openGoogleMaps}
              >
                Navigate with Google Maps
              </Text>
            </View>

            {/* List of Available Orders */}
            <View
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#1E293B" }}
            >
              <Text className="text-white text-lg font-bold text-center">
                List of Available Orders
              </Text>
            </View>

            {/* Horizontal Scroll for Table */}
            <BottomSheetScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              className={"mt-8"}
              scrollEnabled={!isTableActive} // Disable BottomSheet scroll when table is active
            >
              <View className="mb-12 mt-8 border border-gray-600 rounded-lg min-w-[500px]">
                {/* ✅ Table Header */}
                <View className="flex-row bg-gray-800 border-b border-gray-600 py-3 px-4">
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
                </View>

                {/* ✅ Scrollable List for Table Data */}
                <BottomSheetFlatList
                  data={data}
                  keyExtractor={(_, index) => index.toString()}
                  showsVerticalScrollIndicator={true}
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled={isTableActive} // Enable table scroll only when active
                  onTouchStart={() => setIsTableActive(true)} // Activate table scroll when touched
                  nestedScrollEnabled={true}  // Enable scrolling inside BottomSheet
                  keyboardDismissMode="on-drag"
                  renderItem={({ item }) => (
                    <View className="flex-row items-center border-b border-gray-600 bg-gray-700 px-4 py-3">
                      <Text
                        className="text-white text-sm w-40 truncate"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                      <Text className="text-white text-sm w-24 text-center">
                        {item.distRest}
                      </Text>
                      <Text className="text-white text-sm w-24 text-center">
                        {item.userDist}
                      </Text>
                      <Text className="text-white text-sm w-24 text-center">
                        {item.time}
                      </Text>
                      <Text className="text-white text-sm w-24 text-center">
                        {item.price}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </BottomSheetScrollView>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default App;
