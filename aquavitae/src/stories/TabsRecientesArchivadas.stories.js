import TabsRecientesArchivadas from './TabsRecientesArchivadas';
import AlertCard from './AlertCard'; // reutilizando componente anterior

export default {
  title: 'HU02/TabsRecientesArchivadas',
  component: TabsRecientesArchivadas,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    defaultTab: {
      control: { type: 'select', options: ['recientes', 'archivadas'] },
    },
  },
};

// Contenido de ejemplo para Recientes (usando AlertCard)
const RecientesEjemplo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <AlertCard
      level="critico"
      description="Nivel crítico de agua detectado"
      location="Acuífero Valle de México"
      timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()}
      metrics={[
        { label: 'NIVEL ACTUAL', value: '15%', status: 'critico' },
        { label: 'UMBRAL', value: '25%' },
      ]}
      onDetailClick={() => alert('Ver detalle crítico')}
    />
    <AlertCard
      level="advertencia"
      description="Alerta de sequía prolongada"
      location="Región Bajío - Zona Norte"
      timestamp={new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()}
      metrics={[
        { label: 'ÍNDICE HÍDRICO', value: '0.32' },
        { label: 'PROYECCIÓN', value: '-12% mensual' },
      ]}
      onDetailClick={() => alert('Ver detalle advertencia')}
    />
    <AlertCard
      level="informativo"
      description="Mantenimiento de pozos programado"
      location="Planta Industrial Querétaro"
      timestamp={new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}
      onDetailClick={() => alert('Revisar mantenimiento')}
    />
  </div>
);

const ArchivadasEjemplo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <AlertCard
      level="informativo"
      description="Limpieza de tanques completada"
      location="Planta Norte"
      timestamp={new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()}
      onDetailClick={() => alert('Ver detalle archivado')}
    />
    <AlertCard
      level="advertencia"
      description="Bajo caudal en río Lerma"
      location="Zona Metropolitana"
      timestamp={new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()}
      metrics={[
        { label: 'CAUDAL ACTUAL', value: '12 m³/s' },
        { label: 'CAUDAL HISTÓRICO', value: '28 m³/s' },
      ]}
      onDetailClick={() => alert('Ver detalle archivado')}
    />
    <AlertCard
      level="critico"
      description="Fallo en sensor de presión - Tanque B4"
      location="Distrito de Riego 001"
      timestamp={new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()}
      onDetailClick={() => alert('Ver detalle fallo sensor')}
    />
  </div>
);

export const Default = {
  args: {
    recientesContent: <RecientesEjemplo />,
    archivadasContent: <ArchivadasEjemplo />,
  },
};

export const StartWithArchivadas = {
  args: {
    defaultTab: 'archivadas',
    recientesContent: <RecientesEjemplo />,
    archivadasContent: <ArchivadasEjemplo />,
  },
};

export const OnlyRecientes = {
  args: {
    recientesContent: <RecientesEjemplo />,
    archivadasContent: null,
  },
};