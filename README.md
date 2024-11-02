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
-> lib/amplify.js: Contains AWS Amplify setup and functions.
-> lib/useAmplify.js: Provides a callback for AWS Amplify operations.
-> context/GlobalProvider.js: A global context provider for the app, meant to store and share AWS User information across screens.
-> app/_index.jsx: The main app entry point where GlobalProvider is initialized.

## 🚨 Current Issues

### Sign In and Auto Sign In Bugs

#### Issue: 
After signing up and confirming OTP, the AWS User information does not save in the GlobalProvider variables. This affects the Sign In and Auto Sign In functionality.

#### Expected Behavior: 
AWS User information should be stored in GlobalProvider upon successful sign-up confirmation. This context provider wraps the app's navigation, making AWS User data accessible across all screens.
#### Related Code:
AWS Amplify functions: lib/amplify.js
Callback handling: lib/useAmplify.js
Global context: context/GlobalProvider.js

### To Reproduce the Issue
1. Sign up for a new account.
2. Confirm OTP as directed.
3. Attempt to sign in.
4. Observe the bug where AWS User information fails to load into GlobalProvider, resulting in limited access across screens.

#### Usage Notes
This README is intended to help collaborators understand the current state of the project and locate relevant files quickly for troubleshooting.



