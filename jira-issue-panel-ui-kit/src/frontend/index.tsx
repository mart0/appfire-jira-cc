import React, { useEffect, useState, Fragment } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { invoke } from '@forge/bridge';
import BugPanel from './components/BugPanel';
import { Bug } from '../types/apiResponse';

const App = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const response = await invoke<Bug[]>('getRelatedBugs');
      setBugs(response);
    } catch (err) {
      console.error('Error fetching bugs:', err);
      setError('Failed to load bugs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleDeleteBug = async (id: string) => {
    try {
      setLoading(true);
      await invoke('deleteIssueLink', { linkId: id });
      // Refresh the bug list after deletion
      await fetchBugs();
    } catch (err) {
      console.error('Error deleting bug:', err);
      setError('Failed to delete bug. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading linked bugs...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Fragment>
      <Text>Related Bugs</Text>
      <BugPanel bugs={bugs} onDeleteBug={handleDeleteBug} />
    </Fragment>
  );
};

ForgeReconciler.render(<App />);