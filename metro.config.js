const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: "./global.css" });

// const { getDefaultConfig } = require('@expo/metro-config');
// const { withNativeWind } = require('nativewind/metro');

// module.exports = (async () => {
//   const config = await getDefaultConfig(__dirname, {
//     isCSSEnabled: true,
//   });

//   config.resolver.extraNodeModules = {
//     ...config.resolver.extraNodeModules,
//     stream: require.resolve('stream-browserify'),
//     url: require.resolve('react-native-url-polyfill'),
//     buffer: require.resolve('buffer'),
//     events: require.resolve('events'),
//     crypto: require.resolve('crypto-browserify'),
//     http: require.resolve('http-browserify'),
//   };

//   return withNativeWind(config, { input: './global.css' });
// })();