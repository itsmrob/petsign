import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const ReporteFormulario = ({ onSubmit }) => {
    const [nombre, setNombre] = useState("");
    const [raza, setRaza] = useState("");
    const [color, setColor] = useState("");
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [contacto, setContacto] = useState("");
    const [fotoURL, setFotoURL] = useState("");

    const handleFormSubmit = () => {
        // Crea un objeto con la información del reporte
        const reporteMascota = {
            nombre,
            raza,
            color,
            ubicacion: {
                latitud: parseFloat(latitud),
                longitud: parseFloat(longitud),
            },
            fecha,
            hora,
            descripcion,
            contacto,
            fotoURL,
        };

        // Llama a la función onSubmit pasando el reporte como argumento
        onSubmit(reporteMascota);
    };

    return (
        <View style={styles.formulario}>
            <Text style={styles.label}>Nombre de la mascota:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />

            <Text style={styles.label}>Raza:</Text>
            <TextInput
                style={styles.input}
                value={raza}
                onChangeText={setRaza}
            />

            <Text style={styles.label}>Color:</Text>
            <TextInput
                style={styles.input}
                value={color}
                onChangeText={setColor}
            />

            <Text style={styles.label}>Latitud de ubicación:</Text>
            <TextInput
                style={styles.input}
                value={latitud}
                onChangeText={setLatitud}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Longitud de ubicación:</Text>
            <TextInput
                style={styles.input}
                value={longitud}
                onChangeText={setLongitud}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Fecha:</Text>
            <TextInput
                style={styles.input}
                value={fecha}
                onChangeText={setFecha}
                placeholder="YYYY-MM-DD"
            />

            <Text style={styles.label}>Hora:</Text>
            <TextInput
                style={styles.input}
                value={hora}
                onChangeText={setHora}
                placeholder="HH:mm"
            />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
            />

            <Text style={styles.label}>Contacto:</Text>
            <TextInput
                style={styles.input}
                value={contacto}
                onChangeText={setContacto}
            />

            <Text style={styles.label}>URL de la foto:</Text>
            <TextInput
                style={styles.input}
                value={fotoURL}
                onChangeText={setFotoURL}
            />

            <Button title="Enviar Reporte" onPress={handleFormSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    formulario: {
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ReporteFormulario;
