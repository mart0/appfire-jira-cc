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

  if (loading) {
    return <Text>Loading linked bugs...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Fragment>
      <Text>Hello World</Text>
      <BugPanel bugs={bugs} />
    </Fragment>
  );
};

ForgeReconciler.render(<App />);