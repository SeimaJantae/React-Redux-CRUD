import axios from "axios";

export const ActionTypes = {
  FETCH_BLOGS: "FETCH_BLOGS",
  FETCH_BLOG: "FETCH_BLOG",
  CREATE_BLOG: "CREATE_BLOG",
  EDIT_BLOG: "EDIT_BLOG",
  DELETE_BLOG: "DELETE_BLOG",
};

const apiUrl = "https://65cacb89efec34d9ed865094.mockapi.io/blogs";

export const fetchBlogs = () => async (dispatch) => {
  const response = await axios.get(apiUrl);
  dispatch({ type: ActionTypes.FETCH_BLOGS, payload: response.data });
};

export const fetchBlog = (blogId) => async (dispatch) => {
  const response = await axios.get(`${apiUrl}/${blogId}`);
  dispatch({ type: ActionTypes.FETCH_BLOG, payload: response.data });
};

export const createBlog = (blog) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, blog);
    dispatch({ type: ActionTypes.CREATE_BLOG, payload: response.data });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editBlog = (blog) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${blog.id}`, blog);
    dispatch({ type: ActionTypes.EDIT_BLOG, payload: response.data });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteBlog = (blogId) => async (dispatch) => {
  await axios.delete(`${apiUrl}/${blogId}`);
  dispatch({ type: ActionTypes.DELETE_BLOG, payload: blogId });
};
