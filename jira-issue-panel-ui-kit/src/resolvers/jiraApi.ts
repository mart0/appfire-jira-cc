import axios from 'axios';
import { JIRA_CONFIG } from '../utils/config';
import { Bug, JiraResponse } from '../types/apiResponse';
import { HTTP_STATUS } from '../utils/constants';

export const getRelatedBugs = async (
  issueId: string, 
  email: string = JIRA_CONFIG.EMAIL, 
  apiToken: string = JIRA_CONFIG.API_TOKEN
) => {
  const url = new URL(`${JIRA_CONFIG.BASE_URL}/rest/api/3/issue/${issueId}?fields=issuelinks`);
  try {
    const response = await axios({
      method: 'GET',
      url: url.toString(),
      headers: {
        'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if(response.status !== HTTP_STATUS.OK) {
      console.log(`Fetching data from ${url.toString()} failed with status ${response.status}`)
      throw new Error('Failed to fetch related bugs');
    }
    
    const data = response.data as JiraResponse;
    
    // Map the issues to a simpler format
    const bugs = (data.fields.issuelinks || []).reduce<Bug[]>((acc, issue) => {
      const linkedIssue = issue.inwardIssue || issue.outwardIssue;
      
      if (linkedIssue?.fields?.issuetype?.name === 'Bug') {
        const notProvidedMsg = 'Not provided by Atlassian API';
        acc.push({
          id: Number(issue.id || '0'),
          jiraId: linkedIssue.key || notProvidedMsg,
          summary: linkedIssue.fields.summary || notProvidedMsg,
          created: linkedIssue.fields.created || notProvidedMsg, // Note: Not provided by API
          assignee: linkedIssue.fields.assignee?.name || notProvidedMsg, // Note: Not provided by API
          status: linkedIssue.fields.status?.name || notProvidedMsg,
          priority: linkedIssue.fields.priority?.name || notProvidedMsg
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