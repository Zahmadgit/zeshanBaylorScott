React Native + Expo Project

This is a new [**React Native**](https://reactnative.dev) project, originally bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli) and later **migrated to Expo** for easier integration with **React Native Web**.

---

## Getting Started

> **Note:** Before you begin, make sure you've completed the official [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide.

---

## Step 0: Install Dependencies

Let's install our dependencies first:

```sh
# Using npm
npm install
```

---

## Step 1: Start Metro

Metro is the JavaScript bundler for React Native. To start it, run the following command from your project root:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

---

## Step 2: Build and Run Your App

With Metro running, open a new terminal and run one of the following depending on your platform:

### Android

```sh
npx expo run:android
```

This will build and launch the app on an Android device or emulator.

---

### iOS

> **Note:** If you’re using Expo with the bare workflow, **CocoaPods installation is automated**.

If needed (e.g., when manually managing native dependencies), you can still do:

```sh
bundle install         # Run once to install bundler
bundle exec pod install
```

Then run the app:

```sh
npx expo run:ios
```

---

### Web

To run the app in the browser using React Native Web:

```sh
npx expo start --web
```

---

If everything is set up correctly, your app should now be running on your emulator, simulator, device, or web browser.

You can also open the project directly in **Android Studio** or **Xcode** if you prefer working in those environments.
