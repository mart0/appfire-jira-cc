import React from 'react';
import { Text, DynamicTable, Link } from '@forge/react';
import { Bug } from '../../types/apiResponse';

interface BugPanelProps {
  bugs: Bug[];
  onDeleteBug?: (id: number) => void;
}

const BugPanel = ({ bugs }: BugPanelProps) => {
  if (bugs.length === 0) {
    return <Text>No bugs found</Text>;
  }

  const createKey = (input: string) => {
    return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
  }

  const rows = bugs.map((bug, index) => ({
    key: `row-${index}-${bug.id}`,
    cells: [
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
        content: <Link href="">Delete</Link>,
      },
    ],
  }));

  const head = {
   cells: [  
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
      isSortable: true,
    },
  ],
};

  return (
    <DynamicTable
      caption="Bugs linked to the issue"
      head={head}
      rows={rows}
    />
  );


  // return (
  //   <Fragment>
  //     {bugs.map((bug: Bug) => (
  //       <Fragment key={bug.id}>
  //         <Text>──────────────────────</Text>
  //         <Text>**Summary:** {bug.summary}</Text>
  //         <Text>**Created:** {bug.created}</Text>
  //         <Text>**Assignee:** {bug.assignee}</Text>
  //         <Text>**Status:** {bug.status}</Text>
  //         <Text>**Priority:** {bug.priority}</Text>
  //         <Text>**Actions:** Click ID {bug.id} to delete</Text>
  //       </Fragment>
  //     ))}
  //   </Fragment>
  // );
};

export default BugPanel;