import axios from 'axios';
import URLs from 'constants/URLs';
import moment from 'moment';
import { toast } from 'react-toastify';

export const FETCH_QUOTES_REQUEST = 'FETCH_QUOTES_REQUEST';
export const FETCH_QUOTES_SUCCESS = 'FETCH_QUOTES_SUCCESS';
export const FETCH_QUOTES_FAILURE = 'FETCH_QUOTES_FAILURE';

export const fetchQuotesAction = (symbol, startDate) => (dispatch) => {
  dispatch({
    type: FETCH_QUOTES_REQUEST,
  });
  const endDate = moment().format().substring(0, 10);
  // console.log(startDate);
  // console.log(endDate);
  // console.log(symbol);
  const url = `${URLs.quandl}?code=${symbol}&start_date=${startDate}&end_date=${endDate}`;
  return axios.get(url)
    .then(({ data }) => {
      console.log(data.data);
      dispatch({
        type: FETCH_QUOTES_SUCCESS,
        data: data.data,
      });
    })
    .catch((error) => {
      toast(`An error occurred when attempting to fetch quotes\n${error}`);
      dispatch({
        type: FETCH_QUOTES_FAILURE,
      });
    });
};
