import React from 'react';
import JsonDiffViewer from './JSONDiffViewer';

export default {
  title: 'Components/JsonDiffViewer',
  component: JsonDiffViewer,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1a2e' }],
    },
  },
  argTypes: {
    action: {
      control: { type: 'select', options: ['create', 'update', 'delete', 'login'] },
      description: 'Tipo de acción que determina el color de las claves resaltadas',
    },
    before: { control: 'object' },
    after: { control: 'object' },
    recordId: { control: 'text' },
  },
};

const Template = (args) => <JsonDiffViewer {...args} />;

export const StatusActive = Template.bind({});
StatusActive.storyName = 'Status: active (acción create → verde)';
StatusActive.args = {
  recordId: 'LOG-77291-XA',
  before: {
    status: 'inactive',
    mfa_required: false,
    session_timeout: 3600,
    max_attempts: 5,
  },
  after: {
    status: 'active',
    mfa_required: false,
    session_timeout: 3600,
    max_attempts: 5,
  },
  action: 'create', 
};

export const StatusInactive = Template.bind({});
StatusInactive.storyName = 'Status: inactive (acción delete → rojo)';
StatusInactive.args = {
  recordId: 'LOG-88102-ZB',
  before: {
    status: 'active',
    mfa_required: false,
    session_timeout: 3600,
    max_attempts: 5,
  },
  after: {
    status: 'inactive',
    mfa_required: false,
    session_timeout: 3600,
    max_attempts: 5,
  },
  action: 'delete', 
};

export const StatusUpdate = Template.bind({});
StatusUpdate.storyName = 'Status: update (acción update → azul)';
StatusUpdate.args = {
  recordId: 'LOG-99203-XC',
  before: {
    status: 'active',
    mfa_required: false,
    session_timeout: 3600,
    max_attempts: 5,
  },
  after: {
    status: 'update',
    mfa_required: true,
    session_timeout: 1800,
    max_attempts: 5,
  },
  action: 'update', 
};

export const StatusLogin = Template.bind({});
StatusLogin.storyName = 'Status: login (acción login → gris)';
StatusLogin.args = {
  recordId: 'LOG-00321-LC',
  before: {
    status: 'inactive',
    mfa_required: false,
    session_timeout: 3600,
    max_attempts: 5,
  },
  after: {
    status: 'login',
    mfa_required: false,
    session_timeout: 3600,
    max_attempts: 5,
  },
  action: 'login',
};