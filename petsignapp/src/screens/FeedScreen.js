import React, { useState } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import ReportCard from "../components/feedComponents/ReportCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { useFetchReports } from "../hooks/useFetchReports";

const FeedScreen = () => {
    const { reports, loading } = useFetchReports();

    // Array de datos falsos para simular reportes
    // const reportesFalsos = [
    //     {
    //         petName: "Fido",
    //         petBreed: "Labrador Retriever",
    //         petColor: "Amarillo",
    //         lastSeenLocation: "123 Calle Principal",
    //         lastSeenDate: "2023-10-05",
    //         photoURL:
    //             "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg",
    //     },
    //     {
    //         petName: "Buddy",
    //         petBreed: "Golden Retriever",
    //         petColor: "Dorado",
    //         lastSeenLocation: "456 Calle Secundaria",
    //         lastSeenDate: "2023-10-06",
    //         photoURL:
    //             "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
    //     },
    //     {
    //         petName: "Max",
    //         petBreed: "Bulldog",
    //         petColor: "Marrón",
    //         lastSeenLocation: "789 Calle Terciaria",
    //         lastSeenDate: "2023-10-07",
    //         photoURL:
    //             "https://cdn.pixabay.com/photo/2016/03/28/10/05/kitten-1285341_1280.jpg",
    //     },
    //     {
    //         petName: "Luna",
    //         petBreed: "Husky Siberiano",
    //         petColor: "Gris y blanco",
    //         lastSeenLocation: "101 Calle Cuaternaria",
    //         lastSeenDate: "2023-10-08",
    //         photoURL:
    //             "https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775_1280.jpg",
    //     },
    //     {
    //         petName: "Rocky",
    //         petBreed: "Dóberman",
    //         petColor: "Negro y marrón",
    //         lastSeenLocation: "202 Calle Quinternaria",
    //         lastSeenDate: "2023-10-09",
    //         photoURL:
    //             "https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775_1280.jpg",
    //     },
    // ];

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
