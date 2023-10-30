import {
    DASHBOARD_LIST_SUCCESS,
  } from ".";
  
  import DashboardService from "../services/DashboardService";
  
  export const register = (username, email, password) => async (dispatch) => {
    return DashboardService.dsahboardDataList().then(
      (response) => {
        dispatch({
          type: DASHBOARD_LIST_SUCCESS,
          payload: response,
        });
  
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: DASHBOARD_LIST_FAIL,
          payload: error,
        });
  
        // dispatch({
        //   type: DASHBOARD_LIST_ERROR,
        //   payload: error,
        // });
        return Promise.reject();
      }
    );
  };
