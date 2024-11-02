import { Text, View, ScrollView, Image, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { useGlobalContext } from '../context/GlobalProvider'
import { ImageBackground } from 'react-native'
import { useEffect, useRef } from 'react'

export default function App() {

  // Import the GlobalContext and its properties so we can redirect our users to the Home page if they are already logged in
    const {isLoading, isLoggedIn } = useGlobalContext();
    if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  // Create an animated value
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Define the pulse animation
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      /*Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }), */
    ]).start();
  }, [pulseAnim]);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ImageBackground
        source={images.pp_bgImage}
        style={{ flex: 1, alignSelf: 'center' }}
        resizeMode="cover"
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="w-full justify-center items-center h-full px-4">
              <Animated.Image
                source={images.pp_icon}
                style={[styles.icon, { transform: [{ scale: pulseAnim }] }]}
                resizeMode="contain"
                marginTop={-50}
                marginBottom={50}
              />

              <View className="relative mt-5">
                <Text className="text-3xl text-gray font-bold text-center">
                  WELCOME {' '}
                  <Text>
                  </Text>
                </Text>

                <Image
                  source={images.path}
                  className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                  resizeMode='contain'
                />
              </View>

              <Text className="text-sm font-pregular text-gray mt-7 text-center">
                LET'S GET ICY
              </Text>

              <CustomButton
                title="Get Started"
                handlePress={() => router.push('/signIn')}
                containerStyles="w-full mt-7"
                borderColor="#1A1A1A"
                borderWidth={2}
                bgColor = "#EBEBF2"
              />

            </View>
          </ScrollView>

          <StatusBar backgroundColor='#161622' style="light" />
        </SafeAreaView>
      </ImageBackground>
      <Text style={styles.overlayText}>Capitol Records</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  specialText: {
    color: "#2924A6",
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'white',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  icon: {
    width: 550,
    height: 200,
  },
  overlayText: {
    position: 'absolute',
    top: 70, // Adjust as needed
    //alignItems: 'center',
    alignSelf: 'center',
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
  },
});