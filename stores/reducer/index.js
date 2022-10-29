import { combineReducers } from "redux";

import user from "./user";
import transfer from "./transfer";
import topUp from "./topUp";

export default combineReducers({
  user,
  transfer,
  topUp,
});
