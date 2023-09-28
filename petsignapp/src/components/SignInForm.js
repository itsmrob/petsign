import React, { useCallback, useReducer, useState } from "react";
import { View, Text } from "react-native";
import Input from "../components/Input";

import { validatePassword, validateEmail } from "../utils/validationContraints";
import { validateInput } from "../actions/formActions";
import { formReducer } from "../reducers/formReducer";

import { FontAwesome, Feather } from "@expo/vector-icons";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";

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

    const [formState, dispatchFormState] = useReducer(
        formReducer,
        initialState
    );

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = () => {
        setLoading(true);
        console.log('loggin in')
        // let inputValues = formState.inputValues;
        // try {
            
        // } catch (error) {
            
        // }
    };

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            dispatchFormState({
                inputId,
                inputValue,
                validationResult: validateInput(inputId, inputValue),
            });
        },
        [dispatchFormState]
    );
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
