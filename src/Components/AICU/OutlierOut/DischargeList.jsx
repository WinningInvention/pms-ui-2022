import React, { useEffect, useState } from "react";
import '../../../Styles/main.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
const DischargeList = ({ dischargeData }) => {
  const [dischargeList, setDischargeList] = useState(dischargeData);
  let gridApi
  const columnDefs = [
    { headerName: "Patient Name", field: "patientName", resizable: true, minWidth: 200 },
    { headerName: "Start DateTime", field: "startDatetime", resizable: true, minWidth: 200 },
    { headerName: "Days", field: "numberOfDays", resizable: true, minWidth: 120 },
    { headerName: "Predicted DateTime", field: "predictedDateTime", resizable: true, minWidth: 200 },
  ];
  const defaultColDef = { sortable: true, editable: true, flex: 1, filter: false, floatingFilter: false }

  const onGridReady = (params) => {
    gridApi = params.api
  }
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }
  useEffect(() => {
  }, []);
  return (
    <div className="col-lg-6 col-md-6 col-6 mb-2">
      <div className="card h-100 border-0">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">
            <div className="card-title">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Predicted Discharge List </h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="ag-theme-alpine" style={{ height: "300px" }}>

                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={dischargeData}
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

export default DischargeList;