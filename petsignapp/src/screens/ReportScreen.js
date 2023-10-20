import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import ReportForm from "../components/feedComponents/ReportForm";

const ReportScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>Ingresa la información de tu mascota!</Text>
                </View>
                <ReportForm />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default ReportScreen;
