// Components/StatsGrid.jsx
import React from 'react';
import MetricCard from './MetricCard';

export default function StatsGrid({ stats }) {
  return (
    <div className="mb-8 grid grid-cols-4 gap-5">
      {stats.map((stat, idx) => (
        <MetricCard key={idx} {...stat} />
      ))}
    </div>
  );
}
