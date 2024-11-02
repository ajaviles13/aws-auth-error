import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, StyleSheet } from "react-native";
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { aws_signIn } from '../../lib/amplify'
import { useGlobalContext } from "../../context/GlobalProvider"; 

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  let onlyShowOneAlert = false;

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const onSignInPressed = async () => {
    setError('');

    if(!form.email || !form.password) {
      Alert.alert('Sign In Error', 'Email & Password required to sign in.');
      onlyShowOneAlert = true;
    }
    setIsSubmitting(true);
    try {  
      const signInResult = await aws_signIn(form);
      setUser(signInResult);
      setIsLoggedIn(true);
      router.replace('/home');  // Redirect the user to the home page
    } catch (err) {
        setError(err.message)
        console.log('Catch Error: ', error);
    } finally{
        setIsSubmitting(false);
        console.log('Finally Error: ', error);
    }
  };
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={10}  // Increase this value to add more space between keyboard and input
      >
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[70vh] px-4 my-6">
          <Image
            source={images.pp_logo_horizonal}
            className="w-[350px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Capitol Records
          </Text>
          <FormField 
            title="Email *"
            value={form.email}
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
            title="Sign In"
            handlePress={onSignInPressed}
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

          <View className="justify-center pt-5 flex-row gap-2">
            <Link href="forgotPassword" className="text-lg font-pregular underline text-secondary-200">
              Forgot Password
            </Link>
          </View>

        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn;

const styles = StyleSheet.create({})