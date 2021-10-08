import { getStoredData, setStoredData } from "../../storage";

export async function getLibraries() {
  const { libraries } = await getStoredData();

  return libraries;
}

export async function addLibrary({
  name,
  url,
  isAuthenticated,
  userName,
  password
}) {
  const currentData = await getStoredData();

  const {libraries} = currentData;

  const latestId = libraries
    .reduce(
      (acc, cur) => cur.id > acc ? cur.id : acc,
      0
    );

  const newData = {
    ...currentData,
    libraries: [...currentData.libraries, { id: latestId + 1, name, url, isAuthenticated, userName, password }],
  };

  await setStoredData(newData);

  return newData.libraries;
}