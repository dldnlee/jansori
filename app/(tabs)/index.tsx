import { StyleSheet, Text, View, Button, PermissionsAndroid, Alert, Image, Pressable } from "react-native";
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { getWeather } from "@/api/getWeather";
import Header from "@/components/Header";


export default function Index() {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Location Loading.....');
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
  const [selected, setSelected] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);


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
      // console.log(latitude, longitude);
      setLatitude(latitude);
      setLongitude(longitude);

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      })
      console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`
        setDisplayCurrentAddress(address);
      }
    }
  }

  async function getUserWeather() {
    try {
      const data = await getWeather(latitude, longitude);
      const temp = data.main.temp
      setDisplayCurrentAddress(Math.round(temp).toString());
    } catch (error) {
      console.error("Error fetching data", error)
    }

  }

  
  useEffect(() => {
    getUserWeather();
  }, [])


  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#191724",
        justifyContent: "center",
        position: "relative"
      }}
    >
      <Header />
      <Button
      title="Press Me"
      />
      
      <Text style={styles.textColor}>{displayCurrentAddress}</Text>
      <Text style={styles.textColor}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  decoratedBtn: {
    color: 'white'
  },
  textColor: {
    color: 'white'
  }
})
