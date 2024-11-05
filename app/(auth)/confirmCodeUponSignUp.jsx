import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, StyleSheet } from "react-native";
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import { aws_signUpConfirmation } from '../../lib/amplify'
import { useGlobalContext } from "../../context/GlobalProvider";  
import { resendSignUpCode } from 'aws-amplify/auth';

const confirmCodeUponSignUp = () => {

  const { globalEmail, setUser, user, setIsLoggedIn } = useGlobalContext();   // Get the global email address that was inputted at the SignUpPage
  const [isSubmitting, setIsSubmitting] = useState(false);

  //console.log('globalEmail: ', globalEmail);
  
  ////###################### ACTION ITEMS ######################////
  // Need to implement some way to capture the username (email address) from
  // the previous Sign Up screen and pass it to this screen 
  ////###################### ACTION ITEMS ######################////
  const [form, setForm] = useState({
    email: globalEmail,
    confirmationCode: ''
  });

  const onConfirmCodeSubmit = async () => {
    setIsSubmitting(true);
    try {
      const signUpConfirmResult = await aws_signUpConfirmation(form);
      let newSetUser = deepMerge(user, signUpConfirmResult); // Update the global 'user' JSON based on confirmation code completed
      console.log("\n'newSetUser': ", newSetUser)
      setUser(newSetUser);

      setIsLoggedIn(true);
      // Redirect to the home page
      router.replace("/home"); 

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally{
      setIsSubmitting(false);
    }
  }

  // Deep merge function that will merge the 'signUpConfirmResult' JSON with 
  //   the original 'user' JSON from signUp to create the updated JSON for 'user'
  function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    return Object.assign(target || {}, source);
  }

  // Function for handling is the "Resend Code" is clicked
  const onResendCodePress = async () => {
    try{
      const resendCodeResult = await resendSignUpCode({
        username: globalEmail
      });
      console.log('resendCodeResult: ', resendCodeResult);
    }catch(error){
      Alert.alert('Error', error.message);
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
            Enter the Confirmation Code we just emailed to '{globalEmail}'
          </Text>
          <FormField 
            title="Confirmation Code"
            value={form.confirmationCode}
            handleChangeText={(e) => setForm({ ...form, confirmationCode: e })}
            otherStyles="mt-7"
            keyboardType="number-pad"
            fieldIcon={icons.code_icon}
          />

          <CustomButton
            title="Continue"
            handlePress={onConfirmCodeSubmit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
            borderColor="#1A1A1A"
            borderWidth={2}
            bgColor = "#EBEBF2"
          />

          <CustomButton
            title="Resend Code"
            handlePress={onResendCodePress}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
            borderColor="#EBEBF2"
            borderWidth={2}
            bgColor = "#1A1A1A"
            textStyles = "text-secondary-200"
          />

        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default confirmCodeUponSignUp;

const styles = StyleSheet.create({})
