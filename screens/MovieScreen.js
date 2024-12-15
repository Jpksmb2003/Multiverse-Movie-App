import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";

import MovieList from "../components/movieList";
import Cast from "../components/cast";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovie,
  image500,
} from "../api/moviedb";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // console.log("itemid", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log('moive details: ', data);
    if (data) setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log('get credits: ', data);
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovie(id);
    // console.log('get SimilarMovies: ', data);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  };

  const handleToggleFavourite = () => {
    toggleFavourite(!isFavourite);
  };

  return (
    <View className="flex-1 bg-neutral-900">
      {loading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              className="mb-1"
              style={{ width: width, height: height * 0.6 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width: width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
          {/* Back button and movie poster */}
          <SafeAreaView
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          >
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

          <View>
            <Text className="text-3xl font-bold tracking-wider text-center text-white">
              {movie?.title}
            </Text>
            {/* status, relese, runtime */}
            {movie?.id ? (
              <Text className="my-2 text-base font-semibold text-center text-neutral-400">
                {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
                {movie?.runtime} min
              </Text>
            ) : null}

            {/* genres */}
            <View className="my-2 flex-row flex-wrap justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text
                    key={index}
                    className="text-base font-semibold text-center text-neutral-400"
                  >
                    {genre?.name} {showDot ? "•" : null}
                  </Text>
                );
              })}
            </View>
            {/* desc */}
            <Text className="mx-4 tracking-wider text-neutral-400">
              {movie?.overview}
            </Text>
          </View>
          {/* cast */}
          {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
          {/* similar movies */}
          {similarMovies.length > 0 && (
            <MovieList
              title="Similar Movies"
              hideSeeAll={true}
              data={similarMovies}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}
