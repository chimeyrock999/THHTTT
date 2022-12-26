import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import { stylizeNumber } from "utils/format";
import { Line, defaults } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import zoom from "chartjs-plugin-zoom";

defaults.global.defaultFontFamily = "Titillium Web";
defaults.global.defaultFontStyle = "bold";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.quaternary};
  min-width: 0;
`;

const FONT_SIZE = 15;

const LineChart2 = ({ symbol, labels, data }) => {
  const mapDate = (date) => {
    if (date !== "Next day") {
      return new Date(date).toDateString();
    } else {
      return new Date("2022-12-26").toDateString();
    }
  };
  const mapValue = (value) => {
    if (value > 0) {
      return value;
    } else {
      return null;
    }
  };
  console.log(labels);
  return (
    <Wrapper>
      {data && (
        <Line
          redraw
          data={{
            labels: data.map((column) => mapDate(column.date)),
            datasets: [
              {
                data: data.map((column) => mapValue(column[labels[0]])),
                label: labels[0],
                borderColor: "hsl(350, 100%, 60%)",
                backgroundColor: "rgb(255, 51, 85, 0.2)",
              },
              {
                data: data.map((column) => mapValue(column[labels[1]])),
                label: labels[1],
                borderColor: "hsl(215, 100%, 60%)",
                backgroundColor: "rgb(51, 136, 255, 0.2)",
              },
            ],
          }}
          options={{
            title: {
              display: true,
              // text: `${symbol}: ${stylizeNumber(data[0][5], "%")}`,
              text: `${symbol}: Predict Price ${String(
                data.slice(-1)[0]["Predicted Price"]
              ).slice(0, 4)}`,
              fontSize: 26,
            },
            legend: {
              labels: {
                fontSize: FONT_SIZE,
              },
            },
            tooltips: {
              mode: "index",
              position: "nearest",
            },
            elements: {
              line: {
                tension: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  ticks: {
                    fontSize: FONT_SIZE,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    // callback(label) {
                    //   return label.toFixed(2);
                    // },
                    fontSize: FONT_SIZE,
                  },
                },
              ],
            },
            pan: {
              enabled: true,
              drag: false,
              mode: "xy",
              rangeMin: {
                x: moment().subtract("1", "years").toDate(),
              },
              rangeMax: {
                x: moment().toDate(),
              },
            },
            zoom: {
              enabled: true,
              mode: "x",
              rangeMin: {
                x: moment().subtract("1", "years").toDate(),
              },
              rangeMax: {
                x: moment().toDate(),
              },
            },
          }}
        />
      )}
    </Wrapper>
  );
};

LineChart2.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  symbol: PropTypes.string.isRequired,
};

export default LineChart2;
