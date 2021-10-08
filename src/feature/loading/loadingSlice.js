import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',

  initialState: {
    status: [],
  },

  reducers: {
    startLoading: ({ status }, { payload }) => {
      return {
        status: [...status, payload]
      };
    },

    stopLoading: ({ status }, { payload }) => {
      return {
        status: status.filter(o => o !== payload)
      };
    }
  },
})

export const { startLoading, stopLoading } = loadingSlice.actions

export default loadingSlice.reducer