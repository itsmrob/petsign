import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Platform,
    Button
} from "react-native";
import PropTypes from "prop-types";

const CustomDropdown = ({
    label,
    options = [],
    onOptionSelected,
    visible,
    onClose,
}) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        onOptionSelected(option);
    };

    return (
        <View>
            <Text>{label}</Text>
            <Modal
                visible={visible}
                animationType="slide"
                transparent
                onRequestClose={onClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.optionContainer}>
                        <Text style={styles.sortByText}>Sort by:</Text>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.option,
                                    selectedOption === option &&
                                        styles.selectedOption,
                                ]}
                                onPress={() => handleOptionPress(option)}>
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    optionContainer: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    sortByText: {
        fontSize: 18,
        marginBottom: 10,
        color: "#555",
    },
    option: {
        padding: 10,
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    selectedOption: {
        backgroundColor: "#e0e0e0",
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    cancelText: {
        fontSize: 16,
        color: "#333",
    },
});

CustomDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onOptionSelected: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CustomDropdown;
