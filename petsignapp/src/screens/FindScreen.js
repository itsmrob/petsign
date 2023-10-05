import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const FindScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission to access location was denied");
                    return;
                }

                let mineLocation = await Location.getCurrentPositionAsync({});
                setLocation(mineLocation);
            } catch (error) {
                console.error(
                    "Something went wrong while getting your location",
                    error
                );
            }
        })();
    }, []);

    const { latitude, longitude } = location?.coords ?? {};

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    // latitude: 0,
                    // longitude: 0,
                    latitude,
                    longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                provider={PROVIDER_GOOGLE}>
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="My Location"
                    />
                )}
            </MapView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default FindScreen;
