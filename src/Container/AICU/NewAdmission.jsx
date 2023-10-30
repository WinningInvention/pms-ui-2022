import React, {useState, useEffect} from "react";
import Page1 from "./NewAdmissionForm/Page1";
import Page2 from "./NewAdmissionForm/Page2";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import Services from "../../services/Services";
import {useSelector, useDispatch} from 'react-redux';
import {RESET_NEW_ADMISSION} from "../../Actions";
import { Alert, Spinner } from "../../services/NotiflixService";
import { ColumnGroup } from "ag-grid-community";
const NewAdmission = () => {
  const dispatch = useDispatch();
  const [formsStatus, setFormStatus] = useState([
    { formNumber: 1, formStatus: "active" },
    { formNumber: 2, formStatus: "" }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formMasterData, setFormMasterData] = useState([]);
  const [showConfiramtionModal,setShowConfiramtionModal] = useState(false);

  let newAdmissionObj = useSelector((state) => state.newAdmission);

  useEffect(() => {
    (async () => {
      let url = 'api/From/GetAllDroupDownData';
      let response = await Services.getRequest(url);
      setFormMasterData(response);
    })();

  },[]);

  const updateCurrentPage = async (value) => {
    formsStatus.map(fs => {
      if(fs.formNumber === value && fs.formStatus !== "completed"){
        fs.formStatus = "active";
      }
      else if(fs.formStatus === "completed"){
        fs.formStatus = "completed"
      }
      else
        fs.formStatus = "";
    });
    setCurrentPage(value);
  }

  const SubmitFormHandler = async () =>{
      let _confirmResponse = await Alert.confirmAction(
        "Are you sure?",
        "Do you want to Add User"
      );

      if (_confirmResponse === false) {
        return false;
      }  
      console.log(newAdmissionObj);
    Spinner.show();
    let url = 'api/From/SubmitFromData';
    let response = await Services.postRequest(url,newAdmissionObj);
    Spinner.hide();
    Alert.success('Data Insert successfully.');
    setFormStatus([
      { formNumber: 1, formStatus: "active" },
      { formNumber: 2, formStatus: "" }
    ]);
    setCurrentPage(1);
    dispatch({
      type: RESET_NEW_ADMISSION,
      payload: null,
    });
  }
  return (
    <>
      <TopNavigation />
      {/* <form onSubmit={SubmitFormHandler}> */}
        <div className="container-fluid container-p-y flex-1">
          <div className="card card-bg-1">
            <div className="card-header pb-0">
              <div className="form-step-wrapper">
                <ol className="form-step">
                  {formsStatus.map((fs) => (
                    <li
                      className={fs.formStatus}
                      onClick={() => updateCurrentPage(fs.formNumber)}
                    >
                      <div className="step">{fs.formNumber}</div>
                      <div className="caption hidden-xs hidden-sm">
                        Step {fs.formNumber}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="card-body">
              <div className="form-center">
                {currentPage === 1 ? (
                  <Page1 formMaster={formMasterData}/>
                ) : currentPage === 2 ? (
                  <Page2 formMaster={formMasterData}

                  />
                ) : (
                  " "
                )}

                <div className="btnWrap">
                  <div>
                    {currentPage !== 1 ? (
                      <button
                        type="submit"
                        className="btn btn-outline-dark"
                        onClick={() => updateCurrentPage(currentPage-1)}
                      >
                        <i className="fa-solid fa-arrow-left"></i>&nbsp;Back
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  {currentPage !== 2 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => updateCurrentPage(currentPage+1)}>Next <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => SubmitFormHandler()}
                    >Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </form> */}
      <div className="modal fade alertModal" id="confirmationModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <h5>Are you sure?</h5>
              <p>Save</p>
              <div className="d-flex justify-content-center mt-4">
                <button type="button" className="btn btn-sm btn-secondary dialogBtn" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-sm btn-success dialogBtn ml-3" onClick={() => SubmitFormHandler()}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
}

export default NewAdmission;