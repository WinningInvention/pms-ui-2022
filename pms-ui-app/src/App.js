import React, {useEffect,useState} from 'react';
import './App.css';
import './Styles/main.css';
import AicuDashboard from './Container/AICU/AicuDashboard';
import {Route, Routes,useNavigate} from 'react-router-dom'
import NewAdmission from './Container/AICU/NewAdmission';
import Login from './Container/General/Login';
import SignUp from './Container/General/SignUp';
import {useSelector} from 'react-redux';
import Referral from './Container/AICU/Referral';
import AddNurseAvailability from './Container/AICU/NurseAvailability/AddNurseAvailability';
import NurseAvailability from './Container/AICU/NurseAvailability/NurseAvailability';
import OutlierInQueue from './Container/AICU/OutlierInQueue';
import Repatriation from './Container/AICU/Repatriation';
import ZonesBedDetails from './Container/AICU/ZonesBedDetails';
import PatientBedAllocation from './Container/AICU/PatientBedAllocation';
import OutlierOutQueue from './Container/AICU/OutlierOutQueue';
import DischargeList from './Container/AICU/DischargeList';
import HtmlPage from './Container/AICU/HtmlPage';
import AllZoneView from './Container/AICU/AllZoneView';
import ZonesBedDetailNew from './Container/AICU/ZoneBedDetailNew';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const menuToggle = useSelector((state) => state.menuToggle.menuToggle);

  const navigate = useNavigate();
   useEffect(()=>{

    if(!isLoggedIn) 
    navigate("/login");
   },[]);
 

  return (
    <div className="App">
      <div className={`layout-wrapper ${menuToggle ? 'toggled' : ''}`}>
        <div className="layout-container">
          <div className="layout-page">
            <Routes>
              <Route exact path="/" element={<AicuDashboard />} />
              <Route path="/new-admission" element={<NewAdmission />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/add-nurse-availability" element={<AddNurseAvailability />} />
              <Route path="/nurse-availability" element={<NurseAvailability />} />
              <Route path="/outlier-in" element={<OutlierInQueue />} />
              <Route path="/repat" element={<Repatriation />} />
              <Route path="/new-admission" element={<NewAdmission />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/zones-bed" element={<ZonesBedDetails />} />
              <Route path="/all-zones" element={<AllZoneView />} />
              <Route path="/bed-allocate" element={<PatientBedAllocation />} />
              <Route path="/outlier-out" element={<OutlierOutQueue />} />
              <Route path="/discharge-list" element={<DischargeList />} />
              <Route path="/htmlpage" element={<HtmlPage />} />
              <Route path="/zones-bed-new" element={<ZonesBedDetailNew />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App;
