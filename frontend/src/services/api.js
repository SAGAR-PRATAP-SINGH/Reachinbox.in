import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',  // Updated port to match Docker container
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchEmails = async (filters) => {
  return axios.get(`${API_BASE_URL}/emails`, { params: filters });
};

export const getAccounts = async () => {
  return axios.get(`${API_BASE_URL}/emails/accounts`);
};

export const getFolders = async (accountId) => {
  return axios.get(`${API_BASE_URL}/emails/folders/${accountId}`);
};

export const getSuggestedReply = async (emailId) => {
  return axios.get(`${API_BASE_URL}/ai/suggest-reply/${emailId}`);
};