import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronRight } from "lucide-react-native";

interface PrayerContentProps {
  name?: string;
  arabicText?: string;
  translation?: string;
  onNextPrayer?: () => void;
}

export default function PrayerContent({
  name = "Doa Sebelum Makan",
  arabicText = "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
  translation = "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.",
  onNextPrayer = () => {},
}: PrayerContentProps) {
  const [fontsLoaded] = useFonts({
    Amiri: require("../../assets/fonts/SpaceMono-Regular.ttf"), // Replace with actual Amiri font
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-[#FFEDF3]">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FFEDF3] p-4">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Prayer Name */}
        <View className="mb-6 bg-[#0ABAB5] rounded-lg p-4 shadow-sm">
          <Text className="text-2xl font-bold text-white text-center">
            {name}
          </Text>
        </View>

        {/* Arabic Text */}
        <View className="mb-6 bg-white rounded-lg p-6 shadow-sm">
          <Text
            style={styles.arabicText}
            className="text-right text-3xl leading-loose text-[#0ABAB5]"
          >
            {arabicText}
          </Text>
        </View>

        {/* Translation */}
        <View className="mb-8 bg-[#ADEED9] rounded-lg p-6 shadow-sm">
          <Text className="text-lg leading-relaxed text-[#333]">
            {translation}
          </Text>
        </View>

        {/* Next Prayer Button */}
        <TouchableOpacity
          onPress={onNextPrayer}
          className="bg-[#56DFCF] py-4 px-6 rounded-full flex-row items-center justify-center mb-8 shadow-sm"
        >
          <Text className="text-white font-bold text-lg mr-2">
            Doa Selanjutnya
          </Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  arabicText: {
    fontFamily: "Amiri", // Will be replaced with actual Amiri font
    lineHeight: 50,
  },
});
