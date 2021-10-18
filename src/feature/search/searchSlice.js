import { createSlice } from '@reduxjs/toolkit'
import { startLoading, stopLoading } from '../loading/loadingSlice'
import { getCatalographicSearchResults, paginateCatalographicSearchResults } from '../../service/library/'
import { batch } from 'react-redux';

const initialState = {
  records: [],
  searchId: 0,
  page: 0,
  library: {},
  searchPerformed: false,
  pageCount: 0,
};

export const searchSlice = createSlice({
  name: 'search',

  initialState,

  reducers: {
    setLibrary: (_state, { payload }) => {
      return {
        ...initialState,
        library: payload,
      };
    },

    appendRecords: (state, { payload }) => {
      const records = [...state.records, ...payload];

      return {
        ...state,
        records,
        page: state.page + 1,
      }
    },

    setRecords: (state, { payload }) => {
      return {
        ...state,
        records: payload,
        page: 1,
      }
    },

    setSearchPerformed: (state, { payload }) => {
      return {
        ...state,
        searchPerformed: payload,
      }
    },

    setSearchId: (state, { payload }) => {
      return {
        ...state,
        searchId: payload,
      }
    },

    setPageCount: (state, { payload }) => {
      return {
        ...state,
        pageCount: payload,
      }
    },

    clearResults: () => {
      return initialState;
    }
  },
})

export const { setLibrary, appendRecords, setSearchPerformed, setSearchId, setPageCount, setRecords, clearResults } = searchSlice.actions;

export const loadSearchResults = keywords => async (dispatch, getState) => {
  const owner = 'search';

  dispatch(startLoading(owner));

  const { search: { library: { url } } } = getState();

  try {
    const result = await getCatalographicSearchResults(url, keywords);

    if (result.success) {
      const records = result.search.data;

      batch(() => {
        dispatch(setSearchPerformed(true));

        dispatch(setRecords(records));

        dispatch(setSearchId(result.success && result.search.id));

        dispatch(setPageCount(result.search.page_count));
      });
    }
    else {
      batch(() => {
        dispatch(setSearchPerformed(true));

        dispatch(setRecords([]));
      });
    }


  }
  catch (e) {
    //TODO handle error
  }

  dispatch(stopLoading(owner));
}

export const loadMoreSearchResults = async (dispatch, getState) => {
  const { search: { library: { url }, page, searchId, pageCount } } = getState();

  if (page === pageCount) {
    return;
  }

  const owner = 'paginate-search';

  dispatch(startLoading(owner));

  const result = await paginateCatalographicSearchResults(url, searchId, page + 1);

  const records = result.success ? result.search.data : [];

  batch(() => {
    dispatch(setSearchPerformed(true));

    dispatch(appendRecords(records));

    dispatch(stopLoading(owner));
  });
}

export default searchSlice.reducer