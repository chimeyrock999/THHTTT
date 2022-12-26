import React, { Component } from "react";
import PropTypes from "prop-types";
import Online from "components/templates/Online";
import styled from "styled-components";
import Header from "components/atoms/Header";
import Loader from "components/atoms/Loader";
import LineChart from "components/molecules/LineChart";
import List from "components/molecules/List";
import moment from "moment";
import { connect } from "react-redux";
import { fetchQuotesAction } from "actions/fetchQuotes";
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

class Quotes extends Component {
  componentDidMount() {
    const { fetchQuotes } = this.props;
    fetchQuotes();
  }

  render() {
    const { quotes, isLoading } = this.props;
      return (
      <Online>
        <Wrapper>
          <Header>History</Header>
          <Board>
            {quotes && !isLoading ? (
              <LineChart
                symbol={quotes.symbol}
                labels={[
                  "adjust",
                  "change_perc1",
                  "change_perc2",
                  "close",
                  "high",
                  "low",
                  "open",
                  "value_match",
                  "value_reconcile",
                  "volume",
                  "volume_match",
                  "volume_reconcile",
                ]}
                data={quotes.data}
              />
            ) : (
              <Loading>
                <CircularProgress size={50} />
              </Loading>
            )}
            <List />
          </Board>
        </Wrapper>
      </Online>
    );
  }
}

Quotes.propTypes = {
  fetchQuotes: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  quotes: PropTypes.object,
};

Quotes.defaultProps = {
  quotes: {},
  isLoading: true,
};

const mapStateToProps = ({ quotes, isLoading }) => ({
  quotes,
  isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuotes: () =>
    dispatch(
      fetchQuotesAction(
        "AAA",
        moment().subtract("1", "years").format().substring(0, 10)
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
