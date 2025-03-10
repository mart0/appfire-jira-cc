// Define local types that match the actual data structure
type PropName = {
  name: string;
}

export type JiraIssueFields = {
  summary: string;
  created: string;
  issuetype?: PropName;
  status?: PropName;
  priority?: PropName;
  assignee?: PropName;
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
  jiraId: string;
  summary: string;
  created: string;
  assignee: string;
  status: string;
  priority: string;
}