import React, { Fragment } from 'react';
import { Text } from '@forge/react';
import { Bug } from '../../types/apiResponse';

interface BugPanelProps {
  bugs: Bug[];
  onDeleteBug?: (id: number) => void;
}

const BugPanel = ({ bugs, onDeleteBug }: BugPanelProps) => {
  const handleDelete = (id: number) => {
    if (onDeleteBug) {
      onDeleteBug(id);
    }
  };

  if (bugs.length === 0) {
    return <Text>No bugs found</Text>;
  }

  return (
    <Fragment>
      {bugs.map((bug: Bug) => (
        <Fragment key={bug.id}>
          <Text>**Summary:** {bug.summary}</Text>
          <Text>**Created:** {bug.created}</Text>
          <Text>**Assignee:** {bug.assignee}</Text>
          <Text>**Status:** {bug.status}</Text>
          <Text>**Priority:** {bug.priority}</Text>
          <Text>**Actions:** Click ID {bug.id} to delete</Text>
          <Text>──────────────────────</Text>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default BugPanel;