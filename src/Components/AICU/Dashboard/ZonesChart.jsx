import React,{ useEffect, useState }from "react";
import '../../../Styles/main.css';
import ApexCharts from "react-apexcharts";
import {useSelector, useDispatch} from 'react-redux';

const ZonesChart = () => {
  const zoneOccupiedArray = useSelector((state) => state.dashboard.data.occupiedArray ? state.dashboard.data.occupiedArray:[]);
  const zoneVaccantArray = useSelector((state) => state.dashboard.data.vaccantArray ? state.dashboard.data.vaccantArray:[]);
  const zoneNameArray = useSelector((state) => state.dashboard.data.zoneName ? state.dashboard.data.zoneName:[]);


    const getZonesView = () => {
        let options = {
          chart: {
            type: "bar",
            height: 200,
            stacked: true,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: true,
            },
          },
          colors: ["#fc9e5b", "#02d1ff"],
          responsive: [
            {
              breakpoint: 1920,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 5,
              endingShape: "rounded",
            },
          },
          xaxis: {
            categories: zoneNameArray,
          },
        
          legend: {
            position: "right",
            offsetY: 40,
          },
          fill: {
            opacity: 1,
          },
        };

      

        let series= [
          {
            name: "Occupied",
            data: zoneOccupiedArray
          },
          {
            name: "Vaccant",
            data: zoneVaccantArray
          },
        ];

        return <ApexCharts options={options} series={series} type="bar" />;

    }
return(
    <div className="col-lg-4 col-md-12 mb-4">
            <div className="card h-100 border-0">
              <div className="card h-100 border-0">
                <div className="card-header pb-0">
                  <div className="card-title text-left">
                    <h5 className="mb-0">Zone</h5>
                  </div>
                </div>
                <div className="card-body">
                  <div id="zone-chart">{getZonesView()}</div>

                   
                  <div className="text-right"><span className="moreLink">More <i className="fa-solid fa-arrow-right"></i></span></div>
                </div>
              </div>
            </div>
          </div>
);
}

export default ZonesChart;