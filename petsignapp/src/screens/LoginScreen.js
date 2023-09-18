import { View, Button, Text, ScrollView } from "react-native";
import { commonStyles } from "../styles/theme";
import LoginButton from "../components/LoginButton.js";

const LoginScreen = () => {
    const handleGoogleLogin = () => {
        console.log("login with");
    };

    const handleFacebookLogin = () => {
        console.log("login with facebook");
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
 
            <View style={commonStyles.center}>
                <Text>Bienvenido</Text>
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

export default LoginScreen;
