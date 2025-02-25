import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const WithdrawalRequests = ({ onRequestWithdrawal }) => {
  return (
    <View className="p-4 bg-gray-100 rounded-lg mb-4">
      <Text className="text-xl font-semibold">Withdrawal Requests</Text>
      <TouchableOpacity 
        onPress={onRequestWithdrawal} 
        className="mt-2 bg-blue-500 p-2 rounded text-white"
      >
        <Text className="text-center text-white">Request Withdrawal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithdrawalRequests;
