import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  Box,
  InputLabel,
  FormControl 
} from '@mui/material';
import { getAccounts, getFolders } from '../services/api';

const SearchFilters = ({ filters, setFilters }) => {
  const [accounts, setAccounts] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    if (filters.account) {
      loadFolders(filters.account);
    }
  }, [filters.account]);

  const loadAccounts = async () => {
    try {
      const response = await getAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  };

  const loadFolders = async (accountId) => {
    try {
      const response = await getFolders(accountId);
      setFolders(response.data);
    } catch (error) {
      console.error('Error loading folders:', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search emails..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Account</InputLabel>
          <Select
            value={filters.account}
            onChange={(e) => setFilters({ ...filters, account: e.target.value })}
            label="Account"
          >
            <MenuItem value="">All Accounts</MenuItem>
            {accounts.map(account => (
              <MenuItem key={account._id} value={account._id}>
                {account.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Folder</InputLabel>
          <Select
            value={filters.folder}
            onChange={(e) => setFilters({ ...filters, folder: e.target.value })}
            label="Folder"
          >
            <MenuItem value="">All Folders</MenuItem>
            {folders.map(folder => (
              <MenuItem key={folder} value={folder}>
                {folder}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default SearchFilters;