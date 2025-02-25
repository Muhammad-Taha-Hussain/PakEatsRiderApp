import React from "react";
import { View, Text } from "react-native";

const PaymentHistory = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <Text className="text-center mt-4">No payment history available.</Text>;
  }

  return (
    <View className="p-4 bg-gray-100 rounded-lg mb-4">
      <Text className="text-xl font-semibold">Payment History</Text>
      {transactions.map((transaction) => (
        <View key={transaction.id} className="mt-2 border-b pb-2">
          <Text>Date: {transaction.date}</Text>
          <Text>Amount: {transaction.amount}</Text>
          <Text>Status: {transaction.status}</Text>
        </View>
      ))}
    </View>
  );
};

export default PaymentHistory;
