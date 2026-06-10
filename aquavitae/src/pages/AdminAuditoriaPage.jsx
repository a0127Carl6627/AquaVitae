import { useState, useEffect } from 'react';
import { useAuditoriaResumen, useAuditoriaLogs, useAuditoriaDetail } from '../hooks/useAquavitaeQueries';
import AuditoriaKpis from '../components/Auditoria/AuditoriaKpis';
import AuditoriaTable from '../components/Auditoria/AuditoriaTable';
import AuditoriaDetailPanel from '../components/Auditoria/AuditoriaDetailPanel';
import AuditoriaFilters from '../components/Auditoria/AuditoriaFilters';

function AdminAuditoriaPage() {
  const [filters, setFilters] = useState({ accion: '', modulo: '', severidad: '' });
  const [selectedLog, setSelectedLog] = useState(null);
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

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
    return <div className="flex flex-1 items-center justify-center">Cargando auditoría...</div>;
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#f5f7fa]">
      <div className="flex items-center justify-end border-b border-[#e6eaf0] bg-white px-7 py-3.5">
        <div className="flex items-center gap-3.5">
          <span className="text-xs text-[#5a6577]">{dateStr} · {timeStr}</span>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(140deg,#c5d4e3,#8a9bb0)] text-white">AD</div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-7 pb-10 pt-6">
      <div className="mb-6">
        <h1 className="m-0 text-[22px] font-bold text-[#1a2332]">Auditoría</h1>
        <p className="m-0 text-[13px] text-[#5a6577]">Monitoreo y trazabilidad de eventos del sistema</p>
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
    </div>
  );
}

export default AdminAuditoriaPage;