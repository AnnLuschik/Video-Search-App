import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { VideoItem } from './components';

const YouTube = React.forwardRef(({ data }, ref) => {
  const { pageInfo, items, kind } = data;

  return (
    <StyledSection>
      {
      pageInfo.totalResults
        ? (
          <VideoContainer>
            {items.map((item) => <VideoItem data={item} key={kind === 'youtube#searchListResponse' ? item.id.videoId : item.id} />)}
            <LoaderDiv ref={ref} />
          </VideoContainer>
        )
        : <p>Ничего не найдено.</p>
    }
    </StyledSection>
  );
});

YouTube.propTypes = {
  data: PropTypes.object,
};

const StyledSection = styled.section`
  background: #f9f9f9;
`;

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  grid-gap: 24px;
  padding-top: 15px;
`;

const LoaderDiv = styled.div`
  width: 100%;
  height: 2px;
`;

export default YouTube;
