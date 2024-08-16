import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { Button, Grid, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';
import 'draft-js/dist/Draft.css';

const HICToolbar = styled(Grid)({
  backgroundColor: '#f5f5f5',
  padding: '8px',
  marginBottom: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: '100%',
});

const HICRichTextEditor = styled(Editor)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  minHeight: '200px',
  fontSize: '1rem',
  fontFamily: 'Arial, sans-serif',
  '&:focus': {
    outline: 'none',
    borderColor: '#2196f3',
  },
});

const HICRichText = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [fontSize, setFontSize] = useState('16px');
  const [fontColor, setFontColor] = useState('#000');

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onInlineStyleClick = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const applyFontStyle = (e) => {
    const font = e.target.value;
    setFontFamily(font);
    applyInlineStyle('FONT_FAMILY', font);
  };

  const applyFontSize = (e) => {
    const size = e.target.value;
    setFontSize(size);
    applyInlineStyle('FONT_SIZE', size);
  };

  const applyFontColor = (e) => {
    const color = e.target.value;
    setFontColor(color);
    applyInlineStyle('COLOR', color);
  };

  const applyInlineStyle = (styleName, value) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    // Apply inline style to the selected text
    const newContentState = Modifier.applyInlineStyle(contentState, selection, value);
    const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(newEditorState);
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div>
      <HICToolbar container justifyContent="flex-start" alignItems="center">
        <Button
          onClick={() => onInlineStyleClick('BOLD')}
          variant={currentStyle.has('BOLD') ? 'contained' : 'outlined'}
          style={{ backgroundColor: '#ffd54f', marginRight: '8px', marginBottom: '8px' }}
        >
          <strong>B</strong>
        </Button>
        <Button
          onClick={() => onInlineStyleClick('ITALIC')}
          variant={currentStyle.has('ITALIC') ? 'contained' : 'outlined'}
          style={{ backgroundColor: '#a5d6a7', marginRight: '8px', marginBottom: '8px' }}
        >
          <em>I</em>
        </Button>
        <Button
          onClick={() => onInlineStyleClick('UNDERLINE')}
          variant={currentStyle.has('UNDERLINE') ? 'contained' : 'outlined'}
          style={{ backgroundColor: '#90caf9', marginBottom: '8px' }}
        >
          <u>U</u>
        </Button>

        {/* Font family selector */}
        <Select
          value={fontFamily}
          onChange={applyFontStyle}
          style={{ marginLeft: '16px', minWidth: '120px', fontSize: '0.8rem', marginBottom: '8px' }}
        >
          <MenuItem value="Arial, sans-serif">Arial</MenuItem>
          <MenuItem value="'Times New Roman', Times, serif">Times New Roman</MenuItem>
          <MenuItem value="'Courier New', Courier, monospace">Courier New</MenuItem>
          <MenuItem value="Verdana, sans-serif">Verdana</MenuItem>
          <MenuItem value="'Comic Sans MS', cursive">Comic Sans MS</MenuItem>
        </Select>

        {/* Font size selector */}
        <Select
          value={fontSize}
          onChange={applyFontSize}
          style={{ marginLeft: '16px', minWidth: '80px', fontSize: '0.8rem', marginBottom: '8px' }}
        >
          <MenuItem value="16px">Small</MenuItem>
          <MenuItem value="20px">Medium</MenuItem>
          <MenuItem value="24px">Large</MenuItem>
          <MenuItem value="32px">Extra Large</MenuItem>
        </Select>

        {/* Font color selector */}
        <Select
          value={fontColor}
          onChange={applyFontColor}
          style={{ marginLeft: '16px', minWidth: '80px', fontSize: '0.8rem', marginBottom: '8px' }}
        >
          <MenuItem value="#000">Black</MenuItem>
          <MenuItem value="#f44336">Red</MenuItem>
          <MenuItem value="#2196f3">Blue</MenuItem>
          <MenuItem value="#4caf50">Green</MenuItem>
          <MenuItem value="#ff9800">Orange</MenuItem>
        </Select>
      </HICToolbar>
      <HICRichTextEditor editorState={editorState} onChange={onEditorChange} handleKeyCommand={handleKeyCommand} />
    </div>
  );
};

export default HICRichText;