export const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            const { inputId, inputValue, validationResult } = action;

            const updatedValidities = {
                ...state.inputValidities,
                [inputId]: validationResult,
            };

            const updatedValues = {
                ...state.inputValues,
                [inputId]: inputValue,
            };

            let updatedFormIsValid = true;
            for (let key in updatedValidities) {
                if (updatedValidities[key] !== undefined) {
                    updatedFormIsValid = false;
                    break;
                }
            }

            return {
                inputValues: updatedValues,
                inputValidities: updatedValidities,
                formIsValid: updatedFormIsValid,
            };
            break;
        case "UPDATE_LOCATION":
            return {
                ...state,
                inputValues: {
                    ...state.inputValues,
                    petLastLocation: action.location,
                },
                inputValidities: {
                    ...state.inputValidities,
                    petLastLocation: true,
                },
            };

            break;
        case "UPDATE_IMAGE":
            return {
                ...state,
                inputValues: {
                    ...state.inputValues,
                    petImage: action.imageUrl,
                },
                inputValidities: {
                    ...state.inputValidities,
                    petImage: true,
                },
            };

            break;
        default:
            return state;
    }
};
