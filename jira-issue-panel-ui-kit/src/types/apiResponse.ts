// Define local types that match the actual data structure
export type JiraIssueFields = {
          summary: string;
          created: string;
          issuetype?: {
            name: string;
          };
          status?: {
            name: string;
          };
          priority?: {
            name: string;
          };
          assignee?: {
            name: string;
          };
  }
  
  export type JiraIssueLink = {
    id: string;
    inwardIssue?: {
      id: string;
      key: string;
      fields: JiraIssueFields;
    };
    outwardIssue?: {
    id: string;
    key: string;
      fields: JiraIssueFields;
    };
  }
  
  export type  JiraResponse = {
    fields: {
      issuelinks: JiraIssueLink[];
    };
  }
  
  export type Bug = {
    id: number;
    summary: string;
    created: string;
    assignee: string;
    status: string;
    priority: string;
  }