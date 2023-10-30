
import React, { useEffect, useState } from "react";
import '../../../Styles/main.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Services from "../../../services/Services";

const ReadyDischargeList = () => {

  const [readyDischargeData, setReadyDischargeData] = useState([]);

  let gridApi
  const columnDefs = [
    { headerName: "Patient Name", field: "patientName", resizable: true, minWidth: 200 },
    { headerName: "Start DateTime", field: "startDatetime", resizable: true, minWidth: 200 },
    { headerName: "Days", field: "numberOfDays", resizable: true, minWidth: 100 },
    { headerName: "Current Location", field: "currentLocation", resizable: true, minWidth: 180 },
    { headerName: "Discharge Outcome", field: "dischargeOutcome", resizable: true, minWidth: 180 },
    { headerName: "Destination", field: "destination", resizable: true, minWidth: 150 },
    { headerName: "Consultant Name", field: "consultantName", resizable: true, minWidth: 180 },
    { headerName: "Predicted DateTime", field: "predictedDateTime", resizable: true, minWidth: 180 },
  ];

  const defaultColDef = { sortable: true, editable: true, flex: 1, filter: false, floatingFilter: false }

  const onGridReady = (params) => {
    gridApi = params.api
  }

  useEffect(() => {
    (async () => {
      let url = 'api/Discharge/ReadyDischargeList';
      let response = await Services.getRequest(url);
      console.log(response);
      let readyDischarege = response.data.map(item => {
        return {
          'patientName': item.patientName,
          'startDatetime': item.startDatetime,
          'numberOfDays': item.numberOfDays,
          'dischargeOutcome': item.dischargeOutcome,
          'currentLocation': item.currentLocation,
          'destination': item.destination,
          'consultantName': item.consultantName,
          'predictedDateTime': item.predictedDateTime,
        };
      });

      setReadyDischargeData(readyDischarege);
    })();
  }, []);

  return (

    <div className="col-lg-6 col-md-6 col-6 mb-2">
      <div className="card h-100 border-0">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">
            <div className="card-title">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Ready Discharge List </h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="ag-theme-alpine" style={{ height: "300px" }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={readyDischargeData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                  pagination={true}
                  className="agtable"
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReadyDischargeList
