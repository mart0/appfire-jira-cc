import Resolver from '@forge/resolver';
import { getRelatedBugs, deleteIssueLink } from './jiraApi';
import { JIRA_CONFIG } from '../utils/config';

const resolver = new Resolver();

resolver.define('getRelatedBugs', async (req) => {
  // Get issue key in order to fetch related bugs later
  const issueKey = req?.context?.extension?.issue?.key;
  if (!issueKey) {
    throw new Error('Issue key is required');
  }

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