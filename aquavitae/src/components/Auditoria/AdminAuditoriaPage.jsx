import { useState, useEffect } from 'react';
import { useAuditoriaResumen, useAuditoriaLogs, useAuditoriaDetail } from '../../hooks/useAquavitaeQueries';
import AuditoriaKpis from './AuditoriaKpis';
import AuditoriaTable from './AuditoriaTable';
import AuditoriaDetailPanel from './AuditoriaDetailPanel';
import AuditoriaFilters from './AuditoriaFilters';
import './AdminAuditoriaPage.css';

function AdminAuditoriaPage() {
  const [filters, setFilters] = useState({ accion: '', modulo: '', severidad: '' });
  const [selectedLog, setSelectedLog] = useState(null);

  // Resumen (no depende de filtros)
  const { data: resumen = {}, isLoading: loadingResumen } = useAuditoriaResumen();

  // Logs (depende de filtros)
  const { data: logs = [], isLoading: loadingLogs, refetch: refetchLogs } = useAuditoriaLogs({
    limit: 50,
    ...filters,
  });

  // Detalle del log seleccionado
  const { data: detailLog } = useAuditoriaDetail(selectedLog?.id);

  // Cuando cambia el detalle, actualizamos el estado local
  useEffect(() => {
    if (detailLog) setSelectedLog(detailLog);
  }, [detailLog]);

  const handleSelectLog = (log) => {
    setSelectedLog(log); // se dispara el useAuditoriaDetail automáticamente
  };

  const handleSearch = () => {
    refetchLogs();
    setSelectedLog(null); // limpia el panel de detalle
  };

  const loading = loadingResumen || loadingLogs;

  if (loading && logs.length === 0) {
    return <div className="admin-auditoria-page">Cargando auditoría...</div>;
  }

  return (
    <div className="admin-auditoria-page">
      <div className="admin-auditoria-header">
        <div>
          <h1>Auditoría</h1>
          <p>Monitoreo y trazabilidad de eventos del sistema</p>
        </div>
      </div>

      <AuditoriaKpis resumen={resumen} />

      <AuditoriaFilters
        filters={filters}
        onChange={setFilters}
        onSearch={handleSearch}
      />

      <div className="admin-auditoria-layout">
        <div className="admin-auditoria-table">
          <AuditoriaTable
            logs={logs}
            selectedLogId={selectedLog?.id}
            onSelectLog={handleSelectLog}
          />
        </div>
        <div className="admin-auditoria-detail">
          <AuditoriaDetailPanel log={selectedLog} />
        </div>
      </div>
    </div>
  );
}

export default AdminAuditoriaPage;