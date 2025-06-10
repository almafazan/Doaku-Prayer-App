import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, StatusBar } from "react-native";
import { Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import PrayerList from "./components/PrayerList";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [adLoaded, setAdLoaded] = useState(false);
  const router = useRouter();

  const handlePrayerPress = (id: string) => {
    router.push(`/prayer/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFEDF3]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFEDF3" />
      <View className="flex-1 px-4 pt-4 pb-2">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-[#0ABAB5]">Doaku</Text>
          <Text className="text-sm text-gray-600">Koleksi Doa Islami</Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center px-4 py-2 mb-4 bg-white rounded-full shadow-sm">
          <Search size={20} color="#0ABAB5" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Cari doa..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Prayer List */}
        <PrayerList
          searchQuery={searchQuery}
          onPrayerPress={handlePrayerPress}
        />

        {/* AdMob Adaptive Banner - Only show when loaded */}
        {adLoaded && (
          <View className="items-center justify-center py-2 bg-[#ADEED9] border-t border-[#56DFCF]">
            <BannerAd
              unitId="ca-app-pub-3940256099942544/9214589741" // Demo adaptive banner unit ID
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                keywords: ["islamic", "prayer", "doa", "religion"],
              }}
              onAdLoaded={() => {
                console.log("Dashboard banner ad loaded successfully");
                setAdLoaded(true);
              }}
              onAdFailedToLoad={(error) => {
                console.log("Dashboard banner ad failed to load:", error);
                setAdLoaded(false);
              }}
            />
          </View>
        )}

        {/* Hidden ad loader to preload the banner */}
        {!adLoaded && (
          <View style={{ height: 0, overflow: "hidden" }}>
            <BannerAd
              unitId="ca-app-pub-3940256099942544/9214589741"
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                keywords: ["islamic", "prayer", "doa", "religion"],
              }}
              onAdLoaded={() => {
                console.log("Dashboard banner ad preloaded successfully");
                setAdLoaded(true);
              }}
              onAdFailedToLoad={(error) => {
                console.log("Dashboard banner ad failed to preload:", error);
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
