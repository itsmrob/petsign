import firebaseConfig from "../../env.js";
import { initializeApp, getApp } from "firebase/app";
import {
    initializeAuth,
    getAuth,
    getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, getApp, getAuth };
