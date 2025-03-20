import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  Box,
  CircularProgress 
} from '@mui/material';
import { getSuggestedReply } from '../services/api';

const SuggestedReply = ({ email }) => {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      generateReply();
    } else {
      setReply('');
    }
  }, [email]);

  const generateReply = async () => {
    try {
      setLoading(true);
      const response = await getSuggestedReply(email._id);
      setReply(response.data.reply);
    } catch (error) {
      console.error('Error generating reply:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <Paper sx={{ width: '30%', p: 2 }}>
        <Typography variant="body2">
          Select an email to see suggested replies
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '30%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Suggested Reply
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {reply}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" color="primary">
              Use Reply
            </Button>
            <Button variant="outlined" onClick={generateReply}>
              Generate New
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default SuggestedReply;