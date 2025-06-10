// Mock implementation for react-native-google-mobile-ads on web
// This prevents Metro bundling errors when building for web

import React from "react";

// Mock BannerAd component that renders a placeholder div
const BannerAd = ({ onAdLoaded, onAdFailedToLoad, ...props }) => {
  React.useEffect(() => {
    // Simulate ad loading success after a short delay
    const timer = setTimeout(() => {
      if (onAdLoaded) {
        onAdLoaded();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [onAdLoaded]);

  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "50px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        color: "#666",
        border: "1px dashed #ccc",
      },
    },
    "Ad Placeholder (Web)",
  );
};

export { BannerAd };

export const BannerAdSize = {
  ANCHORED_ADAPTIVE_BANNER: "ANCHORED_ADAPTIVE_BANNER",
  ADAPTIVE_BANNER: "ADAPTIVE_BANNER",
  BANNER: "BANNER",
  FULL_BANNER: "FULL_BANNER",
  LARGE_BANNER: "LARGE_BANNER",
  LEADERBOARD: "LEADERBOARD",
  MEDIUM_RECTANGLE: "MEDIUM_RECTANGLE",
};

export const TestIds = {
  BANNER: "ca-app-pub-3940256099942544/9214589741",
};

export const AdEventType = {
  LOADED: "loaded",
  ERROR: "error",
  OPENED: "opened",
  CLOSED: "closed",
  CLICKED: "clicked",
};

export const mobileAds = {
  initialize: () => Promise.resolve(),
  setRequestConfiguration: () => {},
};

export default {
  BannerAd,
  BannerAdSize,
  TestIds,
  AdEventType,
  mobileAds,
};
