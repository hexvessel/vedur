import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import "../../App.css";

export default function Weather({ lat, lng }) {
  const [data, setData] = useState();
  const [temp2m, setTemp2m] = useState(true);
  const [rain, setRain] = useState(false);
  const [wind10, setWind10] = useState(false);
  const [wind180, setWind180] = useState(false);
  const [windDir, setWindDir] = useState(false);

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=` +
    lat +
    `&longitude=` +
    lng +
    `&hourly=temperature_2m,precipitation,wind_speed_10m,wind_speed_180m,wind_direction_10m&wind_speed_unit=ms&timezone=Europe%2FLondon&past_days=2`;

  const valueFormatter = (date) =>
    date.getHours() === 0
      ? date.toLocaleDateString("en-GB", {
          month: "numeric",
          day: "numeric",
        })
      : "";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        let array = [];
        for (let i = 0; i < json.hourly.time.length; i++) {
          const s = String(json.hourly.time[i]);
          const year = Number(s.substring(0, 4));
          const month = Number(s.substring(5, 7)) - 1;
          const day = Number(s.substring(8, 10));
          const hour = Number(s.substring(11, 13));
          array.push(new Date(year, month, day, hour));
        }
        const obj = {
          temp: json.hourly.temperature_2m,
          rain: json.hourly.precipitation,
          wind10: json.hourly.wind_speed_10m,
          wind180: json.hourly.wind_speed_180m,
          winddir: json.hourly.wind_direction_10m,
          time: array,
        };
        setData(obj);
      })
      .catch((error) => console.log(error));
  }, []);

  const temp2mCheck = () => {
    setTemp2m(!temp2m);
  };
  const rainCheck = () => {
    setRain(!rain);
  };
  const wind10Check = () => {
    setWind10(!wind10);
  };
  const wind180Check = () => {
    setWind180(!wind180);
  };
  const windDirCheck = () => {
    setWindDir(!windDir);
  };

  return (
    <div className="chart">
      <div className="checkBoxes">
        <label>
          <input
            type="checkbox"
            checked={temp2m}
            onChange={temp2mCheck}
          ></input>
          Temp 2m
        </label>
        <label>
          <input type="checkbox" checked={rain} onChange={rainCheck}></input>
          Precipitation
        </label>
        <label>
          <input
            type="checkbox"
            checked={wind10}
            onChange={wind10Check}
          ></input>
          Wind 10m m/s
        </label>
        <label>
          <input
            type="checkbox"
            checked={wind180}
            onChange={wind180Check}
          ></input>
          Wind 180m m/s
        </label>
        <label>
          <input
            type="checkbox"
            checked={windDir}
            onChange={windDirCheck}
          ></input>
          Wind Direction
        </label>
      </div>
      {data ? (
        <>
          <Box sx={{ width: "100%" }}>
            <LineChart
              xAxis={[
                {
                  data: data.time,
                  scaleType: "time",
                  valueFormatter,
                  tickMaxStep: 3600 * 1000 * 6,
                },
              ]}
              yAxis={[
                { id: "linearAxis", scaleType: "linear" },
                { id: "winddirAxis", scaleType: "linear" },
              ]}
              series={[
                temp2m && {
                  data: data.temp,
                  showMark: false,
                  yAxisKey: "linearAxis",
                  color: "red",
                },
                rain && {
                  data: data.rain,
                  showMark: false,
                  yAxisKey: "linearAxis",
                  color: "yellow",
                },
                wind10 && {
                  data: data.wind10,
                  showMark: false,
                  yAxisKey: "linearAxis",
                  color: "green",
                },
                wind180 && {
                  data: data.wind180,
                  showMark: false,
                  yAxisKey: "linearAxis",
                  color: "blue",
                },
                windDir && {
                  data: data.winddir,
                  showMark: false,
                  yAxisKey: "winddirAxis",
                  color: "white",
                },
              ].filter(Boolean)}
              slotProps={{
                legend: {
                  labelStyle: {
                    fontSize: 14,
                    fill: "white",
                  },
                },
              }}
              leftAxis="linearAxis"
              rightAxis="winddirAxis"
              height={600}
              sx={{
                //change left yAxis label styles
                "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.4",
                  fill: "#ffffff",
                },
                // change all labels fontFamily shown on both xAxis and yAxis
                "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                  fontFamily: "Roboto",
                  color: "#ffffff",
                },
                // change bottom label styles
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.5",
                  fill: "#ffffff",
                },
                // change right label styles
                "& .MuiChartsAxis-right .MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.5",
                  fill: "#ffffff",
                },
                // leftAxis Line Styles
                "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                  stroke: "#ffffff",
                  strokeWidth: "0.7",
                },
                // leftAxis Line Styles
                "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                  stroke: "#ffffff",
                  strokeWidth: "0.4",
                },
                // rightAxis Line Styles
                "& .MuiChartsAxis-right .MuiChartsAxis-line": {
                  stroke: "#ffffff",
                  strokeWidth: "0.4",
                },
              }}
            />
          </Box>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
