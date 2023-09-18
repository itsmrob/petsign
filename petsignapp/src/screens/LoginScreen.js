import {
    View,
    Button,
    Text,
    ScrollView,
    Image,
    StyleSheet,
} from "react-native";
import { commonStyles } from "../styles/theme";
import LoginButton from "../components/LoginButton.js";
import { images } from "../constants/images";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirebaseConfig } from "../config/firebase";

const LoginScreen = () => {
    const handleGoogleLogin = async () => {
        try {
            const auth = getAuth(getFirebaseConfig());

            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            console.log(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFacebookLogin = () => {
        console.log("login with facebook");
    };

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.onBoardingLogo}>
                <Image style={styles.imageSize} source={images.logo} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>PetSign</Text>
                </View>
            </View>
            <View style={styles.onBoardingButtons}>
                <LoginButton onPress={handleGoogleLogin} type="google">
                    Login with Google
                </LoginButton>
                <LoginButton onPress={handleFacebookLogin} type="facebook">
                    Login with Facebook
                </LoginButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    onBoardingLogo: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    onBoardingButtons: {
        flex: 2,
    },
    imageSize: {
        width: 200,
        height: 200,
    },
    textContainer: {
        position: "absolute",
        bottom: 65,
        padding: 10,
        width: "100%",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "rgb(133,52,71)",
    },
});

export default LoginScreen;
