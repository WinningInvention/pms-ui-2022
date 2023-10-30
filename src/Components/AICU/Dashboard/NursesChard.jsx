import React,{ useEffect, useState }from "react";
import Chart from "react-apexcharts";
import '../../../Styles/main.css';
import ApexCharts from "react-apexcharts";
import {useSelector, useDispatch} from 'react-redux';
const NursesChart = () => {
  const nurseRequiredArray = useSelector((state) => state.dashboard.data.nurseRequired ? state.dashboard.data.nurseRequired:[]);
  const nurseAvailableArray = useSelector((state) => state.dashboard.data.nurseAvailable ? state.dashboard.data.nurseAvailable:[]);

  const getNurseChartView = () => {
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
        name: "Required",
        data:nurseRequiredArray
      },
      {
        name: "Available",
        data: nurseAvailableArray
      },
    ];

    return (<ApexCharts options={options} series={series} type="bar" />);

  }

  return (
    <div className="col-lg-4 col-md-12 mb-4">
      <div className="card h-100 border-0">
        <div className="card-header pb-0">
          <div className="card-title">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Nurses</h5>
              <div className="d-flex align-items-center justify-content-between chaeckSwitch">
                <span className="mr-1">1st Half</span>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="switchSlider round"></span>
                </label>
                <span className="ml-1">2nd Half</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div id="nursesChart">{getNurseChartView()}</div>

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

export default NursesChart;