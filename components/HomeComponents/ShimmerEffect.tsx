import { View } from "react-native";
import React from "react";

const ShimmerEffect = () => {
  return (
    <View className="space-y-4 p-4">
      <View className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></View>
      <View className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></View>
      <View className="h-6 bg-gray-300 rounded w-2/3 animate-pulse"></View>
      <View className="h-6 bg-gray-300 rounded w-full animate-pulse"></View>
    </View>
  );
};

export default ShimmerEffect;
