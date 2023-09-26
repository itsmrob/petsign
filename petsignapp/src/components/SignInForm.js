import React, { useReducer } from "react";
import { View, Text } from "react-native";
import Input from "../components/Input";
import { FontAwesome, Feather } from "@expo/vector-icons";
import SubmitButton from "./SubmitButton";

const SignInForm = () => {
    const initialState = {
        inputValues: {
            email: "",
            password: "",
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    };

    const [formState, setFormState] = useReducer(() => {}, initialState);

    const handleLogin = () => {
        console.log("login in");
    };

    const inputChangedHandler = (inputId, inputValue) => {};

    const { email, password } = formState.inputValidities;
    return (
        <>
            <Input
                id="email"
                label="Email"
                iconPack={FontAwesome}
                icon="user-o"
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}
                errorText={email && email["email"]}
            />
            <Input
                id="password"
                label="Password"
                iconPack={Feather}
                icon="lock"
                autoCapitalize="none"
                secureTextEntry
                onInputChanged={inputChangedHandler}
                errorText={password && password["password"]}
            />
            <SubmitButton
                title="Sign In"
                onPress={handleLogin}
                style={{ marginTop: 20 }}
                disabled={!formState.formIsValid}
            />
        </>
    );
};

export default SignInForm;
