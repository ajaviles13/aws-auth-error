import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import GlobalProvider from '../context/GlobalProvider'

SplashScreen.preventAutoHideAsync(); // Prevents the SplashScreen from auto hiding before asset loading is complete

const RootLayout = () => {
  
  // Bring in the "fontFamily" from the Tailwind CSS config file
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })
  
  // Allow some functions to execute while the page is loading
  useEffect(() => {
    if(error) throw error;  // Return error message if error
    if(fontsLoaded) SplashScreen.hideAsync();   // Hide the splash screen if fonts are loaded
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null; // Return nothing if fonts are incorrectly linked or not loaded
  
  return (
    <GlobalProvider>
      <Stack>
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="(auth)" options={{headerShown: false}}/>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
          {/* <Stack.Screen name="/search/[query]" options={{headerShown: false}}/> */}
      </Stack>
    </GlobalProvider>
  )
}

export default RootLayout

