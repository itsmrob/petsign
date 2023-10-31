import React, { useState } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
} from "react-native";
import ReportCard from "../components/feedComponents/ReportCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { useFetchReports } from "../hooks/useFetchReports";

const FeedScreen = () => {
    const { reports, loading } = useFetchReports();

    const navigation = useNavigation();

    const handleAddReport = () => {
        navigation.navigate("ReportScreen");
    };

    if (loading) {
        <View style={styles.loadingStatus}>
            <ActivityIndicator />
        </View>;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {reports.length > 0 ? (
                    reports.map((reporte, index) => (
                        <ReportCard
                            key={index}
                            petName={reporte.petName}
                            petBreed={reporte.petBreed}
                            petColor={reporte.petColor}
                            lastSeenlocation={reporte.lastSeenLocation}
                            lastSeenDate={reporte.lastSeenDate}
                            photoURL={reporte.petImage}
                        />
                    ))
                ) : (
                    <Text>No hay publicaciones todavia</Text>
                )}
            </ScrollView>
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddReport}>
                <FontAwesome name="plus" size={20} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingStatus: {
        justifyContent: "center",
        alignItems: "center",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default FeedScreen;
