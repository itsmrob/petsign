import React from "react";
import { Text, View,  StyleSheet } from "react-native";

const FeedScreen = () => {
    return (
        <View style={styles.container}>
            <Text>FeedScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default FeedScreen;
