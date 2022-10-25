import React, { useEffect, useState } from "react";
import "../DashBoard/DashBoard.css";
import bin_f from "../../assets/bin/garbage_full.png";
import bin_h from "../../assets/bin/garbage_half_full.png";
import bin_e from "../../assets/bin/garbage-empty.png";
import { PieChart } from "../Charts/Chart";

const DashBoard = () => {
  const [data,setData] = useState({});
  const [chartData,setChartData] = useState({});
  const [compData,setCompData] = useState({});
  
  useEffect(()=>{
    console.log('effect started');
    async function fetchData() {
      const response = await fetch('https://nitshack.herokuapp.com/admin');
      const resdata = await response.json();
      let x = resdata.composition.biodegradable === null ? 0 : resdata.composition.biodegradable;
      setData(resdata);
      setChartData({
        labels: ['Biodegradable' , 'Non-Biodegradable'],
        datasets: [{
            label: 'Waste Composition',
            data: [ x , 100 - x],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
        }],
      })

      setCompData({
        labels: ['Bottle' , 'Metal', 'Glass', 'Plastic' , 'Biodegradable'],
        datasets: [{
            label: 'Waste Composition',
            data: [
              resdata.composition.nonbiodegradable.bottle , 
              resdata.composition.nonbiodegradable.metal,
              resdata.composition.nonbiodegradable.plastic,
              resdata.composition.nonbiodegradable.glass,
              resdata.composition.biodegradable
            ],
            backgroundColor: [
              'rgb(0, 42, 50)',
              'rgb(107, 45, 92)',
              'rgb(255, 83, 118)',
              'rgb(55, 114, 255)',
              'rgb(248, 242, 114)',
            ],
            hoverOffset: 4
        }],
      })
    }
    fetchData();
  },[]);
  
  return (
    <div className="col main pt-5 mt-3">
      <h1>DashBoard</h1>

      <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div
              className="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <h1 className="display-4">0</h1>
              <img className="image-card-bin" src={bin_e}></img>
              <h6 className="text-uppercase">Empty Bins</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <h1 className="display-4">0</h1>
              <img className="image-card-bin" src={bin_h}></img>
              <h6 className="text-uppercase">Half Bins</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-info h-100">
            <div className="card-body bg-info">
              <h1 className="display-4">0</h1>
              <img className="image-card-bin" src={bin_f}></img>
              <h6 className="text-uppercase">full Bins</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="user-row">
        <div className="col-lg-10 col-md-6 col-sm-12">
          <h4 className="mt-3 mb-3 text-secondary">
            Check More Records of Each bins
          </h4>
          <div className="table-responsive">
            {
              Object.keys(data).length ? <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Weight (kg)</th>
                  <th>Level (%)</th>
                  <th>Biodegradable (%)</th>
                  <th>Non-Biodegradable (%)</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.allDustbins.map(elem=>{  
                    return(
                      <tr key={elem.dustbinID}>
                        <td>{elem.name}</td>
                        <td>{elem.weight}</td>
                        <td>{elem.weight / elem.capacity * 100} %</td>
                        <td>{elem.composition.biodegradable === null ? 0 : elem.composition.biodegradable}</td>
                        <td>{elem.composition.biodegradable === null ? 100 : 100 - elem.composition.biodegradable}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table> : <p>loading</p>
            }
          </div>
        </div>
      </div>

      <div className="col-lg-8 col-md-6 col-sm-12 col-sm-offset-5">
        <h4 className="title mt-3 mb-3 text-secondary">
          Data in Chart
        </h4>
        {
          Object.keys(chartData).length ? 
          <div className="chart">
            <PieChart data={chartData}/>
            <PieChart data={compData}/>
          </div>
          : <p>loading</p>
        }
      </div>
    </div>
  );
};

export default DashBoard;
