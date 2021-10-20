import React, { useState } from "react";
import { Keyboard } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addLibraryAsync } from "../../../feature/library/librarySlice";
import { startLoading } from "../../../feature/loading/loadingSlice";
import { pingServer } from "../../../service/library";
import LoadingMask from "../LoadingMask";
import AddLibrary from "./NewLibraryForm";
import ServerNotReachableView from "./search/catalogue/ServerNotReachableView";

export default ({ navigation }) => {
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);

  const [isWaitingForPingResponse, setWaitingForPingResponse] = useState(false);

  const pingAndSaveServer = async (library) => {
    if (await pingServer(library.url)) {
      dispatch(addLibraryAsync(library));

      navigation.goBack();
    }
    else {
      setModalVisible(true);
    }

    setWaitingForPingResponse(false);
  };

  const handleSaveLibrary = async (library) => {
    setWaitingForPingResponse(true);

    setModalVisible(true);

    Keyboard.dismiss();

    pingAndSaveServer(library);
  };

  const hideModal = () => {
    setModalVisible(false);
  }

  return (
    <>
      <Portal>
        <Modal
          visible={isModalVisible} onDismiss={hideModal} >
          {
            isWaitingForPingResponse
              ? <LoadingMask />
              : <ServerNotReachableView onOkPress={hideModal} />
          }
        </Modal>
      </Portal>
      <AddLibrary onSave={handleSaveLibrary} onCancel={() => navigation.goBack()} />
    </>
  )
}