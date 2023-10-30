import React from "react";
import '../../../Styles/main.css';
import {useSelector, useDispatch} from 'react-redux';
const CountBlockL2L3Patient = () => {
  const totalL2Patient = useSelector((state) => state.dashboard.data.totalL2Patient ? state.dashboard.data.totalL2Patient:0);
  const totalL3Patient = useSelector((state) => state.dashboard.data.totalL3Patient ? state.dashboard.data.totalL3Patient:0);
  return(
<div className="col col-xs-12 mb-4">
        <div className="card h-100 border-0 bg-color-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center cardSml">
              <span className="card-icon rounded-circle bg-color-lite-4 mr-2">
              <i class="fa-solid fa-bed"></i>
              </span>
              <div>
                <h5>L2/L3 Patient</h5>
                <h3 className="mb-0">{totalL2Patient} / {totalL3Patient}</h3>
              </div>

            </div>

          </div>
        </div>
      </div>
      );
}

export default CountBlockL2L3Patient;