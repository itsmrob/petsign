import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { signOut } from "../actions/authActions";

const FeedScreen = () => {
    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <View style={styles.container}>
            <Button title="Sign out" onPress={handleSignOut} />
            <Text>FeedScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default FeedScreen;
