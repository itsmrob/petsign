import { getFirebaseConfig } from "../config/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { child, getDatabase, ref, set, get } from "firebase/database";
import { authenticate } from "../slices/authSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";

const app = getFirebaseConfig();

console.log(app)

const auth = getAuth(app);

export const signUp = ({ firstName, lastName, email, password }) => {
    return async (dispatch) => {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const { uid, stsTokenManager } = result.users;
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

const saveDataToStorage = (accessToken, uid, expiryTime) => {
    const userData = {
        accessToken,
        uid,
        expiryTime: expiryTime.toISOString(),
    };
    AsyncStorage.setItem("@userData", JSON.stringify(userData));
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
    const dbRef = ref(getDatabase());
    const childRef = child(dbRef, `users/${uid}`);
    await set(childRef, userData);

    return userData;
};
