import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import RemoteImage from "../RemoteImages/RemoteImageRestaurant";

const SecondModal = ({ orderData, goBackToFirstModal, acceptOrder }) => {
  if (!orderData) return null;

  const { restaurant, customer, status, totalamount, paymentmethod } = orderData;

  return (
    <BottomSheetView style={styles.contentContainer}>
      {/* Image Container with Back Button */}
      <View style={styles.imageContainer}>
        <RemoteImage
          path={restaurant?.restaurantImage}
          fallback={"../../assets/food.jpg"}
          style={styles.restaurantImage}
        />
        <TouchableOpacity style={styles.backButton} onPress={goBackToFirstModal}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <BottomSheetScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Restaurant Details */}
        <View style={styles.section}>
          <Text style={styles.restaurantName}>{restaurant?.restaurantname}</Text>
          <Text style={styles.restaurantLocation}>{restaurant?.restaurantlocation}</Text>
          <Text style={styles.restaurantRating}>⭐ {restaurant?.rating}</Text>
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <Text style={styles.customerName}>{customer?.name}</Text>
          <Text style={styles.customerEmail}>{customer?.email}</Text>
        </View>

        {/* Order Metadata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <Text style={styles.orderText}>Status: {status}</Text>
          <Text style={styles.orderText}>Total Amount: ${totalamount}</Text>
          <Text style={styles.orderText}>Payment Method: {paymentmethod}</Text>
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <Text style={styles.customerName}>{customer?.name}</Text>
          <Text style={styles.customerEmail}>{customer?.email}</Text>
        </View>

    
      </BottomSheetScrollView>

      {/* Fixed Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={goBackToFirstModal}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={() => acceptOrder(orderData)}>
          <Text style={styles.buttonText}>Accept Order</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
};

// Styles remain unchanged


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    position: "relative",
  },
  restaurantImage: {
    width: "100%",
    height: 200,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  restaurantLocation: {
    fontSize: 14,
    color: "gray",
  },
  restaurantRating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customerEmail: {
    fontSize: 14,
    color: "gray",
  },
  orderText: {
    fontSize: 16,
    marginVertical: 2,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    backgroundColor: "red",
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  acceptButton: {
    flex: 1,
    padding: 15,
    backgroundColor: "green",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SecondModal;
