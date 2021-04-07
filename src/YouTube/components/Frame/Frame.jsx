import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Frame = React.memo(({ id }) => {
  const { searchParams } = useSelector((state) => state.youtube);
  return (
    <iframe
      title={id}
      src={`http://www.youtube.com/embed/${id}?enablejsapi=1&start=${searchParams.start}&origin=https://annluschik.github.io/Video-Search-App/`}
      width="340"
      height="190"
      frameBorder="0"
      allowFullScreen
    />
  );
});

Frame.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Frame;
