import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Services from "../../../services/Services";
import { Alert, Spinner } from "../../../services/NotiflixService";

const UserGrid = (prop) => {
    const [userList, setUserList] = useState([]);
    // const [refreshKey, setRefreshKey] = useState(prop.refreshKey);

    let gridApi
  const columnDefs= [
    { headerName: "Username", field: "userName", resizable: true, minWidth: 140 },
    { headerName: "Email", field: "email", resizable: true, minWidth: 90 },
    ];

    useEffect(() => {
        (async () => {
          Spinner.show();
          let url = 'api/Login/ListUsers';
          let response = await Services.getRequest(url);
    
          let userList =response.map(item => {
            return {
              'userName' : item.userName,
              'email' :item.email,
            };
          });
    
          setUserList(userList);
          Spinner.hide();
        })();
      },[]);

      const defaultColDef={sortable:true,flex:1,filter:true}

const onGridReady=(params)=>{
  gridApi=params.api
}

    return(
        <div className="card-body">
        <div className="table-responsive">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={userList}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
          ></AgGridReact>
        </div>
      </div>
      </div>
    )
}

export default UserGrid;