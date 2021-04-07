import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { decode } from 'html-entities';
import { Frame } from '../Frame';

const VideoItem = React.memo(({ data }) => {
  const [videoId, setVideoId] = useState('');
  const { kind, id, snippet: { title, publishedAt, thumbnails } } = data;

  const time = new Date(publishedAt).toLocaleString().split(',')[0];

  const showVideo = useCallback(() => {
    if (kind === 'youtube#searchResult') {
      setVideoId(id.videoId);
    } else setVideoId(id);
  }, [kind, id]);

  const decodedTitle = decode(title);

  return (
    <Wrapper>
      <Container onClick={showVideo}>
        {
          videoId
            ? <Frame id={videoId} />
            : <Preview src={thumbnails.medium.url} alt={`Preview for ${decodedTitle}`} />
        }
        <Details>
          <Title>{decodedTitle}</Title>
          <PublishedAt dateTime={publishedAt}>{time}</PublishedAt>
        </Details>
      </Container>
    </Wrapper>

  );
});

VideoItem.propTypes = {
  data: PropTypes.object,
};

const Wrapper = styled.div`
  max-width: 340px;
  margin: 0 8px 40px;
`;

const Container = styled.div`
  cursor: pointer;
`;

const Details = styled.div`
  font-size: 12px;
  padding-right: 12px;
  &:focus {
    box-shadow: 0 0 0 5px rgba(0,0,0, 0.2);
  }
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
  cursor: pointer;
`;

export default VideoItem;
