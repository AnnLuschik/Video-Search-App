import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Input } from '../Input';
import { Button } from '../Button';
import { fetchVideos } from '../../YouTube/searchSlice';

export const Header = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const searchHandler = useCallback(() => {
    if (value) {
      dispatch(fetchVideos(value));
    }
  }, [dispatch, value]);

  // const searchMoreHandler = useCallback(() => {
  //   dispatch(fetchMoreVideos());
  // }, [dispatch]);

  return (
    <StyledHeader>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        {/* <StyledLabel for="search">Enter keywords or link</StyledLabel> */}
        <StyledInput id="search" onChange={(e) => setValue(e)} value={value} placeholder="I'm searching..." />
        <Button onClick={searchHandler}>Search</Button>
      </StyledForm>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 360px) {
    width: 95%;
  }
`;

const StyledInput = styled(Input)`
  margin-right: 10px;
`;
