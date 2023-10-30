import React, {useState, useEffect} from "react";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import Services from "../../services/Services";
import { Alert, Spinner } from "../../services/NotiflixService";

const PatientBedAllocation = () => {

  const [zoneList, setZoneList]=useState([]);
  const [patientList, setPatientList]=useState([]);
const [allocationList, setAllocationList] = useState([]);

useEffect(()=>{
  (async () => {
    Spinner.show();
    let url = 'api/ZoneBed/GetAllZone';
  let zoneList = await Services.getRequest(url);
  setZoneList(zoneList);
  Spinner.hide();
  })();
},[]);

useEffect(()=>{
  (async () => {
    Spinner.show();
    let url = 'api/OutlierQueueIn/GetListOutlierQueueIn';
    let response = await Services.getRequest(url);
    let pList = response.map(item => {
    return {id:item.patientId ,text:item.patientName +' | '+item.priorityLevel}
  })
  setPatientList(pList);

  Spinner.hide();
  })();
},[]);

const bedByZoneSelect = async (zoneId, index) => {
  Spinner.show();
  let url = '/api/ZoneBed/GetZoneBed?ZoneId='+zoneId;
  let response = await Services.getRequest(url);

  let newAllocationList = allocationList.map((item, itemIndex) => {
    if(itemIndex===index){
      item.PatientBedList = response;
      item.ZoneId = zoneId;
    }
    return item;
  })

  setAllocationList(newAllocationList);
  Spinner.hide();
}

const addAllocatioRow = () => {
    setAllocationList([...allocationList,{'ZoneId': "0",'PatientBedList':[],'BedId':'0','PatientDetails':'0','PatientDetailsList':patientList}]);
}

const onBedChange = (bedId,index) => {
  let newAllocationList = allocationList.map((item, itemIndex) => {
    if(itemIndex===index){
      item.BedId = bedId;
    }
    return item;
  })

  setAllocationList(newAllocationList);
}

const onPatientChange = (patientId,index) => {
  let newAllocationList = allocationList.map((item, itemIndex) => {
    if(itemIndex===index){
      item.PatientDetails = patientId;
    }
    return item;
  })

  setAllocationList(newAllocationList);
}

const onAllocationSubmit = () => {
  let checkBedUniquie = [];
  let countBedUniquie = 0;
  let checkPatientUniquie = [];
  let countPatientUniquie = 0;
  allocationList.forEach((item, itemIndex) => {
    checkBedUniquie.push(item.BedId);
    checkPatientUniquie.push(item.PatientDetails);
    });

    countBedUniquie = checkBedUniquie.filter((item,
      index) => checkBedUniquie.indexOf(item) === index).length;
      countPatientUniquie = checkPatientUniquie.filter((item,
        index) => checkPatientUniquie.indexOf(item) === index).length;
    if(countBedUniquie !== allocationList.length ){
      Alert.error("Bed assigned double");
    }
    if(countPatientUniquie !== allocationList.length ){
      Alert.error("Patient assigned double");
    }
    if(countPatientUniquie === allocationList.length && countBedUniquie === allocationList.length){
      savePatientAllocation();
    }
    setAllocationList([]);

}
const savePatientAllocation = async () => {
 let data = allocationList.map((item) => {
   return { patientId: item.PatientDetails, bedId: item.BedId };
 });
 let url = 'api/ZoneBed/InsertPatientBed';
 let response = await Services.postRequest(url,data);
 Alert.success(response);
}

return(
    <>
    <TopNavigation />
    <div className="container-fluid">
      <div className="card h-100 border-0">
        <div className="card-header pb-0">
          <div className="card-title d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Patient Bed Allocation</h5>
            <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={()=>addAllocatioRow()}
        >
          <i className="fa-solid fa-plus"></i> New Allocation
        </button>
          </div>
        </div>
        
        <div className="card-body">
        <div className="table-responsive">
                      <table className="table mb-0 table-borderless table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Zones</th>
                            <th scope="col">Beds</th>
                            <th scope="col">Patient Details</th>
                          </tr>
                        </thead>
                        <tbody>
                         {allocationList.map((item,index) => (
                            <tr>
                                <th>
                                <select
                            className="form-control"
                            id={"zoneSelect_"+index}
                            onChange={(event)=>bedByZoneSelect(event.target.value,index)}
                            value={item.ZoneId}
                          >
                            <option value="0">Select</option>
                            {zoneList.map(zItem => (
                            <option value={zItem.zoneId}>{zItem.zoneName}</option>
                            ))}
                          </select>
                         
                                </th>
                                <th>
                                <select
                            className="form-control"
                            id={'BedSelect_'+index}
                            value={item.BedId}
                            onChange={(event)=>onBedChange(event.target.value,index)}
                            >
                            <option value="0">Select</option>
                            {
                              item.PatientBedList.map(bedList => (
                                <option value={bedList.bedId}>{bedList.bedNumber}</option>

                              ))
                            }
                          </select>
                         
                                </th>
                                <th>
                                <select
                            className="form-control"
                            id={'PatientSelect_'+index}
                            value={item.PatientDetails}
                            onChange={(event)=>onPatientChange(event.target.value,index)}
                          >
                            <option value="0">Select</option>
                            {item.PatientDetailsList.map(pList => (
                            <option value={pList.id}>{pList.text}</option>
                            ))}
                          </select>
                         
                                </th>
                            </tr>
                            
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                type="button"
                className="btn btn-primary"
                onClick={onAllocationSubmit}
                >submit
              </button>
            </div>
            <Footer />
            </div>
            </div>
            </>
            );
}

export default PatientBedAllocation;