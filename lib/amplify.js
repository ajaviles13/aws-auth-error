import { Auth, API, Storage, Amplify } from 'aws-amplify';
import config from '../src/aws-exports'; // Ensure this path points to your aws-exports.js file
import { signIn, signUp, autoSignIn, signOut, confirmSignUp, resendSignUp } from 'aws-amplify/auth';

// Enable detailed logging for AWS Amplify
Amplify.configure(config); // Correctly configure Amplify with the config file

// ========================== //
// === User Authentication == //
// ========================== //

// Sign in a user
export const aws_signIn = async ({ email, password }) => {

    try {
        console.log("'Amplify.js' Email: ", email.trim().toLowerCase());
        console.log("'Amplify.js' Password: ", password.trim());

        let clean_email = email.trim().toLowerCase();
        let clean_password = password.trim();
        
        const signInResult = await signIn({
            'username': clean_email,
            'password': clean_password
        });
        
        console.log('signInResult: ', signInResult);
        
        return signInResult;
    } catch (e) {
        console.error('Error during sign in:', e); // Log the entire error object
        throw new Error(e.message || 'An unknown error occurred during sign in.');
    }
};


// Get current authenticated user
export const aws_getCurrentUser = async () => {
    try {
        const autoSignInResponse = await autoSignIn();
        
        // Return the user object so we can access it in GlobalProvider.js
        console.log('aws_getCurrentUser: ', autoSignInResponse);
        return autoSignInResponse;
      } catch (error) {
        console.log("Error from 'aws_getCurrentUser': ", error);
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

// Sign up a user
export const aws_signUp = async ({ username, coldPlungeTeam, email, password }) => {
    try {
        /*
        console.log("username: ", username.trim());
        console.log("cold plunge team: ", coldPlungeTeam.trim());
        console.log("email: ", email.trim());
        console.log("password: ", password.trim());
        */
        
        const signUpResult = await signUp({
            'username': email.trim().toLowerCase(),
            'password': password.trim(),
            attributes: {
                'email': email.trim(),
                //'custom:coldPlungeTeam': coldPlungeTeam, // custom attribute
                

            },
            autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }

        });
        console.log('signUpResult: ', signUpResult);
        return signUpResult;

    } catch (error) {
        console.error('Error signing up:', error);
        throw new Error('Sign up failed. Please try again.');
    }
};

// Confirm sign up with email code
export const aws_signUpConfirmation = async ({ email, confirmationCode }) => {
  try {
    const codeConfirmResult = await confirmSignUp({
      'username': email,
      confirmationCode
    });
    console.log('codeConfirmResult: ', codeConfirmResult);
    return codeConfirmResult;

  } catch (error) {
    throw new Error(error);
  }
}

// Function for handling is the "Resend Code" is clicked
const aws_resendConfirmationCode = async ( { email } ) => {
    try{
        const resendCodeResult = await resendSignUp(email);
        return resendCodeResult;
    }catch(error){
        Alert.alert('Error', error.message);
    }
}