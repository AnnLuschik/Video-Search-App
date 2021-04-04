import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Frame } from '../Frame';

const VideoItem = ({ data }) => {
  const time = new Date(data.snippet.publishedAt).toLocaleString().split(',')[0];
  const [videoId, setVideoId] = useState('');

  const watchVideo = useCallback(() => {
    setVideoId(data.id.videoId);
  }, [data.id.videoId]);

  return (
    <Wrapper>
      <Container onClick={watchVideo}>
        {
          videoId
            ? <Frame id={videoId} />
            : <Preview src={data.snippet.thumbnails.medium.url} alt="" />
        }
        <Details>
          <Title>{data.snippet.title}</Title>
          <PublishedAt dateTime={data.snippet.publishedAt}>{time}</PublishedAt>
        </Details>
      </Container>
    </Wrapper>

  );
};

VideoItem.propTypes = {
  data: PropTypes.object,
};

const Wrapper = styled.div`
  margin: 0 8px 40px;
`;

const Container = styled.div`
  
`;

const Details = styled.div`
  font-size: 12px;
  padding-right: 12px;
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 12px 0 4px 0;
  font-weight: 600;
  font-size: 1.4em;
`;

const PublishedAt = styled.time`
  font-weight: 400;
  font-size: 1.1em;
`;

const Preview = styled.img`
  /* width: 340px;
  height: 190px; */
  cursor: pointer;
`;

export default VideoItem;
