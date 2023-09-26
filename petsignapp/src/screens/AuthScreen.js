import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import colors from "../constants/colors";

import logo from "../../assets/images/pets.png";

const AuthScreen = () => {
    const [isSignUp, setSignUp] = useState(false);

    const manageState = () => {
        setSignUp((prev) => !prev);
    };

    return (
        <SafeAreaView style={styles.container}>
            <PageContainer>
                <ScrollView>
                    <KeyboardAvoidingView
                        style={styles.keyboardAvoidingView}
                        behavior={Platform.OS == "ios" ? "height" : undefined}
                        keyboardVerticalOffset={100}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={logo}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>
                        {isSignUp ? <SignUpForm /> : <SignInForm />}
                        <TouchableOpacity
                            style={styles.linkContainer}
                            onPress={manageState}>
                            <Text style={styles.link}>{`Switch to ${
                                isSignUp ? "Sign In" : "Sign"
                            }`}</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linkContainer: {
        alignItems: "center",
        marginVertical: 15,
    },
    link: {
        color: "blue",
        // fontFamily: "medium",
        letterSpacing: 0.3,
    },
    imageContainer: {
        flex: 3,
        alignItems: "center",
        // backgroundColor: "red",
    },
    image: {
        width: "50%",
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: "center",
    },
});
export default AuthScreen;
