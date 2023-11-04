import { View, TextInput } from "react-native";

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

// Styles

export default CommentInput;
