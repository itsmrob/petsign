import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
} from "react-native";
import Input from "./../Input";
import SubmitButton from "./../SubmitButton";
import DateTimeButton from "../DateTimeButton";
import { FontAwesome, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import CustomDropdown from "../CustomDropdown";

const ReportForm = ({ onSubmit }) => {
    const petInformation = {
        petName: "",
        petBreed: "",
        petColor: "",
        location: "",
        date: "",
        time: "",
        details: "",
    };
    const [formData, setFormData] = useState(petInformation);
    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        const { petName, location, date, time } = formData;
        if (petName && location && date && time) {
            onSubmit(formData);
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
            console.log("Something went wrong");
        }
    };

    return (
        <View style={styles.container}>
            <Input
                id="petName"
                label="Nombre de la mascota"
                iconPack={FontAwesome}
                icon="paw"
                onInputChanged={handleSubmit}
                autoCapitalize="none"
                errorText={""}
            />
            <Input
                id="petType"
                label="Tipo de mascota"
                iconPack={FontAwesome}
                icon="paw"
                onInputChanged={handleSubmit}
                autoCapitalize="none"
                errorText={""}
            />
            <Input
                id="petBreed"
                label="Raza de la mascota"
                iconPack={FontAwesome}
                icon="paw"
                onInputChanged={handleSubmit}
                autoCapitalize="none"
                errorText={""}
            />
            <Input
                id="petColor"
                label="Color de la mascota"
                iconPack={FontAwesome}
                icon="tint"
                onInputChanged={handleSubmit}
                autoCapitalize="none"
                errorText={""}
            />

            <Text style={styles.label}>Location</Text>
            {/* Componente de mapa podría ir aquí */}

            <DateTimeButton
                pickerId="petLostTime"
                pickerLabel="Ultima vez visto"
            />
            <Input
                id="petLostDetails"
                label="Brinda mas detalles"
                iconPack={FontAwesome}
                icon="pencil"
                onInputChanged={handleSubmit}
                autoCapitalize="none"
                errorText={""}
                multiline={true}
                numberOfLines={5}
                editable={true}
            />
            <SubmitButton
                title="Generate Report"
                onPress={() => console.log("submitting data")}
                style={{ marginTop: 20 }}

                // disabled={!formState.formIsValid}
            />
        </View>
    );
};

/*

            <Button
                title="Tipo de mascota"
                onPress={() => setModalVisible(true)}
            />
            <CustomDropdown
                label="Tipo de mascota"
                options={["Gato", "Perro", "Mapache", "Otro"]}
                onOptionSelected={(option) => console.log(option)}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
*/

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
