import React from "react";
import '../../../Styles/main.css';
import {useSelector, useDispatch} from 'react-redux';
const CountBlockDischarge = () => {
  const dischargeCount = useSelector((state) => state.dashboard.data.dischargeCount ? state.dashboard.data.dischargeCount:0);
  return(
<div className="col col-xs-12 mb-4">
        <div className="card h-100 border-0 bg-color-5">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center cardSml">
              <span className="card-icon rounded-circle bg-color-lite-5 mr-2">
              <i class="fa-solid fa-door-open"></i>
              </span>
              <div>
                <h5>Discharge</h5>
                <h3 className="mb-0">{dischargeCount}</h3>
              </div>

            </div>

          </div>
        </div>
      </div>
      );
}

export default CountBlockDischarge;