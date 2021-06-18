/* Imports */

// External Modules
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import usersReducer from "./reducers/users.reducer";

const rootReducer = combineReducers({
  users: usersReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

/* Export */
export default store;
