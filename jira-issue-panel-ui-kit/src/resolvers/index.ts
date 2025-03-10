import Resolver from '@forge/resolver';
import { getRelatedBugs, deleteIssueLink } from './jiraApi';
import { JIRA_CONFIG } from '../utils/config';

const resolver = new Resolver();

resolver.define('getRelatedBugs', async (req) => {
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

resolver.define('deleteIssueLink', async (req) => {
  const linkId = req.payload?.linkId;
  
  if (!linkId) {
    throw new Error('Link ID is required');
  }
  
  console.log('Deleting issue link with ID:', linkId);
  
  try {
    await deleteIssueLink(linkId, JIRA_CONFIG.EMAIL, JIRA_CONFIG.API_TOKEN);
    return { success: true };
  } catch (error) {
    console.error('Error deleting issue link:', error);
    throw error;
  }
});

export const handler: any = resolver.getDefinitions();