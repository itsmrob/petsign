import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";

import { Provider } from "react-redux";
import { store } from "./src/store/store";

import { images } from "./src/constants/images";
import { cacheImages } from "./src/utils/cacheImages";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const imageAssets = cacheImages([...Object.values(images)]);

    useEffect(() => {
        const prepare = async () => {
            try {
                // await Font.loadAsync(Entypo.font);
                await Promise.all([...imageAssets]);
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        };

        prepare();
    }, []);

    const onHideLayout = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider style={styles.container} onLayout={onHideLayout}>
                <AppNavigator />
            </SafeAreaProvider>
        </Provider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
