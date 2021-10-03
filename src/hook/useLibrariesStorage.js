import React, { createContext, useEffect, useState } from "react";
import getStoredData from "../storage";

export const LibraryContext = createContext();

export const WithLibraryContext = ({ children }) => {
    const [libraries, setLibraries] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const { libraries } = await getStoredData() || {};

            setLibraries(libraries || []);

            setLoading(false);
        }

        getData();
    }, [libraries]);

    return (
        <LibraryContext.Provider value={{
            libraries,
            loading,
        }}>
            {children}
        </LibraryContext.Provider>
    );
}