// UserProfile.js

import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const profilePhoto =
        "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
    const userData = useSelector((state) => {
        console.log(state.auth);
        return state.auth.userData;
    });

    const calculateTimeSinceSignUp = (signUpDate) => {
        const signUp = new Date(signUpDate);

        const difference = new Date() - signUp;
        const daysDifference = difference / (1000 * 60 * 60 * 24);

        if (daysDifference < 365) {
            return `${Math.floor(daysDifference)} dias`;
        }
        const yearsDifference = daysDifference / 365;
        return `${Math.floor(yearsDifference)} años`;
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
            <ScrollView>
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="black"
                    />
                </View>

                <View style={styles.profileContainer}>
                    {profilePhoto ? (
                        <Image
                            source={{ uri: profilePhoto }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.profilePlaceholder}>
                            {/* add icon if you want */}
                        </View>
                    )}
                    <Text style={styles.name}>{userData.firstLast}</Text>
                    <Text style={styles.joined}>
                        {`Unido hace ${calculateTimeSinceSignUp(
                            userData.signUpDate
                        )}`}
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Perfil</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Configuración</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.signOutButton}>
                    <Text style={styles.signOutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </ScrollView>
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
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profilePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default UserProfile;
