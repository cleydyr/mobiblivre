import React, { createContext, useEffect, useState } from "react";
import { getLibraries } from "../service/library";

function getLibrariesStateIdentifier(libraries) {
  return libraries.reduce((acc, cur) => `${acc}#${cur.id}`, "");
}

export const LibraryContext = createContext();

export const WithLibraryContext = ({ children }) => {
    const [libraries, setLibraries] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const libraries = await getLibraries();

            setLibraries(libraries);

            setLoading(false);
        }

        getData();
    }, [getLibrariesStateIdentifier(libraries), loading]);

    return (
        <LibraryContext.Provider value={{
            libraries,
            loading,
        }}>
            {children}
        </LibraryContext.Provider>
    );
}