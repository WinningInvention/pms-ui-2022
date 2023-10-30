import React, { useEffect, useState } from "react";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";

const HtmlPage = () => {
    return (
        <React.Fragment>
            <TopNavigation />

            <div className="container-fluid container-p-y flex-1">
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="mb-3 text-left">Title</h5>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="has-search search-Max-w mr-2">
                                <input type="text" className="form-control" placeholder="Search" />
                                <span type="button" className="searchIconRight"><i className="fa-solid fa-magnifying-glass"></i></span>
                            </div>
                            
                            <div className="text-right d-flex">
                                <button type="button" className="btn btn-primary"><i className="fa-regular fa-pen-to-square"></i></button>
                                <button type="button" className="btn btn-danger ml-2"><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>

                        <div className="row aicu-info-card">
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                                <div className="aicu-info flex-1 text-left cardBg-1">
                                    <div className="aicu-MoreInfo">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#"  data-toggle="modal" data-target="#exampleModal">Option1</a>
                                                <a className="dropdown-item" href="#">Option2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pName mb-2 pr-3"><i className="fa-solid fa-user"></i> Patient name</div>
                                    <div className="diagnoses mb-2"><i className="fa-solid fa-stethoscope"></i> Arthritis</div>
                                    {/* <h5>Today Report</h5> */}
                                    <ul>
                                        <li><div><h6>40</h6><span>Age</span></div></li>
                                        <li><div><h6>8</h6><span>Bed N0</span></div></li>
                                        <li><div><h6>L2</h6><span>Lab care</span></div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                Test
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>

                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                                <div className="aicu-info flex-1 text-left cardBg-2">
                                <div className="aicu-MoreInfo">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">Option1</a>
                                                <a className="dropdown-item" href="#">Option2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pName mb-2 pr-3"><i className="fa-solid fa-user"></i> Patient name</div>
                                    <div className="diagnoses mb-2"><i className="fa-solid fa-stethoscope"></i> Arthritis</div>
                                    {/* <h5>Today Report</h5> */}
                                    <ul>
                                        <li><div><h6>40</h6><span>Age</span></div></li>
                                        <li><div><h6>8</h6><span>Bed N0</span></div></li>
                                        <li><div><h6>L2</h6><span>Lab care</span></div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                                <div className="aicu-info flex-1 text-left cardBg-3">
                                <div className="aicu-MoreInfo">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#exampleModal">Option1</a>
                                                <a className="dropdown-item" href="#">Option2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pName mb-2 pr-3"><i className="fa-solid fa-user"></i> Patient name</div>
                                    <div className="diagnoses mb-2"><i className="fa-solid fa-stethoscope"></i> Arthritis</div>
                                    {/* <h5>Today Report</h5> */}
                                    <ul>
                                        <li><div><h6>40</h6><span>Age</span></div></li>
                                        <li><div><h6>8</h6><span>Bed N0</span></div></li>
                                        <li><div><h6>L2</h6><span>Lab care</span></div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                                <div className="aicu-info flex-1 text-left cardBg-4">
                                <div className="aicu-MoreInfo">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">Option1</a>
                                                <a className="dropdown-item" href="#">Option2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pName mb-2 pr-3"><i className="fa-solid fa-user"></i> Patient name</div>
                                    <div className="diagnoses mb-2"><i className="fa-solid fa-stethoscope"></i> Arthritis</div>
                                    {/* <h5>Today Report</h5> */}
                                    <ul>
                                        <li><div><h6>40</h6><span>Age</span></div></li>
                                        <li><div><h6>8</h6><span>Bed N0</span></div></li>
                                        <li><div><h6>L2</h6><span>Lab care</span></div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                                <div className="aicu-info flex-1 text-left cardBg-5">
                                <div className="aicu-MoreInfo">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">Option1</a>
                                                <a className="dropdown-item" href="#">Option2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pName mb-2 pr-3"><i className="fa-solid fa-user"></i> Patient name</div>
                                    <div className="diagnoses mb-2"><i className="fa-solid fa-stethoscope"></i> Arthritis</div>
                                    {/* <h5>Today Report</h5> */}
                                    <ul>
                                        <li><div><h6>40</h6><span>Age</span></div></li>
                                        <li><div><h6>8</h6><span>Bed N0</span></div></li>
                                        <li><div><h6>L2</h6><span>Lab care</span></div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                                <div className="aicu-info flex-1 text-left cardBg-6">
                                <div className="aicu-MoreInfo">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">Option1</a>
                                                <a className="dropdown-item" href="#">Option2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pName mb-2 pr-3"><i className="fa-solid fa-user"></i> Patient name</div>
                                    <div className="diagnoses mb-2"><i className="fa-solid fa-stethoscope"></i> Arthritis</div>
                                    {/* <h5>Today Report</h5> */}
                                    <ul>
                                        <li><div><h6>40</h6><span>Age</span></div></li>
                                        <li><div><h6>8</h6><span>Bed N0</span></div></li>
                                        <li><div><h6>L2</h6><span>Lab care</span></div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                                <div className="aicu-info flex-1 text-left cardBg-7">
                                <div className="aicu-MoreInfo">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">Option1</a>
                                                <a className="dropdown-item" href="#">Option2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pName mb-2 pr-3"><i className="fa-solid fa-user"></i> Patient name</div>
                                    <div className="diagnoses mb-2"><i className="fa-solid fa-stethoscope"></i> Arthritis</div>
                                    {/* <h5>Today Report</h5> */}
                                    <ul>
                                        <li><div><h6>40</h6><span>Age</span></div></li>
                                        <li><div><h6>8</h6><span>Bed N0</span></div></li>
                                        <li><div><h6>L2</h6><span>Lab care</span></div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                                <div className="aicu-info flex-1 text-left cardBg-8">
                                <div className="aicu-MoreInfo">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle noDropdownIcon" data-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical" title="More Info"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">Option1</a>
                                                <a className="dropdown-item" href="#">Option2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pName mb-2 pr-3"><i className="fa-solid fa-user"></i> Patient name</div>
                                    <div className="diagnoses mb-2"><i className="fa-solid fa-stethoscope"></i> Arthritis</div>
                                    {/* <h5>Today Report</h5> */}
                                    <ul>
                                        <li><div><h6>40</h6><span>Age</span></div></li>
                                        <li><div><h6>8</h6><span>Bed N0</span></div></li>
                                        <li><div><h6>L2</h6><span>Lab care</span></div></li>
                                    </ul>
                                </div>
                            </div>
                        </div>







                        <div className="px-5  position-relative d-none">
                            <div className="d-flex flex-row cardWrap text-left">
                                <div className="cardListHeadLeft">
                                    Bed No.
                                </div>
                                <div className="cardCenter flex-1 px-3">
                                    Patient Details
                                </div>
                                <div className="cardListHeadRight">
                                    Label of care
                                </div>
                            </div>

                            <div className="d-flex cardListWrap">
                                <div className="cardAction d-flex flex-column ">
                                    <button type="button" className="btn btn-primary"><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button type="button" className="btn btn-danger mt-2"><i className="fa-solid fa-trash"></i></button>
                                </div>
                                <div className="card border flex-row cardWrap flex-1 no-shadow">
                                    <div className="cardLeft p-3 rounded-left rounded-left d-flex align-items-center justify-content-center">
                                        <div className="h4">0.1</div>
                                    </div>
                                    <div className="cardCenter flex-1 px-3 py-2">
                                        <div className="row cardRow">
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-1 p-2 rounded">Text1</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-2 p-2 rounded">Text2</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-3 p-2 rounded">Text2</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-4 p-2 rounded">Text4</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-5 p-2 rounded">Text5</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-6 p-2 rounded">Text6</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="cardRight p-3 rounded-right d-flex align-items-center justify-content-center">
                                        <div className="h4">Z</div>
                                    </div>
                                </div>
                            </div>


                            <div className="d-flex cardListWrap">
                                <div className="cardAction d-flex flex-column ">
                                    <button type="button" className="btn btn-primary"><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button type="button" className="btn btn-danger mt-2"><i className="fa-solid fa-trash"></i></button>
                                </div>
                                <div className="card border flex-row cardWrap flex-1 no-shadow">
                                    <div className="cardLeft p-3 rounded-left rounded-left d-flex align-items-center justify-content-center">
                                        <div className="h4">0.2</div>
                                    </div>
                                    <div className="cardCenter flex-1 px-3 py-2">
                                        <div className="row cardRow">
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-1 p-2 rounded">Text1</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-2 p-2 rounded">Text2</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-3 p-2 rounded">Text2</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-4 p-2 rounded">Text4</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-5 p-2 rounded">Text5</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-6 p-2 rounded">Text6</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="cardRight p-3 rounded-right d-flex align-items-center justify-content-center">
                                        <div className="h4">B</div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex cardListWrap">
                                <div className="cardAction d-flex flex-column ">
                                    <button type="button" className="btn btn-primary"><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button type="button" className="btn btn-danger mt-2"><i className="fa-solid fa-trash"></i></button>
                                </div>
                                <div className="card border flex-row cardWrap flex-1 no-shadow">
                                    <div className="cardLeft p-3 rounded-left rounded-left d-flex align-items-center justify-content-center">
                                        <div className="h4">0.3</div>
                                    </div>
                                    <div className="cardCenter flex-1 px-3 py-2">
                                        <div className="row cardRow">
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-1 p-2 rounded">Text1</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-2 p-2 rounded">Text2</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-3 p-2 rounded">Text2</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-4 p-2 rounded">Text4</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-5 p-2 rounded">Text5</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-6 p-2 rounded">Text6</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="cardRight p-3 rounded-right d-flex align-items-center justify-content-center">
                                        <div className="h4">A</div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex cardListWrap">
                                <div className="cardAction d-flex flex-column ">
                                    <button type="button" className="btn btn-primary"><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button type="button" className="btn btn-danger mt-2"><i className="fa-solid fa-trash"></i></button>
                                </div>
                                <div className="card border flex-row cardWrap flex-1 no-shadow">
                                    <div className="cardLeft p-3 rounded-left rounded-left d-flex align-items-center justify-content-center">
                                        <div className="h4">0.4</div>
                                    </div>
                                    <div className="cardCenter flex-1 px-3 py-2">
                                        <div className="row cardRow">
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-1 p-2 rounded">Text1</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-2 p-2 rounded">Text2</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-3 p-2 rounded">Text2</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-4 p-2 rounded">Text4</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-5 p-2 rounded">Text5</div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="bg-lite-style-6 p-2 rounded">Text6</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="cardRight p-3 rounded-right d-flex align-items-center justify-content-center">
                                        <div className="h4">D</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>



               
                    <div className="pb-5">
                        
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="mb-0 text-left">Title</h5>
                            <button type="button" className="btn btn-sm btn-info"><i class="fa-solid fa-plus mr-2"></i>Expand/Collapse All</button>                        
                        </div>
                        <div className="">
                            <div id="accordion" className="accordionWrap">
                                <div className="card mb-3">
                                    <div className="accordionArrow">
                                        <a className="px-3 py-2 bg-info rounded text-white" role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="false" aria-controls="collapse-1">
                                            Zone Name
                                        </a>
                                    </div>
                                    <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                        <div className="card-body p-3">

                                            <div id="accordion-1">
                                                <div className="cardx">                                            
                                                    <div className="accordionArrow" id="heading-1-1">
                                                        <a className="px-3 py-2 bg-info rounded text-white collapsed" role="button" data-toggle="collapse" href="#collapse-1-1" aria-expanded="false" aria-controls="collapse-1-1">
                                                            Bed Number
                                                        </a>
                                                    </div>                                                    
                                                    <div id="collapse-1-1" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                        <div id="accordion-2">
                                                            <div className="cardx p-3">                                            
                                                                <div className="accordionArrow" id="heading-1-1-2">
                                                                    <a className="px-3 py-2 bg-info rounded text-white collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-2" aria-expanded="false" aria-controls="collapse-1-1-2">
                                                                        Patient Name / No Patent Assigned 
                                                                    </a>
                                                                </div>                                                    
                                                                <div id="collapse-1-1-2" className="collapse" data-parent="#accordion-2" aria-labelledby="heading-1-1-2">
                                                                    <div className="p-3">
                                                                        <div className="row form-group">
                                                                            <div className="col-sm-2">Patent ID:</div>
                                                                            <div className="col-sm-4">234234</div>
                                                                            <div className="col-sm-2">Patent Name:</div>
                                                                            <div className="col-sm-4">Rajib</div>
                                                                        </div>
                                                                        <div className="row form-group">
                                                                            <div className="col-sm-2">Daignasis:</div>
                                                                            <div className="col-sm-4">abcd</div>
                                                                            <div className="col-sm-2">Is Cardiff:</div>
                                                                            <div className="col-sm-4">asdfgg</div>
                                                                        </div>

                                                                    </div>                                                      
                                                                </div>
                                                            </div>                                        
                                                        </div>                                                        
                                                    </div>
                                                </div>                                        
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                                        
                            </div>
                        </div>

                    </div>

        
            </div>
            {/* <Footer /> */}
        </React.Fragment>
    )
}
export default HtmlPage;