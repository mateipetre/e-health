import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box, CardActions } from '@mui/material';
import { styled } from '@mui/system';

const CalloutCard = styled(Card)(({ theme, bgcolor, isResizable }) => ({
  backgroundColor: bgcolor || theme.palette.primary.light,
  borderRadius: '12px',
  resize: isResizable ? 'both' : 'none',
  overflow: 'auto',
}));

const TitleWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const HICCallout = ({
  title,
  titleIcon,
  description,
  actionText,
  onActionClick,
  bgcolor,
  isResizable,
  width,
  height,
}) => {
  const cardRef = useRef(null);

  return (
    <CalloutCard

      bgcolor={bgcolor}
      isResizable={isResizable}
      ref={cardRef}
      style={{ width: width, height: height }}
    >
      <CardContent>
        {title && (
          <TitleWrapper>
            {titleIcon && titleIcon}
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
          </TitleWrapper>
        )}
        {description && (
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        )}
      </CardContent>
      {actionText && onActionClick && (
        <CardActions>
          <Box ml="auto">
            <Button size="small" color="primary" onClick={onActionClick}>
              {actionText}
            </Button>
          </Box>
        </CardActions>
      )}
    </CalloutCard>
  );
};

HICCallout.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.node,
  description: PropTypes.string,
  actionText: PropTypes.string,
  onActionClick: PropTypes.func,
  bgcolor: PropTypes.string,
  isResizable: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

HICCallout.defaultProps = {
  title: '',
  titleIcon: null,
  description: '',
  actionText: '',
  onActionClick: null,
  bgcolor: '',
  isResizable: false,
  width: 'auto',
  height: 'auto',
};

export default HICCallout;