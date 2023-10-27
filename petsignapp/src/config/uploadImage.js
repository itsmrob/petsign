import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll,
} from "firebase/storage";

const uploadImage = async (imageUri, imageName, onProgress) => {
    if (imageUri == null) {
        return;
    }
    try {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const imageRef = ref(
            getStorage(),
            `images/${imageName}${new Date().toISOString()}`
        );
        const uploadTask = uploadBytesResumable(imageRef, blob);

        const getUploadedImage = new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    onProgress && onProgress(progress);
                },
                (error) => {
                    console.log(error);
                    reject(error);
                },
                async () => {
                    const downloadUrl = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    resolve({
                        downloadUrl,
                        metadata: uploadTask.snapshot.metadata,
                    });
                }
            );
        });
        return getUploadedImage;
    } catch (error) {
        throw new Error(error);
    }
};

export { uploadImage };
