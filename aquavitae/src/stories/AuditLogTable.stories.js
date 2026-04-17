import React, { useState } from 'react';
import AuditLogTable from './AuditLogTable';

export default {
  title: 'HU09/AuditLogTable',
  component: AuditLogTable,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1a2e' }],
    },
  },
  argTypes: {
    jsonDiffAction: {
      control: { type: 'select', options: ['create', 'update', 'delete', 'login'] },
    },
  },
};

// Datos de ejemplo que reflejan la imagen
const sampleLogs = [
  {
    id: 1,
    timestamp: '2023-10-27 14:30:05',
    user: 'admin_user',
    status: 'UPDATE',
    module: 'Configuración',
    ip: '192.168.1.1',
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
    recordId: 'LOG-77291-XA',
  },
  {
    id: 2,
    timestamp: '2023-10-27 14:28:12',
    user: 'SB_system_bot',
    status: 'CREATE',
    module: 'Usuarios',
    ip: '127.0.0.1',
    before: null,
    after: { name: 'system_bot', role: 'bot' },
  },
  {
    id: 3,
    timestamp: '2023-10-27 14:25:44',
    user: 'JP_j_perez',
    status: 'DELETE',
    module: 'Documentos',
    ip: '10.0.0.5',
    before: { name: 'J_Perez', active: true },
    after: null,
  },
  {
    id: 4,
    timestamp: '2023-10-27 14:20:01',
    user: 'admin_user',
    status: 'UPDATE',
    module: 'Seguridad',
    ip: '192.168.1.1',
    before: { login_attempts: 3 },
    after: { login_attempts: 5 },
  },
  {
    id: 5,
    timestamp: '2023-10-27 14:15:33',
    user: 'MG_m_garcia',
    status: 'LOGIN',
    module: 'Sesión',
    ip: '172.16.0.40',
    before: null,
    after: { user: 'm_garcia', success: true },
  },
  // Añadimos más para paginación
  {
    id: 6,
    timestamp: '2023-10-27 13:10:22',
    user: 'admin_user',
    status: 'UPDATE',
    module: 'Roles',
    ip: '192.168.1.1',
    before: { permissions: ['read'] },
    after: { permissions: ['read', 'write'] },
  },
  {
    id: 7,
    timestamp: '2023-10-27 12:05:18',
    user: 'JP_j_perez',
    status: 'LOGIN',
    module: 'Sesión',
    ip: '10.0.0.5',
    before: null,
    after: { success: false, reason: 'invalid password' },
  },
];

// Template interactivo
const InteractiveTemplate = (args) => {
  const [selectedLog, setSelectedLog] = useState(null);

  return (
    <AuditLogTable
      {...args}
      logs={args.logs}
      onSelectLog={setSelectedLog}
      selectedLog={selectedLog}
    />
  );
};

export const Default = InteractiveTemplate.bind({});
Default.args = {
  logs: sampleLogs,
  jsonDiffAction: 'update',
};

// Historia con un log ya seleccionado (el primero)
const WithSelectedLogTemplate = (args) => {
  const [selectedLog, setSelectedLog] = useState(sampleLogs[0]);

  return (
    <AuditLogTable
      {...args}
      logs={args.logs}
      onSelectLog={setSelectedLog}
      selectedLog={selectedLog}
    />
  );
};

export const WithSelectedLog = WithSelectedLogTemplate.bind({});
WithSelectedLog.args = {
  logs: sampleLogs,
  jsonDiffAction: 'update',
};

export const Empty = InteractiveTemplate.bind({});
Empty.args = {
  logs: [],
  jsonDiffAction: 'update',
};