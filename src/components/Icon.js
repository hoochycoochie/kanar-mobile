import React from "react";
import Icon from "react-native-vector-icons/dist/FontAwesome";

export default function({ size, color, name }) {
  return <Icon size={size} name={name} color={color} />;
}
