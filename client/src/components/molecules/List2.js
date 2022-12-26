import React, { Component } from "react";
import PropTypes from "prop-types";
import symbols from "constants/symbols";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { changePredictAction } from "actions/changePredict";

const UnorderedList = styled.ul`
  background-color: ${({ theme }) => theme.quaternary};
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 120px;
`;

const ListItem = styled.li`
  color: ${({ theme }) => theme.gray};
  font-weight: ${({ theme }) => theme.bold};
  font-size: 16px;
  width: 115px;
  border: 0 solid ${({ theme }) => theme.quaternary};
  transition: 0.3s ease;
  margin-bottom: 1.9px;

  ${({ active }) =>
    active &&
    css`
      width: 120px;
      border-right: 5px solid ${({ theme }) => theme.primary};
    `}

  &:hover {
    width: 120px;
    border-right: 5px solid ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: 0.3s ease;
  }

  @media (max-width: 1360px) {
    font-size: 11px;
  }

  @media (max-width: 1100px) {
    font-size: 9px;
  }

  @media (max-width: 900px) {
    font-size: 7px;
  }
`;

class List2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortcuts: symbols,
      active: "AAA",
    };
  }

  handleClick = (symbol) => {
    this.setState({ active: symbol });
  };

  render() {
    const { changePredict } = this.props;
    const { shortcuts, active } = this.state;
    return (
      <UnorderedList>
        {shortcuts.map((symbol) => (
          <ListItem
            key={symbol}
            onClick={() => {
              this.handleClick(symbol);
              changePredict(symbol);
            }}
            active={symbol === active}
          >
            {symbol}
          </ListItem>
        ))}
      </UnorderedList>
    );
  }
}

List2.propTypes = {
  changePredict: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changePredict: (symbol) => dispatch(changePredictAction(symbol)),
});

export default connect(null, mapDispatchToProps)(List2);
