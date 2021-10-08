import React from "react";
import { useDispatch } from "react-redux";
import { addLibraryAsync } from "../../../feature/library/librarySlice";
import AddLibrary from "./NewLibraryForm";

export default ({navigation}) => {
  const dispatch = useDispatch();

  const handleSaveLibrary = async (library) => {
    dispatch(addLibraryAsync(library));

    navigation.goBack();
  };

  return (
    <AddLibrary onSave={handleSaveLibrary} onCancel={() => navigation.goBack()}/>
  )
}