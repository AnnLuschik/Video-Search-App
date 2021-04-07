import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BarLoader } from 'react-spinners';
import { Header } from './components';
import { fetchMoreVideos, YouTube } from './YouTube';

export const App = () => {
  const { responseData, loading, errorMessage } = useSelector((state) => state.youtube);
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        dispatch(fetchMoreVideos());
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (responseData?.nextPageToken && loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [dispatch, responseData]);

  const loader = useRef(null);

  return (
    <Wrapper>
      <Header />
      <Main>
        {loading ? <BarLoader color="#F65263" width="100%" height="5px" /> : <div style={{ width: '100%', height: '5px' }} />}
        {responseData ? <YouTube data={responseData} ref={loader} /> : null}
        {errorMessage ? <p style={{ color: '#b40719' }}>{errorMessage}</p> : null }
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Main = styled.main`
  width: 100%;
`;
