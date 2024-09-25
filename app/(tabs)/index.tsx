import { StyleSheet, Text, View, Button, PermissionsAndroid, Alert, Image, Pressable } from "react-native";
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { getWeather } from "@/api/getWeather";


export default function Index() {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Location Loading.....');
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
  const [selected, setSelected] = useState(false);

  requestPermission();

  const checkIfLocationEnabled= async ()=>{
    let enabled = await Location.hasServicesEnabledAsync();       //returns true or false
    if(!enabled){                     //if not enable 
      Alert.alert('Location not enabled', 'Please enable your Location', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else{
      setLocationServicesEnabled(enabled)         //store true into state
    }
  }

  async function getUserLocation() {
    const {coords} = await Location.getCurrentPositionAsync();
    console.log(coords);

    if(coords) {
      const {latitude, longitude} = coords;
      console.log(latitude, longitude);

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      })
      console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`
        setDisplayCurrentAddress(address);
      }
    };

  }

  async function test() {
    try {
      const data = await getWeather();
      if (!data) return;
      setDisplayCurrentAddress(JSON.stringify(data));
    } catch (error) {
      console.error("Error handling request", error);
    }
  }

  useEffect(() => {
    // console.log(getWeather());
    test();
  }, [])


  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        source={require('@/assets/images/nature-filler.jpg')}
      />
      <Button
      title="Press Me"
      />
      
      <Text>{displayCurrentAddress}</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  decoratedBtn: {
    color: 'white'
  }
})
