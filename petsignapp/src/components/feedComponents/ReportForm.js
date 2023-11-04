import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Image,
    ActivityIndicator,
} from "react-native";
import Input from "./../Input";
import SubmitButton from "./../SubmitButton";
import DateTimeButton from "../DateTimeButton";
import { FontAwesome, Feather } from "@expo/vector-icons";
import CustomDropdown from "../CustomDropdown";
import MapComponent from "../MapComponent.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formReducer } from "../../reducers/formReducer";
import { uploadImage } from "../../config/uploadImage";

import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";
import { generateReport } from "../../actions/reportActions";
import { useDispatch } from "react-redux";

const ReportForm = () => {
    const initialState = {
        inputValues: {
            petName: "",
            petBreed: "",
            petColor: "",
            petLastLocation: "",
            petLostTime: "",
            petLostDetails: "",
            petImage: "",
        },
        inputValidities: {
            petName: false,
            petBreed: false,
            petColor: false,
            petLastLocation: false,
            petLostTime: false,
            petLostDetails: false,
            petImage: false,
        },
        formIsValid: false,
    };
    const [location, setLocation] = useState();
    const [image, setImage] = useState();
    const [imageProgress, setImageProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    const [formState, dispatchFormState] = useReducer(
        formReducer,
        initialState
    );

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();

    const handleInputValues = (inputId, inputValue) => {
        dispatchFormState({
            type: "INPUT_CHANGE",
            inputId,
            inputValue,
            validationResult: true,
        });
    };

    const inputChangedHandler = useCallback(handleInputValues, [
        dispatchFormState,
    ]);

    useEffect(() => {
        if (route.params?.location) {
            const currentLocation = route.params.location;
            setLocation(currentLocation);

            dispatchFormState({
                type: "UPDATE_LOCATION",
                location: currentLocation,
            });

            if (!formState.inputValues.petImage) {
                dispatchFormState({
                    type: "UPDATE_IMAGE",
                    url: image,
                });
            }
        }
    }, [route.params?.location, formState.inputValues.petImage]);

    const handleReport = async () => {
        setLoading(true);
        try {
            await handleUploadImage();
            const action = generateReport(formState.inputValues);
            await dispatch(action);
        } catch (error) {
            console.log("Something went wrong while sending report", error);
        } finally {
            setLoading(false);
            navigation.goBack();
        }
    };

    const handleUploadImage = async () => {
        try {
            setImage(null);
            const imageResult = await uploadImage(
                image,
                formState.inputValues.petName,
                setImageProgress
            );
            const imageUrl = imageResult?.downloadUrl;
            setImage(imageUrl);
        } catch (error) {
            console.log("Something went wrong while uploading image", error);
            throw new Error(error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const petImage = result.assets[0].uri;
            setImage(petImage);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                id="petName"
                label="Nombre de la mascota"
                iconPack={FontAwesome}
                icon="paw"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={""}
            />
            <Input
                id="petType"
                label="Tipo de mascota"
                iconPack={FontAwesome}
                icon="paw"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={""}
            />
            <Input
                id="petBreed"
                label="Raza de la mascota"
                iconPack={FontAwesome}
                icon="paw"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={""}
            />
            <Input
                id="petColor"
                label="Color de la mascota"
                iconPack={FontAwesome}
                icon="tint"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={""}
            />
            <Text style={styles.label}>Imagen</Text>
            <Button title="Seleccionar imagen" onPress={pickImage} />
            <View style={styles.imageFlow}>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 200 }}
                    />
                ) : (
                    <Progress.Bar
                        progress={imageProgress}
                        width={200}
                        height={15}
                    />
                )}
            </View>
            <Text style={styles.label}>Ubicación</Text>
            <Button
                title={
                    location
                        ? "Se ha seleccionado una ubicación"
                        : "Seleccionar ubicación"
                }
                onPress={() => {
                    navigation.navigate("LocationSelection");
                }}
            />
            <DateTimeButton
                pickerId="petLostTime"
                pickerLabel="Ultima vez visto"
                onInputChanged={inputChangedHandler}
            />
            <Input
                id="petLostDetails"
                label="Brinda mas detalles"
                iconPack={FontAwesome}
                icon="pencil"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={""}
                multiline={true}
                numberOfLines={5}
                editable={true}
            />
            {loading ? (
                <View styles={{ flexDirection: "row" }}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            ) : (
                <SubmitButton
                    title="Reportar"
                    onPress={handleReport}
                    style={{ marginTop: 20 }}
                    disabled={!image}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        // fontWeight: "bold",
        marginTop: 10,
        marginBottom: 8,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "blue",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageFlow: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ReportForm;
