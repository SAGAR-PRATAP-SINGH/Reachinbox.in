import React, { useState, useEffect } from 'react';
import { Container, Box, CssBaseline, ThemeProvider } from '@mui/material';
import EmailList from './components/EmailList';
import SearchFilters from './components/SearchFilters';
import SuggestedReply from './components/SuggestedReply';
import { fetchEmails } from './services/api';
import theme from './styles/theme';

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    account: '',
    folder: ''
  });

  useEffect(() => {
    loadEmails();
  }, [filters]);

  const loadEmails = async () => {
    try {
      const response = await fetchEmails(filters);
      setEmails(response.data);
    } catch (error) {
      console.error('Error loading emails:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <SearchFilters filters={filters} setFilters={setFilters} />
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <EmailList 
              emails={emails} 
              selectedEmail={selectedEmail}
              onEmailSelect={setSelectedEmail}
            />
            <SuggestedReply email={selectedEmail} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;