import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../config/firebaseConfig";

const getFirebaseConfig = app;

export const getUserData = async (userId) => {
    try {
        const app = getFirebaseConfig;
        const dbRef = ref(getDatabase(app));
        const userRef = child(dbRef, `users/${userId}`);
        const snapshot = await get(userRef);

        return snapshot.exists() ? snapshot.val() : {};
    } catch (error) {
        throw new Error(error);
    }
};
