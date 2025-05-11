import { BASEURL,BaseURL_GEOCODE,GEOCODE_API_KEY } from '@env';
import axios from 'axios';
import * as Location from 'expo-location';

  export const sampleApi = async (data:any) => {
    
    try {
      const response = await axios.get(
        `${BASEURL}&q=${data.district}`
      );
        return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getCityFromCoords = async () => {
    try {
        const location = await Location.getCurrentPositionAsync ({
            accuracy: Location.Accuracy.BestForNavigation,
          });

      const res = await axios.get( `${BaseURL_GEOCODE}?lat=${location.coords.latitude}&lon=${location.coords.longitude}&api_key=${GEOCODE_API_KEY}`
      );
      const address = res.data.address;
      return {
        district: address.county || address.state_district|| address.suburb || null ,
        country: address.country || null,
      };

    } catch (err) {
      console.error('Error in external reverse geocoding:', err);
      return null;
    }
  };