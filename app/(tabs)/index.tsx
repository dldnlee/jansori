import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { getWeather } from "@/api/getWeather";
import { getIconUrl } from "@/api/getIconUrl";
import Header from "@/components/Header";


export default function Index() {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Weather Loading.....');
  const [weather, setCurrentWeather] = useState('Weather is Loading...');
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
  const [selected, setSelected] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [icon, setIcon] = useState('');
  const [weatherData, setWeatherData] = useState();


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
      setWeatherData(data.weather[0].description);
      
      const temp = data.main.temp
      setCurrentWeather(Math.round(temp).toString());
      setIcon(getIconUrl(data.weather[0].icon))
    } catch (error) {
      console.error("Error fetching data", error)
    }
  }

  
  useEffect(() => {
    checkIfLocationEnabled();
    getUserLocation();
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
      <Text style={[styles.textColor, styles.weatherText]}>{weatherData}</Text>
      <View 
      style={{
        display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
      }}>
        <Image 
        style={{
          width: 50, 
          height: 50
        }}
      source={{
          uri: icon,
        }} alt="Weather Icon" />
        <Text style={[styles.textColor, styles.weatherText]}>{weather}°C</Text></View>
    </View>
  );
}


const styles = StyleSheet.create({
  decoratedBtn: {
    color: 'white'
  },
  textColor: {
    color: 'white'
  },
  weatherText: {
    fontSize: 30
  }
})
