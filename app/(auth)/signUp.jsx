import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, StyleSheet } from "react-native";
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import DropDownPicker from '../../components/DropDownPicker'
import { Link, router } from 'expo-router'
import { aws_signUp } from '../../lib/amplify'
import { useGlobalContext } from "../../context/GlobalProvider";

import { Auth, API, Storage, Amplify } from 'aws-amplify';
import config from '../../src/aws-exports'; // Ensure this path points to your aws-exports.js file
Amplify.configure(config); // Correctly configure Amplify with the config file

const SignUp = () => {
  
  let singleErrorResponse = false;

  const { setGlobalEmail, setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    username: '',
    coldPlungeTeam: '',
    email: '',
    password: ''
  })

  const handleDropDownChange = (value) => {
    setForm({ ...form, coldPlungeTeam: value });
  };

  const submit = async () => {
    if (form.username === "" || form.coldPlungeTeam === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      singleErrorResponse = true;
    }

    setIsSubmitting(true);
    try {
      
      // AWS Sign Up function requires a single object
      const signUpResult = await aws_signUp(form); 
      setUser(signUpResult);
      setGlobalEmail(form.email.trim().toLowerCase())
      
      // Redirect the user to the confirmation code screen
      router.replace("/confirmCodeUponSignUp");
      //router.replace("/home"); 
      
      // #### Implement a confirmation code redirect screen before taking them to home page
      // #### Or implement an email send with a link to confirm there later

    } catch (error) {
      if (!singleErrorResponse) {
        Alert.alert("Error", error.message);
      }
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}  // Increase this value to add more space between keyboard and input
      >
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[70vh] px-4 my-6">
          <Image
            source={images.pp_logo_horizonal}
            className="w-[350px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Join Capitol Records
          </Text>
          <FormField 
            title="Username *"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            fieldIcon={icons.username_icon}
          />
          
          <DropDownPicker 
            title="Rapper Team *"
            value={form.coldPlungeTeam}
            onValueChange={handleDropDownChange} // Pass the callback function
            placeholder=""
            otherStyles={{ marginTop: 16, marginBottom: -10}}
            fieldIcon={icons.team_icon}
          />

          <FormField 
            title="Email *"
            value= {form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            fieldIcon={icons.email_icon}
            
          />
          <FormField
            title="Password *"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
            fieldIcon={icons.password_icon}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
            borderColor="#1A1A1A"
            borderWidth={2}
            bgColor = "#EBEBF2"
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link href="signIn" className="text-lg font-psemibold text-secondary-100">
              Sign In
            </Link>
          </View>

        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp;

const styles = StyleSheet.create({})