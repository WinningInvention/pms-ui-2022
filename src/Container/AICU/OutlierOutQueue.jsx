import React, { useState, useEffect } from "react";
import '../../Styles/main.css';
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import { AgGridReact } from 'ag-grid-react';
import Services from "../../services/Services";
import { Alert, Spinner } from "../../services/NotiflixService";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Controller, useForm } from "react-hook-form"
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Button, Select, Textarea } from '@windmill/react-ui'
import moment from 'moment/moment';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from "react-datepicker";
import ReferralService from "../../services/ReferralService";
const OutlierOutQueue = () => {
  const [outlierIn, setOutlierIn] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dischargeDateTime, setDischargeDateTime] = useState();
  const [dischargePatientId, setDischargePatientId] = useState();
  const [patientBedId, setPatientBedId] = useState();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState();
  const [isGetCommentModalOpen, setIsGetCommentModalOpen] = useState();
  const [outlierOutQueueId, setOutlierOutQueueId] = useState();
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState("");
  const [reloadData, SetReloadData] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(ZoneSchema),
  });
  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    formState: { errors: errorsComment },
    reset: resetComment
  } = useForm({
    // resolver: yupResolver(CommentSchema),
  });
  let gridApi
  const columnDefs = [
    { headerName: "Patient Name", field: "patientName", resizable: true, minWidth: 180 },
    // { headerName: "ICU Level", field: "icuLevel", resizable: true, minWidth: 110, },
    { headerName: "Start Datetime", field: "startDatetime", resizable: true, minWidth: 200 },
    { headerName: "Days", field: "numberOfDays", resizable: true, minWidth: 100 },
    { headerName: "Current Location", field: "currentLocation", resizable: true, minWidth: 160 },
    { headerName: "Destination", field: "destination", resizable: true, minWidth: 160 },
    { headerName: "Consultant Name", field: "consultantName", resizable: true, minWidth: 160 },
    { headerName: "Predicted Discharge", field: "predicatedDateTime", resizable: true, minWidth: 200 },
    {headerName: "Zone", field: "zone", resizable: true, minWidth: 150 },
    {headerName: "Bed Number", field: "bedNumber", resizable: true, minWidth: 150 },
    {
      headerName: "Actions", resizable: true, minWidth: 190, cellRendererFramework: (params) => <div>
        <Button className="btn btn-primary btn-sm" layout="outline" onClick={() => { setIsModalOpen(true); setPatientBedId(params.data.patientBedId) }}>
          Discharge</Button>
        <Button onClick={() => { setIsGetCommentModalOpen(true); setOutlierOutQueueId(params.data.outlierOutQueueId); getComment(params.data.outlierOutQueueId) }}><i class="fa fa-info-circle" aria-hidden="true"></i></Button>
        <Button className="btn btn-primary btn-sm" layout="outline" onClick={() => { setIsCommentModalOpen(true); setOutlierOutQueueId(params.data.outlierOutQueueId); }}>Comment</Button>
      </div>
    }
  ];

  const finalForm = async (_formData) => {
    Spinner.show();
    let data = {
      "patientBedId": patientBedId,
      "dischargeDatetime": moment(dischargeDateTime).toISOString()
    }
    let url = 'api/Discharge/FinalDischarge';
    let response = await Services.postRequest(url, data);
    closeModal();
    response.statusCode === 201
      ? Alert.success("Final Discharge successfull.")
      : Alert.error(response);
    Spinner.hide();
    SetReloadData(!reloadData);
  }

  const submitComment = async (formData) => {
    Spinner.show();
    let data = {
      "outlierOutQueueId": outlierOutQueueId,
      "comment": formData.comment,
      "userName": "string"
    }
    let url = 'api/OutlierOut/InsertOutlierOutQueueComment';
    let response = await Services.postRequest(url, data);
    closeModal();
    response.statusCode === 201
      ? Alert.success("Comment added successfull.")
      : Alert.error(response);
    resetComment()
    Spinner.hide();
  }

  function openModal() {
    setIsModalOpen(true)

  }
  function closeModal() {
    setIsModalOpen(false)
    setIsCommentModalOpen(false)
    setIsGetCommentModalOpen(false)
  }

  useEffect(() => {
    (async () => {
      let url = 'api/OutlierOut/GetOutlierOutList';
      let response = await Services.getRequest(url);
      console.log(response);
      let outlier = response.data.map(item => {
        return {
          'patientName': item.patientName,
          //'icuLevel': item.priorityLevel,
          'startDatetime': item.startDatetime,
          'numberOfDays': item.numberOfDays,
          'currentLocation': item.currentLocation,
          'patientId': item.patientId,
          'outlierOutQueueId': item.outlierOutQueueId,
          'patientBedId':item.patientBedId,
          'destination':item.destination,
          'consultantName':item.consultantName,
          'predicatedDateTime':item.predicatedDateTime,
          'zone':item.zone,
          'bedNumber':item.bedNumber
        };
      });

      setOutlierIn(outlier);
    })();
  }, [reloadData]);

  const defaultColDef = { sortable: true, editable: true, flex: 1, filter: true, floatingFilter: true }

  const onGridReady = (params) => {
    gridApi = params.api
  }
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }
  const getComment = async (id) => {
    Spinner.show();
    let response = await ReferralService.outlierOutCommentList(id);
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
  const commentColumnDefs = [
    { headerName: "Comment", field: "comment", wrapText: true, autoHeight: true }
    , { headerName: "User Name", field: "userName" },
    // { headerName: "Date", field: "createdDate" },
  ];
  const defaultColDefComment = { sortable: false, editable: false, flex: 1, filter: true, floatingFilter: false }
 

  return (
    <>
      <TopNavigation />
      <div className="container-fluid">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Outlier Out</h5>
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
                  rowData={outlierIn}
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit(finalForm)}>
          <ModalHeader>Final  Discharge</ModalHeader>
          <ModalBody>
            <Label>
              <span>Final Discharge</span> {outlierIn.patientName}
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
      </Modal>

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
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
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
            {/* <div className="hidden sm:block">
              <Button type="submit" className="btn btn-primary" layout="outline" >Submit</Button>
            </div> */}

          </ModalFooter>
        {/* </form> */}
      </Modal>
      <Footer />
    </>
  );
}

export default OutlierOutQueue;