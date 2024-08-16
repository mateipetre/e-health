import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Box, Tooltip } from '@mui/material';

const Shape = styled('div')`
  overflow: hidden;
  position: relative;
  display: inline-block;
  border-radius: ${(props) => (props.shape === 'circle' ? '50%' : props.shape === 'square' ? '4px' : '0')};
  mask-image: ${(props) => (props.shape === 'circle' ? 'radial-gradient(circle, white 60%, black 100%)' : 'none')};
  mask-border-mode: alpha;
  -webkit-mask-image: ${(props) =>
    props.shape === 'circle' ? 'radial-gradient(circle, white 60%, black 100%)' : 'none'};
`;

const StyledImage = styled('img')`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: block;
  transition: transform 0.3s ease-in-out;
  cursor: ${(props) => (props.onClick ? 'pointer' : props.cursorStyle || 'default')};

  &:hover {
    transform: ${(props) => (props.onClick ? 'scale(1.1)' : 'none')};
  }
`;

const ResizableHandle = styled('div')`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #007bff;
  cursor: se-resize;
  bottom: -5px;
  right: -5px;
  display: ${(props) => (props.resizable ? 'block' : 'none')}; /* Conditionally display handle */
`;

const HICImage = ({ src, alt, shape, onClick, tooltip, width, height, alignment, cursorStyle, resizable }) => {
  const imageRef = useRef(null);
  let startX, startY, startWidth, startHeight;

  const handleMouseDown = (e) => {
    if (!resizable) return; // Exit if not resizable

    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(imageRef.current).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(imageRef.current).height, 10);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!resizable) return; // Exit if not resizable

    const newWidth = startWidth + e.clientX - startX;
    const newHeight = startHeight + e.clientY - startY;
    imageRef.current.style.width = `${newWidth}px`;
    imageRef.current.style.height = `${newHeight}px`;
  };

  const handleMouseUp = () => {
    if (!resizable) return; // Exit if not resizable

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <Tooltip title={tooltip} arrow>
      <Box display="inline-block" textAlign={alignment} style={{ position: 'relative' }}>
        <Shape shape={shape} style={{ width, height }}>
          <StyledImage
            ref={imageRef}
            src={process.env.PUBLIC_URL + src}
            alt={alt}
            onClick={onClick}
            width={width}
            height={height}
            cursorStyle={cursorStyle}
          />
          {resizable && <ResizableHandle onMouseDown={handleMouseDown} resizable={resizable} />}
        </Shape>
      </Box>
    </Tooltip>
  );
};

HICImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  shape: PropTypes.oneOf(['circle', 'square', 'default']),
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  cursorStyle: PropTypes.string,
  resizable: PropTypes.bool,
};

HICImage.defaultProps = {
  shape: 'default',
  onClick: null,
  tooltip: '',
  width: 'auto',
  height: 'auto',
  alignment: 'center',
  cursorStyle: 'default',
  resizable: false,
};

export default HICImage;