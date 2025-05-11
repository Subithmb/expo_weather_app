import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCityFromCoords, sampleApi } from './api._requests';
import { formatDateTime,weatherdataType } from '@/utils';

export default function WeatherScreen() {
  
  const [isCelsius, setIsCelsius] = useState(true);
  const [isKph, setIsKph] = useState(true);
    
  const [weatherdata,setWeatherData]=useState<weatherdataType | null>(null)
  
  
  const fetchWeather = useCallback(async () => {
    try {
      setWeatherData(null);
      const locationData = await getCityFromCoords();
      if (!locationData) return;
      const weather = await sampleApi(locationData);
      setWeatherData(weather);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!weatherdata) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-700">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading weather data...</Text>
      </View>
    );
  }

  const temp_c =weatherdata?.current?.temp_c ;
  const temp_f = weatherdata?.current?.temp_f
  const wind_kph = weatherdata?.current?.wind_kph
  const wind_mph = weatherdata?.current?.wind_mph
  const iconUrl =  'https:' + weatherdata.current.condition.icon;

  return (
    <View className="flex-1 bg-purple-700 px-4 py-6 ">

      <View className="flex-row justify-between  items-center">
        <View  className="flex-row  items-center gap-2">
        <Ionicons name="map" size={24} color="white" />
        <Text className="text-white text-lg font-semibold text-center ">{weatherdata?.location?.country} / {weatherdata?.location?.name}</Text>
        </View>
        <TouchableOpacity onPress={fetchWeather}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="items-center my-8">
        <Text className="text-white text-sm mb-2">{weatherdata?.current?.condition?.text}</Text>

        <Image   source={{ uri:iconUrl }} className="w-40 h-40 mt-4" />
        <TouchableOpacity onPress={() => setIsCelsius(!isCelsius)}>
          <Text className="text-white text-[96px] font-bold">
            {isCelsius ? `${temp_c}°C` : `${temp_f}°F`}
          </Text>
        </TouchableOpacity>

        <Text className="text-white mt-4">{formatDateTime(weatherdata?.current?.last_updated)}</Text>
      </View>

      <View className="flex-row justify-between bg-purple-800 rounded-2xl p-4 mb-4">
        <View className="items-center">
          <Ionicons name="umbrella-outline" size={24} color="red" />
          <Text className="text-white mt-2">30°</Text>
          <Text className="text-white text-sm">Precipitation</Text>
        </View>
        <View className="items-center">
          <Ionicons name="water-outline" size={24} color="skyblue" />
          <Text className="text-white mt-2">{weatherdata?.current?.humidity}°</Text>
          <Text className="text-white text-sm">Humidity</Text>
        </View>
        <View className="items-center">
          <Ionicons name="navigate-outline" size={24} color="cyan" />
          <TouchableOpacity onPress={() => setIsKph(!isKph)}>
            <Text className="text-white mt-2">
              {isKph ? `${wind_kph} km/h` : `${wind_mph.toFixed(1)} mph`}
            </Text>
          </TouchableOpacity>
          <Text className="text-white text-sm">Wind</Text>
        </View>
      </View>
    </View>
  );
}
