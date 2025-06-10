const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Configure resolver to handle native modules on web
config.resolver.platforms = ["ios", "android", "native", "web"];

// Add platform-specific extensions
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  "web.js",
  "web.ts",
  "web.tsx",
];

// Configure resolver to exclude native modules on web
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

// Platform-specific resolver configuration
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Mock react-native-google-mobile-ads for web platform
  if (platform === "web" && moduleName === "react-native-google-mobile-ads") {
    return {
      filePath: path.resolve(
        __dirname,
        "web-mocks/react-native-google-mobile-ads.js",
      ),
      type: "sourceFile",
    };
  }

  // Use default resolver for other cases
  return context.resolveRequest(context, moduleName, platform);
};

// Configure transformer
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = withNativeWind(config, { input: "./global.css" });
