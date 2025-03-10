// Config for Jira API
// In development, use values from .env.example
// In production, these should be set in the Forge app environment variables
import dotenv from 'dotenv';

dotenv.config();

export const JIRA_CONFIG = {
  EMAIL: process.env.EMAIL || '',
  API_TOKEN: process.env.API_TOKEN || '',
  BASE_URL: process.env.BASE_URL || ''
};