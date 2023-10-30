import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Services from "../../../services/Services";
import { Alert, Spinner } from "../../../services/NotiflixService";

const ZoneGridView = (prop) => {
    const [zoneBedList, setZoneBedList] = useState([]);
    const [refreshKey, setRefreshKey] = useState(prop.refreshKey);

    let gridApi
  const columnDefs= [
    { headerName: "Zone", field: "Zone", resizable: true, minWidth: 140 },
    { headerName: "Bed", field: "Bed", resizable: true, minWidth: 90 },
    { headerName: "Patient Hospital Number", field: "patientHospitalNumber", resizable: true, minWidth: 210 },
    { headerName: "Patient Name", field: "patientName", resizable: true, minWidth: 140 },
    { headerName: "Age", field: "age", resizable: true, minWidth: 100 },
    { headerName: "Primary Diagnosis", field: "Diagnosis", resizable: true, minWidth: 175 },
    { headerName: "Health Board", field: "healthBoard", resizable: true, minWidth: 140 },
    { headerName: "Speciality Name", field: "specialityName", resizable: true, minWidth: 160 },
    { headerName: "Level of ICU Care", field: "PriorityLevel", resizable: true, minWidth: 160 },    
    { headerName: "Days in ICU", field: "TotalICUDays", resizable: true, minWidth: 130 }
    ];

    useEffect(() => {
        (async () => {
          Spinner.show();
          let url = 'api/ZoneBed/GetPatientBed';
          let response = await Services.getRequest(url);
    
          let zoneBedList =response.map(item => {
            return {
              'Zone' : item.zoneName,
              'Bed' :item.bedNumber,
              'PatientID' : item.patientId,
              'patientName' : item.patientName,
              'Diagnosis' :item.provisionaldiagnosis,
              'IsCardiff' : item.isCardiff,
              'IsSpecialist' : item.isSpecialist,
              'PriorityLevel' : item.priorityLevelStatus,
              'TotalICUDays' : item.totalICUDays,
              'PredictedDatetimeString' : item.predictedDatetimeString,
              'patientHospitalNumber' : item.patientHospitalNumber,
               'age': item.age,
               'healthBoard': item.healthBoard,
               'specialityName': item.specialityName

            };
          });
    
          setZoneBedList(zoneBedList);
          Spinner.hide();
        })();
      },[refreshKey]);

      const defaultColDef={sortable:true,editable:true,flex:1,filter:true,floatingFilter:true}

const onGridReady=(params)=>{
  gridApi=params.api
}
function getRowStyleScheduled(params) {
  if (params.data && params.data.PatientID !== null && params.data.PatientID !== undefined) {
      return {
          'background-color': '#3e950f',
          'color': '#dbedd1'
  }
  } 
};

    return(
        <div className="card-body">
        <div className="table-responsive">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={zoneBedList}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            getRowStyle={getRowStyleScheduled}
          ></AgGridReact>
        </div>
      </div>
      </div>
    )
}

export default ZoneGridView;