import { getStoredData, setStoredData } from "../../storage";
import { fetchAndselect } from "../../util/parser/html/htmlParser";

const actions = {
  SEARCH: 'search',
  PAGINATE: 'paginate',
};

const modules = {
  CATALOGING_BIBLIOGRAPHIC: 'cataloging.bibliographic',
};

export async function getLibraries() {
  const { libraries } = await getStoredData();

  return libraries;
}

export async function addLibrary(library) {
  const currentData = await getStoredData();

  const { libraries } = currentData;

  const latestId = libraries
    .reduce(
      (acc, cur) => cur.id > acc ? cur.id : acc,
      0
    );

  const newData = {
    ...currentData,
    libraries: [...currentData.libraries, { ...library, id: latestId + 1 }],
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

async function fetchJSONFromServer(host, module, action, otherParams) {
  console.log(JSON.stringify(arguments));

  const response = await fetch(host, {
    method: 'POST',
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      controller: 'json',
      module,
      action,
      ...otherParams
    }).toString(),
  });

  return response.json();
}

export async function getCatalographicSearchResults(host, query) {
  const result = fetchJSONFromServer(
    host,
    modules.CATALOGING_BIBLIOGRAPHIC,
    actions.SEARCH,
    {
      search_parameters: JSON.stringify({
        database: 'main',
        material_type: 'all',
        search_mode: query ? 'simple' : 'list_all',
        search_terms: query ? [{ query }] : undefined,
      })
    });

  return result;
}

export async function paginateCatalographicSearchResults(host, search_id, page) {
  const result = fetchJSONFromServer(
    host,
    modules.CATALOGING_BIBLIOGRAPHIC,
    actions.PAGINATE,
    {
      page,
      search_id,
    }
  );

  return result;
}