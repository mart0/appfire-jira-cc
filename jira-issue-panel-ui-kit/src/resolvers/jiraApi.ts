import axios from 'axios';
import { JIRA_CONFIG } from '../config';
import { Bug, JiraResponse } from '../types/apiResponse';

export const getRelatedBugs = async (
  issueId: string, 
  email: string = JIRA_CONFIG.EMAIL, 
  apiToken: string = JIRA_CONFIG.API_TOKEN
) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${JIRA_CONFIG.BASE_URL}/rest/api/3/issue/${issueId}?fields=issuelinks`,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const data = response.data as JiraResponse;
    
    // Map the issues to a simpler format
    const bugs = (data.fields.issuelinks || []).reduce<Bug[]>((acc, issue) => {
      const linkedIssue = issue.inwardIssue || issue.outwardIssue;
      
      if (linkedIssue?.fields?.issuetype?.name === 'Bug') {
        acc.push({
          id: Number(issue.id || '0'),
          summary: linkedIssue.fields.summary || 'No summary provided',
          created: linkedIssue.fields.created || 'Unknown created date',
          assignee: linkedIssue.fields.assignee?.name || 'Unknown assignee',
          status: linkedIssue.fields.status?.name || 'Unknown status',
          priority: linkedIssue.fields.priority?.name || 'Unknown priority'
        });
      }
      return acc;
    }, []);
    
    return bugs;
  } catch (error) {
    console.error('Error fetching related bugs:', error);
    return [];
  }
};