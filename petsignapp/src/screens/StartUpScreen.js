import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";

import colors from "../constants/colors";
// import commonStyles from "../constants/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate, setDidTryAutoLogin } from "../slices/authSlice";

import { getUserData } from "../actions/userActions";

const StartUpScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            try {
                const storedAuthInfo = await AsyncStorage.getItem("@userData");
                if (!storedAuthInfo) {
                    dispatch(setDidTryAutoLogin());
                    return;
                }
                const {
                    accessToken: token,
                    uid: userId,
                    expiryTime: expiryDateString,
                } = JSON.parse(storedAuthInfo);

                const expiryDate = new Date(expiryDateString);
                if (expiryDate <= new Date() || !token || !userId) {
                    //if all of these conditions are false, we supposed that the user tried auto login in
                    dispatch(setDidTryAutoLogin());
                    return;
                }
                const userData = await getUserData(userId); //Retrieve from the database
                dispatch(authenticate(token, userData)); //Send to the autenticate actions
            } catch (error) {
                console.error("Something went wrong", error);
            }
        };
        tryLogin();
    }, []);

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
};

export default StartUpScreen;
