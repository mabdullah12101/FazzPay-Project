import { combineReducers } from "redux";

import user from "./user";
import transfer from "./transfer";
import topUp from "./topUp";
import dashboard from "./dashboard";
import history from "./history";

export default combineReducers({
  user,
  transfer,
  topUp,
  dashboard,
  history,
});
