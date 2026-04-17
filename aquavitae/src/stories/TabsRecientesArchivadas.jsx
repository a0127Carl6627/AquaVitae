import React, { useState } from 'react';

export default function TabsRecientesArchivadas({ 
  activeTab: controlledActiveTab = null,
  onTabChange = null,
  recientesContent = null,
  archivadasContent = null,
  defaultTab = 'recientes'
}) {
  // Si se controla externamente, usar prop; si no, estado interno
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab);
  const activeTab = controlledActiveTab !== null ? controlledActiveTab : internalActiveTab;

  const handleTabChange = (tab) => {
    if (controlledActiveTab !== null) {
      onTabChange && onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
      onTabChange && onTabChange(tab);
    }
  };

  return (
    <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
      {/* Cabecera de pestañas */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '20px',
      }}>
        {/* Pestaña Recientes */}
        <button
          onClick={() => handleTabChange('recientes')}
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 16px',
            fontSize: '15px',
            fontWeight: activeTab === 'recientes' ? '700' : '500',
            color: activeTab === 'recientes' ? '#0f172a' : '#64748b',
            cursor: 'pointer',
            borderBottom: activeTab === 'recientes' ? '2px solid #3b82f6' : '2px solid transparent',
            transition: 'all 0.2s',
            marginRight: '8px',
          }}
        >
          Recientes
        </button>

        {/* Pestaña Archivadas */}
        <button
          onClick={() => handleTabChange('archivadas')}
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 16px',
            fontSize: '15px',
            fontWeight: activeTab === 'archivadas' ? '700' : '500',
            color: activeTab === 'archivadas' ? '#0f172a' : '#64748b',
            cursor: 'pointer',
            borderBottom: activeTab === 'archivadas' ? '2px solid #3b82f6' : '2px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          Archivadas
        </button>
      </div>

      {/* Contenido dinámico */}
      <div>
        {activeTab === 'recientes' && recientesContent}
        {activeTab === 'archivadas' && archivadasContent}
      </div>
    </div>
  );
}