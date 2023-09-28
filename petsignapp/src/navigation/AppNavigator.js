import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";

import AuthScreen from "../screens/AuthScreen";
// import StartUpScreen from "../screens/StartUpScreen";

import { useSelector } from "react-redux";

const AppNavigator = () => {
    const isAuth = useSelector((state) => state.auth.token !== null && state.auth.token !== "");

    console.log("isAuth", isAuth)

    // const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
    /*
        
        This is when the user tries to login in and it fails, return AuthScreen 
        This is when the user is already logged in because of the token, return Home 
    */
    return (
        <NavigationContainer>
        {isAuth && <MainNavigator />}
        {!isAuth && <AuthScreen />}
        </NavigationContainer>
    );
};

export default AppNavigator;
