import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import StartUpScreen from "../screens/StartUpScreen";

import MainNavigator from "./MainNavigator";

import AuthScreen from "../screens/AuthScreen";

import { useSelector } from "react-redux";

const AppNavigator = () => {
    const isAuth = useSelector((state) => {
        return (
            state.auth.token !== null &&
            state.auth.token !== "" &&
            state.auth.token !== undefined
        );
    });
    const didTryAutoLogin = useSelector(
        (state) => state.auth.didTryAutoLogin !== null
    );
    return (
        <NavigationContainer>
            {isAuth && <MainNavigator />}
            {!isAuth && didTryAutoLogin && <AuthScreen />}
            {!isAuth && !didTryAutoLogin && <StartUpScreen />}
        </NavigationContainer>
    );
};

export default AppNavigator;
