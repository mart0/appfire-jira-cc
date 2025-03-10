import React from 'react';
import { Text, DynamicTable, Link, Button } from '@forge/react';
import { Bug } from '../../types/apiResponse';

type BugPanelProps = {
  bugs: Bug[];
  onDeleteBug?: (id: string) => void;
}

const BugPanel = ({ bugs, onDeleteBug }: BugPanelProps) => {
  if (bugs.length === 0) {
    return <Text>No bugs found</Text>;
  }

  const createKey = (input: string) => {
    return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
  }

  const handleDelete = (id: string) => {
    if (onDeleteBug) {
      onDeleteBug(id);
    }
  };

  const rows = bugs.map((bug, index) => ({
    key: `row-${index}-${bug.id}`,
    cells: [
      {
        key: createKey(bug.jiraId),
        content: <Link href={`https://appfire-mmarinovm.atlassian.net/browse/${bug.jiraId}`}>{bug.jiraId}</Link>,
      },
      {
        key: createKey(bug.summary),
        content: bug.summary,
      },
      {
        key: createKey(bug.created),
        content: bug.created,
      },
      {
        key: createKey(bug.assignee),
        content: bug.assignee,
      },
      {
        key: createKey(bug.status),
        content: bug.status,
      },
      {
        key: createKey(bug.priority),
        content: bug.priority,
      },
      {
        key: createKey(bug.id.toString()),
        content: <Button onClick={() => handleDelete(bug.id.toString())}>Delete</Button>,
      },
    ],
  }));

  const head = {
   cells: [  
    { 
      key: "jira-id",
      content: "JIRA",
      isSortable: true,
    },
    { 
      key: "summary",
      content: "Summary",
      isSortable: true,
    },
    {
      key: "created",
      content: "Created",
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: "assignee",
      content: "Assignee",
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: "status",
      content: "Status",
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: "priority",
      content: "Priority",
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: "actions",
      content: "Actions",
      shouldTruncate: true,
    },
  ],
};

  return (
    <DynamicTable
      caption="Bugs linked to this issue"
      head={head}
      rows={rows}
    />
  );
};

export default BugPanel;