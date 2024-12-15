import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  // Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  // ArrowLeftOnRectangleIcon,
  // Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  StopIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from "../api/moviedb";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Welcome");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const confirmSignOut = () => {
    setModalVisible(true);
  };

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
  };

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search and logo */}
      <SafeAreaView className="mb-3">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          {/* Menu Icon with Logout Button */}
          <TouchableOpacity onPress={confirmSignOut}>
            <StopIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal for Logout Confirmation */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View className="bg-white p-5 rounded-lg items-center w-72">
            <Text className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </Text>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded-lg m-2 w-24 items-center"
                onPress={handleSignOut}
              >
                <Text className="text-white">Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-400 px-4 py-2 rounded-lg m-2 w-24 items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* Upcoming movies row */}
          <MovieList title="Upcoming" data={upcoming} />

          {/* Top-rated movies row */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
