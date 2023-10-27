import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Text,
    Dimensions,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapSearch from "./MapSearch";
import colors from "../constants/colors";

import { useNavigation } from "@react-navigation/native";

const MapComponent = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission to access location was denied");
                    return;
                }
                const currentLocation = await Location.getCurrentPositionAsync(
                    {}
                );
                const { latitude, longitude } = currentLocation?.coords;
                setLocation({
                    coords: {
                        latitude: latitude,
                        longitude: longitude,
                    },
                });
            } catch (error) {
                console.error(
                    "Something went wrong while getting your location",
                    error
                );
            }
        })();
    }, []);

    const handlePress = (event) => {
        const selectedCoords = event.nativeEvent.coordinate;
        setLocation({
            coords: {
                latitude: selectedCoords.latitude,
                longitude: selectedCoords.longitude,
            },
        });
    };

    const handleConfirm = () => {
        console.log(location);
        navigation.navigate("ReportScreen", {
            location: location.coords,
        });
    };

    const { width } = Dimensions.get("window");

    return (
        <View style={styles.container}>
            <View style={styles.searchStyles}>
                <MapSearch
                    onLocationSelected={(selectedLocation) => {
                        setLocation({
                            coords: {
                                latitude: selectedLocation.lat,
                                longitude: selectedLocation.lng,
                            },
                        });
                    }}
                />
            </View>
            <MapView
                style={styles.map}
                region={
                    location && {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }
                }
                provider={PROVIDER_GOOGLE}
                onPress={handlePress}>
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Ubicación Seleccionada"
                    />
                )}
            </MapView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirm}>
                    <Text style={styles.textButton}>Confirmar ubicación</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    map: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    searchStyles: {
        position: "absolute",
        paddingLeft: 10,
        paddingRight: 10,
        top: 20,
        left: 10,
        right: 10,
        zIndex: 1,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 75,
        left: 50,
        right: 50,
    },
    confirmButton: {
        padding: 15,
        backgroundColor: colors.primary,
        borderRadius: 10,
    },
    textButton: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default MapComponent;
