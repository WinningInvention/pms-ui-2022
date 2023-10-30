import React from "react";
import '../../../Styles/main.css';
import {useSelector, useDispatch} from 'react-redux';
const CountBlockReferral = () => {
  const referalCount = useSelector((state) => state.dashboard.data.referalCount ? state.dashboard.data.referalCount:0);
    return(
        <div className="col col-xs-12 mb-4">
        <div className="card h-100 border-0 bg-color-2">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center cardSml">
              <span className="card-icon rounded-circle bg-color-lite-2 mr-2">
                <i class="fa-solid fa-users"></i>
              </span>
              <div>
                <h5>Referral</h5>
                <h3 className="mb-0">{referalCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CountBlockReferral;