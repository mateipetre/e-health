import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HICListItem = ({ 
  item, 
  onEdit, 
  onDelete, 
  showAvatar, 
  avatarField, 
  primaryTextField, 
  secondaryTextField 
}) => {
  return (
    <ListItem divider>
      {showAvatar && (
        <ListItemAvatar>
          <Avatar src={item[avatarField]} alt={item[primaryTextField]} />
        </ListItemAvatar>
      )}
      <ListItemText 
        primary={<Typography variant="h6">{item[primaryTextField]}</Typography>} 
        secondary={item[secondaryTextField] && <Typography variant="body2" color="textSecondary">{item[secondaryTextField]}</Typography>} 
      />
      {(onEdit || onDelete) && (
        <ListItemSecondaryAction>
          {onEdit && (
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(item)}>
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item)}>
              <DeleteIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

HICListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  showAvatar: PropTypes.bool,
  avatarField: PropTypes.string,
  primaryTextField: PropTypes.string.isRequired,
  secondaryTextField: PropTypes.string,
};

HICListItem.defaultProps = {
  onEdit: null,
  onDelete: null,
  showAvatar: false,
  avatarField: 'avatar',
  secondaryTextField: '',
};

export default HICListItem;