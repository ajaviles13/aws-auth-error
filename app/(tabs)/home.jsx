import { Text, View, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import {React, useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { aws_signOut } from '../../lib/amplify'
import useAmplify from '../../lib/useAmplify'
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router"

const Home = () => {
  
  // This is a custom hook that fetches all posts from lib/appwrite.js
  //const { data: posts, refetch} = useAmplify(getAllData);

  // Bring in the app global variables
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const handleSignOut = async () => {
    try {
      await aws_signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/signIn");
      
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Allowing the user to refresh the page by pulling down
    // Re Call videos -> if any new videos appeared
    setRefreshing(false);

  };
  
  return (
    // I had to use "h-screen" to make the SafeAreaView fill the screen because "h-full" was not working
    <SafeAreaView className="bg-primary h-screen"> 
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        WELCOME HOME
      </Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
      
      <FlatList 
 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home
