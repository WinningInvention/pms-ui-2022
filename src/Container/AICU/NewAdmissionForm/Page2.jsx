import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NEW_ADMISSION } from '../../../Actions'
import Services from "../../../services/Services";
import Selecta from 'react-select'

const organSupport=[
  {label:'Mechanical ventilation (MV)', value:1},
  {label:'Dialysis (RRT)', value:2},
  {label:'ECMO', value:3},
  {label:'Therapeutic plasma exchange (TPE)', value:4}
]
const Page2 = (props) => {
  const dispatch = useDispatch();

  const HospitalLocation = props.formMaster.locationMaster;
  const specialityMaster = props.formMaster.specialityMaster;
  const priorityLevelMaster = props.formMaster.priorityLevelMaster;
  const ICU_care_Status = props.formMaster.icU_care_Status;
  const Admitting_consultant_name = props.formMaster.admitting_consultant_name;
  let newAdmissionObj = useSelector((state) => state.newAdmission);

  const [hospitalLoc, setHospitalLoc] = useState(newAdmissionObj.locationMaster_id);
  const [wardLocation, setWardLocation] = useState(newAdmissionObj.ward_Location_ID);
  const [otherHospital, setOtherHospital] = useState(newAdmissionObj.another_Hospital);
  const [specialist, setSpecialist] = useState(newAdmissionObj.specialityMaster_id);
  const [admittingConsultantName, setAdmittingConsultantName] = useState(newAdmissionObj.admitting_consultant_name_Id);
  const [referringStaffName, setReferringStaffName] = useState(newAdmissionObj.referring_Staff_name);
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState(newAdmissionObj.provisional_diagnosis);
  const [provisionalDiagnosisSecondary, setProvisionalDiagnosisSecondary] = useState(newAdmissionObj.provisional_diagnosis_Secondary);
  const [icuLevel, setIcuLevel] = useState(newAdmissionObj.priorityLevelMaster_id);
  const [osr, setOsr] = useState(newAdmissionObj.organ_Support_requirements);
  const [prevMedicalHistory, setPrevMedicalHistory] = useState(newAdmissionObj.previous_Medical);
  const [icuCare, setIcuCare] = useState(newAdmissionObj.icU_Care);
  const [isCardiff, setIsCardiff] = useState(newAdmissionObj.hospital_area);
  const [icuCareStatus, setIcuCareStatus] = useState(newAdmissionObj.icU_care_Status_id);
  const [wardLocationList, setWardLocationList] = useState([]);
  const [showOtherHospitalText, setShowOtherHospitalText] = useState(false);
  const [organSupportList, setOrganSupportList] = useState(organSupport);
  const [selectedOptions, setSelectedOptions] = useState();
  useEffect(() => {
    onHospitalLocationChange(hospitalLoc);
  }, [])
  useEffect(() => {
    handlePage2Changes();
  }, [hospitalLoc, wardLocation, otherHospital, specialist, admittingConsultantName, referringStaffName, provisionalDiagnosis, provisionalDiagnosisSecondary, 
    icuLevel, osr, prevMedicalHistory, icuCare, isCardiff, icuCareStatus]);

  const handlePage2Changes = () => {
  var osrValue="";
    if(selectedOptions){
      for(let i in selectedOptions){
        if(i == selectedOptions.length -1){
          var value=selectedOptions[i].value;
          osrValue+=value;
        } else {
          var value=selectedOptions[i].value + ',';
          osrValue+=value;
        }
      }
      setOsr(osrValue);
    }
    
    newAdmissionObj.locationMaster_id = hospitalLoc;
    newAdmissionObj.ward_Location_ID = wardLocation;
    newAdmissionObj.another_Hospital = otherHospital;
    newAdmissionObj.specialityMaster_id = specialist;
    newAdmissionObj.admitting_consultant_name_Id = admittingConsultantName;
    newAdmissionObj.referring_Staff_name = referringStaffName;
    newAdmissionObj.provisional_diagnosis = provisionalDiagnosis;
    newAdmissionObj.provisionalDiagnosisSecondary = provisionalDiagnosisSecondary;
    newAdmissionObj.priorityLevelMaster_id = icuLevel;
    newAdmissionObj.organ_Support_requirements = osr;
    newAdmissionObj.previous_Medical = prevMedicalHistory;
    newAdmissionObj.icU_Care = icuCare;
    newAdmissionObj.hospital_area = isCardiff;
    newAdmissionObj.icU_care_Status_id = icuCareStatus;

    dispatch({
      type: NEW_ADMISSION,
      payload: newAdmissionObj,
    });
  }

  function handleSelect(data) {
    setSelectedOptions(data);
  }


  const onHospitalLocationChange = async (HospitalLocId) => {
    setHospitalLoc(HospitalLocId);
    if (HospitalLocId == 3) {
      setShowOtherHospitalText(true);
      setWardLocationList([]);
    }
    else {
      const url = 'api/From/GetWardLocationMasterByLocationId?hospitalLocationId=' + HospitalLocId;
      let wardList = await Services.getRequest(url);
      setWardLocationList(wardList);
      setShowOtherHospitalText(false);
    }
  }
  return (
    <div className=" row align-items-center text-left">
      <div className="form-group col-sm-6">
        <label>Location of Hospital:</label>
        <select
          className="form-control"
          id="hospitalLocationSelect"
          onChange={(event) => onHospitalLocationChange(event.target.value)}
        >
          <option value="0">Select</option>
          {HospitalLocation && HospitalLocation.length > 0 &&
            HospitalLocation.map((hl) =>
              hl.id == hospitalLoc ? (
                <option value={hl.id} selected>
                  {hl.hospital_Location}
                </option>
              ) : (
                <option value={hl.id}>{hl.hospital_Location}</option>
              )
            )}
          ;
        </select>
        {showOtherHospitalText ? (
          <input
            type="text"
            className="form-control"
            id="otherHospital"
            placeholder="Type Other Hospital Name"
            value={otherHospital}
            onChange={(event) => setOtherHospital(event.target.value)}
          />
        ) : (
          ""
        )}
      </div>
      <div className="form-group col-sm-6">
        <label>Ward Location:</label>
        <select
          className="form-control"
          id="HospitalWardLocation"
          onChange={(event) => setWardLocation(event.target.value)}
        >
          <option value="0">Select</option>
          {wardLocationList && wardLocationList.length > 0 && wardLocationList.map((item) =>
            item.id == wardLocation ? (
              <option value={item.id} selected>
                {item.wards_Name}
              </option>
            ) : (
              <option value={item.id}>{item.wards_Name}</option>
            )
          )}
          ;
        </select>
      </div>
      <div className="form-group col-sm-6">
        <label for="cname">Admitting Consultant Name:</label>
        <select
          className="form-control"
          id="consultantSelect"
          onChange={(event) => setAdmittingConsultantName(event.target.value)}
        >
          <option value="0">Select</option>
          {Admitting_consultant_name && Admitting_consultant_name.length > 0 && Admitting_consultant_name.map((item) =>
            item.id == admittingConsultantName ? (
              <option value={item.id} selected>
                {item.Name}
              </option>
            ) : (
              <option value={item.id}>{item.Name}</option>
            )
          )}
          ;
        </select>
      </div>
      <div className="form-group col-sm-6">
        <label for="dob">Referring Staff Name:</label>
        <input
          type="text"
          className="form-control"
          id="referringStaffName"
          value={referringStaffName}
          onChange={(event) => setReferringStaffName(event.target.value)}
        />
      </div>
      <div className="form-group col-sm-6">
        <label for="d-block">Diagnosis or Provisional diagnosis</label>
        <input
          type="text"
          className="form-control"
          id="provisionalDiagnosis"
          value={provisionalDiagnosis}
          onChange={(event) => setProvisionalDiagnosis(event.target.value)}
        />
      </div>
      <div className="form-group col-sm-6">
        <label for="d-block">Provisional diagnosis Secondary</label>
        <input
          type="text"
          className="form-control"
          id="provisionalDiagnosisSecondary"
          value={provisionalDiagnosisSecondary}
          onChange={(event) => setProvisionalDiagnosisSecondary(event.target.value)}
        />
      </div>
      <div className="form-group col-sm-6">
        <label for="d-block">Level of ICU care required or anticipated</label>
        <select
          className="form-control"
          id="priorityLevelMaster"
          onChange={(event) => setIcuLevel(event.target.value)}
        >
          <option value="0">Select</option>
          {priorityLevelMaster && priorityLevelMaster.length > 0 && priorityLevelMaster.map((item) =>
            item.id == icuCare ? (
              <option value={item.id} selected>
                {item.priority_Level}
              </option>
            ) : (
              <option value={item.id}>{item.priority_Level}</option>
            )
          )}
          ;
        </select>
      </div>
      <div className="form-group col-sm-6">
        <label for="d-block">Clinical or Organ support requirements</label>
        {/* <select
          className="form-control"
          id="exampleFormControlSelect2"
          onChange={(event) => {
            setOsr(event.target.value)
          }

          }
        >
          <option value="0">Select</option>
          <option value="1">Mechanical ventilation (MV)</option>
          <option value="2">Dialysis (RRT)</option>
          <option value="3">ECMO</option>
          <option value="4">Therapeutic plasma exchange (TPE)</option>
        </select> */}


        <Selecta 
          options={organSupportList}
          value={selectedOptions}
         onChange={handleSelect}
         placeholder="Select"
          name="organ_support"
          id="organ_supportId"
          isSearchable={false}
         isMulti
          // onChange={(e) => {
          //   userIdHandler()
           
          // }
          // }
          // onInputChange={searchData}
        />
      </div>
      <div className="form-group col-sm-6">
        <label for="d-block">Previous Medical/surgical History</label>
        <input
          type="text"
          className="form-control"
          id="prevMedicalHis"
          value={prevMedicalHistory}
          onChange={(event) => setPrevMedicalHistory(event.target.value)}
        />
      </div>
      <div className="form-group col-sm-6">
        <label>Speciality:</label>
        <select
          className="form-control"
          id="specialityMasterSelect"
          onChange={(event) => setSpecialist(event.target.value)}
        >
          <option value="0">Select</option>
          {specialityMaster && specialityMaster.length > 0 && specialityMaster.map((item) =>
            item.id == specialist ? (
              <option value={item.id} selected>
                {item.speciality}
              </option>
            ) : (
              <option value={item.id}>{item.speciality}</option>
            )
          )}
          ;
        </select>
      </div>
      <div className="form-group col-sm-6">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="isSpecialityIcuCare"
            checked={icuCare}
            onChange={(event) => setIcuCare(event.target.checked)}
          />
          <label className="custom-control-label" for="isSpecialityIcuCare">
            ICU Care Speciality
          </label>
        </div>
      </div>
      <div className="form-group col-sm-6">

        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="isCardiff"
            checked={isCardiff}
            onChange={(event) => setIsCardiff(event.target.checked)}
          />
          <label className="custom-control-label" for="isCardiff">
            Cardiff
          </label>
        </div>
      </div>
      <div className="form-group col-sm-6">
        <label for="d-block">ICU care Status</label>
        <select
          className="form-control"
          id="exampleFormControlSelect2"
          onChange={(event) => setIcuCareStatus(event.target.value)}
        >
          <option value="0">Select</option>
          {ICU_care_Status && ICU_care_Status.length > 0 && ICU_care_Status.map((item) =>
            item.id == icuCareStatus ? (
              <option value={item.id} selected>
                {item.status}
              </option>
            ) : (
              <option value={item.id}>{item.status}</option>
            )
          )}
          ;
        </select>
      </div>
    </div>
  );
}

export default Page2;