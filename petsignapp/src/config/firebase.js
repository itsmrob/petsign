import { initializeApp } from "firebase/app";
import env from "../../env";

export const getFirebaseConfig = () => {
    const firebaseConfig = {
        apiKey: env.apiKey,
        authDomain: env.authDomain,
        projectId: env.projectId,
        storageBucket: env.storageBucket,
        messagingSenderId: env.messagingSenderId,
        appId: env.appId,
        measurementId: env.measurementId,
    };

    return initializeApp(firebaseConfig);
};

// const firebaseConfig = {
//     apiKey: env.apiKey,
//     authDomain: env.authDomain,
//     projectId: env.projectId,
//     storageBucket: env.storageBucket,
//     messagingSenderId: env.messagingSenderId,
//     appId: env.appId,
//     measurementId: env.measurementId,
// };

// export default initializeApp(firebaseConfig);
