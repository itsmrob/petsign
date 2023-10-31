// UserProfile.js

import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const userData = useSelector((state) => {
        console.log(state.auth);
        return state.auth.userData;
    });

    const calculateTimeSinceSignUp = (signUpDate) => {
        const signUp = new Date(signUpDate);

        const difference = new Date() - signUp;
        const daysDifference = difference / (1000 * 60 * 60 * 24);

        if (daysDifference < 365) {
            return `${Math.floor(daysDifference)} days`;
        }
        const yearsDifference = daysDifference / 365;
        return `${Math.floor(yearsDifference)} years`;
    };

    if (!userData) {
        return (
            <View style={styles.loadingProfile}>
                <ActivityIndicator />
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </View>

            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: "URL_DE_IMAGEN_AQUI" }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{userData.firstLast}</Text>
                <Text style={styles.joined}>
                    {calculateTimeSinceSignUp(userData.signUpDate)}
                </Text>
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Perfil</Text>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Configuración</Text>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signOutButton}>
                <Text style={styles.signOutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    loadingProfile: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    name: {
        fontSize: 32,
        fontWeight: "bold",
    },
    joined: {
        fontSize: 16,
        color: "gray",
    },
    optionsContainer: {
        marginBottom: 50,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        paddingVertical: 15,
    },
    optionText: {
        fontSize: 18,
    },
    signOutButton: {
        alignItems: "center",
        padding: 15,
        backgroundColor: "lightgray",
        borderRadius: 10,
    },
    signOutText: {
        fontSize: 18,
    },
});

export default UserProfile;
