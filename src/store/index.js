import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from '../feature/loading/loadingSlice'
import libraryReducer from '../feature/library/librarySlice'
import searchReducer from '../feature/search/searchSlice'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    library: libraryReducer,
    search: searchReducer,
  },
})