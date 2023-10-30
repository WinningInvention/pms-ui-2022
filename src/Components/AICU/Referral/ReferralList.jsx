import React from "react";
import '../../../Styles/main.css';

const ReferralList = () => {
return (
    <div>
         <div className="table-responsive">
                      <table className="table mb-0 table-borderless table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Patient Name </th>
                            <th scope="col">Age</th>
                            <th scope="col">Date</th>
                            <th scope="col">Report</th>
                            <th scope="col">Discharge</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>xyz</td>
                            <td>50</td>
                            <td>15/09-2022</td>
                            <td>Report</td>
                            <td>15/09-2022</td>
                          </tr>
                          <tr>
                            <td>xyz</td>
                            <td>50</td>
                            <td>15/09-2022</td>
                            <td>Report</td>
                            <td>15/09-2022</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <ul className="pagination">
                        <li className="page-item prev">
                          <a className="page-link" href="javascript:void(0);">
                            <i className="fa-solid fa-chevron-left"></i>
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0);">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0);">
                            2
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="javascript:void(0);">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0);">
                            4
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0);">
                            5
                          </a>
                        </li>
                        <li className="page-item next">
                          <a className="page-link" href="javascript:void(0);">
                            <i className="fa-solid fa-chevron-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <span className="moreLink">
                        More <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
    </div>
)
}

export default ReferralList;