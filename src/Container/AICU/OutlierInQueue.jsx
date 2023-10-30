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
const OutlierInQueue = () => {
  const [outlierIn, setOutlierIn] = useState([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState();
  const [isGetCommentModalOpen, setIsGetCommentModalOpen] = useState();
  const [outlierInQueueId, setOutlierInQueueId] = useState();
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
    { headerName: "Patient Name", field: "patientName", resizable: true, minWidth: 180 },
    { headerName: "ICU Level", field: "icuLevel", resizable: true, minWidth: 120}, 
    { headerName: "Diagnosis", field: "Diagnosis", resizable: true, minWidth: 180 },
    { headerName: "Date and time", field: "startDatetime", resizable: true, minWidth: 180 },
    { headerName: "Organ Support Needed", field: "organSupportRequired", resizable: true, minWidth: 300 },
    {
      headerName: "Actions", resizable: true, minWidth: 190, cellRendererFramework: (params) => <div>

        <Button onClick={() => { setIsGetCommentModalOpen(true); setOutlierInQueueId(params.data.outlierQueueInId); getComment(params.data.outlierQueueInId) }}><i class="fa fa-info-circle" aria-hidden="true"></i></Button>
        <Button className="btn btn-primary btn-sm" layout="outline" onClick={() => { setIsCommentModalOpen(true); setOutlierInQueueId(params.data.outlierQueueInId); }}>Comment</Button>
      </div>
    }
    ];

    function closeModal() {

      setIsCommentModalOpen(false)
      setIsGetCommentModalOpen(false)
    }

    const submitComment = async (formData) => {
      Spinner.show();
      let data = {
        "outlierQueueInId": outlierInQueueId,
        "comment": formData.comment,
        "userName": "string"
      }
      let url = 'api/OutlierQueueIn/InsertOutlierQueueInComment';
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
      let response = await ReferralService.outlierInCommentList(id);
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
        let url = 'api/OutlierQueueIn/GetListOutlierQueueIn';
        let response = await Services.getRequest(url);

        let outlier =response.map(item => {
          return {
            'patientName' : item.patientName,
            'icuLevel' :item.priorityLevel,
            'Diagnosis' : item.provisionalDiagnosis,
            'startDatetime' : item.startDatetime,
            'outlierQueueInId':item.outlierQueueInId,
            'organSupportRequired' : item.organSupportRequired
          };
        });

        setOutlierIn(outlier);
      })();
    },[]);

const defaultColDef={sortable:true,editable:true,flex:1,filter:true,floatingFilter:true}

const onGridReady=(params)=>{
  gridApi=params.api
}
const onExportClick=()=>{
  gridApi.exportDataAsCsv();
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
            <h5 class="mb-0">Outlier In</h5>
            <a href="/bed-allocate" className="patient-alloc">Patient allocation</a>
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

export default OutlierInQueue;