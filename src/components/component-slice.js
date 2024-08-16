import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarCollapsed: false,
}

const componentSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
  },
})

export const { toggleSidebar } = componentSlice.actions

export const updateSidebar = () => async (dispatch) => {
  dispatch(toggleSidebar())
}

export default componentSlice.reducer