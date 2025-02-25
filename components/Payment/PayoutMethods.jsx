import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PayoutMethods = ({ payoutMethods, selectedMethod, onSelectMethod }) => {
  return (
    <View className="p-4 bg-gray-100 rounded-lg mb-4">
      <Text className="text-xl font-semibold">Payout Methods</Text>
      {payoutMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          onPress={() => onSelectMethod(method)}
          className={`p-2 mt-2 rounded ${selectedMethod.id === method.id ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Text>{method.type} - {method.account}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PayoutMethods;
