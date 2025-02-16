import React from "react";
import { ScrollView, View, Image, Text } from "react-native";

const recommendedItems = [
  {
    id: 1,
    name: "Burger",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Fries",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Drink",
    image: "https://via.placeholder.com/100",
  },
];

export default function RecommendedList() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {recommendedItems.map((item) => (
        <View
          key={item.id}
          className="mr-4 items-center justify-center bg-gray-100 rounded-lg p-4"
        >
          <Image
            source={{ uri: item.image }}
            className="w-20 h-20 rounded-full"
          />
          <Text className="mt-2 font-bold">{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}