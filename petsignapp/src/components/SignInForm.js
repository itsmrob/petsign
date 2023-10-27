import React, { useCallback, useReducer, useEffect, useState } from "react";
import { Alert } from "react-native";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { formReducer } from "../reducers/formReducer";
import { validateEmail, validatePassword } from "../utils/validationContraints";
import { validateInput } from "../actions/formActions";
import { signIn } from "../actions/authActions";

import { useDispatch } from "react-redux";

const SignInForm = () => {
    let initialState = {
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
        //allows us to manage complex states, its an improvement of useState
        formReducer,
        initialState
    );

    const [error, setError] = useState();
    const [laoding, setLoading] = useState(false);

    const dispatch = useDispatch();

    const inputChangedHandler = useCallback(
        //allows us to memoize a function just to call it
        (inputId, inputValue) => {
            // console.log("inputValue ",inputValue)
            dispatchFormState({
                type: 'INPUT_CHANGE',
                inputId, //to know which input fields belongs to
                inputValue, //the value which is coming from
                validationResult: validateInput(inputId, inputValue), //if everything is ok, return undefined, otherwise will return an advice
            });
        },
        [dispatchFormState]
    );

    // console.log("mounting component", error);

    useEffect(() => {
        if (error) {
            // console.log("ERROR")
            Alert.alert("An error occured", error, [{ text: "Okay" }]);
        }
    }, [error]);

    const handleLogin = async () => {
        setLoading(true);
        let inputValues = formState.inputValues;
        try {
            const action = signIn(inputValues);
            await dispatch(action);
            setLoading(false);
            setError(null);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    let { email, password } = formState.inputValidities;

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
