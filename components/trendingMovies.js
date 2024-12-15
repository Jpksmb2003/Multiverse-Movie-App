import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { image500 } from "../api/moviedb";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <Text className="text-white mx-4 mb-5 text-xl">Trending</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <MoviesCard
            key={item.id}
            item={item}
            handleClick={() => handleClick(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const MoviesCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: width * 0.8,
          marginHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={{
            width: width * 0.8,
            height: height * 0.5,
          }}
          className="rounded-3xl"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
