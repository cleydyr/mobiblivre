import React from "react";
import { addLibrary } from "../../../service/library";
import AddLibrary from "./AddLibrary";

export default ({navigation}) => {
  const handleSaveLibrary = async ({
    name,
    url,
    isAuthenticated,
    userName,
    password,
  }) => {
    
    await addLibrary({name, url, isAuthenticated, userName, password});

    navigation.goBack();
  };

  return (
    <AddLibrary onSave={handleSaveLibrary} onCancel={() => navigation.navigate('list-library')}/>
  )
}