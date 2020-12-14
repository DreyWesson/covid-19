import "./styles/LineGraph.css";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { useQuery } from "react-query";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

export const LineGraph = ({ casesType = "cases", ...props }) => {
  const [data, setData] = useState({});

  const fetchData = async (key, casesType) => {
    return await fetch(
      `https://disease.sh/v3/covid-19/historical/all?lastdays=120`
    )
      .then((res) => res.json())
      .then((data) => buildChartData(data, casesType));
  };
  // useQuery implementation for asynchronous data
  const getCovidData = useQuery(["covidData", casesType], fetchData);
  const covidData = getCovidData.data;
  useEffect(() => setData(covidData), [covidData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         let chartData = buildChartData(data, casesType);
  //         setData(chartData);
  //       });
  //   };
  //   fetchData();
  // }, [casesType]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#cc1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};
