import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TaxesInvoices = ({ onDownloadInvoice }) => {
  return (
    <View className="p-4 bg-gray-100 rounded-lg mb-4">
      <Text className="text-xl font-semibold">Taxes & Invoices</Text>
      <TouchableOpacity 
        onPress={onDownloadInvoice} 
        className="mt-2 bg-blue-500 p-2 rounded text-white"
      >
        <Text className="text-center text-white">Download Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaxesInvoices;
