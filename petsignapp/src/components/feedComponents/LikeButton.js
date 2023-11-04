// LikeButton.js

import { TouchableOpacity, Text } from "react-native";

const LikeButton = ({ liked, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.label}>{liked ? "Unlike" : "Like"}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#148F77",
        padding: 10,
        borderRadius: 20,
    },
    label: {
        color: "white",
        fontWeight: "600",
    },
});

export default LikeButton;
