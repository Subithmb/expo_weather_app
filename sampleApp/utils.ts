import dayjs from 'dayjs';

export const formatDateTime = (datetime: string): string => {
  return datetime?dayjs(datetime).format('dddd, D MMMM | hh:mm A'):''
};


export type weatherdataType = {
    current: {
      temp_c: number;
      temp_f: number;
      wind_kph: number;
      wind_mph: number;
      humidity: number;
      condition: {
        text: string;
        icon: string;
      };
      last_updated: string;
    };
    location: {
      name: string;
      country: string;
    };
  };
  
