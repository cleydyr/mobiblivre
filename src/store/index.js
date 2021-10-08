import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from '../feature/loading/loadingSlice'
import libraryReducer from '../feature/library/librarySlice'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    library: libraryReducer,
  },
})