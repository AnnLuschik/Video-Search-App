import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Input } from '../Input';
import { Button } from '../Button';
import { fetchVideos, fetchVideoById } from '../../YouTube/searchSlice';
import { isValidUrl, getVideoIdFromYoutubeUrl, getVideoStartFromYoutubeUrl } from '../../URLService';

export const Header = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const searchHandler = useCallback(() => {
    if (value) {
      if (isValidUrl(value)) {
        const videoId = getVideoIdFromYoutubeUrl(value);
        const start = getVideoStartFromYoutubeUrl(value) || '';
        dispatch(fetchVideoById({ value: videoId, start }));
      } else {
        dispatch(fetchVideos(value));
      }
    }
  }, [dispatch, value]);

  return (
    <StyledHeader>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        <StyledInput id="search" onChange={(e) => setValue(e)} value={value} placeholder="I'm searching..." type="search" />
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
