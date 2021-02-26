import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";
import * as config from "./config";
const API_KEY=config.API_KEY;

export default class extends React.Component {
  state={
    isLoading:true
  }

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`);
    console.log(data);
    this.setState({ isLoading: false, condition:"Clear", temp: data.main.temp });
  };
  
  getLocation = async () => {
    try{
      const response=await Location.requestPermissionsAsync();

      const {coords:{latitude, longitude}}=await Location.getCurrentPositionAsync();
      
      this.getWeather(latitude, longitude);
      
    
    }catch(error){ //사용자가 권한을 주지 않았을 때
      Alert.alert("Can't find you.", "So sad");
    }
  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const {isLoading, temp, condition}=this.state;
    return isLoading ?<Loading />:<Weather temp ={temp} condition ={condition} />;
  }
}
