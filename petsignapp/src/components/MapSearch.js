import { View, Text, StyleSheet } from "react-native";
import { styles } from "../styles/commonStyles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const MapSearch = ({ onLocationSelected }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder="Buscar lugar"
            fetchDetails={true}
            onPress={(data, details = null) => {
                const { location } = details.geometry;
                if (onLocationSelected) {
                    onLocationSelected(location);
                }
            }}
            query={{
                key: "AIzaSyBXEe8aeEWK_qj1H32h_L_4qOTtjeWnIYI",
                language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
        />
    );
};

export default MapSearch;
