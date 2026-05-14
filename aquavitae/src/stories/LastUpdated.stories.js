import { useState } from 'react';
import LastUpdated from './LastUpdated';

export default {
  title: 'Dashboard/LastUpdated',
  component: LastUpdated,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    fechaActualizacion: '2025-05-20T10:24:00',
    loading: false,
  },
};

export const Cargando = {
  args: {
    fechaActualizacion: '2025-05-20T10:24:00',
    loading: true,
  },
};

export const Interactiva = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [fecha, setFecha] = useState('2025-05-20T10:24:00');

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setFecha(new Date().toISOString());
        setLoading(false);
      }, 2000);
    };

    return (
      <LastUpdated
        fechaActualizacion={fecha}
        onRefresh={handleRefresh}
        loading={loading}
      />
    );
  },
};