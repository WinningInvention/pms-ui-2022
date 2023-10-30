import { combineReducers } from "redux";
import auth from "./auth";
import menuToggle from "./menuToggle";
import newAdmission from "./newAdmission";
import dashboard from "./dashboard";

const allReducer = combineReducers({
  auth,
  menuToggle,
  newAdmission,
  dashboard
});

export default allReducer;