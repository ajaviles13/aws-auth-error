import { Amplify } from 'aws-amplify';
import config from '../src/aws-exports'; // Ensure this path points to your aws-exports.js file
import { signIn, fetchAuthSession, getCurrentUser, signOut, signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth';

// Enable detailed logging for AWS Amplify
Amplify.configure(config); // Correctly configure Amplify with the config file

// ========================== //
// === User Authentication == //
// ========================== //

// Sign in a user
export const aws_signIn = async ({ email, password }) => {

    try {

        let clean_email = email.trim().toLowerCase();
        let clean_password = password.trim();
        
        const {isSignedIn, nextStep} = await signIn({
            'username': clean_email,
            'password': clean_password
        });
        
        console.log('isSignedIn: ', isSignedIn, 'nextStep: ', nextStep);
            
        return {isSignedIn, nextStep};
    } catch (e) {
        console.error('Error during sign in:', e); // Log the entire error object
        throw new Error(e.message || 'An unknown error occurred during sign in.');
    }
};


// Get current authenticated user
export const aws_getCurrentUser = async () => {
    try {
        
        const {isSignedIn, nextStep} = await fetchAuthSession({ forceRefresh: true }); // try to refresh the session first
        const authUser = await getCurrentUser();
        
        // Return the user object so we can access it in GlobalProvider.js
        console.log('isSignedIn: ', isSignedIn, 'nextStep: ', nextStep);
        console.log('authUser: ', authUser);
        return authUser;

      } catch (error) {
        console.log("Error from 'aws_getCurrentUser': ", error);
        return null;
      }
};

// Sign out a user
export const aws_signOut = async () => {
    try {
        await signOut();
        console.log('User signed out successfully.');
    } catch (error) {
        console.error('Error signing out:', error);
        throw new Error(error);
    }
};

/*
// 1. Sign Up with autoSignIn enabled
export const aws_signUp = async ({ username, coldPlungeTeam, email, password }) => {
    try {

       // Create the avatar url using DiceBear with the first letter of the username
       const firstLetter = username[0]
       const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${firstLetter}&backgroundColor=146cf7`;
        
        const signUpResult = await signUp({
            'username': email.trim().toLowerCase(),
            'password': password.trim(),
            options: {
                autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
            },
        });
        console.log('signUpResult: ', signUpResult);
        return signUpResult;

    } catch (error) {
        console.error('Error signing up:', error);
        throw new Error('Sign up failed. Please try again.');
    }
}; */

// 1. Sign Up with autoSignIn enabled
export const handleSignUp = async ({username, coldPlungeTeam, email, password}) => {
    
    const {isSignUpComplete, userId, nextStep} = await signUp({
      'username': email.trim().toLowerCase(),
      'password': password.trim(),
      options: {
        autoSignIn: true
      },
    });
    return {isSignUpComplete, userId, nextStep};
  }

// 2. Confirm Sign Up (with email code)
export const aws_signUpConfirmation = async ({ email, confirmationCode }) => {
  try {
    const codeConfirmResult = await confirmSignUp({
      'username': email,
      confirmationCode
    });

    console.log('codeConfirmResult: ', codeConfirmResult);
    
    // 3. Trigger autoSignIn event - will not be triggered automatically
    //const { isSignedIn } = await autoSignIn();
    //console.log('isSignedIn: ', isSignedIn);

    return codeConfirmResult;

  } catch (error) {
    console.log('Error from aws_signUpConfirmation: ', error);
    throw new Error(error);
  }
}
