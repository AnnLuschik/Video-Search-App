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
          <VideoContainer total={pageInfo.totalResults}>
            {items.map((item) => <VideoItem data={item} key={kind === 'youtube#searchListResponse' ? item.id.videoId : item.id} />)}
            <LoaderDiv ref={ref} />
          </VideoContainer>
        )
        : <NothingFound>Ничего не найдено.</NothingFound>
    }
    </StyledSection>
  );
});

YouTube.propTypes = {
  data: PropTypes.object,
};

const StyledSection = styled.section`
  padding: 25px 0;
  background-color: #f9f9f9;
`;

const VideoContainer = styled.div`
  display: ${(props) => (props.total === 1 ? 'flex' : 'grid')};
  grid-template-columns: repeat(auto-fill, 340px);
  grid-gap: 24px;
  justify-content: center;
  width: 100%;
  padding-top: 15px;
`;

const LoaderDiv = styled.div`
  width: 10px;
  height: 2px;
`;

const NothingFound = styled.p`
  margin-top: 40px;
  font-weight: 600;
  font-size: 26px;
  color: #000000;
`;

export default YouTube;
