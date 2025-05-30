// module.exports = function (api) {
//     api.cache(true);
//     return {
//       presets: [
//         ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//         "nativewind/babel",
//       ],
//       plugins: [
//         // Required for expo-router
//         "expo-router/babel",
//         "react-native-reanimated/plugin",
//       ]
//     };
//   };


module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "react-native-reanimated/plugin",
      ["module:react-native-dotenv", {
        moduleName: "@env",
        path: ".env",
      }],
    ],
  };
};
