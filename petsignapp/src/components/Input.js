import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import colors from "../constants/colors";

const Input = (props) => {
    const onChangedText = (text) => {
        props.onInputChanged && props.onInputChanged(props.id, text);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputContainer}>
                {props.icon && (
                    <props.iconPack
                        name={props.icon}
                        size={props.iconSize || 15}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    {...props} //get all props which can be id, label, etc.
                    style={styles.input}
                    onChangeText={onChangedText}
                />
            </View>
            {props.errorText && (
                <View style={styles.errorContainer}>
                    <Text style={styles.textError}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    inputContainer: {
        width: "100%",
        backgroundColor: colors.nearlyWhite,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginVertical: 8,
        letterSpacing: 0.3,
        color: colors.textColor,
    },
    icon: {
        marginRight: 10,
        color: colors.grey,
    },
    input: {
        color: colors.textColor,
        flex: 1,
        // flexShrink: 1,
        letterSpacing: 0.3,
        paddingTop: 0,
    },
    errorContainer: {
        marginVertical: 5,
    },
    textError: {
        color: "red",
        fontSize: 13,
        // fontFamily: "regular",
        letterSpacing: 0.3,
    },
});

export default Input;
