import React from "react";
import '../../../Styles/main.css';
import {useSelector, useDispatch} from 'react-redux';
const CountBlockNurse = () => {
  const nurseCount = useSelector((state) => state.dashboard.data.nurseCount ? state.dashboard.data.nurseCount:0);
return(
    <div className="col col-xs-12 mb-4">
        <div className="card h-100 border-0 bg-color-1">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center cardSml">
              <span className="card-icon rounded-circle bg-color-lite-1 mr-2">
                <i className="fa-sharp fa-solid fa-user-nurse"></i></span>
              <div>
                <h5>Nurses</h5>
                <h3 className="mb-0">{nurseCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
);
}

export default CountBlockNurse;