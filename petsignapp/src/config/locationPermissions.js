import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";

export const locationPermissions = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        const getLocationPermissions = async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission to access location was denied");
                    return;
                }

                let mineLocation = await Location.getCurrentPositionAsync({});
            } catch (error) {
                console.error(
                    "Something went wrong while getting your location",
                    error
                );
            }
        };
        getLocationPermissions();
    }, []);
};
