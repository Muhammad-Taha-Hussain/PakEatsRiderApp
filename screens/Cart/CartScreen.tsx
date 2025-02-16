import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { HeartIcon, ArrowLeftIcon } from "react-native-heroicons/outline";
import ImageCarousel from "../../components/CartComponents/ImageCarousel";
import QuantitySelector from "../../components/CartComponents/QuantitySelector";
import RecommendedList from "../../components/CartComponents/RecommendationItems";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart({ navigation }) {
  const [quantity, setQuantity] = useState(4);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4">
        {/* Header */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-transparent rounded-full">
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-gray-200 rounded-full">
          <HeartIcon size={20} color="black" />
        </TouchableOpacity>
      </View>
    <ScrollView className="">
      {/* ImageCarousel */}
      <ImageCarousel />

      {/* Food Details */}
      <Text className="text-2xl font-bold mt-4">Burger With Meat 🍔</Text>
      <Text className="text-green-600 text-xl font-bold mt-2">$12,230</Text>

      <View className="flex-row justify-between mt-4">
        <Text className="text-gray-600">💸 Free Delivery</Text>
        <Text className="text-gray-600">⏱️ 20 - 30 min</Text>
        <Text className="text-gray-600">⭐ 4.5</Text>
      </View>

      {/* Description */}
      <Text className="text-lg font-semibold mt-6">Description</Text>
      <Text className="text-gray-600 mt-2">
        Burger With Meat is a typical food from our restaurant that is much in
        demand by many people. This is very recommended for you.
      </Text>

      {/* Recommended Section */}
      <View className="flex-row justify-between items-center mt-6">
        <Text className="text-lg font-bold">Recommended For You</Text>
        <TouchableOpacity>
          <Text className="text-green-600">See All</Text>
        </TouchableOpacity>
      </View>
      <RecommendedList />

      {/* Quantity Selector and Add to Cart */}
      <View className="flex-row items-center mt-6">
        <QuantitySelector
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
        <TouchableOpacity className="flex-1 bg-green-600 ml-4 rounded-full p-4 items-center">
          <Text className="text-white font-bold">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}