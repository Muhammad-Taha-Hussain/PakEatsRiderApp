import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const images = [
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/300",
];

export default function ImageCarousel() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={192}
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  image: {
    width: "100%",
    height: 192, // equivalent to h-48 in Tailwind
    borderRadius: 10, // rounded-lg
  },
});
