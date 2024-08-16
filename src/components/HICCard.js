import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, CardMedia, Typography, Box, CardActions, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomCard = styled('div')(({ bgcolor }) => ({
  backgroundColor: bgcolor || '#fff',
  borderRadius: '12px',
  overflow: 'auto',
  position: 'relative', // Remove absolute positioning for non-movable card
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', // Custom shadow
  padding: '12px', // Padding between image and card content
}));

const StatusTag = styled('div')(({ bgcolor }) => ({
  display: 'inline-block',
  padding: '2px 10px',
  backgroundColor: bgcolor || '#1976d2',
  color: '#fff',
  borderRadius: '25px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  margin: '8px 4px 0 0', // Margin between tags
}));

const HICCard = ({
  title,
  subtitle,
  subtitleColor,
  imageSrc,
  description,
  tags,
  actions,
  bgcolor,
  isResizable,
  width,
  height,
  ...props
}) => {
  return (
    <CustomCard bgcolor={bgcolor} style={{ width, height }}>
      {imageSrc && (
        <CardMedia
          component="img"
          height="140"
          image={imageSrc}
          alt={title}
          style={{ marginBottom: '12px', borderRadius: '8px' }} // Rounded corners for the image
        />
      )}
      <CardContent>
        {title && (
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="subtitle1" style={{ color: subtitleColor }}>
            {subtitle}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        )}
        {tags && tags.length > 0 && (
          <Box mt={1} display="flex" flexWrap="wrap">
            {tags.map((tag, index) => (
              <StatusTag key={index} bgcolor={tag.color}>
                {tag.text}
              </StatusTag>
            ))}
          </Box>
        )}
      </CardContent>
      {actions && actions.length > 0 && (
        <CardActions>
          {actions.map((action, index) => (
            <IconButton key={index} size="small" onClick={action.onClick}>
              {action.icon === 'edit' && <EditIcon />}
              {action.icon === 'delete' && <DeleteIcon />}
              <Typography variant="body2" style={{ marginLeft: '4px' }}>
                {action.text}
              </Typography>
            </IconButton>
          ))}
        </CardActions>
      )}
    </CustomCard>
  );
};

HICCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleColor: PropTypes.string,
  imageSrc: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.oneOf(['edit', 'delete']), // Icon type
      onClick: PropTypes.func.isRequired,
    })
  ),
  bgcolor: PropTypes.string,
  isResizable: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

HICCard.defaultProps = {
  title: '',
  subtitle: '',
  subtitleColor: 'textSecondary',
  imageSrc: '',
  description: '',
  tags: [],
  actions: [],
  bgcolor: '',
  isResizable: false,
  width: 'auto',
  height: 'auto',
};

export default HICCard;