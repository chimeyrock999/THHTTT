import axios from "axios";
import URLs from "constants/URLs";
import moment from "moment";
import { toast } from "react-toastify";

export const FETCH_PREDICT_REQUEST = "FETCH_PREDICT_REQUEST";
export const FETCH_PREDICT_SUCCESS = "FETCH_PREDICT_SUCCESS";
export const FETCH_PREDICT_FAILURE = "FETCH_PREDICT_FAILURE";

export const fetchPredictAction = (symbol) => (dispatch) => {
  dispatch({
    type: FETCH_PREDICT_REQUEST,
  });
  const url = `${URLs.quandl}/predict/?code=${symbol}`;
  return axios
    .get(url)
    .then(({ data }) => {
      console.log(data.data);
      dispatch({
        type: FETCH_PREDICT_SUCCESS,
        data: data.data,
      });
    })
    .catch((error) => {
      toast(`An error occurred when attempting to fetch quotes\n${error}`);
      dispatch({
        type: FETCH_PREDICT_FAILURE,
      });
    });
};
