import { createSlice } from '@reduxjs/toolkit'
import { batch } from 'react-redux';
import {
  getLibraries,
  addLibrary as serviceAddLibrary,
  getLibraryData,
  deleteLibrary as serviceDeleteLibrary
} from '../../service/library';
import { startLoading, stopLoading } from '../loading/loadingSlice';

export const librarySlice = createSlice({
  name: 'library',

  initialState: {
    libraries: [],
  },

  reducers: {
    addLibrary: ({ libraries }, { payload }) => {
      return {
        libraries: [...libraries, payload]
      };
    },

    setLibraries: ({ }, { payload }) => {
      return {
        libraries: payload
      };
    }
  },
})

export const loadLibraries = async dispatch => {
  const owner = 'library-loading';

  dispatch(startLoading(owner));

  const libraries = await getLibraries();

  dispatch(librarySlice.actions.setLibraries(libraries));

  dispatch(stopLoading(owner));
}

export const deleteLibrary = (id) => async dispatch => {
  const owner = 'library-deleting';

  dispatch(startLoading(owner));

  await serviceDeleteLibrary(id);

  batch(() => {
    dispatch(loadLibraries);

    dispatch(stopLoading(owner));
  });
}

export const addLibraryAsync = library => async dispatch => {
  const owner = 'add-library';

  dispatch(startLoading(owner));

  const { title, subtitle, i18n } = await getLibraryData(library.url);

  const libraries = await serviceAddLibrary({
    ...library,
    title,
    subtitle,
    i18n
  });

  dispatch(librarySlice.actions.setLibraries(libraries));

  dispatch(stopLoading(owner));
}

export default librarySlice.reducer