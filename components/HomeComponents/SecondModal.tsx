// // import React from "react";
// // import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// // import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
// // import { AntDesign } from "@expo/vector-icons";
// // import RemoteImage from "../RemoteImages/RemoteImageRestaurant";

// // const SecondModal = ({ orderData, goBackToFirstModal, acceptOrder }) => {
// //   if (!orderData) return null;

// //   const { restaurant, customer, status, totalamount, paymentmethod } =
// //     orderData;

// //   return (
// //     <BottomSheetView style={styles.contentContainer}>
// //       {/* Back Arrow Button */}
// //       <TouchableOpacity style={styles.backButton} onPress={goBackToFirstModal}>
// //         <AntDesign name="arrowleft" size={24} color="white" />
// //       </TouchableOpacity>

// //       {/* Scrollable Content */}
// //       <BottomSheetScrollView
// //         contentContainerStyle={{ height: "100%" }}
// //         showsVerticalScrollIndicator={true}
// //       >
// //         {/* Restaurant Details */}
// //         <View style={styles.section}>
// //           <RemoteImage
// //             path={restaurant?.restaurantImage}
// //             fallback={"../../assets/food.jpg"}
// //             style={styles.restaurantImage}
// //           />
// //           <View style={styles.restaurantDetails}>
// //             <Text style={styles.restaurantName}>
// //               {restaurant?.restaurantname}
// //             </Text>
// //             <Text style={styles.restaurantLocation}>
// //               {restaurant?.restaurantlocation}
// //             </Text>
// //             <Text style={styles.restaurantRating}>⭐ {restaurant?.rating}</Text>
// //           </View>
// //         </View>

// //         {/* Customer Details */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Customer Details</Text>
// //           <Text style={styles.customerName}>{customer?.name}</Text>
// //           <Text style={styles.customerEmail}>{customer?.email}</Text>
// //         </View>

// //         {/* Order Metadata */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Order Details</Text>
// //           <Text style={styles.orderText}>Status: {status}</Text>
// //           <Text style={styles.orderText}>Total Amount: ${totalamount}</Text>
// //           <Text style={styles.orderText}>Payment Method: {paymentmethod}</Text>
// //         </View>

// //         {/* Restaurant Details */}
// //         <View style={styles.section}>
// //           <RemoteImage
// //             path={restaurant?.restaurantImage}
// //             fallback={"../../assets/food.jpg"}
// //             style={styles.restaurantImage}
// //           />
// //           <View style={styles.restaurantDetails}>
// //             <Text style={styles.restaurantName}>
// //               {restaurant?.restaurantname}
// //             </Text>
// //             <Text style={styles.restaurantLocation}>
// //               {restaurant?.restaurantlocation}
// //             </Text>
// //             <Text style={styles.restaurantRating}>⭐ {restaurant?.rating}</Text>
// //           </View>
// //         </View>

// //         {/* Customer Details */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Customer Details</Text>
// //           <Text style={styles.customerName}>{customer?.name}</Text>
// //           <Text style={styles.customerEmail}>{customer?.email}</Text>
// //         </View>

// //         {/* Order Metadata */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Order Details</Text>
// //           <Text style={styles.orderText}>Status: {status}</Text>
// //           <Text style={styles.orderText}>Total Amount: ${totalamount}</Text>
// //           <Text style={styles.orderText}>Payment Method: {paymentmethod}</Text>
// //         </View>

// //         {/* Extra padding at the bottom to prevent content from being hidden behind the fixed button */}
// //         <View style={{ height: 80 }} />
// //       </BottomSheetScrollView>

// //       {/* Fixed Action Buttons */}
// //       <View style={styles.buttonContainer}>
// //         <TouchableOpacity
// //           style={styles.cancelButton}
// //           onPress={goBackToFirstModal}
// //         >
// //           <Text style={styles.buttonText}>Cancel</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.acceptButton} onPress={acceptOrder}>
// //           <Text style={styles.buttonText}>Accept Order</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </BottomSheetView>
// //   );
// // };

// // export default SecondModal;

// // const styles = StyleSheet.create({
// //   contentContainer: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: "white",
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //   },
// //   backButton: {
// //     position: "absolute",
// //     left: 10,
// //     top: 10,
// //     backgroundColor: "rgba(128, 128, 128, 0.5)", // Semi-transparent gray
// //     borderRadius: 50,
// //     padding: 10,
// //     zIndex: 10,
// //   },

// //   section: {
// //     marginVertical: 20,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     marginBottom: 5,
// //   },
// //   restaurantImage: {
// //     marginTop: 20,
// //     width: "100%",
// //     height: 150,
// //     borderRadius: 10,
// //   },
// //   restaurantDetails: {
// //     marginTop: 10,
// //   },
// //   restaurantName: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //   },
// //   restaurantLocation: {
// //     fontSize: 14,
// //     color: "gray",
// //   },
// //   restaurantRating: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     color: "green",
// //   },
// //   customerName: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   customerEmail: {
// //     fontSize: 14,
// //     color: "gray",
// //   },
// //   orderText: {
// //     fontSize: 16,
// //     marginVertical: 2,
// //   },
// //   buttonContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     position: "absolute",
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: "white",
// //     padding: 20,
// //   },
// //   cancelButton: {
// //     flex: 1,
// //     padding: 15,
// //     backgroundColor: "red",
// //     borderRadius: 10,
// //     marginRight: 10,
// //     alignItems: "center",
// //   },
// //   acceptButton: {
// //     flex: 1,
// //     padding: 15,
// //     backgroundColor: "green",
// //     borderRadius: 10,
// //     alignItems: "center",
// //   },
// //   buttonText: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// // });

// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
// import { AntDesign } from "@expo/vector-icons";
// import RemoteImage from "../RemoteImages/RemoteImageRestaurant";

// const SecondModal = ({ orderData, goBackToFirstModal, acceptOrder }) => {
//   if (!orderData) return null;

//   const { restaurant, customer, status, totalamount, paymentmethod } = orderData;

//   return (
//     <BottomSheetView style={styles.contentContainer}>
//       {/* Back Arrow Button */}
//       <TouchableOpacity style={styles.backButton} onPress={goBackToFirstModal}>
//         <AntDesign name="arrowleft" size={24} color="white" />
//       </TouchableOpacity>

//       {/* Scrollable Content */}
//       <BottomSheetScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={true}
//       >
//         {/* Restaurant Details */}
//         <View style={styles.section}>
//           <RemoteImage
//             path={restaurant?.restaurantImage}
//             fallback={"../../assets/food.jpg"}
//             style={styles.restaurantImage}
//           />
//           <View style={styles.restaurantDetails}>
//             <Text style={styles.restaurantName}>{restaurant?.restaurantname}</Text>
//             <Text style={styles.restaurantLocation}>{restaurant?.restaurantlocation}</Text>
//             <Text style={styles.restaurantRating}>⭐ {restaurant?.rating}</Text>
//           </View>
//         </View>

//         {/* Customer Details */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Customer Details</Text>
//           <Text style={styles.customerName}>{customer?.name}</Text>
//           <Text style={styles.customerEmail}>{customer?.email}</Text>
//         </View>

//         {/* Order Metadata */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Order Details</Text>
//           <Text style={styles.orderText}>Status: {status}</Text>
//           <Text style={styles.orderText}>Total Amount: ${totalamount}</Text>
//           <Text style={styles.orderText}>Payment Method: {paymentmethod}</Text>
//         </View>

//          {/* Customer Details */}
//          <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Customer Details</Text>
//           <Text style={styles.customerName}>{customer?.name}</Text>
//           <Text style={styles.customerEmail}>{customer?.email}</Text>
//         </View>

//         {/* Order Metadata */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Order Details</Text>
//           <Text style={styles.orderText}>Status: {status}</Text>
//           <Text style={styles.orderText}>Total Amount: ${totalamount}</Text>
//           <Text style={styles.orderText}>Payment Method: {paymentmethod}</Text>
//         </View>

//         {/* Extra padding at the bottom to prevent content from being hidden behind the fixed button */}
//         <View style={{ height: 100 }} />
//       </BottomSheetScrollView>

//       {/* Fixed Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.cancelButton} onPress={goBackToFirstModal}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.acceptButton} onPress={acceptOrder}>
//           <Text style={styles.buttonText}>Accept Order</Text>
//         </TouchableOpacity>
//       </View>
//     </BottomSheetView>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     // paddingHorizontal: 20,
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   backButton: {
//     position: "absolute",
//     left: 20,
//     top: 30,
//     backgroundColor: "rgba(128, 128, 128, 0.7)", // Semi-transparent gray
//     borderRadius: 50,
//     padding: 10,
//     zIndex: 2,
//   },
//   scrollContent: {
//     // flexGrow: 1, // Makes the content scrollable
//     paddingBottom: 20,
//     // zIndex: 1,
//   },
//   section: {
//     marginVertical: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   restaurantImage: {
//     marginTop: 20,
//     width: "100%",
//     height: 150,
//     borderRadius: 10,
//   },
//   restaurantDetails: {
//     marginTop: 10,
//   },
//   restaurantName: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   restaurantLocation: {
//     fontSize: 14,
//     color: "gray",
//   },
//   restaurantRating: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "green",
//   },
//   customerName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   customerEmail: {
//     fontSize: 14,
//     color: "gray",
//   },
//   orderText: {
//     fontSize: 16,
//     marginVertical: 2,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "white",
//     padding: 20,
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//     zIndex: 10,
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: "red",
//     borderRadius: 10,
//     marginRight: 10,
//     alignItems: "center",
//   },
//   acceptButton: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: "green",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default SecondModal;


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

        {/* Order Metadata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <Text style={styles.orderText}>Status: {status}</Text>
          <Text style={styles.orderText}>Total Amount: ${totalamount}</Text>
          <Text style={styles.orderText}>Payment Method: {paymentmethod}</Text>
        </View>

        {/* Extra padding at the bottom to prevent content from being hidden behind the fixed button */}
        <View style={{ height: 100 }} />
      </BottomSheetScrollView>

      {/* Fixed Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={goBackToFirstModal}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={acceptOrder}>
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
