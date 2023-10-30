import React, { useEffect, useState, useCallback } from 'react'
import TopNavigation from "../../../Components/Navigation/TopNavigation";
import { AgGridReact } from 'ag-grid-react';
import { NurseAvailabilitySchema } from '../../../Schema/NurseAvailabilitySchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label, Input, Button } from '@windmill/react-ui'
import { Controller, useForm } from "react-hook-form"
import moment from 'moment/moment';
import NurseAvailabilityService from "../../../services/NurseAvailabilityService";
import { Alert, Spinner } from "../../../services/NotiflixService";
import Footer from '../../../Components/Footer/Footer';

const AddNurseAvailability = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(NurseAvailabilitySchema),
  });
  const [availabilityNurseList, setAvailabilityNurseList] = useState([]);
  const [availabilityNurseGet, setAvailabilityNurseGet] = useState([]);
  const [availabilityDate, setAvailabilityDate] = useState();
  const [callState, setCallState] = useState(false);

  const nurseForm = async (_formData) => {
    const buttonValue = window.event.submitter.name;
    let NurseData = [];
    let date = availabilityDate;
    for (let i = 0; i < buttonValue; i++) {
      let data = {
        "availabilityDate": moment(date).toISOString(),
        "firstShift": _formData.firstShift,
        "secondShift": _formData.secondShift,
      }
      date = moment(date, "DD-MM-YYYY").add(1, 'days')
      NurseData.push(data);
      // if (i == buttonValue) {
      setAvailabilityNurseList(NurseData)
      // }
    }
  }


  const setNurseValue = async (e, index) => {
    let key = e.target.name;
    let value = e.target.value;
    let nurseArray = availabilityNurseList;
    nurseArray[index][key] = value;
    setAvailabilityNurseList(nurseArray)
  }

  const onSubmit = async () => {
    Spinner.show();
    let response = await NurseAvailabilityService.createNurseAvailability(availabilityNurseList);
    Alert.success(response.message);
    Spinner.hide();
    if (response.statusCode == 201) {
      setCallState(true);
      setAvailabilityNurseList([]);
    }
  }
  const onCancal = async () => {
    setAvailabilityNurseList([]);
  }

  const editAvailability = async (data) => {
    Spinner.show();
    let response = await NurseAvailabilityService.updateNurseAvailability(data);
    Alert.success(response.message);
    Spinner.hide();
  }

  let gridApi
  const columnDefs = [
    { headerName: "Date", field: "availabilityDate", cellRendererFramework: (params) => <div>
    {moment(params.data.availabilityDate).format('DD-MM-YYYY')}  
    </div> },
    { headerName: "NUMBER OF NURSE IN FIRST SHIFT", field: "firstShift", readOnlyEdit: true },
    { headerName: "NUMBER OF NURSE IN SECOND SHIFT", field: "secondShift", readOnlyEdit: true },
    {
      headerName: "Actions", resizable: true,suppressSizeToFit: true, cellRendererFramework: (params) => <div>
        <Button className="btn btn-info btn-sm" onClick={() => { editAvailability(params.data) }}><i class="fas fa-edit" aria-hidden="true"></i>Update</Button>
      </div>
    }

  ];
  const onGridReady = (params) => {
    gridApi = params.api
  }
  const defaultColDef = { sortable: false, editable: true, flex: 1, filter: false, floatingFilter: false, resizable: false, }

  useEffect(() => {
    (async () => {
      Spinner.show();
      let response = await NurseAvailabilityService.getNurseAvailability(availabilityNurseList);
      if (response.data && response.data.length > 0) {
     let DateArray =  response.data.map(data => moment(data.availabilityDate))
        let maxDate = moment.max(DateArray);
        maxDate=moment(maxDate, "DD-MM-YYYY").add(1, 'days')
        setAvailabilityDate(maxDate._d);
        setAvailabilityNurseGet(response.data)
      } else {
        let date = moment();
        setAvailabilityDate(date);
      }
      Spinner.hide();
    })();
  }, [callState]);
  return (
    <div>
      <TopNavigation />
     
      <div className="content-wrapper" style={{ minHeight: '536.055px' }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Nurse Availablity Entry</h1>
              </div>
              {/* <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item">AICU</li>
                  <li className="breadcrumb-item active">Nurse Entry </li>
                </ol>
              </div> */}
            </div>
          </div>
        </div>
        <section className="content">
          <div className="card mb-5">
            <div className="card-body">
            {/* <div className="row">
            <h1 className="m-0 text-dark">Nurse Availablity Entry</h1>
            </div> */}
              <form onSubmit={handleSubmit(nurseForm)}>

              
                <div className="row">
                  
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="inputName">Number of Nurse in First Shift</label>
                      <input type="text" id="firstShift" placeholder="First Shift"  {...register("firstShift")} className="form-control" defaultValue={30} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="inputName">Number of Nurse Second Shift</label>
                      <input type="text" id="secondShift" placeholder="Second Shift"  {...register("secondShift")} className="form-control" defaultValue={35} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group" style={{ float: 'right' }}>
                      <label htmlFor="inputName">&nbsp;</label>
                      <br />
                      <input type="submit" name='7' value="Replicate Next 7 days" className="btn btn-info" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group" style={{ float: 'right' }}>
                      <label htmlFor="inputName">&nbsp;</label>
                      <br />
                      <input type="submit" name='15' value="Replicate Next 15 days" className="btn btn-info" />
                    </div>
                  </div>
                </div>
              </form>
              {availabilityNurseList.length > 0 &&
               
             
              <table className="table table-striped">
                <thead className="text-white theadclr" style={{ background: 'black' }}>
                  <tr>
                    <th>Date</th>
                    <th>Number of Nurse in First Shift</th>
                    <th>Number of Nurse Second Shift</th>
                  </tr>
                </thead>
                <tbody>
                  {availabilityNurseList && availabilityNurseList.length > 0 && availabilityNurseList.map((item, index) =>
                    <>
                      <tr key={index}>
                        <td><input type="text" id={'date' + index} className="form-control" name='date' defaultValue={moment(item.availabilityDate).format('DD-MM-YYYY')} disabled="disabled" /> </td>
                        <td><input type="text" id={'firstShift_' + index} className="form-control" name='firstShift' onChange={(event) => setNurseValue(event, index)} defaultValue={item.firstShift} /> </td>
                        <td><input type="text" id={'secondShift_' + index} className="form-control" name='secondShift' onChange={(event) => setNurseValue(event, index)} defaultValue={item.secondShift} /> </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              }
              {availabilityNurseList.length > 0 &&
                <div className="row" >
                  <div className="col-md-12">
                    <div className="form-group" style={{ textAlign: 'center' }}>
                      {/* <label htmlFor="inputName">&nbsp;</label>
                    <br />
                    <input type="submit" defaultValue="Save" onClick={onSubmit()} className="btn btn-info" />
                    <input type="submit" defaultValue="Cancel" className="btn btn-info" /> */}
                      <button type='submit' className="btn btn-info" onClick={() => onSubmit()}>
                        Save
                      </button>&nbsp;
                      <button type='submit' className="btn btn-info" onClick={() => onCancal()}>
                        Cancal
                      </button>
                    </div>
                  </div>
                </div>
              }
              {/* <table className="table table-striped">
                <thead className="text-white theadclr" style={{ background: 'black' }}>
                  <tr>
                    <th>Date</th>
                    <th>Number of Nurse in First Shift</th>
                    <th>Number of Nurse Second Shift</th>
                    <th style={{ width: 185 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>23-11-2022</td>
                    <td>30</td>
                    <td>35</td>
                    <td>
                      <button className="btn btn-info btn-sm"><i className="fas fa-edit" />&nbsp;&nbsp;Edit</button>
                      <button className="btn btn-danger btn-sm"><i className="fas fa-trash" />&nbsp;&nbsp;Delete</button>
                    </td>
                  </tr>
               
                  <tr>
                  </tr>
                </tbody>
              </table> */}


              <div className="table-responsive">
                <div className="ag-theme-alpine "  style={{ height: "500px" }}>
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={availabilityNurseGet}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    pagination={true}
                    className="agtable"
                  ></AgGridReact>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default AddNurseAvailability
