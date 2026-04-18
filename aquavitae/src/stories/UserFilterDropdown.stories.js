import React, { useState } from 'react';
import UserFilterDropdown from './UserFilterDropdown';

const meta = {
  title: 'SCRUM-51/UserFilterDropdown',
  component: UserFilterDropdown,
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState('all');

  return (
    <UserFilterDropdown
      value={value}
      onChange={setValue}
    />
  );
};

export const CustomOptions = () => {
  const [value, setValue] = useState('all');

  return (
    <UserFilterDropdown
      value={value}
      onChange={setValue}
      options={[
        { value: 'all', label: 'Usuario' },
        { value: 'carlos', label: 'Carlos' },
        { value: 'fer', label: 'Fernanda' },
        { value: 'admin', label: 'Admin' },
      ]}
    />
  );
};