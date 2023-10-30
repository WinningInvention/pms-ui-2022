import React, { useEffect, useState, useCallback } from 'react'
import TopNavigation from "../../../Components/Navigation/TopNavigation";
import { AgGridReact } from 'ag-grid-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label, Input, Button } from '@windmill/react-ui'
import { Controller, useForm } from "react-hook-form"
import moment from 'moment/moment';
import NurseAvailabilityService from "../../../services/NurseAvailabilityService";
import { Alert, Spinner } from "../../../services/NotiflixService";
import Footer from '../../../Components/Footer/Footer';

const NurseAvailability = () => {
    const [availabilityNurseList, setAvailabilityNurseList] = useState([]);


 let gridApi
  const columnDefs = [
    { headerName: "Date", field: "date", cellRendererFramework: (params) => <div>
    {moment(params.data.date).format('DD-MM-YYYY')}  
    </div> },
    { headerName: "Required in First Shift", field: "nurseRequiredFirstShift", readOnlyEdit: true },
    { headerName: "Available in First Shift", field: "nurseAvailableFirstShift",
    cellStyle: params => {
        if (params.data.nurseRequiredFirstShift > params.data.nurseAvailableFirstShift) {
            return {backgroundColor: 'red'};
        } else if(params.data.nurseRequiredFirstShift <= params.data.nurseAvailableFirstShift){
            return {backgroundColor: 'green'};
        } 
    }

   },
    { headerName: "Required in Second Shift", field: "nurseRequiredSecondShift", readOnlyEdit: true },
    { headerName: "Available in Second Shift", field: "nurseAvailableSecondShift",
    cellStyle: params => {
        if (params.data.nurseRequiredSecondShift > params.data.nurseAvailableSecondShift) {
            return {backgroundColor: 'red'};
        } else if(params.data.nurseRequiredSecondShift <= params.data.nurseAvailableSecondShift){
            return {backgroundColor: 'green'};
        } 
    }

},
  ];
  const onGridReady = (params) => {
    gridApi = params.api
  }
  const defaultColDef = { sortable: false, editable: true, flex: 1, filter: false, floatingFilter: false, resizable: false, }
    useEffect(() => {
        (async () => {
            Spinner.show();
            let response = await NurseAvailabilityService.getNurseRequiredAvailability(availabilityNurseList);
            if (response.data) {
                setAvailabilityNurseList(response.data)
            }
            Spinner.hide();
        })();
    }, []);
    return (
        <div>
             <TopNavigation />
            <section className="content">
                <div className="card mb-5">
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="ag-theme-alpine " style={{ height: "500px" }}>
                                <AgGridReact
                                    columnDefs={columnDefs}
                                    rowData={availabilityNurseList}
                                    defaultColDef={defaultColDef}
                                    onGridReady={onGridReady}
                                    pagination={true}
                                    className="agtable"
                                ></AgGridReact>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default NurseAvailability
