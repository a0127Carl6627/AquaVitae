import React, { useState } from 'react';
import FilterDropdown from './FilterDropdown';

const meta = {
  title: 'SCRUM-50/FilterDropdown',
  component: FilterDropdown,
};

export default meta;

export const RegionFilter = () => {
  const [value, setValue] = useState('');

  return (
    <FilterDropdown
      id="region-filter"
      name="region"
      value={value}
      onChange={setValue}
      placeholder="Filtrar por región"
      options={[
        { value: 'norte', label: 'Norte' },
        { value: 'centro', label: 'Centro' },
        { value: 'bajio', label: 'Bajío' },
        { value: 'sur', label: 'Sur' },
      ]}
    />
  );
};

export const PeriodFilter = () => {
  const [value, setValue] = useState('');

  return (
    <FilterDropdown
      id="period-filter"
      name="period"
      value={value}
      onChange={setValue}
      placeholder="Filtrar por periodo"
      options={[
        { value: '7d', label: 'Últimos 7 días' },
        { value: '30d', label: 'Últimos 30 días' },
        { value: '90d', label: 'Últimos 90 días' },
        { value: '1y', label: 'Último año' },
      ]}
    />
  );
};