import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const VideoWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'borderRadius' && prop !== 'boxShadow' && prop !== 'style',
})(({ borderRadius, boxShadow }) => ({
  borderRadius: borderRadius || '8px',
  boxShadow: boxShadow || '0px 2px 8px rgba(0, 0, 0, 0.3)',
  overflow: 'hidden',
}));

const HICVideoPlayer = ({
  url,
  playing,
  loop,
  controls,
  light,
  volume,
  muted,
  playbackRate,
  width,
  height,
  borderRadius,
  boxShadow,
  style,
  onPlay,
  onPause,
  onEnded,
  onError,
}) => {
  return (
    <VideoWrapper
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      style={style}
    >
      <ReactPlayer
        url={url}
        playing={playing}
        loop={loop}
        controls={controls}
        light={light}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        width={width || '100%'}
        height={height || '100%'}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onError={onError}
      />
    </VideoWrapper>
  );
};

HICVideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  loop: PropTypes.bool,
  controls: PropTypes.bool,
  light: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  volume: PropTypes.number,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string,
  style: PropTypes.object,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnded: PropTypes.func,
  onError: PropTypes.func,
};

HICVideoPlayer.defaultProps = {
  playing: false,
  loop: false,
  controls: true,
  light: false,
  volume: 0.8,
  muted: false,
  playbackRate: 1.0,
  width: '100%',
  height: '100%',
  borderRadius: '8px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
  style: {},
  onPlay: () => {},
  onPause: () => {},
  onEnded: () => {},
  onError: () => {},
};

export default HICVideoPlayer;
