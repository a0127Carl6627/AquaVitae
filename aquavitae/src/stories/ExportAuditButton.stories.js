// ExportButton.stories.jsx
import React, { useState } from 'react';
import ExportButton from './ExportAuditButton';

export default {
  title: 'HU09/ExportButton',
  component: ExportButton,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1a2e' }],
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    args.onClick();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div >
      <ExportButton {...args} onClick={handleClick} isLoading={loading || args.isLoading} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Exportar',
  showIcon: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Exportar',
  disabled: true,
  showIcon: true,
};