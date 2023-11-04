import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Button,
    Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import SubmitButton from "../components/SubmitButton";
import MapComponent from "../components/MapComponent";

const PetReportScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [petInformation, setPetInformation] = useState(null);

    useEffect(() => {
        if (route.params) {
            setPetInformation(route.params);
        }
    }, [route.params]);


    const onReportSighting = () => {
        Alert.alert(
            "Función no disponible", 
            `Mascota perdida el: ${petInformation.petLostTime}`,
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]
        );
    };

    console.log(petInformation)
    if (!petInformation) {
        return (
            <View
                style={{
                    ...styles.container,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: petInformation.petImage }}
                style={styles.petImage}
            />

            <View style={styles.detailsContainer}>
                <Text style={styles.petName}>{petInformation.petName}</Text>
                <Text
                    style={
                        styles.petDetails
                    }>{`Color: ${petInformation.petColor}`}</Text>
                <Text style={styles.mapLocation}>Ultima vez visto: </Text>
                <Text style={styles.mapLocation}>Ubicación: </Text>
                <Button
                    title="Abrir mapa"
                    onPress={() => navigation.navigate("LocationSelection")}
                />
                <SubmitButton
                    title="¿Me has visto?"
                    onPress={onReportSighting}
                    style={{ marginTop: 20 }}
                    disabled={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    petImage: {
        width: "100%",
        height: 200, // Define la altura que prefieras
        resizeMode: "cover",
    },
    detailsContainer: {
        padding: 20,
    },
    petName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    petDetails: {
        fontSize: 16,
        marginBottom: 10,
    },
    mapLocation: {
        fontSize: 16,
        marginBottom: 20,
    },
    reportButton: {
        backgroundColor: "#007bff", // Color del botón, puede ser cualquiera que desees
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
    },
    reportButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default PetReportScreen;
