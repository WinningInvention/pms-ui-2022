import React from "react";
import '../../../Styles/main.css';
import ApexCharts from "react-apexcharts";
import {useSelector, useDispatch} from 'react-redux';

const L2L3PatientsCharts = () => {
  const l2PatientCount = useSelector((state) => state.dashboard.data.l2PatientCount ? state.dashboard.data.l2PatientCount:[]);
  const l3PatientCount = useSelector((state) => state.dashboard.data.l3PatientCount ? state.dashboard.data.l3PatientCount:[]);
    const getL2L3PatientCharts = ()=>{
      let options = {
        chart: {
          type: "bar",
          height: 200,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#089bab", "#d84a45"],
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          type: "week",
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        },
        fill: {
          opacity: 1,
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
          },
        },
      };
      let series = [
        {
          name: "L2",
          data: l2PatientCount,
        },
        {
          name: "L3",
          data: l3PatientCount,
        },
      ];

      return <ApexCharts options={options} series={series} type="bar" />;
    }
return (
  <div className="col-lg-4 col-md-12 mb-4">
    <div className="card border-0">
      <div className="card-header pb-0">
        <div className="card-title text-left">
            <h5 className="mb-0">L2/L3 Patient</h5>
            
        </div>
      </div>
      <div className="card-body">
        <div id="l2L3chartContainer">{getL2L3PatientCharts()}</div>

        <div className="text-right">
          <span className="moreLink">
            More <i className="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
);
}

export default L2L3PatientsCharts;