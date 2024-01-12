import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const starsIcon = [
  {
    color: "grey",
  },
  {
    color: "grey",
  },
  {
    color: "grey",
  },
  {
    color: "grey",
  },
  {
    color: "grey",
  },
];

export const StarsQualification = ({ calificacion, size = 25 }) => {
  const [stars, setstars] = useState(starsIcon);

  const fillStars = () => {
    // Create a copy of the array "starsIcon" and save it in the variable "starscopy"
    const starscopy = [...starsIcon];
    // Loop through the "starscopy" array
    // eslint-disable-next-line array-callback-return
    starscopy.map((item, index) => {
      // Set the color of each item in the array to "plomo"
      item.color = "grey";
      // If the "calificacion" variable is greater than the current index, set the color of the item to "amarillo"
      if (calificacion > index) {
        item.color = "yellow";
      }
    });
    // Update the "stars" state with the new array
    setstars(starscopy);
  };

  useEffect(() => {
    fillStars();
  }, [calificacion]);

  return (
    <View style={{ flexDirection: "row", margin: 15 }}>
      {stars.map((item, index) => (
        <Ionicons key={index} name="star" size={size} color={item.color} />
      ))}
    </View>
  );
};
