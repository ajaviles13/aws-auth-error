# React Native Expo Project with AWS Amplify Authentication Bug

This is a React Native project using Expo and AWS Amplify for authentication. The app is built to provide basic Sign Up and Sign In functionality, with additional screens for app content. Currently, the Sign Up feature works as expected, but there are issues with the Sign In and Auto Sign In features.

Project Structure
The project follows a structured folder organization for authentication and main app screens. AWS Amplify functions are stored separately in a lib folder.

Folder Layout

## 📁 Folder Layout

```sh
app
├── _layout.jsx
├── index.jsx
├── (auth)
│   ├── _layout.jsx
│   ├── confirmCodeUponSignUp.jsx
│   ├── forgotPassword.jsx
│   ├── signIn.jsx
│   └── signUp.jsx
└── (tabs)
    ├── _layout.jsx
    ├── bookmark.jsx
    ├── create.jsx
    ├── home.jsx
    └── profile.jsx

```

## Key Files
-> lib/amplify.js: Contains AWS Amplify setup and functions that are imported and used in "signIn.jsx", "signUp.jsx", and "confirmCodeUponSignUp.jsx"
-> context/GlobalProvider.js: A global context provider for the app, meant to store and share AWS User information across screens.
-> app/_index.jsx: The main app entry point where GlobalProvider is initialized.

## 🚨 Current Issues

### Sign In and Auto Sign In Bugs

#### Issue: 
After signing up and confirming OTP, the AWS User created information can be seen (console.log), and saved to the GlobalProvider variables. However, if I the close the app and reopen it, I am not authenticated (the aws_getCurrentUser in my GlobalProvider) doesn't correctly Auto Log me in. Also, when I sign out and try to sign back in, the "Sign In" does not work and throws me a message: "Error during sign in: [Unknown: An unknown error has occurred.]"

#### Expected Behavior: 
AWS User information should be stored in GlobalProvider upon successful sign-up confirmation. This context provider wraps the app's navigation, making AWS User data accessible across all screens. Even when the app is closed and the use opens it back up the GlobalProvider spins up running the "aws_getCurrentUser()" function to perform an autoSignInResponse so we can get authenticate the user and proceed to the (tabs) without having to sign in again. And if I sign out manually within the app, then it takes me to the (auth) route and if I "Sign In" I should be directed back to (tabs). 

#### Related Code:
AWS Amplify functions: lib/amplify.js
Global context: context/GlobalProvider.js

### To Reproduce the "Sign In" Issue
1. Sign up for a new account.
2. Confirm OTP and you'll be directed to the (tabs)/home.jsx
3. Click the Sign Out
4. Attempt to Sign In
5. Observe the bug where AWS User information fails to be authenticated with Sign In

### To Reproduce the "Auto Sign In" Issue
1. Sign up for a new account.
2. Confirm OTP and you'll be directed to the (tabs)/home.jsx
3. Close the app and open it back up
4. Observe the bug where you are not auto logged in and you are force to either Sign In or Sign Up

#### Usage Notes
This README is intended to help collaborators understand the current state of the project and locate relevant files quickly for troubleshooting.



