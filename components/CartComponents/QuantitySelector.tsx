import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/outline";

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <View className="flex-row items-center space-x-4">
      <TouchableOpacity onPress={onDecrease}>
        <MinusCircleIcon size={32} color="gray" />
      </TouchableOpacity>
      <Text className="text-xl font-bold">{quantity}</Text>
      <TouchableOpacity onPress={onIncrease}>
        <PlusCircleIcon size={32} color="gray" />
      </TouchableOpacity>
    </View>
  );
}