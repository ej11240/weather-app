import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
const API_KEY="347c05ed278306843f271a8ea013fe29";

export default class extends React.Component {
  state={
    isLoading:true
  }
  
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);
    console.log(data);
  };
  
  getLocation = async () => {
    try{
      const response=await Location.requestPermissionsAsync();

      const {coords:{latitude, longitude}}=await Location.getCurrentPositionAsync();
      
      this.getWeather(latitude, longitude);
      this.setState({isLoading:false});
    
    }catch(error){ //사용자가 권한을 주지 않았을 때
      Alert.alert("Can't find you.", "So sad");
    }
  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const {isLoading}=this.state;
    return isLoading ?<Loading />:null;
  }
}
