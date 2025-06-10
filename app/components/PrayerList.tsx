import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";

// Mock data for prayers
const MOCK_PRAYERS = [
  { id: "1", name: "Doa Sebelum Makan" },
  { id: "2", name: "Doa Setelah Makan" },
  { id: "3", name: "Doa Sebelum Tidur" },
  { id: "4", name: "Doa Bangun Tidur" },
  { id: "5", name: "Doa Masuk Kamar Mandi" },
  { id: "6", name: "Doa Keluar Kamar Mandi" },
  { id: "7", name: "Doa Masuk Masjid" },
  { id: "8", name: "Doa Keluar Masjid" },
  { id: "9", name: "Doa Bepergian" },
  { id: "10", name: "Doa Untuk Orang Tua" },
  { id: "11", name: "Doa Setelah Adzan" },
  { id: "12", name: "Doa Sebelum Belajar" },
  { id: "13", name: "Doa Setelah Belajar" },
  { id: "14", name: "Doa Mohon Kesembuhan" },
  { id: "15", name: "Doa Mohon Keselamatan" },
];

interface Prayer {
  id: string;
  name: string;
}

interface PrayerListProps {
  prayers?: Prayer[];
  onPrayerSelect?: (id: string) => void;
}

const PrayerList = ({
  prayers = MOCK_PRAYERS,
  onPrayerSelect,
}: PrayerListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>(prayers);
  const router = useRouter();

  useEffect(() => {
    // Filter prayers based on search query
    const filtered = prayers.filter((prayer) =>
      prayer.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredPrayers(filtered);
  }, [searchQuery, prayers]);

  const handlePrayerPress = (id: string) => {
    if (onPrayerSelect) {
      onPrayerSelect(id);
    } else {
      // Default navigation behavior
      router.push(`/prayer/${id}`);
    }
  };

  const renderPrayerItem = ({ item }: { item: Prayer }) => (
    <TouchableOpacity
      onPress={() => handlePrayerPress(item.id)}
      className="p-4 border-b border-gray-100 active:bg-[#ADEED9]/20"
    >
      <Text className="text-lg font-medium text-gray-800">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#FFEDF3]">
      {/* Search Bar */}
      <View className="px-4 py-3 bg-[#0ABAB5] shadow-sm">
        <View className="flex-row items-center bg-white rounded-lg px-3 py-2">
          <Search size={20} color="#0ABAB5" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-800"
            placeholder="Cari doa..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Prayer List */}
      {filteredPrayers.length > 0 ? (
        <FlatList
          data={filteredPrayers}
          renderItem={renderPrayerItem}
          keyExtractor={(item) => item.id}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }} // Space for AdMob banner
        />
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-500 text-center">
            Tidak ada doa yang sesuai dengan pencarian Anda
          </Text>
        </View>
      )}
    </View>
  );
};

export default PrayerList;
