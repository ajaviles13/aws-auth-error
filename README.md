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

## 📝 Notes

- [Expo Router: Docs](https://docs.expo.dev/router/introduction/)
