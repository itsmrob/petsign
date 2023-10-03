import { app, getAuth } from "../config/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    getReactNativePersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { child, getDatabase, ref, set, get } from "firebase/database";
import { authenticate } from "../slices/authSlice";
import { getUserData } from "../actions/userActions";

import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth(app);

export const signUp = ({ firstName, lastName, email, password }) => {
    return async (dispatch) => {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;

            const expiryTime = new Date(expirationTime);

            const userData = await createUser({
                firstName,
                lastName,
                email,
                uid,
            });

            dispatch(authenticate({ token: accessToken, userData }));

            saveDataToStorage(accessToken, uid, expiryTime);

        } catch (error) {
            const errorCode = error.code;
            let errorMessage = "Something went wrong";
            if (errorCode === "auth/email-already-in-use") {
                errorMessage = "This email is already in use";
            }
            throw new Error(errorMessage);
        }
    };
};

export const signIn = ({ email, password }) => {
    return async (dispatch) => {
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;

            const userData = await getUserData(uid);

            const expiryTime = new Date(expirationTime);

            dispatch(authenticate({ token: accessToken, userData }));

            saveDataToStorage(accessToken, uid, expiryTime);
        } catch (error) {
            // console.log("errorrr ", error);
            let message = "Something went wrong while you're login in";
            if (
                error.code == "auth/wrong-password" ||
                error.code == "auth/user-not-found"
            ) {
                message = "The username or password was incorrect";
            }
            throw new Error(message);
        }
    };
};

export const signOut = async () => {
    const storedAuthInfo = await AsyncStorage.getItem("@userData");
    if (storedAuthInfo) {
        AsyncStorage.removeItem("@userData");
    }
    return {
        type: "SIGN_OUT",
    };
};

const createUser = async ({ firstName, lastName, email, uid }) => {
    const firstLast = `${firstName} ${lastName}`.toLowerCase();
    const userData = {
        firstName,
        lastName,
        firstLast,
        email,
        uid,
        signUpDate: new Date().toISOString(),
    };

    try {
        const dbRef = ref(getDatabase());
        const childRef = child(dbRef, `users/${uid}`);
        await set(childRef, userData);
    } catch (error) {
        throw new Error(error);
    } finally {
        return userData;
    }
};

const saveDataToStorage = (accessToken, uid, expiryTime) => {
    const userData = {
        accessToken,
        uid,
        expiryTime: expiryTime.toISOString(),
    };
    AsyncStorage.setItem("@userData", JSON.stringify(userData));
};
