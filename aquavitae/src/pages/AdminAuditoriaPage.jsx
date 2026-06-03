import { useState, useEffect } from 'react';
import { useAuditoriaResumen, useAuditoriaLogs, useAuditoriaDetail } from '../hooks/useAquavitaeQueries';
import AuditoriaKpis from '../components/Auditoria/AuditoriaKpis';
import AuditoriaTable from '../components/Auditoria/AuditoriaTable';
import AuditoriaDetailPanel from '../components/Auditoria/AuditoriaDetailPanel';
import AuditoriaFilters from '../components/Auditoria/AuditoriaFilters';

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
    return <div className="ml-20 w-[calc(100%-80px)] p-6">Cargando auditoría...</div>;
  }

  return (
    <div className="ml-20 w-[calc(100%-80px)] p-6">
      <div className="mb-6">
        <div>
          <h1 className="m-0 text-[32px] text-[#172033]">Auditoría</h1>
          <p className="mt-2 text-[#64748b]">Monitoreo y trazabilidad de eventos del sistema</p>
        </div>
      </div>

      <AuditoriaKpis resumen={resumen} />

      <AuditoriaFilters
        filters={filters}
        onChange={setFilters}
        onSearch={handleSearch}
      />

      <div className="grid grid-cols-[1.4fr_0.8fr] items-start gap-5">
        <div className="min-w-0">
          <AuditoriaTable
            logs={logs}
            selectedLogId={selectedLog?.id}
            onSelectLog={handleSelectLog}
          />
        </div>
        <div className="sticky top-6">
          <AuditoriaDetailPanel log={selectedLog} />
        </div>
      </div>
    </div>
  );
}

export default AdminAuditoriaPage;