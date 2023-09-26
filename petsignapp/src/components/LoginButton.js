import {
    Button,
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const bgColor = (type) => {
    switch (type) {
        case "google":
            return "#1976D2";
        case "facebook":
            return "#4D6FA9";
        default:
            return "white";
    }
};

const LoginButton = ({ children, type, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    backgroundColor: bgColor(type),
                    ...styles.buttonContainer,
                }}>
                <View style={styles.iconWrapper}>
                    <View style={styles.iconContainer}>
                        {type === "google" && (
                            <FontAwesome
                                name="google"
                                size={24}
                                color="black"
                            />
                        )}
                        {type === "facebook" && (
                            <FontAwesome
                                name="facebook"
                                size={24}
                                color="#4D6FA9"
                            />
                        )}
                    </View>
                </View>
                <View style={styles.childrenContainer}>
                    <Text
                        style={{
                            position: "absolute",
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold",
                            left: 30,
                        }}>
                        {children}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: width * 0.8,
        padding: 10,
        alignSelf: "center",
        borderRadius: 5,
        marginBottom: 12,
    },
    iconWrapper: {
        marginRight: 10,
    },
    iconContainer: {
        backgroundColor: "white",
        height: 32,
        width: 32,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    childrenContainer: {
        justifyContent: "center",
    },
});

export default LoginButton;
