// components/MapViewComponent.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const restaurants = [
  { id: '1', name: 'Restaurant A', latitude: 31.4015442, longitude: 74.2133678 },
  { id: '2', name: 'Restaurant B', latitude: 31.4019442, longitude: 74.2233678 },
  { id: '3', name: 'Restaurant C', latitude: 31.4029442, longitude: 74.2333678 },
];

export default function MapViewComponent({ userLocation, selectedRestaurant }) {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (userLocation) {
      setRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01, // Zoom level
        longitudeDelta: 0.01, // Zoom level
      });
    }
  }, [userLocation]);

  const openGoogleMaps = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`;
      Linking.openURL(url).catch(() =>
        Alert.alert('Error', 'Unable to open Google Maps.')
      );
    } else {
      Alert.alert('Location Error', 'User location not available.');
    }
  };

  if (!region) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={region} // Focus on the user's current location
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {/* User's location marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}

        {/* Restaurant markers */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            pinColor={
              selectedRestaurant?.id === restaurant.id ? 'green' : 'red'
            }
          />
        ))}

        {/* Polyline for path to the restaurant */}
        {selectedRestaurant && userLocation && (
          <Polyline
            coordinates={[
              {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              },
              {
                latitude: selectedRestaurant.latitude,
                longitude: selectedRestaurant.longitude,
              },
            ]}
            strokeColor="blue"
            strokeWidth={3}
          />
        )}
      </MapView>

      {/* Button to Open Google Maps */}
      <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
        <Text style={styles.buttonText}>Open in Maps</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
