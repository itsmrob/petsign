import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapComponent from "../components/MapComponent";

const LocationScreen = ({ selectedLocation }) => {
    return (
        <View style={styles.container}>
            <MapComponent selectedLocation={selectedLocation} />
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: 'relative'
    },
});

export default LocationScreen;
