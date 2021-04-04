import React from 'react';
import PropTypes from 'prop-types';

const Frame = ({ id }) => (
  <iframe
    title={id}
    src={`http://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com`}
    width="340"
    height="190"
    frameBorder="0"
    allowFullScreen
  />
);

Frame.propTypes = {
  id: PropTypes.string,
};

export default Frame;
