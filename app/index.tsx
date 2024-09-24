import { StyleSheet, Text, View, Button, PermissionsAndroid } from "react-native";
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { useState } from "react";
import * as Location from 'expo-location';


export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
