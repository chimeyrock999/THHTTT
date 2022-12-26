import URLs from "constants/URLs";
import axios from "axios";
import { toast } from "react-toastify";

export const CHANGE_PREDICT_REQUEST = "CHANGE_PREDICT_REQUEST";
export const CHANGE_PREDICT_SUCCESS = "CHANGE_PREDICT_SUCCESS";
export const CHANGE_PREDICT_FAILURE = "CHANGE_PREDICT_FAILURE";

export const changePredictAction = (symbol) => (dispatch) => {
  dispatch({
    type: CHANGE_PREDICT_REQUEST,
    active: symbol,
  });
  const url = `${URLs.quandl}/predict/?code=${symbol}`;
  return axios
    .get(url)
    .then(({ data }) => {
      dispatch({
        type: CHANGE_PREDICT_SUCCESS,
        data: data.data,
      });
    })
    .catch((error) => {
      toast(`An error occurred when attempting to change PREDICT\n${error}`);
      dispatch({
        type: CHANGE_PREDICT_FAILURE,
      });
    });
};