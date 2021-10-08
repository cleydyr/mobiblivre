import { getStoredData, setStoredData } from "../../storage";
import { fetchAndselect } from "../../util/parser/html/htmlParser";

export async function getLibraries() {
  const { libraries } = await getStoredData();

  return libraries;
}

export async function addLibrary(library) {
  const currentData = await getStoredData();

  const {libraries} = currentData;

  const latestId = libraries
    .reduce(
      (acc, cur) => cur.id > acc ? cur.id : acc,
      0
    );

  const newData = {
    ...currentData,
    libraries: [...currentData.libraries, {...library, id: latestId + 1}],
  };

  await setStoredData(newData);

  return newData.libraries;
}

export async function getLibraryData(url) {
  const [title, subtitle] = await fetchAndselect(
    url,
    [
      '/html/body/form/div[1]/div[2]/h1/a/text()',
      '/html/body/form/div[1]/div[2]/h2/text()'
    ]
  );

  return {
    title,
    subtitle,
  };
}
