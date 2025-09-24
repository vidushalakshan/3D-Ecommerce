"use client";
import { useState, useEffect } from 'react';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/register'); // Matches your API route
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        setUsers(Array.isArray(data.users) ? data.users : []); // Extract users array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!mounted) return null; 
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Users
      </h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                Name
              </th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                style={{ ':hover': { backgroundColor: '#f9f9f9' } }}
              >
                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                  {user.name}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;