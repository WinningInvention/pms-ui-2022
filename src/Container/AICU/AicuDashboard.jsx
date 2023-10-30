import React, { useEffect, useState } from "react";
import CountBlockNurse from "../../Components/AICU/Dashboard/CountBlockNurse";
import CountBlockZone from "../../Components/AICU/Dashboard/CountBlockZone";
import CountBlockReferral from "../../Components/AICU/Dashboard/CountBlockReferral";
import CountBlockL2L3Patient from "../../Components/AICU/Dashboard/CountBlockL2L3Patient";
import NursesChart from "../../Components/AICU/Dashboard/NursesChard";
import ZonesChart from "../../Components/AICU/Dashboard/ZonesChart";
import L2L3PatientsCharts from "../../Components/AICU/Dashboard/L2L3PatientsCharts";
import ReferralList from "../../Components/AICU/Referral/ReferralList";
import DischargeList from "../../Components/AICU/OutlierOut/DischargeList";
import ReadyDischargeList from "../../Components/AICU/Dashboard/ReadyDischargeList";
import CountBlockDischarge from "../../Components/AICU/Dashboard/CountBlockDischarge";
import '../../Styles/main.css';
import Footer from "../../Components/Footer/Footer";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import { useDispatch } from 'react-redux';
import { Alert, Spinner } from "../../services/NotiflixService";
import DashboardService from "../../services/DashboardService";
import { DASHBOARD_LIST_SUCCESS } from "../../Actions"
import Services from "../../services/Services";
import CardiffPieChart from "../../Components/AICU/Dashboard/CardiffPieChart";
import SpecialistPieChart from "../../Components/AICU/Dashboard/SpecialistPieCharts";
const AicuDashboard = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState(false);
  const [dischargeList, setDischargeList] = useState([]);
  useEffect(() => {
    (async () => {
      Spinner.show();
      let response = await DashboardService.dsahboardDataList();
      if (response.statusCode == 202) {
        dispatch({
          type: DASHBOARD_LIST_SUCCESS,
          payload: response,
        });
        setDashboardData(true)
      }
      let url = 'api/Discharge/PredictedDischargeList';
      let dischargeResponse = await Services.getRequest(url);
      if (dischargeResponse.statusCode == 202) {
        setDischargeList(dischargeResponse.data);
      }

      Spinner.hide();
    })();
  }, []);

  return (
    <>
      <TopNavigation />
      <div className="container-fluid container-p-y">
        <div className="row">
          {dashboardData &&
            <>
              <CountBlockNurse />
              <CountBlockZone />
              <CountBlockReferral />
              <CountBlockL2L3Patient />
              <CountBlockDischarge />
            </>
          }
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="row">
              {dashboardData &&
                <>
                  <NursesChart />
                  <ZonesChart />
                  <L2L3PatientsCharts />
                  <CardiffPieChart />
                  <SpecialistPieChart />
                  <ReadyDischargeList />
                  <DischargeList dischargeData={dischargeList} />
                </>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AicuDashboard;