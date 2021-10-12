import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadLibraries } from "../feature/library/librarySlice";

export const LibraryContext = createContext();

export const WithLibraryContext = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLibraries);
  }, []);

  return (
    <>
      {children}
    </>
  );
}