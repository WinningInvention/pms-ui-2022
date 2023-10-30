import React, {useState, useEffect} from "react";
import '../../Styles/main.css';
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import { AgGridReact } from 'ag-grid-react';
import Services from "../../services/Services";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Repatriation = () => {
  const [repatriationList, setRepatriationList] = useState([]);

  let gridApi
  const columnDefs= [
    { headerName: "Patient Name", field: "patientName" },
    { headerName: "Hospital Number", field: "hospitalNumber",}, 
    {headerName: "Age",field: "age",},
    { headerName: "Diagnosis", field: "Diagnosis" },
    { headerName: "Medical History", field: "medicalHistory" },
    { headerName: "Repat Type", field: "RepatType" },
    { headerName: "Repat Hospital Name", field: "repatHospitalName" },
    { headerName: "Referal Date", field: "createdDate" }
    ];

    useEffect(() => {
      (async () => {
        let url = 'api/Referal/GetListRepatration';
        let response = await Services.getRequest(url);

        let repat =response.map(item => {
          return {
            'patientName' : item.patientName,
            'hospitalNumber' :item.hospitalNumber,
            'age' : item.age,
            'Diagnosis' : item.provisionalDiagnosis,
            'medicalHistory' : item.previousMedicalSurgicalHistory,
            'RepatType' : item.repatType,
            'repatHospitalName' : item.repatHospitalName,
            'createdDate' : item.createdDate
          };
        });

        setRepatriationList(repat);
      })();
    },[]);

const defaultColDef={sortable:true,editable:true,flex:1,filter:true,floatingFilter:true}

const onGridReady=(params)=>{
  gridApi=params.api
}
const onExportClick=()=>{
  gridApi.exportDataAsCsv();
}

return (
    <>
<TopNavigation />

<div className="container-fluid">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Repatriation IN/Repat OUT</h5>
              <button onClick={() => onExportClick()} className="btn btn-primary">Export</button>
            </div>
          </div>
          <div className="card-body">
          <div className="table-responsive">
            <div className="ag-theme-alpine" style={{ height: "500px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={repatriationList}
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


<Footer />
</>
)
}

export default Repatriation;