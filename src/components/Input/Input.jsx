import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = ({ onChange, value, ...restProps }) => {
  const onChangeHandler = useCallback((event) => {
    onChange(event.target.value);
  }, [onChange]);

  return <StyledInput value={value} onChange={onChangeHandler} {...restProps} />;
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  color: #000000;
  background-color: #FFFFFF;
  border: 1px solid #aaa1a1;
  border-radius: 5px;
  outline: none;
  opacity: 0.9;
`;

export default Input;
