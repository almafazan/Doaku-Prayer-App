import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import PrayerContent from "../components/PrayerContent";

// Mock data for prayers
const mockPrayers = [
  {
    id: "1",
    name: "Doa Sebelum Makan",
    arabic:
      "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    translation:
      "Ya Allah, berkahilah rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.",
  },
  {
    id: "2",
    name: "Doa Sesudah Makan",
    arabic:
      "اَلْحَمْدُ ِللهِ الَّذِىْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ",
    translation:
      "Segala puji bagi Allah yang telah memberi makan kami dan minuman kami, serta menjadikan kami sebagai orang-orang islam.",
  },
  {
    id: "3",
    name: "Doa Sebelum Tidur",
    arabic: "بِسْمِكَ اللّٰهُمَّ اَحْيَا وَاَمُوْتُ",
    translation: "Dengan menyebut nama-Mu ya Allah, aku hidup dan aku mati.",
  },
];

export default function PrayerDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const prayerId = typeof id === "string" ? id : "1";
  const [adLoaded, setAdLoaded] = useState(false);
  const [isReadingPrayer, setIsReadingPrayer] = useState(false);

  // Find the current prayer
  const currentPrayerIndex = mockPrayers.findIndex(
    (prayer) => prayer.id === prayerId,
  );
  const currentPrayer = mockPrayers[currentPrayerIndex] || mockPrayers[0];

  // Handle navigation to next prayer
  const handleNextPrayer = () => {
    const nextIndex = (currentPrayerIndex + 1) % mockPrayers.length;
    router.push(`/prayer/${mockPrayers[nextIndex].id}`);
  };

  // Handle navigation to previous prayer
  const handlePreviousPrayer = () => {
    const prevIndex =
      currentPrayerIndex <= 0 ? mockPrayers.length - 1 : currentPrayerIndex - 1;
    router.push(`/prayer/${mockPrayers[prevIndex].id}`);
  };

  // Simulate prayer reading state - hide ads during prayer reading
  useEffect(() => {
    // Set reading state when component mounts
    setIsReadingPrayer(true);

    // Allow ads to show after a brief moment (simulating prayer reading completion)
    const timer = setTimeout(() => {
      setIsReadingPrayer(false);
    }, 3000); // 3 seconds delay to respect prayer time

    return () => clearTimeout(timer);
  }, [prayerId]);

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#0ABAB5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Doa</Text>
      </View>

      {/* Main content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <PrayerContent
          name={currentPrayer.name}
          arabic={currentPrayer.arabic}
          translation={currentPrayer.translation}
        />
      </ScrollView>

      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={handlePreviousPrayer}
          style={[styles.navButton, styles.prevButton]}
        >
          <ArrowLeft size={20} color="#FFEDF3" />
          <Text style={styles.navButtonText}>Sebelumnya</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextPrayer}
          style={[styles.navButton, styles.nextButton]}
        >
          <Text style={styles.navButtonText}>Selanjutnya</Text>
          <ArrowRight size={20} color="#FFEDF3" />
        </TouchableOpacity>
      </View>

      {/* AdMob Adaptive Banner - Only show when loaded and not during prayer reading */}
      {adLoaded && !isReadingPrayer && (
        <View style={styles.adBanner}>
          <BannerAd
            unitId="ca-app-pub-3940256099942544/9214589741" // Demo adaptive banner unit ID
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
              keywords: ["islamic", "prayer", "doa", "religion"],
            }}
            onAdLoaded={() => {
              console.log("Prayer detail banner ad loaded successfully");
              setAdLoaded(true);
            }}
            onAdFailedToLoad={(error) => {
              console.log("Prayer detail banner ad failed to load:", error);
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
              console.log("Prayer detail banner ad preloaded successfully");
              setAdLoaded(true);
            }}
            onAdFailedToLoad={(error) => {
              console.log("Prayer detail banner ad failed to preload:", error);
            }}
          />
        </View>
      )}

      {/* Placeholder when ad is not loaded or during prayer reading */}
      {(!adLoaded || isReadingPrayer) && (
        <View style={styles.adPlaceholder}>
          <Text style={styles.adPlaceholderText}>
            {isReadingPrayer ? "Sedang membaca doa..." : "Memuat iklan..."}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEDF3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#FFEDF3",
    borderBottomWidth: 1,
    borderBottomColor: "#ADEED9",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#0ABAB5",
    marginRight: 40, // To center the title accounting for the back button
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  prevButton: {
    backgroundColor: "#56DFCF",
  },
  nextButton: {
    backgroundColor: "#0ABAB5",
  },
  navButtonText: {
    color: "#FFEDF3",
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  adBanner: {
    backgroundColor: "#ADEED9",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#56DFCF",
    minHeight: 50,
  },
  adPlaceholder: {
    height: 50,
    backgroundColor: "#ADEED9",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#56DFCF",
  },
  adPlaceholderText: {
    color: "#0ABAB5",
    fontSize: 12,
    fontStyle: "italic",
  },
});
