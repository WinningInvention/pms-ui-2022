import React from "react";
import '../../../Styles/main.css';
import {useSelector, useDispatch} from 'react-redux';
const CountBlockZone = () => {
  const zoneCount = useSelector((state) => state.dashboard.data.zoneCount ? state.dashboard.data.zoneCount:0);

  return(
    <div className="col col-xs-12 mb-4">
    <div className="card h-100 border-0 bg-color-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center cardSml">
          <span className="card-icon rounded-circle bg-color-lite-3 mr-2">
            <i class="fa-solid fa-location-dot"></i>
          </span>
          <div>
            <h5>Zone</h5>
            <h3 className="mb-0">{zoneCount}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default CountBlockZone;