// DateTimeButton.js
import React, { useState } from "react";
import {
    Text,
    View,
    Button,
    Platform,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../constants/colors";

const DateTimeButton = ({ pickerId, pickerLabel, onInputChanged }) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{pickerLabel}</Text>
            <View style={styles.buttons}>
                <Button onPress={showDatepicker} title="Seleccionar fecha" />
                <Button onPress={showTimepicker} title="Seleccionar hora" />
            </View>
            <View style={styles.showDatetime}>
            <Text style={styles.dateTimeLabel}>Hora y Fecha: {date.toLocaleString()}</Text>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "start",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    showDatetime: {
        marginTop: 10,
        marginBottom: 10
    },
    dateTimeLabel: {
        fontSize: 20,
        fontWeight: '400'
    },  
    label: {
        marginVertical: 8,
        letterSpacing: 0.3,
        color: colors.textColor,
    },
});

export default DateTimeButton;
