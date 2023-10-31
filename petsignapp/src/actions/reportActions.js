import { child, getDatabase, ref, set, get, push } from "firebase/database";
import { getAuth } from "firebase/auth";

export const generateReport = (reportInformation) => {
    const {
        petBreed,
        petColor,
        petImage,
        petLastLocation,
        petLostDetails,
        petLostTime,
        petName,
        petType,
    } = reportInformation;
    const auth = getAuth();
    const currentUser = auth.currentUser;
    let currentUserId = null;
    if (currentUser) {
        currentUserId = currentUser.uid;
    }
    return async (dispatch) => {
        try {
            const db = getDatabase();
            const newPost = {
                authorUID: currentUserId, // Reemplaza esto con el UID del usuario actual
                petBreed,
                petColor,
                petImage,
                petLastLocation,
                petLostDetails,
                petLostTime,
                petName,
                petType,
                createdAt: new Date().toISOString(),
                likes: {},
                comments: {},
            };

            console.log("saving ", newPost);
            const newPostRef = push(ref(db, "posts"));

            set(newPostRef, newPost)
                .then(() => {
                    console.log("Post guardado correctamente.");
                })
                .catch((error) => {
                    console.error("Error guardando el post: ", error);
                });
        } catch (error) {
            throw new Error(
                "Something went wrong while trying to post the report"
            );
        }
    };
};
