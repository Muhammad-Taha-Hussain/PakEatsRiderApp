import React from "react";
import { View, Text } from "react-native";

const EarningsSummary = ({ earnings }) => {
  if (!earnings) return null;

  return (
    <View className="p-4 bg-gray-100 rounded-lg mb-4">
      <Text className="text-xl font-semibold">Earnings Summary</Text>
      <Text className="text-lg">Total Earnings: {earnings.totalEarnings}</Text>
      <Text className="text-lg">Pending Payments: {earnings.pendingPayments}</Text>
    </View>
  );
};

export default EarningsSummary;
