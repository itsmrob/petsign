import { validate } from "validate.js";

export const validateString = (id = "", value = "") => {
    const constrains = {
        presence: { allowEmpty: false },
    };
    if (value) {
        constrains.format = {
            pattern: "[a-z]+",
            flags: "i",
        };
    }
    return id && validate({ [id]: value }, { [id]: constrains });
};

export const validateEmail = (id = "", value = "") => {
    const constrains = {
        presence: { allowEmpty: false },
    };
    if (value) {
        constrains.email = true;
    }

    return id && validate({ [id]: value }, { [id]: constrains });
};

export const validatePassword = (id = "", value = "") => {
    const constrains = {
        presence: { allowEmpty: false },
    };
    if (value) {
        constrains.length = {
            minimum: 6,
            message: "Must be at least 6 characters",
        };
    }
    return id && validate({ [id]: value }, { [id]: constrains });
};
