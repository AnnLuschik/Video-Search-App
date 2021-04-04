import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Header } from './components';
import { fetchMoreVideos, YouTube } from './YouTube';

export const App = () => {
  const { responseData } = useSelector((state) => state.youtube);
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
        {responseData ? <YouTube data={responseData} ref={loader} /> : null}
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 24px;
`;

const Main = styled.main`
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  grid-gap: 24px;
  padding-top: 15px; */
  /* background: #f9f9f9; */
`;
