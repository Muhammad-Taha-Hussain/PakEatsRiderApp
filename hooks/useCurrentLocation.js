// hooks/useCurrentLocation.js
import { useState, useEffect, useRef, useCallback } from "react";
import * as Location from "expo-location";
import { fetchNearbyOrders } from "../api/active-orders/fetchNearbyOrders";
import {supabase} from "../lib/supabase";

export default function useCurrentLocation() {
  const [orders, setOrders] = useState([]);
  const [riderHasOrder, setRiderHasOrder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  let locationSubscription = useRef(null);


  const fetchOrders = useCallback(async () => {
    if (riderHasOrder) return; // Stop fetching if rider has an order

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission denied");
      setLoading(false);
      return;
    }
     // Get current location
     const currentLocation = await Location.getCurrentPositionAsync({});
     if (!currentLocation || !currentLocation.coords) return;
     setLocation(currentLocation.coords);
 
     const riderLat = currentLocation.coords.latitude;
     const riderLng = currentLocation.coords.longitude;
     console.log("Rider's current location:", currentLocation);
 
     // Fetch nearby orders
     try {
       const nearbyOrders = await fetchNearbyOrders(riderLat, riderLng);
       console.log("Nearby Orders:", nearbyOrders);
       setOrders(nearbyOrders);
     } catch (error) {
       console.error("Error fetching nearby orders:", error);
     }
 
     // Animate map to user's location
     if (mapRef.current) {
       mapRef.current.animateToRegion(
         {
           latitude: riderLat,
           longitude: riderLng,
           latitudeDelta: 0.01, // Zoom level
           longitudeDelta: 0.01,
         },
         1000
       );
     }
   }, [riderHasOrder]);
 
   const checkRiderStatus = useCallback(async () => {
     const { data, error } = await supabase
       .from("riderpaymentsummary")
       .select("Status")
       .eq("RiderId", "YOUR_RIDER_ID_HERE") // Replace with dynamic rider ID
       .in("Status", ["Accepted", "Delivering"]);
 
     if (!error && data.length > 0) {
       setRiderHasOrder(true);
     } else {
       setRiderHasOrder(false);
     }
   }, []);
 
   useEffect(() => {
     const startTracking = async () => {
       let { status } = await Location.requestForegroundPermissionsAsync();
       if (status !== "granted") {
         setErrorMsg("Permission denied");
         setLoading(false);
         return;
       }
 
       locationSubscription.current = await Location.watchPositionAsync(
         {
           accuracy: Location.Accuracy.High,
           timeInterval: 5000, // Update every 5 seconds
           distanceInterval: 10, // Update if user moves 10 meters
         },
         (currentLocation) => {
           if (currentLocation?.coords) {
             setLocation(currentLocation.coords);
           }
         }
       );
     };
 
     startTracking();
     fetchOrders();
     checkRiderStatus();
 
     return () => {
       if (locationSubscription.current) {
         locationSubscription.current.remove();
       }
     };
   }, [fetchOrders, checkRiderStatus]);
 
   useEffect(() => {
     if (!riderHasOrder) {
       const interval = setInterval(fetchOrders, 30000); // Fetch orders every 30 seconds
       return () => clearInterval(interval);
     }
   }, [riderHasOrder, fetchOrders]);
 
   return { location, errorMsg, mapRef, orders, loading };
 }

  // useEffect(() => {
  //   let interval;

  //   const fetchOrders = async () => {
  //     // if (riderHasOrder) return; // Stop fetching if rider has an order

  //     // let { status } = await Location.requestForegroundPermissionsAsync();
  //     // if (status !== "granted") {
  //     //   console.log("Permission to access location denied");
  //     //   setLoading(false);
  //     //   return;
  //     // }

  //     // Track user's location in real-time
  //     //       const locationSubscription = await Location.watchPositionAsync(
  //     //         {
  //     //           accuracy: Location.Accuracy.High,
  //     //           timeInterval: 2000, // Update every 2 seconds
  //     //           distanceInterval: 5, // Update if user moves 5 meters
  //     //         },
  //     //         (currentLocation) => {
  //     //           setLocation(currentLocation.coords);

  //     //           if (mapRef.current) {
  //     //             mapRef.current.animateToRegion(
  //     //               {
  //     //                 latitude: currentLocation.coords.latitude,
  //     //                 longitude: currentLocation.coords.longitude,
  //     //                 latitudeDelta: 0.01, // Zoom level
  //     //                 longitudeDelta: 0.01,
  //     //               },
  //     //               1000
  //     //             );
  //     //           }
  //     //         }
  //     //       );

  //     //       return () => locationSubscription.remove(); // Cleanup on unmount
  //     //     })();
  //     //   }, []);

  //     //   return { location, errorMsg, mapRef };
  //     // }

  //     // let currentLocation = await Location.getCurrentPositionAsync({});
  //     // setLocation(currentLocation.coords);
  //     let locationSubscription;

  // const startTracking = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     setErrorMsg("Permission denied");
  //     setLoading(false);
  //     return;
  //   }
  //   locationSubscription = await Location.watchPositionAsync(
  //     {
  //       accuracy: Location.Accuracy.High,
  //       timeInterval: 5000, // Update every 5 seconds
  //       distanceInterval: 10, // Update if user moves 10 meters
  //     },
  //     (currentLocation) => {
  //       setLocation(currentLocation.coords);
  //     }
  //   );
  // };

  // startTracking();
  //     const riderLat = currentLocation.coords.latitude;
  //     const riderLng = currentLocation.coords.longitude;
  //     console.log("Rider's current location", currentLocation);

  //     const nearbyOrders = await fetchNearbyOrders(riderLat, riderLng);
  //     console.log('Nearby Orders here show here', nearbyOrders);
  //     setOrders(nearbyOrders);
  //     // setLoading(false);

  //     // Animate map to user's current location
  //     if (mapRef.current) {
  //       mapRef.current.animateToRegion(
  //         {
  //           latitude: currentLocation.coords.latitude,
  //           longitude: currentLocation.coords.longitude,
  //           latitudeDelta: 0.01, // Zoom Level: Smaller = More Zoomed In
  //           longitudeDelta: 0.01,
  //         },
  //         1000
  //       );
  //     }
  //   };

  //   const checkRiderStatus = async () => {
  //     const { data, error } = await supabase
  //       .from("RiderOrders")
  //       .select("Status")
  //       .eq("RiderId", "YOUR_RIDER_ID_HERE")
  //       .in("Status", ["Accepted", "Delivering"]);

  //     if (!error && data.length > 0) {
  //       setRiderHasOrder(true);
  //     } else {
  //       setRiderHasOrder(false);
  //     }
  //   };
  //   // Initial fetch
  //   fetchOrders();
  //   checkRiderStatus();

  //   // Set interval to fetch orders only if the rider is free
  //   // interval = setInterval(() => {
  //   //   fetchOrders();
  //   //   // checkRiderStatus();
  //   // }, 30000); // Fetch orders every 30 seconds

  //   // return () => clearInterval(interval);
  //   return () => locationSubscription?.remove();
  // }, [riderHasOrder]);

  // useEffect(() => {
  //   if (!riderHasOrder) {
  //     const interval = setInterval(fetchOrders, 30000);
  //     return () => clearInterval(interval);
  //   }
  // }, [riderHasOrder]);
