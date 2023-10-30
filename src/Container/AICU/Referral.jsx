import React, { useEffect, useState,useCallback } from "react";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import moment from "moment";
import { Controller, useForm } from "react-hook-form"
import { ReferalCommentSchema } from '../../Schema/ReferralCommentSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { AgGridReact } from 'ag-grid-react';
import Services from "../../services/Services";
import { Alert, Spinner } from "../../services/NotiflixService";
import ReferralService from "../../services/ReferralService";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ICU_CARE_STATUS } from "../../constants/icuCareStatus";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Button, Select, Textarea } from '@windmill/react-ui'
import { computeHeadingLevel } from "@testing-library/react";
import { AgAbstractField, ColumnGroup } from "ag-grid-community";
const Referral = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(ZoneSchema),
  });

  const [referralList, setReferralList] = useState([]);
  const [referralCommentList, setReferralCommentList] = useState([]);
  const [referralId, setReferralId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [icuCareStatusSelect, setIcuCareStatusSelect] = useState();
  let gridApi
  const columnDefs = [
    { headerName: "Patient Name", field: "patientName", readOnlyEdit: true, resizable: true, minWidth: 140 },
    { headerName: "Hospital Number", field: "hospitalNumber", resizable: true, minWidth: 170 },
    { headerName: "Age", field: "age", resizable: true, minWidth: 100 },
    { headerName: "Diagnosis", field: "Diagnosis", resizable: true, minWidth: 120 },
    { headerName: "Medical History", field: "medicalHistory", resizable: true, minWidth: 160 },
    { headerName: "ICU Decision Status", field: "icuCareStatus", resizable: true, minWidth: 180 },
    { headerName: "Level Of Care", field: "levelOfCare", resizable: true, minWidth: 160 },
    { headerName: "Date", field: "startDatetime", resizable: true, minWidth: 160 },
    {
      headerName: "Actions", resizable: true, minWidth: 190, cellRendererFramework: (params) => <div>
        <Button onClick={() => { setIsCommentModalOpen(true); setReferralId(params.data.referalID); getReferalComment(params.data.referalID) }}><i class="fa fa-info-circle" aria-hidden="true"></i></Button>
        <Button className="btn btn-primary btn-sm" layout="outline" onClick={() => {
          reset();
          let localindex = ICU_CARE_STATUS.map(function (el) {
            return el.status;
          }).indexOf(params.data.icuCareStatus);
          if (localindex != -1) {
            setIcuCareStatusSelect(ICU_CARE_STATUS[localindex].id);
           
          }
          setIsModalOpen(true); setReferralId(params.data.referalID);
         
        }}>
           <i className="fa-solid fa-plus"></i> Update</Button>
      </div>
    }
  ];

  const commentColumnDefs = [
    { headerName: "Comment", field: "comment", wrapText:true, autoHeight:true}
    ,{ headerName: "User Name", field: "userName" },
    { headerName: "Date", field: "createdDate" },
  ];




  useEffect(() => {
    (async () => {
      Spinner.show();
      let url = 'api/Referal/GetListReferal';
      let response = await Services.getRequest(url);
      console.log("abc");

      let url1 = 'https://hrmsapicoreappservice.azurewebsites.net/api/Employee/GetProfileTopSectionDetials?id=4';
      let response1 = await Services.getRequest(url1);

      let referral = response.map(item => {
        return {
          'patientName': item.patientName,
          'hospitalNumber': item.hospitalNumber,
          'age': item.age,
          'Diagnosis': item.provisionalDiagnosis,
          'medicalHistory': item.previousMedicalSurgicalHistory,
          'icuCareStatus': item.referalStatus,
          'comment': item.comment,
          'referalID': item.referalID,
          'startDatetime': moment(item.startDatetime).format("YYYY-MM-DD HH:mm"),
          'levelOfCare': item.levelOfCare,
        };
      });

      setReferralList(referral);
      Spinner.hide();
    })();

  }, []);


  const defaultColDef = { sortable: true, editable: true, flex: 1, filter: true, floatingFilter: true, resizable: true, }
  const defaultColDefComment = { sortable: false, editable: false, flex: 1, filter: true, floatingFilter: false }
  const onGridReady = (params) => {
    gridApi = params.api
  }
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }


  function openModal() {
    setIsModalOpen(true)

  }
  function closeModal() {
    setIcuCareStatusSelect();
    setIsModalOpen(false)
  }

  const careStatus = () => {
    setIcuCareStatusSelect();
  }

  function closeCommentModal() {
    setIsCommentModalOpen(false)
  }

  const onSubmit = async (_formData) => {
    Spinner.show();
    reset();
    setIsModalOpen(false)
    _formData.referalId = referralId
    let response = await ReferralService.updateReferral(_formData);
    Alert.success(response);
    let refList = referralList;
    let localindex = refList.map(function (el) {
      return el.referalID;
    }).indexOf(referralId);
    if (localindex != -1) {
      let localindexIcu = ICU_CARE_STATUS.map(function (el) {
        return el.id;
      }).indexOf(_formData.referalStatusId);
      if (localindexIcu != -1) {
        refList[localindex].icuCareStatus =  ICU_CARE_STATUS[localindexIcu].status;
        setReferralList(refList);
       
      }
     
    }

    Spinner.hide();

  }

  const getReferalComment = async (id) => {
    Spinner.show();
    let response = await ReferralService.referalCommentList(id);
    let commentData = response.map(item => {
      return {
        'comment': item.comment,
        'userName': item.userName ? item.userName : 'NA',
        'createdDate': moment(item.createdDate).format("YYYY-MM-DD HH:mm"),
      };
    });
    setReferralCommentList(commentData);
    Spinner.hide();
  }

  function getRowStyleScheduled(params) {
    console.log("params");
    console.log(params);
    switch (params.data.icuCareStatus) {
      case "Admitted":
        return {
          "background-color": "#2b969e",
          "color": "#fcecec",
        };
      case "Not admitted":
        return {
          "background-color": "#e64141",
          "color": "#fcecec",
        };
      case "Just to let you know":
        return {
          "background-color": "#3e950f",
          "color": "#dbedd1",
        };
      case "Review":
        return {
          "background-color": "#fc9e5b",
          "color": "ffffff",
        };
    }
  };

  return (
    <>
      <TopNavigation />
      <div className="container-fluid">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Referral</h5>
              <button onClick={() => onExportClick()} className="btn btn-primary">Export</button>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="ag-theme-alpine " style={{ height: "500px" }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={referralList}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                  pagination={true}
                  alwaysShowVerticalScroll ={true}
                  alwaysShowHorizontalScroll ={true}
                 className="agtable"
                 getRowStyle={getRowStyleScheduled}
                ></AgGridReact>
                <div>test image</div>
                <img src="https://hrmsapicoreappservice.azurewebsites.net/api/Employee/GetProfilePictureFile?EmployeeDetailId=4"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <div
        className="modal fade"
        id="UpdateModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="newzoneModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-lite-style-1">
              <h5 className="modal-title" id="newzoneModalLabel">
                Update Referral
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="d-block text-left">ICU Care Status</label>
                <select className="form-control">
                  {ICU_CARE_STATUS.map((i) => {
                    return (
                      <option key={i.id} value={i.id}>
                        {i.status}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label className="d-block text-left">Comments</label>
                <input type="text" className="form-control" value="" />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary mr-2"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Create Zone
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="modal-header bg-lite-style-1">Update Referral</ModalHeader>
          <ModalBody className="modal-body">
            <Label>
              <span>ICU Care Status <span className="text-red-700">*</span> </span>
              <Select value={icuCareStatusSelect} onClick={()=>careStatus()} className="form-control"  {...register('referalStatusId')}>
                <option disabled value="">ICU Care Status </option>
                {ICU_CARE_STATUS.length > 0 && (
                  <>{ICU_CARE_STATUS.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.status}
                    </option>
                  ))}</>
                )}

              </Select>
            </Label>
            <Label>
              <span>Comments </span>
              <Textarea
                rows="3"
                className="form-control"
                name="comment"
                placeholder="Comments"
                {...register("comment")}
                autoComplete="off"
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



      <Modal isOpen={isCommentModalOpen} onClose={closeCommentModal} style={{ maxWidth: "52rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="modal-header bg-lite-style-1">Referral Comment</ModalHeader>
          <ModalBody className="modal-body">
            <div>
              <div className="table-responsive">
                <div className="ag-theme-alpine" style={{ height: "300px" }}>
                  <AgGridReact
                    columnDefs={commentColumnDefs}
                    rowData={referralCommentList}
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
              <Button layout="outline" onClick={closeCommentModal}>
                Cancel
              </Button>
            </div>
            {/* <div className="hidden sm:block">
              <Button type="submit" className="btn btn-primary" layout="outline" >Submit</Button>
            </div> */}

          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default Referral;