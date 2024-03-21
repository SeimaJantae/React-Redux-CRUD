import { createStore, combineReducers, applyMiddleware } from "redux";
import blogReducer from "./reducers/blogReducer";
import { thunk } from "redux-thunk";
const rootReducer = combineReducers({
  blog: blogReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
