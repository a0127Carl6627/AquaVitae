// Components/StatsGrid.jsx
import React from 'react';
import MetricCard from './MetricCard';

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
    marginBottom: 32,
  },
};

export default function StatsGrid({ stats }) {
  return (
    <div style={styles.grid}>
      {stats.map((stat, idx) => (
        <MetricCard key={idx} {...stat} />
      ))}
    </div>
  );
}