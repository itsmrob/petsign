import firebaseConfig from "../../env.js"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const getFirebaseConfig = () => {
    return initializeApp(firebaseConfig);
};

// const firebaseApp = initializeApp(firebaseConfig);
// const firestore = getFirestore(firebaseApp);

// export { firebaseApp, firestore };
