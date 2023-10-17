// DateTimeButton.js
import React, { useState } from "react";
import { Text, View, Button, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../constants/colors";

const DateTimeButton = ({ pickerLabel, pickerId }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate.toLocaleString());
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{pickerLabel}</Text>
            {show && (
                <DateTimePicker
                    testID={pickerId}
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "start",
    },
    label: {
        marginVertical: 8,
        letterSpacing: 0.3,
        color: colors.textColor,
    },
});

export default DateTimeButton;
