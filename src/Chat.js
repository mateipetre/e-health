import React, { RouterLink, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
  Button
} from '@mui/material';
import { CloudUpload, Send } from '@mui/icons-material';
import axios from 'axios';

const predefinedPrompts = [
  "Cum te poate ajuta platforma Health In Campus, destinată studenților din campusul universitar?",
  "Cine este elegibil pentru a utiliza platforma medicală din campus?",
  "Ce informații medicale îmi poți oferi? Îmi poți recomanda tratamente medicale?"
];

const botIconPath = '/bot.png'; // Replace with actual bot icon path
const userIconPath = '/user.png'; // Replace with actual user icon path

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const pastelBlue = '#6faaff';
  const navigate = useNavigate();

  useEffect(() => {
    const initialBotMessage = {
      role: 'bot',
      content: 'Sunt asistentul inteligent al platformei "Health In Campus", cu ce te pot ajuta?'
    };
    setMessages([initialBotMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    const userMessage = input;
    setMessages(prevMessages => [...prevMessages, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('message', userMessage);
      if (file) {
        formData.append('file', file);
      }

      const response = await axios.post('http://localhost:8080/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'bot', content: response.data.botMessage }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'bot', content: 'Scuze, a apărut o eroare în timpul procesării mesajului tău.' }
      ]);
    } finally {
      setIsLoading(false);
      setFile(null); // Clear the file input after sending
    }
  };

  const handlePredefinedPrompt = async (prompt) => {
    // Check if the last message is the same predefined prompt
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user' && lastMessage?.content === prompt) {
      console.log('Prompt already sent:', prompt);
      return;
    }

    // Add the predefined prompt to the messages
    setMessages(prevMessages => [...prevMessages, { role: 'user', content: prompt }]);
    try {
      const response = await axios.post('http://localhost:8080/predefined', { prompt });
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'bot', content: response.data.botMessage }
      ]);
    } catch (error) {
      console.error('Error sending predefined prompt:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'bot', content: 'Scuze, a apărut o eroare în timpul procesării mesajului tău.' }
      ]);
    }
};

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid image file.');
      setFile(null);
    }
  };

  return (
    <>
    <Container style={{marginLeft: '-440px', marginTop: '10px'}}>
        <Button
    component={RouterLink}
    to="/"
    sx={{
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      width: '100%',
    }}
  >
    <img
      src="logo-no-background.png"
      alt="Logo"
      style={{ height: '35px' }}
    />
  </Button>
  </Container>
  <Container style={{marginLeft: '1900px', marginTop: '-40px'}}>
  <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
              sx={{
                backgroundColor: pastelBlue,
                '&:hover': {
                  backgroundColor: '#005bb5',
                },
                textTransform: 'none',
              }}
            >
              Back to Main Page
            </Button>
    </Container>
    <Container maxWidth="lg" style={{ paddingTop: '2rem', fontFamily: 'ABeeZee', height: '90vh', display: 'flex', flexDirection: 'column', marginRight: '300px' }}>
      <Grid container spacing={3} style={{ flex: 1 }}>
        <Grid item xs={12} sm={9}>
          <Card elevation={4} style={{ marginBottom: '2rem', borderRadius: '12px' }}>
            <CardContent style={{ backgroundColor: '#779ecb', color: 'white', textAlign: 'center' }}>
              <Typography variant="h5">Health In Campus Smart Assistant</Typography>
            </CardContent>
          </Card>

          <Grid container spacing={2} style={{ marginBottom: '1rem', display: 'flex' }}>
            {predefinedPrompts.map((prompt, index) => (
              <Grid item xs={12} sm={4} key={index} style={{ display: 'flex' }}>
                <Card 
                  elevation={3} 
                  style={{ 
                    borderRadius: '12px', 
                    backgroundColor: '#fce4ec', 
                    cursor: 'pointer',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '150px', // Ensure all cards have the same minimum height
                    textAlign: 'center'
                  }}
                  onClick={() => handlePredefinedPrompt(prompt)}
                >
                  <CardContent>
                    <Typography variant="body1" style={{ color: '#000' }}>
                      {prompt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper elevation={3} style={{ padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '12px', display: 'flex', flexDirection: 'column', height: '700px', overflow: 'hidden' }}>
            <List style={{ flex: 1, overflowY: 'auto' }}>
              {messages.map((message, index) => (
                <ListItem
                key={index}
                style={{
                  justifyContent: 'flex-start', // Align messages to the left
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  style={{
                    margin: '0 1rem' // Consistent margin for both sides
                  }}
                >
                  {message.role === 'bot' && (
                    <img src={botIconPath} width='40px' alt="Bot Icon" style={{ marginRight: '0.5rem' }} />
                  )}
                  {message.role === 'user' && (
                    <img src={userIconPath} width='40px' alt="User Icon" style={{ marginRight: '0.5rem' }} />
                  )}
                  <ListItemText
                    primary={message.content}
                    primaryTypographyProps={{
                      style: {
                        color: 'black',
                        backgroundColor: message.role === 'bot' ? '#e3f2fd' : '#f8bbd0',
                        borderRadius: '12px',
                        padding: '0.5rem',
                        maxWidth: '80%',
                        textAlign: 'left' // Ensure text is aligned left
                      }
                    }}
                  />
                </Box>
              </ListItem>              
              ))}
            </List>

            <Box display="flex" alignItems="center" marginTop="1rem" style={{ position: 'relative' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <IconButton color="primary" component="span">
                  <CloudUpload />
                </IconButton>
              </label>
              <TextField
                label="Întreabă-mă ceva ..."
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
                style={{ borderRadius: '12px', backgroundColor: '#f4f6f8', marginLeft: '1rem' }}
              />
              <IconButton color="primary" onClick={sendMessage} disabled={isLoading} style={{ marginLeft: '0.5rem' }}>
                <Send />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default Chat;