// ShareButton.js

import { TouchableOpacity, Text } from "react-native";

const ShareButton = ({ onPress }) => {
    const share = async () => {
        try {
            const result = await Share.share({
                message: "Check out this pet report!",
                // TODO: Add link to pet report
            });

            if (result.action === Share.sharedAction) {
                if (onPress) {
                    onPress();
                }
            } else if (result.action === Share.dismissedAction) {
                // canceled
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity onPress={share}>
            <Text>Share</Text>
        </TouchableOpacity>
    );
};


export default ShareButton;
