import React, { useEffect, useState } from "react";
import Services from "../../../services/Services";
import { Alert, Spinner } from "../../../services/NotiflixService";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Field, Input, Button } from '@windmill/react-ui';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PredictedSchema, ReadySchema } from "../../../Schema/ZoneCardViewSchema"
import moment from 'moment/moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { PatientUpdateSchema } from "../../../Schema/PatientUpdateSchema";
import Selecta from 'react-select';
import logo from '../../../icon/dna_crp.jpg';

const ZoneCard = () => {
  const [zoneList, setZoneList] = useState([]);
  const [availbleBedList, setAvailbleBedList] = useState([]);
  const [zoneId, setZoneId] = useState();
  const [patientBedDetails, setPatientBedDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientTransferModal, setPatientTransferModal] = useState(false);
  const [predictedModal, setPredictedModal] = useState(false);
  const [readyModal, setReadydModal] = useState(false);
  const [finalModal, setFinalModal] = useState(false);
  const [patientUpdateModal, setPatientUpdateModal] = useState(false);
  const [movePatientInfo, setMovePatientInfo] = useState({});
  const [patientUpdateInfo, setPatientUpdateInfo] = useState({});
  const [newBed, setNewBed] = useState({});
  const [predictedDate, setPredictedDate] = useState();
  const [dischargeDateTime, setDischargeDateTime] = useState();
  const [patientUpdatePredictedDate, setPatientUpdatePredictedDate] = useState();
  const [priorityLevelMaster, setPriorityLevelMaster] = useState([]);
  // const [isSpecialist, setIsSpecialist] = useState(false);
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState(false);
  const [multiSelectedOptions, setMultiSelectedOptions] = useState([]);
  const [clinicalRequirementList, setClinicalRequirementList] = useState();
  const [displayTextField, setDisplayTextField] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(ZoneSchema),
  });

  const {
    register: registerPredicte,
    handleSubmit: handleSubmitPredicte,
    formState: { errors: errorsPredicte },
  } = useForm({
    // resolver: yupResolver(PredictedSchema),
  });

  const {
    register: patientUpdate,
    handleSubmit: handleSubmitPatientUpdate,
    formState: { errors: errorsPatientUpdate },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(PatientUpdateSchema),
  });

  const {
    register: registerReady,
    handleSubmit: handleSubmitReady,
    formState: { errors: errorsReady },
    reset : resetReady
  } = useForm({
    // resolver: yupResolver(ReadySchema),
  });

  const onSubmit = async (_formData) => {
    Spinner.show();
    let data = {
      "patientBedId": movePatientInfo.patientBedId,
      "bedId": newBed
    }
    let url = 'api/ZoneBed/MovePatient';
    let response = await Services.postRequest(url, data);

    await onZoneChange(zoneId);
    closeModal();
    response === "Move success"
      ? Alert.success("Patient Transfer successfull.")
      : Alert.error(response);
    Spinner.hide();
  }

  const predictedForm = async (_formData) => {
    Spinner.show();
    let data = {
      "patientBedId": movePatientInfo.patientBedId,
      "predictedDatetime": moment(predictedDate).toISOString()
    }
    let patientdata = movePatientInfo;
    patientdata.predictedDatetime = moment(predictedDate).toISOString();
    setMovePatientInfo(patientdata);
    let url = 'api/Discharge/PredictedDischarge';
    let response = await Services.postRequest(url, data);

    await onZoneChange(zoneId);
    closeModal();
    response.statusCode === 201
      ? Alert.success("Predicted Discharge successfull.")
      : Alert.error(response);
    Spinner.hide();
  }

  const readyForm = async (_formData) => {
    Spinner.show();
    let data = {
      "patientBedId": movePatientInfo.patientBedId,
      // "isPACKOorRecovery": _formData.isPACKOorRecovery,
      "dischargeOutcome": _formData.dischargeOutcome,
      "currentLocation": _formData.currentLocation,
      "destination": (_formData.dischargeOutcome == 'repatriation' || _formData.dischargeOutcome == 'ward') ? _formData.destination : '',
      "consultantName": (_formData.dischargeOutcome == 'repatriation' || _formData.dischargeOutcome == 'ward') ? _formData.consultant : '',
    }
    let url = 'api/Discharge/ReadyToDischarge';
    let response = await Services.postRequest(url, data);

    await onZoneChange(zoneId);
    closeModal();
    response.statusCode === 201
      ? Alert.success("Ready To Discharge successfull.")
      : Alert.error(response);
    Spinner.hide();
  }

  const finalForm = async (_formData) => {
    Spinner.show();
    let data = {
      "patientBedId": movePatientInfo.patientBedId,
      "dischargeDatetime": moment(dischargeDateTime).toISOString()
    }
    let url = 'api/Discharge/FinalDischarge';
    let response = await Services.postRequest(url, data);

    await onZoneChange(zoneId);
    closeModal();
    response.statusCode === 201
      ? Alert.success("Final Discharge successfull.")
      : Alert.error(response);
    Spinner.hide();
  }

  const submitPatientUpdate = async (_formData) => {

    Spinner.show();
    var ClinicalRequirementData = "";
    if (multiSelectedOptions) {
      for (let i in multiSelectedOptions) {
        if (i == multiSelectedOptions.length - 1) {
          var value = multiSelectedOptions[i].value;
          ClinicalRequirementData += value;
        } else {
          var value = multiSelectedOptions[i].value + ',';
          ClinicalRequirementData += value;
        }
      }
    }

    let data = {
      "patientId": patientUpdateInfo.patientId,
      "provisional_diagnosis": _formData.provisionaldiagnosis,
      "priority_Level_Id": patientUpdateInfo.priorityLevelID,
      "isSpecialist": _formData.isSpecialist,
      "patientBedId": patientUpdateInfo.patientBedId,
      "predictedDatetime": typeof(patientUpdatePredictedDate) !== 'undefined' && patientUpdatePredictedDate != null? 
                                                  moment(patientUpdatePredictedDate).toISOString(): patientUpdatePredictedDate,
      "clinicalRequirements": ClinicalRequirementData
    }
    let url = 'api/From/UpdatePatientDetails';
    let response = await Services.postRequest(url, data);
    closeModal();
    response.statusCode === 201
      ? Alert.success("Patient Update successfull.")
      : Alert.error(response);
    await onZoneChange(zoneId);
    Spinner.hide();
  }



  const openModal = (val, item) => {

    if (val == 'opt1') {
      setPatientTransferModal(true);
    } else if (val == 'opt2') {
      setPredictedDate("");
      if (item.predictedDatetime) {
        let predictedDate = new Date(item.predictedDatetime);
        setPredictedDate(predictedDate)
      }
      setPredictedModal(true);
    } else if (val == 'opt3') {
      setPatientUpdateInfo(item)
      resetReady({ 'dischargeOutcome': item.dischargeOutcome });
      resetReady({ 'currentLocation': item.currentLocation });
      
      setReadydModal(true);      
    } else if (val == 'opt4') {
      setFinalModal(true);
      setDischargeDateTime("")
    } else if (val == 'opt5') {
      if (item.clinicalRequirementsArray.length > 0) {
        let data = item.clinicalRequirementsArray.map(item => ({ value: item, label: item }))
        setMultiSelectedOptions(data);
      } else {
        setMultiSelectedOptions([]);
      }
      setPatientUpdateInfo(item)
      reset({ 'provisionaldiagnosis': item.provisionaldiagnosis, 'isSpecialist': item.isSpecialist });
      if (item.predictedDatetime) {
        let date = new Date(item.predictedDatetime)
        setPatientUpdatePredictedDate(date)
      }
      else
      {
        setPatientUpdatePredictedDate(item.predictedDatetime)
      }
      setPatientUpdateModal(true);
    }
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
    setPatientTransferModal(false);
    setPredictedModal(false);
    setReadydModal(false);
    setFinalModal(false);
    setPatientUpdateModal(false);
  }

  useEffect(() => {
    Spinner.show();
    (async () => {
      Spinner.show();
      let url = 'api/ZoneBed/GetAllZone';
      let zList = await Services.getRequest(url);
      setZoneList(zList);
      Spinner.hide();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let url = 'api/From/GetAllDroupDownData';
      let response = await Services.getRequest(url);
      setPriorityLevelMaster(response.priorityLevelMaster);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let url = 'api/ClinicalRequirementMaster/GetClinicalRequirement';
      let response = await Services.getRequest(url);
      if (response.statusCode == 202) {
        let data = response.data.map(item => ({ value: item.clinicalRequirement, label: item.clinicalRequirement }))
        setClinicalRequirementList(data);
      }
    })();
  }, []);


  const onZoneChange = async (zoneId) => {
    Spinner.show();
    setZoneId(zoneId);
    let url = 'api/ZoneBed/GetPatientBed?ZoneId=' + zoneId;
    let response = await Services.getRequest(url);
    if (response.length > 0) {
      for (let i in response) {
        if (response[i].clinicalRequirements != '') {
          let dataArray = response[i].clinicalRequirements.split(',');
          response[i].clinicalRequirementsArray = dataArray;
        } else {
          response[i].clinicalRequirementsArray = [];
        }
      }
    }
    setPatientBedDetails(response);
    await bedByZoneSelect(zoneId);
    Spinner.hide();
  }

  const bedByZoneSelect = async (zoneId) => {
    Spinner.show();
    let url = '/api/ZoneBed/GetZoneBed?ZoneId=' + zoneId;
    let response = await Services.getRequest(url);
    setAvailbleBedList(response);
    setZoneId(zoneId);
    Spinner.hide();
  }


  function handleSelect(data) {
    setMultiSelectedOptions(data);
  }
  return (
    <>
      <div className="card-body">
        <h5 className="mb-3 text-left"></h5>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="has-search search-Max-w mr-2">
            <select
              className="form-control"
              id="zoneSelect"
              onChange={(event) => onZoneChange(event.target.value)}
              value={zoneId}
            >
              <option value="0">Select</option>
              {zoneList.map(zItem => (
                <option value={zItem.zoneId}>{zItem.zoneName}</option>
              ))}
            </select>
            <span type="button" className="searchIconRight"><i className="fa-solid fa-magnifying-glass"></i></span>
          </div>

       
        </div>
        <div className="row aicu-info-card">
          {patientBedDetails.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex" key={index}>
              <div className={"aicu-info flex-1 text-left " + (item.patientId == null ? "cardBg-1" : "cardBg-3")}>
                {
                  item.patientBedId > 0 &&
                  <div className="aicu-MoreInfo">
                    <div className="dropdown">
                      <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" onClick={() => { setMovePatientInfo(item); setNewBed(); openModal('opt1') }}>Patient Transfer</a>
                        <a className="dropdown-item" onClick={() => { setMovePatientInfo(item); setNewBed(); openModal('opt2', item) }}>Predicted Discharge</a>
                        <a className="dropdown-item" onClick={() => { setMovePatientInfo(item); setNewBed(); openModal('opt3', item) }}>Ready Discharge</a>
                        <a className="dropdown-item" onClick={() => { setMovePatientInfo(item); setNewBed(); openModal('opt4') }}>Final Discharge</a>
                        <div className="dropdown-item" onClick={(e) => { openModal('opt5', item); }}>Patient Update</div>

                      </div>
                    </div>
                  </div>



                }
                <div className="pName mb-2 pr-3"><i class="fa-solid fa-user"></i> {item.patientId == null ? 'Not Assigned' : item.patientName}</div>
                <div className="diagnoses mb-2"><i class="fa-solid fa-stethoscope"></i> {item.patientId == null ? "" : item.provisionaldiagnosis}</div>
                <div className="diagnoses mb-2"><i class="fa-solid fa-clipboard-user"></i>{item.patientId == null ? "" : item.provisionaldiagnosis}</div>
                {/* <h5>Today Report</h5> */}

                <ul>
                  <li><div><span>Is Specialist</span><h6>{item.patientId == null ? "" : item.isSpecialist.toString()}</h6></div></li>
                  <li><div><span>Bed N0</span><h6>{item.bedNumber}</h6></div></li>
                  <li><div><span>Lab care</span><h6>{item.priorityLevelStatus}</h6></div></li>
                  
                </ul>
            
                <ul>
                  
                  
                  {item.clinicalRequirementsArray && item.clinicalRequirementsArray.length > 0 && item.clinicalRequirementsArray.map((items, indexs) => (

                    <>
                      {items == 'IP&C' &&
                        <li >
                          <img src={require('../../../icon/ipc.png')} title={items}></img>
                        </li>
                      }
                      {items == 'RRT' &&
                        <li title={items}>
                          <img src={require('../../../icon/rrt.png')} title={items}></img>
                        </li>
                      }
                      {items == 'Log roll' &&
                        <li title={items}>
                          <img src={require('../../../icon/logrolling.jpg')} title={items}></img>
                        </li>
                      }                      
                      {items == 'Learning disability' &&
                        <li title={items}>
                          <img src={require('../../../icon/learningdisablity.png')} title={items}></img>
                        </li>
                      }
                      {items == 'DNA-CPR' &&
                        <li title={items}>
                          <img src={require('../../../icon/dna_crp.jpg')} title={items}></img>
                        </li>
                      }
                      {items == 'Special care' &&
                        <li title={items}>
                          <img src={require('../../../icon/specialcare.png')} title={items}></img>
                        </li>
                      }
                      {items == 'section 1' &&
                        <li title={items}>
                          <img src={require('../../../icon/section1.png')} title={items}></img>
                        </li>
                      }
                      {items == 'Under 25' &&
                        <li title={items}>
                          <img src={require('../../../icon/under25.png')} title={items}></img>
                        </li>
                      }
                      
                    </>


                  ))}
                </ul>
            
              </div>
            </div>
          ))
          }
        </div>

      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {patientTransferModal &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Patient Transfer</ModalHeader>
            <ModalBody>
              <Label>
                <span>Patient Details </span> {movePatientInfo.patientName}
              </Label>
              <Label>
                <span>Zones </span>
                <select
                  className="form-control"
                  id={"zoneSelect"}
                  onChange={(event) => bedByZoneSelect(event.target.value)}
                  value={zoneId}
                >
                  <option value="0">Select</option>
                  {zoneList.map(zItem => (
                    <option value={zItem.zoneId}>{zItem.zoneName}</option>
                  ))}
                </select>
              </Label>
              <Label>
                <span>Availble Beds </span>
                <select
                  className="form-control"
                  id={"zoneSelect"}
                  onChange={(event) => setNewBed(event.target.value)}
                  value={newBed}
                >
                  <option value="0">Select</option>
                  {availbleBedList.map(bItem => (
                    <option value={bItem.bedId}>{bItem.bedNumber}</option>
                  ))}
                </select>
              </Label>
            </ModalBody>
            <ModalFooter>
              <div className="hidden sm:block">
                <Button layout="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button type="submit" className="btn btn-primary" layout="outline" >Submit</Button>
              </div>
            </ModalFooter>
          </form>
        }

        {predictedModal &&
          <form onSubmit={handleSubmitPredicte(predictedForm)}>
            <ModalHeader>Predicted Discharge</ModalHeader>
            <ModalBody>
              <Label>
                <span>Predicted Discharge</span> {movePatientInfo.patientName}
              </Label>
              <Label>
                <span>predicted Date Time</span>
                <DatePicker
                  className="form-control"
                  dateFormat="dd-MM-yyyy h:mm aa"
                  selected={predictedDate}
                  onChange={(date) => setPredictedDate(date)}
                  showTimeSelect
                  placeholderText="Select Date Time"
                />
              </Label>
            </ModalBody>
            <ModalFooter>
              <div className="hidden sm:block">
                <Button layout="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button type="submit" className="btn btn-primary" layout="outline" >Submit</Button>
              </div>
            </ModalFooter>
          </form>
        }

        {readyModal &&
          <form onSubmit={handleSubmitReady(readyForm)}>
            <ModalHeader>Ready Discharge</ModalHeader>
            <ModalBody>
              <Label>
                <span>Current Location </span>
                <select
                  className="form-control"
                  id={"current_location"}
                  name="currentLocation"
                  {...registerReady("currentLocation")}
                // onChange={(event) => {
                //   let data = patientUpdateInfo;
                //   data.priorityLevelID = event.target.value;
                //   setPatientUpdateInfo(data)
                // }
                // }
                >
                  <option disabled value="">Select</option>
                  <option value="pacu">Pacu</option>
                  <option value="recovery">Recovery</option>
                  <option value="Zone_Bed">Zone/Bed</option>
                </select>
              </Label>

              <Label>
                <span>Discharge Outcome </span>
                <select
                  className="form-control"
                  id={"discharge_outcome"}
                  name="dischargeOutcome"
                  {...registerReady("dischargeOutcome")}                  
                  onChange={(event) => {
                    setDisplayTextField(false)
                   console.log(patientUpdateInfo.dischargeOutcome)
                    if (event.target.value == 'ward' || event.target.value == 'repatriation') {
                      setDisplayTextField(true)
                    }
                  }
                  }
                  value ={patientUpdateInfo.dischargeOutcome}
                >
                  <option disabled value="">Select</option>
                  <option value="home">Home</option>
                  <option value="death">Death</option>
                  <option value="ward">Ward</option>
                  <option value="repatriation">Repatriation</option> 
                </select>
              </Label>
              {displayTextField &&
                <Label>
                  <span>Destination </span>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Destination "
                    name="destination"
                    {...registerReady("destination")}
                  />
                </Label>
              }
              {displayTextField &&
                <Label>
                  <span>Consultant  </span>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Consultant"
                    name="Consultant"
                    {...registerReady("consultant")}
                  />
                </Label>
              }
              {/* <Label>
                <span>Ready Discharge</span> {movePatientInfo.patientName}
              </Label> */}
            </ModalBody>
            <ModalFooter>
              <div className="hidden sm:block">
                <Button layout="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button type="submit" className="btn btn-primary" layout="outline" >Submit</Button>
              </div>
            </ModalFooter>
          </form>
        }

        {finalModal &&
          <form onSubmit={handleSubmitPredicte(finalForm)}>
            <ModalHeader>Final  Discharge</ModalHeader>
            <ModalBody>
              <Label>
                <span>Final Discharge</span> {movePatientInfo.patientName}
              </Label>
              <Label>
                <span>Discharge Date Time </span>
                <DatePicker
                  className="form-control"
                  dateFormat="dd-MM-yyyy h:mm aa"
                  selected={dischargeDateTime}
                  onChange={(date) => setDischargeDateTime(date)}
                  showTimeSelect
                  placeholderText="Select Date Time"
                />
              </Label>
            </ModalBody>
            <ModalFooter>
              <div className="hidden sm:block">
                <Button layout="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button type="submit" className="btn btn-primary" layout="outline" >Submit</Button>
              </div>
            </ModalFooter>
          </form>
        }

        {patientUpdateModal &&
          <form onSubmit={handleSubmitPatientUpdate(submitPatientUpdate)}>
            <ModalHeader>Patient Update</ModalHeader>
            <ModalBody>

              <Label>
                <span>Priority Level </span>
                <select
                  className="form-control"
                  id={"plevel"}
                  onChange={(event) => {
                    let data = patientUpdateInfo;
                    data.priorityLevelID = event.target.value;
                    setPatientUpdateInfo(data)
                  }
                  }
                >
                  <option value="0">Select</option>
                  {priorityLevelMaster && priorityLevelMaster.length > 0 && priorityLevelMaster.map((item, index) =>
                    item.priority_Level == patientUpdateInfo.priorityLevelStatus ? (
                      <option key={index} value={item.id} selected>
                        {item.priority_Level}
                      </option>
                    ) : (
                      <option key={index} value={item.id}>{item.priority_Level}</option>
                    )
                  )}
                </select>
              </Label>

              <Label>
                <span>Provisional Diagnosis </span>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="provisional diagnosis"
                  name="provisionaldiagnosis"
                  // onClick={(event) => setProvisionalDiagnosis(event.target.value)}

                  {...patientUpdate("provisionaldiagnosis")}
                // autoComplete="off"
                />
              </Label>
              <Label>
                <span>Clinical Requirement </span>
                <Selecta
                  options={clinicalRequirementList}
                  value={multiSelectedOptions}
                  onChange={handleSelect}
                  placeholder="Select"
                  name="organ_support"
                  id="organ_supportId"
                  isSearchable={false}
                  isMulti
                />
              </Label>

              <Label>
                <span>predicted Date Time </span>
                <DatePicker
                  className="form-control"
                  dateFormat="dd-MM-yyyy h:mm aa"
                  selected={patientUpdatePredictedDate}
                  onChange={(date) => setPatientUpdatePredictedDate(date)}
                  showTimeSelect
                  placeholderText="Select Date Time"
                />
              </Label>

              <div className="form-group col-sm-6">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="ispecialist"
                    name="isSpecialist"
                    {...patientUpdate("isSpecialist")}
                    // checked={isSpecialist}
                    onClick={(event) => { setValue(event.target.checked) }}
                  />
                  <label className="custom-control-label" for="ispecialist">
                    isSpecialist
                  </label>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hidden sm:block">
                <Button layout="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button type="submit" className="btn btn-primary" layout="outline" >Submit</Button>
              </div>
            </ModalFooter>
          </form>
        }
      </Modal>
    </>
  )
}

export default ZoneCard;