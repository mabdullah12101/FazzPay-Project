import { combineReducers } from "redux";

import user from "./user";
import transfer from "./transfer";

export default combineReducers({
  user,
  transfer,
});
