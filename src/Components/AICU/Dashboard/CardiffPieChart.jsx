import React from 'react'
import '../../../Styles/main.css';
import ApexCharts from "react-apexcharts";
import {useSelector, useDispatch} from 'react-redux';
const CardiffPieChart = () => {
    const cardiffCount = useSelector((state) => state.dashboard.data.cardiffCount ? state.dashboard.data.cardiffCount:0);
    const nonCardfiffCount = useSelector((state) => state.dashboard.data.nonCardfiffCount ? state.dashboard.data.nonCardfiffCount:0);
   
    const getPieChart = () => {
       var options = {
        series: [cardiffCount, nonCardfiffCount],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Cardiff Count', 'Non Cardfiff Count'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        };
        return <ApexCharts options={options.options} series={options.series} type="pie" width={420}  />;

    }
  return (
   
       <div className="col-lg-4 col-md-12 mb-4">
            <div className="card h-100 border-0">
              <div className="card h-100 border-0">
                <div className="card-header pb-0">
                  <div className="card-title text-left">
                    <h5 className="mb-0">Cardiff/Non Cardiff</h5>
                  </div>
                </div>
                <div className="card-body">
                  <div id="zone-chart">{getPieChart()}</div>

                   
                  <div className="text-right"><span className="moreLink">More <i className="fa-solid fa-arrow-right"></i></span></div>
                </div>
              </div>
            </div>
          </div>
 
  )
}

export default CardiffPieChart
