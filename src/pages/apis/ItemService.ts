import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockItems = [
  {
    id: '1',
    name: 'NCC Payment Flow',
    version: '1.0.0',
    created_at: '2024-01-15T10:30:00Z',
    created_by: 'admin',
    description: 'NCC mediation flow for payment processing',
    is_running: true,
    is_deployed: true,
  },
  {
    id: '2',
    name: 'Convergent Billing Flow',
    version: '2.1.0',
    created_at: '2024-01-10T14:20:00Z',
    created_by: 'developer',
    description: 'Convergent mediation flow for billing system',
    is_running: false,
    is_deployed: true,
  },
  {
    id: '3',
    name: 'Charging Gateway Integration',
    version: '1.5.0',
    created_at: '2024-01-12T09:15:00Z',
    created_by: 'admin',
    description: 'Charging gateway mediation flow',
    is_running: true,
    is_deployed: false,
  },
  {
    id: '4',
    name: 'NCC Data Sync Flow',
    version: '1.2.0',
    created_at: '2024-01-08T16:45:00Z',
    created_by: 'developer',
    description: 'NCC data synchronization flow',
    is_running: false,
    is_deployed: false,
  },
];

export function useItems() {
  const [data, setData] = useState<typeof mockItems>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchItems = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockItems);
        setError(null);
      } catch (err) {
        setError('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { data, loading, error };
}