import React, {useState, useEffect} from "react";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import Services from "../../services/Services";
import { Spinner } from "../../services/NotiflixService";

const AllZoneView = () => {
    const [allZonesDetails, setAllZonesDetails]=useState([]);
    useEffect(() => {
        (async () => {
        Spinner.show();

          let url = 'api/ZoneBed/ZoneBedBirdView';
          let response = await Services.getRequest(url);
          console.log("AllZones");
          console.log(response.data);
          setAllZonesDetails(response.data);
        })();
        Spinner.hide();
      },[]);

    return (
        <>
          <TopNavigation />
          <div className="container-fluid">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">        
          <div className="card-title d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 text-left">All Zones View</h5>
                            <button type="button" className="btn btn-sm btn-info"><i className="fa-solid fa-plus mr-2"></i>Expand/Collapse All</button>                        
                        </div>
                    </div>

                        <div className="">
                            <div id="accordion" className="accordionWrap">
                                {
                                    allZonesDetails.map((zones,index)=>(
                                        <div className="card mb-3">
                                        <div className="accordionArrow">
                                            <a className="px-3 py-2 bg-info rounded text-white" role="button" data-toggle="collapse" href={"#collapse-"+ (index)} aria-expanded="false" aria-controls={"#collapse-"+ (index)}>
                                                {zones.zoneName}
                                            </a>
                                        </div>
                                        <div id={"collapse-"+ (index)} className="collapse" data-parent="#accordion" aria-labelledby={"#heading-"+ (index)}>
                                            <div className="card-body p-3">
    
                                                <div id={"accordion-"+ (index)}>
                                                    {
                                                        zones.patientBedList.map((beds,bIndex)=>(
                                                            <div className="cardx">                                            
                                                            <div className="accordionArrow" id={"heading-"+ (index)+"-"+(bIndex)}>
                                                                <a className="px-3 py-2 bg-info rounded text-white collapsed" role="button" data-toggle="collapse" href={"#collapse-"+(index)+"-"+(bIndex)} aria-expanded="false" aria-controls={"collapse-"+(index)+"-"+(bIndex)}>
                                                                    #{beds.bedNumber}
                                                                </a>
                                                            </div>                                                    
                                                            <div id={"collapse-"+(index)+"-"+(bIndex)} className="collapse" data-parent={"#accordion-"+ (index)} aria-labelledby={"heading-"+ (index)+"-"+(bIndex)}>
                                                                <div id={"accordion-"+ (index+1)}>
                                                                    {beds.patientBedId!==0?
                                                                        <div className="cardx p-3">        
                                                                        <div className="accordionArrow" id={"heading-"+(index)+"-"+(bIndex)+"-"+(index+1)}>
                                                                            <a className="px-3 py-2 bg-info rounded text-white collapsed" role="button" data-toggle="collapse" href={"#collapse-"+(index)+"-"+(bIndex)+"-"+(index+1)} aria-expanded="false" aria-controls={"collapse-"+(index)+"-"+(bIndex)+"-"+(index+1)}>
                                                                                {beds.patientName}
                                                                            </a>
                                                                        </div>                                                    
                                                                        <div id={"collapse-"+(index)+"-"+(bIndex)+"-"+(index+1)} className="collapse" data-parent={"#accordion-"+ (index+1)} aria-labelledby={"heading-"+(index)+"-"+(bIndex)+"-"+(index+1)}>
                                                                            <div className="p-3">
                                                                                <div className="row form-group">
                                                                                    <div className="col-sm-2">Hospital Number:</div>
                                                                                    <div className="col-sm-4"></div>
                                                                                    <div className="col-sm-2">Patent Name:</div>
                                                                                    <div className="col-sm-4">{beds.patientName}</div>
                                                                                </div>
                                                                                <div className="row form-group">
                                                                                    <div className="col-sm-2">Daignasis:</div>
                                                                                    <div className="col-sm-4">{beds.provisionaldiagnosis}</div>
                                                                                    <div className="col-sm-2">Health Board:</div>
                                                                                    <div className="col-sm-4">asdfgg</div>
                                                                                </div>
                                                                                <div className="row form-group">
                                                                                    <div className="col-sm-2">Name of speciality:</div>
                                                                                    <div className="col-sm-4">abcd</div>
                                                                                    <div className="col-sm-2">Level of ICU Care:</div>
                                                                                    <div className="col-sm-4">{beds.priorityLevelStatus}</div>
                                                                                </div>
                                                                                <div className="row form-group">
                                                                                    <div className="col-sm-2">Days In ICU:</div>
                                                                                    <div className="col-sm-4">{beds.totalICUDays}</div>
                                                                                    <div className="col-sm-2">Predicted Discharge:</div>
                                                                                    <div className="col-sm-4">{beds.predictedDatetimeString}</div>
                                                                                </div>
                                                                            </div>                                                      
                                                                        </div>
                                                                        </div>
                                                                        :
                                                                        <div className="cardx p-3">     
                                                                        <div className="accordionArrow" id={"heading-"+(index)+"-"+(bIndex)+"-"+(index+1)}>
                                                                            <a className="px-3 py-2 bg-info rounded text-white collapsed" role="button" data-toggle="collapse" href={"#collapse-"+(index)+"-"+(bIndex)+"-"+(index+1)} aria-expanded="false" aria-controls={"collapse-"+(index)+"-"+(bIndex)+"-"+(index+1)}>
                                                                                No Patent Assigned 
                                                                            </a>
                                                                        </div>  
                                                                        </div>    
                                                                        } 
                                                                        <br/>

                                                                </div>                                                        
                                                            </div>
                                                        </div>   
                                                        ))
                                                    }
                                                     
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                               

                            </div>
                        </div>

                    </div>
                    </div>
          <Footer />
          </>
    );
}
export default AllZoneView;