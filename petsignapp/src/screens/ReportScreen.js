import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import ReportForm from "../components/feedComponents/ReportForm";

const ReportScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>Reportar Mascota</Text>
                <ReportForm />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ReportScreen;
