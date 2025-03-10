import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { useOrder } from "../../context/OrderContext";
import ShimmerEffect from "./ShimmerEffect";

const OrderModal = ({ visible, onClose }) => {
  const { selectedOrder } = useOrder();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000); // Simulated API delay
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className={`flex-1 justify-center items-center bg-black/50`}>
        <View className={`w-11/12 bg-white p-5 rounded-lg shadow-lg`}>
          <Text className={`text-lg font-bold text-center mb-4`}>Order Details</Text>

          {loading ? (
            <ShimmerEffect />
          ) : (
            selectedOrder && (
              <>
                <Text className={`text-gray-700`}>Restaurant: {selectedOrder?.name}</Text>
                <Text className={`text-gray-700`}>Distance: {selectedOrder?.distRest} km</Text>
                <Text className={`text-gray-700`}>User Distance: {selectedOrder?.userDist} km</Text>
                <Text className={`text-gray-700`}>Estimated Time: {selectedOrder?.time} min</Text>
                <Text className={`text-gray-700`}>Price: ${selectedOrder?.price}</Text>

                {/* Action Buttons */}
                <View className={`flex-row justify-between mt-6`}>
                  <Pressable className={`bg-red-500 px-4 py-2 rounded-lg`} onPress={onClose}>
                    <Text className={`text-white font-bold`}>Cancel</Text>
                  </Pressable>
                  <Pressable className={`bg-green-500 px-4 py-2 rounded-lg`} onPress={() => alert("Order Accepted!")}>
                    <Text className={`text-white font-bold`}>Accept Order</Text>
                  </Pressable>
                </View>
              </>
            )
          )}
        </View>
      </View>
    </Modal>
  );
};

export default OrderModal;
