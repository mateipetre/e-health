import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, TextField, Button, Box, styled } from '@mui/material';
import HICListItem from './HICListItem';

const CustomList = styled(List)(({ bgcolor, padding, borderRadius }) => ({
  backgroundColor: bgcolor || '#fff',
  padding: padding || '16px',
  borderRadius: borderRadius || '12px',
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
}));

const HICList = ({ 
  items, 
  onEdit, 
  onDelete, 
  onAdd, 
  showAvatar, 
  avatarField, 
  primaryTextField, 
  secondaryTextField, 
  bgcolor, 
  padding, 
  borderRadius, 
  className, 
  style 
}) => {
  const [newItem, setNewItem] = useState({ [primaryTextField]: '', [secondaryTextField]: '', [avatarField]: '' });

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    onAdd(newItem);
    setNewItem({ [primaryTextField]: '', [secondaryTextField]: '', [avatarField]: '' });
  };

  return (
    <>
      <CustomList bgcolor={bgcolor} padding={padding} borderRadius={borderRadius} className={className} style={style}>
        {items.map((item, index) => (
          <HICListItem 
            key={index}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            showAvatar={showAvatar}
            avatarField={avatarField}
            primaryTextField={primaryTextField}
            secondaryTextField={secondaryTextField}
          />
        ))}
      </CustomList>
      <Box mt={2} display="flex" justifyContent="space-between">
        <TextField 
          label="Name" 
          name={primaryTextField} 
          value={newItem[primaryTextField]} 
          onChange={handleChange} 
          variant="outlined" 
          margin="dense"
        />
        <TextField 
          label="Role" 
          name={secondaryTextField} 
          value={newItem[secondaryTextField]} 
          onChange={handleChange} 
          variant="outlined" 
          margin="dense"
        />
        {showAvatar && (
          <TextField 
            label="Avatar URL" 
            name={avatarField} 
            value={newItem[avatarField]} 
            onChange={handleChange} 
            variant="outlined" 
            margin="dense"
          />
        )}
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Box>
    </>
  );
};

HICList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func.isRequired,
  showAvatar: PropTypes.bool,
  avatarField: PropTypes.string,
  primaryTextField: PropTypes.string.isRequired,
  secondaryTextField: PropTypes.string,
  bgcolor: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

HICList.defaultProps = {
  onEdit: null,
  onDelete: null,
  showAvatar: false,
  avatarField: 'avatar',
  secondaryTextField: '',
  bgcolor: '',
  padding: '16px',
  borderRadius: '12px',
  className: '',
  style: {},
};

export default HICList;