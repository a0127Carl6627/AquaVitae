import { useEffect, useState } from 'react';

import AuditoriaKpis from './AuditoriaKpis';
import AuditoriaTable from './AuditoriaTable';
import AuditoriaDetailPanel from './AuditoriaDetailPanel';
import AuditoriaFilters from './AuditoriaFilters';

import {
  fetchAuditoriaResumen,
  fetchAuditoriaLogs,
  fetchAuditoriaDetail,
} from '../../services/auditoriaApi';

import './AdminAuditoriaPage.css';

function AdminAuditoriaPage() {
  const [resumen, setResumen] = useState({});
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);

  const [filters, setFilters] = useState({
    accion: '',
    modulo: '',
    severidad: '',
  });

  async function loadData() {
    try {
      const [resumenData, logsData] = await Promise.all([
        fetchAuditoriaResumen(),
        fetchAuditoriaLogs({
          limit: 50,
          ...filters,
        }),
      ]);

      setResumen(resumenData);
      setLogs(logsData);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSelectLog(log) {
    try {
      const detail = await fetchAuditoriaDetail(log.id);
      setSelectedLog(detail);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        onSearch={loadData}
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