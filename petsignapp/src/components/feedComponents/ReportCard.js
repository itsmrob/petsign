import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PetBasicInformation = ({ petName, petBreed, petColor }) => {
    return (
        <View style={styles.petBasicInformation}>
            <Text style={styles.nombreMascota}>{petName}</Text>
            <Text style={styles.raza}>{petBreed}</Text>
            <Text style={styles.color}>{petColor}</Text>
        </View>
    );
};

PetBasicInformation.propTypes = {
    petName: PropTypes.string.isRequired,
    petBreed: PropTypes.string.isRequired,
    petColor: PropTypes.string.isRequired,
};

const LocationDate = ({ location, date }) => {
    return (
        <View style={styles.ubicacionFecha}>
            <Text style={styles.ubicacion}>{location}</Text>
            <Text style={styles.fecha}>{date}</Text>
        </View>
    );
};

LocationDate.propTypes = {
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

const ReportCard = (props) => {
    const {
        key,
        petName,
        petBreed,
        petColor,
        lastSeenlocation,
        lastSeenDate,
        photoURL,
        onPress,
    } = props;
    // console.log(props);
    return (
        <View>
            <TouchableOpacity
                style={styles.card}
                onPress={onPress}>
                <Image source={{ uri: photoURL }} style={styles.imagen} />
                <PetBasicInformation
                    petName={petName}
                    petBreed={petBreed}
                    petColor={petColor}
                />
                <LocationDate location={lastSeenlocation} date={lastSeenDate} />
            </TouchableOpacity>
        </View>
    );
};

ReportCard.propTypes = {
    petName: PropTypes.string.isRequired,
    petBreed: PropTypes.string.isRequired,
    petColor: PropTypes.string.isRequired,
    lastSeenlocation: PropTypes.string.isRequired,
    lastSeenDate: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    imagen: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    petBasicInformation: {
        flex: 1,
    },
    nombreMascota: {
        fontSize: 16,
        fontWeight: "bold",
    },
    raza: {
        fontSize: 14,
    },
    color: {
        fontSize: 14,
    },
    ubicacionFecha: {
        alignItems: "flex-end",
    },
    ubicacion: {
        fontSize: 14,
        fontStyle: "italic",
    },
    fecha: {
        fontSize: 12,
        color: "gray",
    },
});

export default ReportCard;
