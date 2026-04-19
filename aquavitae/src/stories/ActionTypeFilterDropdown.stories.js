import React, { useState } from 'react';
import ActionTypeFilterDropdown from './ActionTypeFilterDropdown';

const meta = {
  title: 'SCRUM-52/ActionTypeFilterDropdown',
  component: ActionTypeFilterDropdown,
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState('all');

  return (
    <ActionTypeFilterDropdown
      value={value}
      onChange={setValue}
    />
  );
};

export const CustomOptions = () => {
  const [value, setValue] = useState('all');

  return (
    <ActionTypeFilterDropdown
      value={value}
      onChange={setValue}
      options={[
        { value: 'all', label: 'Tipo de Acción' },
        { value: 'alert', label: 'Alerta' },
        { value: 'review', label: 'Revisión' },
        { value: 'protocol', label: 'Protocolo' },
      ]}
    />
  );
};