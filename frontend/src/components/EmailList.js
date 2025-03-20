import React from 'react';
import { 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Chip,
  Box 
} from '@mui/material';
import moment from 'moment';

const EmailList = ({ emails, selectedEmail, onEmailSelect }) => {
  return (
    <Paper sx={{ width: '70%', p: 2, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
      <List>
        {emails.map((email) => (
          <ListItem 
            key={email._id} 
            divider 
            sx={{ 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              cursor: 'pointer',
              bgcolor: selectedEmail?._id === email._id ? 'action.selected' : 'inherit'
            }}
            onClick={() => onEmailSelect(email)}
          >
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2">{email.from}</Typography>
              <Typography variant="caption">
                {moment(email.date).format('MMM D, YYYY')}
              </Typography>
            </Box>
            <ListItemText 
              primary={email.subject}
              secondary={email.body.substring(0, 100) + '...'}
            />
            <Chip 
              label={email.category} 
              color={email.category === 'Interested' ? 'success' : 'default'}
              size="small"
              sx={{ mt: 1 }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default EmailList;