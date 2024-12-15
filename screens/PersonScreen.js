import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, theme } from "../theme";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/movieList";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});

  useEffect(() => {
    // console.log('get person', item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    // console.log('got person details: ', data)
    if (data) setPerson(data);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    // console.log('got person movies: ', data)
    if (data && data.cast) setPersonMovies(data.cast);
  };
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View className="flex-row justify-center">
        <Image
          source={{
            uri: image342(person?.profile_path) || fallbackPersonImage,
          }}
          className="mt-24 rounded-full"
          style={{
            width: width * 0.9,
            height: height * 0.44,
            borderWidth: 2,
            borderColor: "black",
          }}
        />
      </View>
      <View className="mt-6">
        <Text className="text-3xl text-white font-bold text-center">
          {person?.name}
        </Text>
        <Text className="text-base text-neutral-500 text-center">
          {person?.place_of_birth}
        </Text>
      </View>
      <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
          <Text className="text-white font-semibold">Gender</Text>
          <Text className="text-neutral-300 text-sm">
            {person?.gender == 1 ? "Female" : "Male"}
          </Text>
        </View>
        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
          <Text className="text-white font-semibold">Birthday</Text>
          <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
        </View>
        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
          <Text className="text-white font-semibold">Known for</Text>
          <Text className="text-neutral-300 text-sm">
            {person?.known_for_department}
          </Text>
        </View>
        <View className="px-2 items-center">
          <Text className="text-white font-semibold">Popularity</Text>
          <Text className="text-neutral-300 text-sm">
            {person?.popularity?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View className="my-6 mx-4 space-y-2">
        <Text className="text-white text-lg">Biography</Text>
        <Text className="text-neutral-400 tracking-wide">
          {person?.biography || "N/A"}
        </Text>
      </View>
      <SafeAreaView style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <View className="flex-row items-center justify-between mx-4 mt-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-1 rounded-xl"
            style={[
              styles.background,
              {
                backgroundColor: theme.background2,
                borderColor: theme.background2,
                borderRadius: 10,
              },
            ]}
          >
            <ChevronLeftIcon size="28" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
    </ScrollView>
  );
}
