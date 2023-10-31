import { getDatabase, ref, onValue, off } from "firebase/database";
import { useState, useEffect } from "react";

export const useFetchReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getDatabase();
        const reportsRef = ref(db, "posts");

        const listener = onValue(
            reportsRef,
            (snapshot) => {
                const fetchedReports = [];
                snapshot.forEach((childSnapshot) => {
                    fetchedReports.push({
                        ...childSnapshot.val(),
                        id: childSnapshot.key,
                    });
                });
                setReports(fetchedReports);
                setLoading(false);
            },
            (errorObject) => {
                console.error("The read failed: ", errorObject.name);
                setError(errorObject);
                setLoading(false);
            }
        );
        return () => {
            if (reports.length) {
                reports.off(listener);
            }
        };
    }, []);
    return { reports, loading };
};
