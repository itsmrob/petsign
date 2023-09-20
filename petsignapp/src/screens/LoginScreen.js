import { View, Button, Text, ScrollView } from "react-native";
import { commonStyles } from "../styles/theme";
import LoginButton from "../components/LoginButton";


const LoginScreen = () => {
    const handleGoogleLogin = () => {
        // Lógica para iniciar sesión o registrarse con Google
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={commonStyles.center}>
                <Text>Bienvenido</Text>
                
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
