import React from 'react';
import LucidusSignal from './LucidusSignal';

export default function LucidusDashboard() {
  return (
    <div style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '100px'
    }}>
      <h1>🚀 Lucidus Dashboard</h1>
      <p>Twoja AI do tradingu właśnie wystartowała.</p>
      <LucidusSignal />
    </div>
  );
}