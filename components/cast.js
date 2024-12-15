import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { fallbackPersonImage, image185 } from "../api/moviedb";

export default function Cast({ cast, navigation }) {
  return (
    <View className="my-6">
      <Text className="text-white mx-4 mb-5 text-lg">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="items-center mr-4"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="ovrflow-hidden rounded-full items-center h-20 w-20 border border-neutral-500">
                  <Image
                    className="rounded-full w-20 h-20"
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                  />
                </View>
                <Text className=" text-white mt-1 text-xs">
                  {person?.character && person.character.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text className="text-white mt-1 text-xs">
                  {person?.original_name && person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
