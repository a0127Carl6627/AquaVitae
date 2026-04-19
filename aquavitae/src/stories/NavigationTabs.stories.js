import React, { useState } from 'react';
import NavigationTabs from './NavigationTabs';

const meta = {
  title: 'Base/NavigationTabs',
  component: NavigationTabs,
};

export default meta;

export const Default = () => {
  const [activeTab, setActiveTab] = useState('agregar');

  return (
    <NavigationTabs
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
};