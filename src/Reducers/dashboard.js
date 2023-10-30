import { DASHBOARD_LIST_SUCCESS, DASHBOARD_LIST_FAIL } from "../Actions";

const initialState = {};

  export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case DASHBOARD_LIST_SUCCESS:
          return {
            ...state,
            ...payload,
            isDashboardData:true
          };
          case DASHBOARD_LIST_FAIL:
            return {
              ...state,
              ...payload,
              isDashboardData:false
            };
          default:
            return state;
        }
}