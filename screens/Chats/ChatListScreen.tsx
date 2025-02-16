// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";

// const chats = [
//   {
//     id: 1,
//     name: "Geopart Etdsien",
//     message: "Your Order Just Arrived!",
//     time: "13.47",
//     avatar: "https://via.placeholder.com/50",
//   },
//   {
//     id: 2,
//     name: "Stevano Clirover",
//     message: "Your Order Just Arrived!",
//     time: "11.23",
//     avatar: "https://via.placeholder.com/50",
//   },
//   {
//     id: 3,
//     name: "Elisia Justin",
//     message: "Your Order Just Arrived!",
//     time: "11.23",
//     avatar: "https://via.placeholder.com/50",
//   },
// ];

// export default function ChatList({ navigation }) {
//   return (
//     <View className="flex-1 bg-white px-4 py-4">
//       <Text className="text-2xl font-bold">Chat List</Text>
//       {chats.map((chat) => (
//         <TouchableOpacity
//           key={chat.id}
//           className="flex-row items-center p-4 bg-gray-100 rounded-lg mt-4"
//           onPress={() =>
//             navigation.navigate("ChatScreen", {
//               id: chat.id,
//               name: chat.name,
//               avatar: chat.avatar,
//             })
//           }
//         >
//           <Image
//             source={{ uri: chat.avatar }}
//             className="w-12 h-12 rounded-full"
//           />
//           <View className="ml-4 flex-1">
//             <Text className="font-bold">{chat.name}</Text>
//             <Text className="text-gray-500">{chat.message}</Text>
//           </View>
//           <Text className="text-gray-500">{chat.time}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }



import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { MoonIcon, SunIcon } from "react-native-heroicons/outline";
import ChatList from "../../components/Chats/ChatList";

export default function ChatListScreen({ navigation }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ImageBackground
      source={
        theme === "light"
          ? require("../../assets/images/light-background.jpg") // Add your light background image
          : require("../../assets/images/dark-background.jpg") // Add your dark background image
      }
      style={{ flex: 1 }}
    >
      <View className={`flex-1 px-4 py-4 ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Text
            className={`text-2xl font-bold ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Chat List
          </Text>
          <TouchableOpacity
            className="p-2 rounded-full bg-gray-200"
            onPress={toggleTheme}
          >
            {theme === "light" ? (
              <MoonIcon size={20} color="black" />
            ) : (
              <SunIcon size={20} color="yellow" />
            )}
          </TouchableOpacity>
        </View>

        {/* Chat List */}
        <ScrollView className="mt-4">
          <ChatList theme={theme} navigation={navigation} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}