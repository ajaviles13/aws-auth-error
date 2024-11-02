import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, StyleSheet } from "react-native";
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { getCurrentUser, signInAuto } from '../../lib/amplify'
import { useGlobalContext } from "../../context/GlobalProvider";  

const forgotPassword = () => {
  const { registeredEmail, setRegisteredEmail } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let onlyShowOneAlert = false;

  const [form, setForm] = useState({
    registeredEmail: '',
  })

  const submit = async () => {
    if(!form.email) {
      Alert.alert('Sign In Error', 'Email & Password required to sign in.');
      onlyShowOneAlert = true;
    }
    setIsSubmitting(true);

    try{
        // Code for sending password reset link to email


    }catch(error){
      if(!onlyShowOneAlert){
        Alert.alert('Error', error.message);
      }
    }finally{
      setIsSubmitting(false);
    }
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={1}  // Increase this value to add more space between keyboard and input
      >
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[70vh] px-4 my-6">
          <Image
            source={images.pp_logo_horizonal}
            className="w-[350px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-xl text-white text-semibold mt-10 font-pregular">
            Enter the email address associated with your account and we'll send you a link to reset your password. 
          </Text>
          <FormField 
            title="Email"
            value={form.registeredEmail}
            handleChangeText={(e) => setForm({ ...form, registeredEmail: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            fieldIcon={icons.email_icon}
          />

          <CustomButton
            title="Continue"
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
            borderColor="#1A1A1A"
            borderWidth={2}
            bgColor = "#EBEBF2"
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link href="signUp" className="text-lg font-psemibold text-secondary-100">
              Sign Up
            </Link>
          </View>

        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default forgotPassword;

const styles = StyleSheet.create({})