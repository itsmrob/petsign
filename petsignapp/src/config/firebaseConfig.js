import firebaseParams from "../../env";
import { initializeApp, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
    initializeAuth,
    getAuth,
    getReactNativePersistence,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = firebaseParams;
const app = initializeApp(firebaseConfig);

const storage = getStorage();

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, getAuth, storage };
