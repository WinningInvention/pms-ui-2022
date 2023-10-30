import React, {useState, useEffect} from "react";
import '../../Styles/main.css';
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import { AgGridReact } from 'ag-grid-react';
import Services from "../../services/Services";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { Alert, Spinner } from "../../services/NotiflixService";
import ReferralService from "../../services/ReferralService";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Button, Select, Textarea } from '@windmill/react-ui'
const DischargeList = () => {
  const [dischargeList, setDischargeList] = useState([]);
  const [readyDischargeData, setReadyDischargeData] = useState([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState();
  const [isGetCommentModalOpen, setIsGetCommentModalOpen] = useState();
  const [dischargeId, setDischargeId] = useState();
  const [commentList, setCommentList] = useState("");

  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    formState: { errors: errorsComment },
    reset: resetComment
  } = useForm({
    // resolver: yupResolver(CommentSchema),
  });
  let gridApi
  const columnDefs= [
    { headerName: "Patient Name", field: "patientName" },
    { headerName: "Start DateTime", field: "startDatetime"} ,
    { headerName: "Days", field: "numberOfDays"} ,
    { headerName: "Predicted DateTime", field: "predictedDateTime"} ,
    // {
    //   headerName: "Actions", resizable: true, minWidth: 190, cellRendererFramework: (params) => <div>
    //     <Button onClick={() => { setIsGetCommentModalOpen(true); setDischargeId(params.data.patientId); getComment(params.data.patientId) }}><i class="fa fa-info-circle" aria-hidden="true"></i></Button>
    //     <Button className="btn btn-primary btn-sm" layout="outline" onClick={() => { setIsCommentModalOpen(true); setDischargeId(params.data.patientId); }}>Comment</Button>
    //   </div>
    // }
    ];

    let readyDischarge
    const columnDefs2= [
      { headerName: "Patient Name", field: "patientName" , resizable: true, minWidth: 200 },
      { headerName: "Start DateTime", field: "startDatetime" , resizable: true, minWidth: 200} ,
      { headerName: "Days", field: "numberOfDays" , resizable: true, minWidth: 100} ,    
      { headerName: "Current Location", field: "currentLocation" , resizable: true, minWidth: 180} ,
      { headerName: "Discharge Outcome", field: "dischargeOutcome" , resizable: true, minWidth: 180} ,
      { headerName: "Destination", field: "destination" , resizable: true, minWidth: 150} ,
      { headerName: "Consultant Name", field: "consultantName" , resizable: true, minWidth: 180} ,
      { headerName: "Predicted DateTime", field: "predictedDateTime" , resizable: true, minWidth: 180} ,
      
      ];

    function closeModal() {
      setIsCommentModalOpen(false)
      setIsGetCommentModalOpen(false)
    }

    const submitComment = async (formData) => {
      Spinner.show();
      let data = {
        "dischargeId": dischargeId,
        "comment": formData.comment,
        "userName": "string"
      }
      let url = 'api/Discharge/InsertDischargeComment';
      let response = await Services.postRequest(url, data);
      closeModal();
      response.statusCode === 201
        ? Alert.success("Comment added successfull.")
        : Alert.error(response);
      resetComment()
      Spinner.hide();
    }

    const getComment = async (id) => {
      Spinner.show();
      let response = await ReferralService.dischangeCommentList(id);
      let commentData = response.data.map(item => {
        return {
          'comment': item.comment,
          'userName': item.userName ? item.userName : 'NA',
          // 'createdDate': moment(item.createdDate).format("YYYY-MM-DD HH:mm"),
        };
      });
      setCommentList(commentData);
      Spinner.hide();
    }

    useEffect(() => {
      (async () => {
        let url = 'api/Discharge/PredictedDischargeList';
        let response = await Services.getRequest(url);
        console.log(response);
        let outlier =response.data.map(item => {
          return {
            'patientName' : item.patientName,
            'startDatetime' :item.startDatetime,
            'numberOfDays':item.numberOfDays,
            'predictedDateTime':item.predictedDateTime
          };
        });

        setDischargeList(outlier);
      })();
    },[]);

    useEffect(() => {
      (async () => {
        let url = 'api/Discharge/ReadyDischargeList';
        let response = await Services.getRequest(url);
        console.log(response);
        let readyDischarege =response.data.map(item => {
          return {
            'patientName' : item.patientName,
            'startDatetime' :item.startDatetime,
            'numberOfDays':item.numberOfDays,
            'dischargeOutcome' :item.dischargeOutcome,
            'currentLocation' :item.currentLocation,
            'destination' :item.destination,
            'consultantName' :item.consultantName,
            'predictedDateTime':item.predictedDateTime,
          };
        });

        setReadyDischargeData(readyDischarege);
      })();
    },[]);

const defaultColDef={sortable:true,editable:true,flex:1,filter:true,floatingFilter:true}

const onGridReady=(params)=>{
  gridApi=params.api
  readyDischarge=params.api
}
const onExportClick=()=>{
  gridApi.exportDataAsCsv();
}
const onExportReadyDischargeClick=()=>{
  readyDischarge.exportDataAsCsv();
}
const commentColumnDefs = [
  { headerName: "Comment", field: "comment", wrapText: true, autoHeight: true }
  , { headerName: "User Name", field: "userName" },
];
const defaultColDefComment = { sortable: false, editable: false, flex: 1, filter: true, floatingFilter: false }
return (
  <>
    <TopNavigation />
    <div className="container-fluid">
      <div className="card h-100 border-0">
        <div className="card-header pb-0">
          <div className="card-title d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Predicted Discharge List</h5>
            <button onClick={() => onExportClick()} className="btn btn-primary">
              Export
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="ag-theme-alpine" style={{ height: "500px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={dischargeList}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                pagination={true}
                className="agtable"
              ></AgGridReact>
            </div>
          </div>
        </div>
        <div className="card-header pb-0">
          <div className="card-title d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Ready Discharge List</h5>
            <button onClick={() => onExportReadyDischargeClick()} className="btn btn-primary">
              Export
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="ag-theme-alpine" style={{ height: "500px" }}>
              <AgGridReact
                columnDefs={columnDefs2}
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
    <Modal isOpen={isCommentModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmitComment(submitComment)}>
          <ModalHeader className="modal-header bg-lite-style-1">Comment</ModalHeader>
          <ModalBody className="modal-body">

            <Label>
              <span>Comments </span>
              <Textarea
                rows="3"
                id="comment_id"
                className="form-control"
                name="comment"
                placeholder="Comments"
                autoComplete="off"
                {...registerComment("comment")}
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
      </Modal>

      <Modal isOpen={isGetCommentModalOpen} onClose={closeModal} style={{ maxWidth: "52rem" }}>
          <ModalHeader className="modal-header bg-lite-style-1"> Comment</ModalHeader>
          <ModalBody className="modal-body">
            <div>
              <div className="table-responsive">
                <div className="ag-theme-alpine" style={{ height: "300px" }}>
                  <AgGridReact
                    columnDefs={commentColumnDefs}
                    rowData={commentList}
                    defaultColDef={defaultColDefComment}
                    onGridReady={onGridReady}
                    pagination={true}
                    className="agtable"
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>

            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </ModalFooter>
      </Modal>
    <Footer />
  </>
);
}

export default DischargeList;