module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      ["module:react-native-dotenv"]
    ]
    // plugins: ["nativewind/babel"],
    // plugins: ['react-native-reanimated/plugin'],
  };
};
