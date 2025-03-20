require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { initializeElasticsearch } = require('./config/elasticsearch');
const imapRoutes = require('./routes/imapRoutes');
const searchRoutes = require('./routes/searchRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Connect to MongoDB
connectDB();

// Initialize Elasticsearch
initializeElasticsearch();

const app = express();
const PORT = process.env.PORT || 3001;

// Move CORS and JSON middleware before routes
app.use(cors());
app.use(express.json());

// Add basic health check with more detailed response
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        timestamp: new Date(),
        service: 'email-onebox'
    });
});

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'API Root' });
});

// Routes
app.use('/api/emails', imapRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Update listen callback with more info
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Health check available at /health');
});