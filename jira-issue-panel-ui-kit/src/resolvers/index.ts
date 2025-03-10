import Resolver from '@forge/resolver';
import { getRelatedBugs } from './jiraApi';
import { JIRA_CONFIG } from '../utils/config';

const resolver = new Resolver();

resolver.define('getRelatedBugs', async (req) => {
  // Debug: Log environment variables and config
  // console.log('Environment variables:', process.env);
  // console.log('JIRA_CONFIG:', JIRA_CONFIG);
  
  const context = req.context || {};
  const extension = context.extension || {};
  const issue = extension.issue || {};
  
  // Get issue key from various possible locations
  const issueKey = issue.key || 
                  context.issueKey || 
                  context.issue?.key ||
                  // req.issueKey ||
                  'TEST-1'; // Fallback for testing
  
  console.log('Using issue key:', issue.key);

  
  const bugs = await getRelatedBugs(
    issueKey, 
    JIRA_CONFIG.EMAIL, 
    JIRA_CONFIG.API_TOKEN
  );
  return bugs;
});

export const handler: any = resolver.getDefinitions();