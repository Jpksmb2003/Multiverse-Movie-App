import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbQN_H60qHO7dOHjgJrijH4oPF7pgDTpQ",
  authDomain: "shopping-list-7e620.firebaseapp.com",
  projectId: "shopping-list-7e620",
  storageBucket: "shopping-list-7e620.appspot.com",
  messagingSenderId: "1059262749162",
  appId: "1:1059262749162:ios:a17ed02633e8d318d7fa93"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };