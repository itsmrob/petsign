import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ReportCard from "../components/FeedComponents/ReportCard";

const FeedScreen = () => {
    // Array de datos falsos para simular reportes
    const reportesFalsos = [
        {
            petName: "Fido",
            petBreed: "Labrador Retriever",
            petColor: "Amarillo",
            lastSeenlocation: "123 Calle Principal",
            lastSeenDate: "2023-10-05",
            photoURL: "URL_de_foto_1",
        },
        {
            petName: "Buddy",
            petBreed: "Golden Retriever",
            petColor: "Dorado",
            lastSeenlocation: "456 Calle Secundaria",
            lastSeenDate: "2023-10-06",
            photoURL: "URL_de_foto_2",
        },
        {
            petName: "Max",
            petBreed: "Bulldog",
            petColor: "Marrón",
            lastSeenlocation: "789 Calle Terciaria",
            lastSeenDate: "2023-10-07",
            photoURL: "URL_de_foto_3",
        },
        {
            petName: "Luna",
            petBreed: "Husky Siberiano",
            petColor: "Gris y blanco",
            lastSeenlocation: "101 Calle Cuaternaria",
            lastSeenDate: "2023-10-08",
            photoURL: "URL_de_foto_4",
        },
        {
            petName: "Rocky",
            petBreed: "Dóberman",
            petColor: "Negro y marrón",
            lastSeenlocation: "202 Calle Quinternaria",
            lastSeenDate: "2023-10-09",
            photoURL: "URL_de_foto_5",
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {reportesFalsos.map((reporte, index) => (
                <ReportCard
                    key={index}
                    petName={reporte.petName}
                    petBreed={reporte.petBreed}
                    petColor={reporte.petColor}
                    lastSeenlocation={reporte.lastSeenLocation}
                    lastSeenDate={reporte.lastSeenDate}
                    photoURL={reporte.photoURL}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default FeedScreen;
