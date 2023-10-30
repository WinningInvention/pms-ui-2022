import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {NEW_ADMISSION} from '../../../Actions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page1 = (props) => {
  const dispatch = useDispatch();

  const lstInfectionControlMaster = props.formMaster.lstInfectionControlMaster;

  let newAdmissionObj = useSelector((state) => state.newAdmission);
  const [hospitalNumber, setHospitalNumber] = useState(newAdmissionObj.hospital_Number);
  const [nhsNumber, setNhsNumber] = useState(newAdmissionObj.nhS_Number);
  const [patientName, setPatientName] = useState(newAdmissionObj.name);
  const [age, setAge] = useState(newAdmissionObj.age);
  const [gender, setGender] = useState(newAdmissionObj.gender);
  const [dob, setDob] = useState(newAdmissionObj.dob);
  const [postalCode, setPostalCode] = useState(newAdmissionObj.post_Code);
  const [postalCode1, setPostalCode1] = useState(newAdmissionObj.post_Code1);
  const [healthBoard,setHealthBoard] = useState(newAdmissionObj.health_board);
  const [isrepat, setIsRepat] = useState(newAdmissionObj.repatriation);
  const [infection_Control_Information, setOtherInfectionControl] = useState(newAdmissionObj.infection_Control_Information);
  const [repatHospitalNameget, setRepatHospitalName] = useState(newAdmissionObj.repatHospitalName);
  const [repatConsultantName, setRepatConsultantName] = useState(newAdmissionObj.repatConsultantName);
  const [infectionControlID, setInfectionControlId] = useState(newAdmissionObj.infectionControlID);

  useEffect(()=> {
    handlePage1Changes();
  },[hospitalNumber,nhsNumber,patientName,age,gender,dob,postalCode,
    healthBoard,isrepat,infection_Control_Information,repatHospitalNameget,repatConsultantName,infectionControlID]);

  const handlePage1Changes = () => {
    newAdmissionObj.hospital_Number = hospitalNumber;
    newAdmissionObj.nhS_Number = nhsNumber;
    newAdmissionObj.name = patientName;
    newAdmissionObj.age = age;
    newAdmissionObj.gender = gender;
    newAdmissionObj.dob = dob;
    newAdmissionObj.post_Code = postalCode;
    newAdmissionObj.health_board = healthBoard;
    newAdmissionObj.repatriation = isrepat;
    newAdmissionObj.repatConsultantName = repatConsultantName;
    newAdmissionObj.repatHospitalName = repatHospitalNameget;
    newAdmissionObj.infection_Control_Information = infection_Control_Information;
    newAdmissionObj.infectionControlID = infectionControlID;

    console.log(newAdmissionObj);
    dispatch({
      type: NEW_ADMISSION,
      payload: newAdmissionObj,
    });
  }

    return (
      <div className=" row align-items-center text-left">
        <div className="form-group col-sm-6">
          <label for="fname">Hospital Number:</label>
          <input
            type="text"
            className="form-control"
            id="hospitalNum"
            value={hospitalNumber}
            onChange={(event) => setHospitalNumber(event.target.value)}
          />
        </div>
        <div className="form-group col-sm-6">
          <label for="lname">NHS Number:</label>
          <input
            type="text"
            className="form-control"
            id="nhsNumber"
            value={nhsNumber}
            onChange={(event) => setNhsNumber(event.target.value)}
          />
        </div>
        <div className="form-group col-sm-6"></div>
        <div className="form-group col-sm-6">
          <button className="btn btn-primary">Get Demographic Details</button>
        </div>
        <div className="form-group col-sm-12">
          <hr />
        </div>
        <div className="form-group col-sm-6">
          <label for="cname">Patient Name:</label>
          <input
            type="text"
            className="form-control"
            id="pName"
            value={patientName}
            onChange={(event) => {
              setPatientName(event.target.value);
            }}
          />
        </div>
        <div className="form-group col-sm-6">
          <label for="age">Age:</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={age}
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
        </div>
        <div className="form-group col-sm-6">
          <label className="d-block">Gender:</label>
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="male-radio"
              name="customRadio1"
              className="custom-control-input"
            />
            <label className="custom-control-label" for="male-radio">
            {" "}
              Male{" "}
            </label>
          </div>

          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="female"
              name="gender"
              className="custom-control-input"
              checked={gender === "female"}
              onChange={(event) =>
                event.target.checked ? setGender("female") : setGender("male")
              }
            />
            <label className="custom-control-label" for="female">
              {" "}
              Female{" "}
            </label>
          </div>
        </div>
        <div className="form-group col-sm-6">
          <label for="dob">Dob:</label>
          <DatePicker
            className="form-control"
            dateFormat="yyyy-MM-dd"
            selected={dob}
            onChange={(date) => setDob(date)}
          />
        </div>
        <div className="form-group col-sm-6">
          <label>Postal Code:</label>
          <input
            className="form-control"
            id="postalCode"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
          />
        </div>
        <div className="form-group col-sm-6">
          <label>Health Board:</label>
          <input
            className="form-control"
            id="healthBoard"
            value={healthBoard}
            onChange={(event) => setHealthBoard(event.target.value)}
          />
        </div>
        <div className="form-group col-sm-6">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="isRepat"
              checked={isrepat}
              onChange={(event) => setIsRepat(event.target.checked)}
            />
            <label className="custom-control-label" for="isRepat">
              Repatriation
            </label>
          </div>
        </div>

        { isrepat == true && 
            <div className="form-group col-sm-6">
                <label for="d-block">Repat Hospital Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="repatHospitalNameget"
                  value={repatHospitalNameget}
                  onChange={(event) => setRepatHospitalName(event.target.value)}
                />
            </div>                    
      
      }

{/* { isrepat == true && 
            <div className="form-group col-sm-6">
            <label>Postal Code:</label>
            <input
              className="form-control"
              id="postalCode1"
              value={postalCode1}
              onChange={(event) => setPostalCode1(event.target.value)}
            />
          </div>                    
      
      } */}

{/* <div className="form-group col-sm-6">
                <label for="d-block">Repat Hospital Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="repatHospitalNameget"
                  value={repatHospitalNameget}
                  onChange={(event) => setRepatHospitalName(event.target.value)}
                />
            </div>   */}

      { isrepat == true && <div className="form-group col-sm-6">
                    <label for="d-block">Repat Consultant Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="repatConsultantName"
                      value={repatConsultantName}
                      onChange={(event) => setRepatConsultantName(event.target.value)}
                    />
                    </div>  }

        
        <div className="form-group col-sm-6">
        <label for="d-block">Select Infomration Control</label>
        <select
          className="form-control"
          id="infectionControlID"
          onChange={(event) => setInfectionControlId(event.target.value)}
        >
          <option value="0">Select</option>
          {lstInfectionControlMaster && lstInfectionControlMaster.length > 0 && lstInfectionControlMaster.map((item) =>
            item.infectionControlId == infectionControlID ? (
              <option value={item.infectionControlId} selected>
                {item.infectionControlValue}
              </option>
            ) : (
              <option value={item.infectionControlId}>{item.infectionControlValue}</option>
            )
          )}
          ;
        </select>
      </div>
      { infectionControlID == 10 && 
            <div className="form-group col-sm-6">
                <label for="d-block">Other Infection Control</label>
                <input
                  type="text"
                  className="form-control"
                  id="infection_Control_Information"
                  value={infection_Control_Information}
                  onChange={(event) => setOtherInfectionControl(event.target.value)}
                />
            </div>
      
      }
      </div>
    );
}

export default Page1;