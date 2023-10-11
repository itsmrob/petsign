import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

const ReportForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        petName: "",
        petBreed: "",
        petColor: "",
        location: "",
        date: "",
        time: "",
        details: "",
    });

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        // Validar datos antes de enviar
        const { petName, location, date, time } = formData;
        if (petName && location && date && time) {
            onSubmit(formData);

            // Limpiar campos después de enviar
            setFormData({
                petName: "",
                petBreed: "",
                petColor: "",
                location: "",
                date: "",
                time: "",
                details: "",
            });
        } else {
            // Manejar errores o mostrar un mensaje al usuario
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pet Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pet Name"
                value={formData.petName}
                onChangeText={(text) => handleChange("petName", text)}
            />

            <Text style={styles.label}>Pet Breed</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pet Breed"
                value={formData.petBreed}
                onChangeText={(text) => handleChange("petBreed", text)}
            />

            <Text style={styles.label}>Pet Color</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pet Color"
                value={formData.petColor}
                onChangeText={(text) => handleChange("petColor", text)}
            />

            <Text style={styles.label}>Location</Text>
            {/* Componente de mapa podría ir aquí */}

            <Text style={styles.label}>Date</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Date"
                value={formData.date}
                onChangeText={(text) => handleChange("date", text)}
            />

            <Text style={styles.label}>Time</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Time"
                value={formData.time}
                onChangeText={(text) => handleChange("time", text)}
            />

            <Text style={styles.label}>Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Details"
                multiline
                numberOfLines={4}
                value={formData.details}
                onChangeText={(text) => handleChange("details", text)}
            />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

ReportForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "blue",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ReportForm;
