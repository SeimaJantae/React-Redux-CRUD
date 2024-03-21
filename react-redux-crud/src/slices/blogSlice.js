import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://65cacb89efec34d9ed865094.mockapi.io/blogs";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const fetchBlog = createAsyncThunk("blogs/fetchBlog", async (blogId) => {
  const response = await axios.get(`${apiUrl}/${blogId}`);
  return response.data;
});

export const createBlog = createAsyncThunk("blogs/createBlog", async (blog) => {
  const response = await axios.post(apiUrl, blog);
  return response.data;
});

export const editBlog = createAsyncThunk("blogs/editBlog", async (blog) => {
  const response = await axios.put(`${apiUrl}/${blog.id}`, blog);
  return response.data;
});

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (blogId) => {
  await axios.delete(`${apiUrl}/${blogId}`);
  return blogId;
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.error = null;
          if (action.type.includes("fetchBlogs")) {
            state.blogs = action.payload;
          } else if (action.type.includes("fetchBlog")) {
            state.currentBlog = action.payload;
          } else if (action.type.includes("createBlog")) {
            state.blogs.push(action.payload);
          } else if (action.type.includes("editBlog")) {
            const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
            if (index !== -1) {
              state.blogs[index] = action.payload;
            }
          } else if (action.type.includes("deleteBlog")) {
            state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default blogSlice.reducer;
