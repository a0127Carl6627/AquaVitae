import React, { useState } from 'react';
import BaseDropdown from './BaseDropdown';

const meta = {
  title: 'Base/BaseDropdown',
  component: BaseDropdown,
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <BaseDropdown
      value={value}
      onChange={setValue}
      placeholder="Selecciona un rol"
      options={[
        { value: 'admin', label: 'Administrador' },
        { value: 'director', label: 'Director' },
      ]}
    />
  );
};