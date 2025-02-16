import React, { useMemo, useCallback, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Dummy data for restaurants
const restaurants = [
  { id: "1", name: "Restaurant A", address: "123 Main St" },
  { id: "2", name: "Restaurant B", address: "456 Elm St" },
  { id: "3", name: "Restaurant C", address: "789 Oak St" },
];

export default function BottomSheetComponent({  }) {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "40%", "70%", "100%"], []);

  const handleRestaurantSelect = (restaurant) => {
    console.log("Selected Restaurant: ", restaurant);
  };

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity onPress={() => handleRestaurantSelect(item)} className="p-4 border-b border-gray-200">
      <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
      <Text className="text-sm text-gray-500">{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#fff" }}
      >
        <BottomSheetView>
          <FlatList
            data={restaurants}
            keyExtractor={(item) => item.id}
            renderItem={renderRestaurant}
            className="flex-1"
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
