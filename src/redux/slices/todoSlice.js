import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Api = "https://65d455c53f1ab8c63434e588.mockapi.io/job"

const apiRequest = async (method, url, data = null) => {
  const config = {
    method,
    url,
    data
  }
  const response = await axios(config)
  return response.data
}

export const fetchAllJob = createAsyncThunk("users/fetchAllJob", async () => {
  return await apiRequest('get', Api)
});

export const fetchCreateJob = createAsyncThunk(
  "users/fetchCreateJob",
  async (data) => {
    return await apiRequest('post', Api, data)
  }
);

export const fetchUpdateChecked = createAsyncThunk(
  "users/fetchUpdateChecked",
  async ({id, checked}) => {
    return await apiRequest('put', `${Api}/${id}`, {checked})
  }
);

export const fetchDeleteJob = createAsyncThunk(
  "users/fetchDeleteJob",
  async (id) => {
    return await apiRequest('delete', `${Api}/${id}`)
  }
);



const initialState = {
  listJob: [],
  isLoading: false,
  isError: false,
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJob.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllJob.fulfilled, (state, action) => {
        state.listJob = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchCreateJob.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCreateJob.fulfilled, (state, action) => {
        state.listJob.push(action.payload);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchCreateJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchUpdateChecked.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUpdateChecked.fulfilled, (state, action) => {
        state.listJob = state.listJob.map((job) =>
          job.id === action.payload.id ? action.payload : job
        );
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchUpdateChecked.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchDeleteJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDeleteJob.fulfilled, (state, action) => {
        state.listJob = state.listJob.filter((job) => job.id !== action.payload.id);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchDeleteJob.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
