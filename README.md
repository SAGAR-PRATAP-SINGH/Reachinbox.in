# Reachinbox.in
# Email Onebox
- Email Onebox is a cutting-edge email management platform that unifies multiple email accounts into one smart interface. It features AI-powered email categorization and intelligent reply suggestions, combined    - with powerful Elasticsearch-based search and MongoDB data storage. Built using React and Material-UI for a sleek frontend experience, and Node.js/Express for robust backend operations, the system includes real- - time Slack notifications for priority emails. The entire application is containerized with Docker, ensuring smooth deployment and scalability across different environments.

A modern email management system that helps organize and streamline email communications using AI-powered features.

## Features
- Email synchronization across multiple accounts
- AI-powered email categorization
- Smart reply suggestions
- Elasticsearch-powered search functionality
- Real-time Slack notifications for important emails

## Tech Stack
- Frontend: React, Material-UI
- Backend: Node.js, Express
- Databases: MongoDB, Elasticsearch
- Containerization: Docker
- AI Integration: OpenAI API

## Getting Started
1. Clone the repository
2. Set up environment variables in `.env`
3. Run `docker compose up -d`
4. Access the application at `http://localhost:3000`

## Environment Variables
```env
MONGODB_URI=mongodb://mongodb:27017/emailonebox
ELASTICSEARCH_NODE=http://elasticsearch:9200
OPENAI_API_KEY=your_openai_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
