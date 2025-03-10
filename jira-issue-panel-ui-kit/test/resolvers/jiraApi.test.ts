import { getRelatedBugs, deleteIssueLink } from '../../src/resolvers/jiraApi';
import { JIRA_CONFIG } from '../../src/utils/config';
import { JiraResponse } from '../../src/types/apiResponse';

// Mock axios
jest.mock('axios');
const axios = require('axios');

describe('getRelatedBugs', () => {
  const mockIssueId = 'TEST-1';
  const mockEmail = 'test@example.com';
  const mockApiToken = 'test-token';

  const mockJiraResponse: JiraResponse = {
    fields: {
      issuelinks: [
        {
          id: '10000',
          inwardIssue: {
            id: '10000',
            key: 'BUG-1',
            fields: {
              issuetype: { name: 'Bug' },
              summary: 'Test Bug 1',
              created: '2023-10-01T12:00:00.000Z',
              assignee: { name: 'user1' },
              status: { name: 'Open' },
              priority: { name: 'High' }
            }
          }
        },
        {
          id: '10001',
          outwardIssue: {
            id: '10001',
            key: 'BUG-2',
            fields: {
              issuetype: { name: 'Task' }, // Not a bug
              summary: 'Test Task 1',
              created: '2023-10-02T12:00:00.000Z',
              assignee: { name: 'user2' },
              status: { name: 'In Progress' },
              priority: { name: 'Medium' }
            }
          }
        }
      ]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    axios.mockResolvedValue({
      status: 200,
      data: mockJiraResponse
    });
  });

  it('should return an array of related bugs', async () => {
    const result = await getRelatedBugs(mockIssueId, mockEmail, mockApiToken);

    expect(axios).toHaveBeenCalledWith({
      method: 'GET',
      url: `${JIRA_CONFIG.BASE_URL}/rest/api/3/issue/${mockIssueId}?fields=issuelinks`,
      headers: {
        'Authorization': expect.any(String),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    expect(result).toEqual([
      {
        id: 10000,
        jiraId: 'BUG-1',
        summary: 'Test Bug 1',
        created: '2023-10-01T12:00:00.000Z',
        assignee: 'user1',
        status: 'Open',
        priority: 'High'
      }
    ]);
  });

  it('should return an empty array if no bugs are found', async () => {
    // Mock axios to return no bugs
    axios.mockResolvedValue({
      status: 200,
      data: {
        fields: {
          issuelinks: []
        }
      }
    });

    const result = await getRelatedBugs(mockIssueId, mockEmail, mockApiToken);

    expect(result).toEqual([]);
  });

  it('should handle errors and return an empty array', async () => {
    // Mock axios to throw an error
    axios.mockRejectedValue(new Error('API Error'));

    const result = await getRelatedBugs(mockIssueId, mockEmail, mockApiToken);

    expect(result).toEqual([]);
  });
});

describe('deleteIssueLink', () => {
  const mockLinkId = '10000';
  const mockEmail = 'test@example.com';
  const mockApiToken = 'test-token';

  beforeEach(() => {
    jest.clearAllMocks();
    axios.mockResolvedValue({
      status: 204, // Use NO_CONTENT status for DELETE requests
      data: {}
    });
  });

  it('should call axios with the correct URL and credentials', async () => {
    await deleteIssueLink(mockLinkId, mockEmail, mockApiToken);

    expect(axios).toHaveBeenCalledWith({
      method: 'DELETE',
      url: `${JIRA_CONFIG.BASE_URL}/rest/api/3/issueLink/${mockLinkId}`,
      headers: {
        'Authorization': expect.any(String),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  });

  it('should handle errors', async () => {
    // Mock axios to throw an error
    axios.mockRejectedValue(new Error('API Error'));

    await expect(deleteIssueLink(mockLinkId, mockEmail, mockApiToken)).rejects.toThrow('API Error');
  });
});