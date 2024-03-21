import { ActionTypes } from "../actions/blogActions";

const initState = {
  blogs: [],
  currentBlog: null,
};

const blogReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BLOGS:
      return { ...state, blogs: action.payload };
    case ActionTypes.FETCH_BLOG:
      return { ...state, currentBlog: action.payload };
    case ActionTypes.CREATE_BLOG:
      return { ...state, blogs: [...state.blogs, action.payload] };
    case ActionTypes.EDIT_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) => (blog.id === action.payload.id ? action.payload : blog)),
      };
    case ActionTypes.DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
      };
    default:
      return state;
  }
};

export default blogReducer;
