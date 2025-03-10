import React, { useEffect, useState, Fragment } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { invoke } from '@forge/bridge';
import BugPanel from './components/BugPanel';
import { Bug } from '../types/apiResponse';

const App = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    
    fetchBugs();
  }, []);

  const handleDeleteBug = (id: number) => {
    // Filter out the deleted bug
    setBugs(prevBugs => prevBugs.filter(bug => bug.id !== id));
    
    // In a real app, you would also call an API to delete the bug
    // Example: invoke('deleteBug', { id });
  };

  if (loading) {
    return <Text>Loading bugs...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Fragment>
      <BugPanel bugs={bugs} onDeleteBug={handleDeleteBug} />
    </Fragment>
  );
};

ForgeReconciler.render(<App />);