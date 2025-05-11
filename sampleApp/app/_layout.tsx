import { Stack } from "expo-router";
import "../global.css"

export default function RootLayout() {
  return <Stack 
   screenOptions={{
    headerTitle: 'Weather App',
    headerTitleStyle: {
      fontSize: 30,           
      fontWeight: '800',  
      color: '#ffffff', 
            
    },
    headerStyle: {
      backgroundColor: '#7e22ce', 
    },
    headerTintColor: '#ffffff',   
    headerTitleAlign: 'center',  
  }}
  />;
}
