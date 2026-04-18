import React from 'react';
import './ApiKpiDashboard.css';
import ApiErrorBadge from './ApiErrorBadge';
import ApiKpiCard from './ApiKpiCard';

export default function ApiKpiDashboard() {
  return (
    <div className="api-kpi-dashboard">
      <div className="api-kpi-dashboard__top">
        <ApiErrorBadge
          label="Error 404"
          subtitle="Not Found"
          tone="warning"
        />

        <ApiErrorBadge
          label="Error 401"
          subtitle="Unauthorized"
          tone="danger"
        />
      </div>

      <div className="api-kpi-dashboard__grid">
        <ApiKpiCard
          title="Error 404"
          value="1,284"
          trend="+4%"
          trendType="up"
        />

        <ApiKpiCard
          title="Error 401"
          value="842"
          trend="-12%"
          trendType="down"
        />

        <ApiKpiCard
          title="Total requests"
          value="18,320"
          trend="Stable"
          trendType="neutral"
        />

        <ApiKpiCard
          title="Integraciones activas"
          value="24"
          trend="+2"
          trendType="up"
        />
      </div>
    </div>
  );
}