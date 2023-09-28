import React, {
    useCallback,
    useEffect,
    useReducer,
    useState,
    useRef,
} from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { FontAwesome, Feather } from "@expo/vector-icons";
import {
    validateString,
    validateEmail,
    validatePassword,
} from "../utils/validationContraints";
import { formReducer } from "../reducers/formReducer";
import { signUp } from "../actions/authActions";
import { Alert, ActivityIndicator } from "react-native";
import colors from "../constants/colors";

import { useDispatch } from "react-redux";
// import { signUp } from "../reducers/oAuthSlice";

const SignUpForm = (props) => {
    const initialState = {
        inputValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        inputValidities: {
            firstName: false,
            lastName: false,
            email: false,
            password: false,
        },
        formIsValid: false,
    };

    const [formState, dispatchFormState] = useReducer(
        formReducer,
        initialState
    );

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            let validationTypes = {
                firstName: validateString,
                lastName: validateString,
                email: validateEmail,
                password: validatePassword,
            };

            let currentValidation = validationTypes[inputId];
            if (currentValidation) {
                dispatchFormState({
                    inputId,
                    inputValue,
                    validationResult: currentValidation(inputId, inputValue),
                });
            }
        },
        [dispatchFormState]
    );

    useEffect(() => {
        if (error) {
            Alert.alert("An error occurred", error, [{ text: "Okay" }]);
        }
    }, [error]);

    const authHandler = async () => {
        let inputValues = formState.inputValues;
        setLoading(true);
        try {
            const action = signUp(inputValues);
            await dispatch(action);
            setError(null);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    let { firstName, lastName, email, password } = formState.inputValidities;
    return (
        <>
            <Input
                id="firstName"
                label="First Name"
                iconPack={FontAwesome}
                icon="user-o"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={firstName && firstName["firstName"]}
            />
            <Input
                id="lastName"
                label="Last Name"
                iconPack={FontAwesome}
                icon="user-o"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={lastName && lastName["lastName"]}
            />
            <Input
                id="email"
                label="Email"
                iconPack={Feather}
                icon="mail"
                onInputChanged={inputChangedHandler}
                keyboardType="email-address"
                autoCapitalize="none"
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
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={colors.primary}
                    style={{ marginTop: 10 }}
                />
            ) : (
                <SubmitButton
                    title="Sign Up"
                    onPress={authHandler}
                    style={{ marginTop: 20 }}
                    disabled={!formState.formIsValid}
                />
            )}
        </>
    );
};

export default SignUpForm;
