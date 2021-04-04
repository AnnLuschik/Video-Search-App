import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ onClick, children, ...restProps }) => (
  <StyledButton onClick={onClick} {...restProps}>{children}</StyledButton>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};

const StyledButton = styled.button`
  padding: 0.5em 1em;
  font-size: 1em;
  color: #FFFFFF;
  text-transform: uppercase;
  background-color: #F65263;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #ec2f42;
  }
`;

export default Button;
