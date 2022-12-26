import React, { Component } from "react";
import PropTypes from "prop-types";
import Online from "components/templates/Online";
import styled from "styled-components";
import Header from "components/atoms/Header";
import Loader from "components/atoms/Loader";
import LineChart2 from "components/molecules/LineChart2";
import List2 from "components/molecules/List2";
import moment from "moment";
import { connect } from "react-redux";
import { fetchPredictAction } from "actions/fetchPredict";
import CircularProgress from "@material-ui/core/CircularProgress";
const Wrapper = styled.div`
  margin-left: 125px;
  padding: 0 3vw 1vh 3vw;
`;

const Board = styled.div`
  margin-top: 5vh;
  display: grid;
  grid-template-columns: 17fr 1fr;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

class Predict extends Component {
  componentDidMount() {
    const { fetchPredict } = this.props;
    fetchPredict();
  }

  render() {
    const { predict, isLoading } = this.props;
    return (
      <Online>
        <Wrapper>
          <Header>Predict</Header>
          <Board>
            {predict && !isLoading ? (
              <LineChart2
                symbol={predict.symbol}
                labels={[
                  "Predicted Price",
                  "Actual Price",
                ]}
                data={predict.data}
              />
            ) : (
              <Loading>
                <CircularProgress size={50} />
              </Loading>
            )}
            <List2 />
          </Board>
        </Wrapper>
      </Online>
    );
  }
}

Predict.propTypes = {
  fetchPredict: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  predict: PropTypes.object,
};

Predict.defaultProps = {
  predict: {},
  isLoading: true,
};

const mapStateToProps = ({ predict, isLoading }) => ({
  predict,
  isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPredict: () =>
    dispatch(
      fetchPredictAction(
        "AAA"
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Predict);
