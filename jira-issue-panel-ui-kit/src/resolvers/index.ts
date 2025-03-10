import Resolver from '@forge/resolver';
import { getRelatedBugs } from './jiraApi';
import { JIRA_CONFIG } from '../config';

// Define the request payload type
interface RequestContext {
  context: {
    extension?: {
      issue?: {
        key?: string;
        id?: string;
      };
    };
    [key: string]: any;
  };
}

const resolver = new Resolver();

resolver.define('getRelatedBugs', async (req) => {
  // console.log('Request context:', JSON.stringify(req, null, 2));
  
  // Try different paths to find the issue key
  const context = req.context || {};
  const extension = context.extension || {};
  const issue = extension.issue || {};
  
  // Get issue key from various possible locations
  const issueKey = issue.key || 
                  context.issueKey || 
                  context.issue?.key ||
                  req.issueKey ||
                  'TEST-1'; // Fallback for testing
  
  // console.log('Using issue key:', issueKey);
  
  const bugs = await getRelatedBugs(
    issueKey, 
    JIRA_CONFIG.EMAIL, 
    JIRA_CONFIG.API_TOKEN
  );
  return bugs;
});

export const handler = resolver.getDefinitions();