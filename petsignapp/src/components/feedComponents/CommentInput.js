import { View, TextInput } from "react-native";
import PropTypes from "prop-types";

const CommentInput = ({ onSubmit }) => {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        onSubmit(text);
        setText("");
    };

    return (
        <View>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Enter your comment..."
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

CommentInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

// Styles

export default CommentInput;
