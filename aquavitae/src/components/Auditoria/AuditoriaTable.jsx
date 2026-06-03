import clsx from 'clsx';

const TH = 'border-b border-[#e8edf5] p-4 text-left text-[13px] font-bold text-[#64748b]';
const TD = 'border-b border-[#f1f5f9] p-4 text-sm text-[#172033]';

const SEVERITY_CLASS = {
  alta: 'bg-[#fee2e2] text-[#dc2626]',
  media: 'bg-[#fff7e6] text-[#d97706]',
  info: 'bg-[#eaf2ff] text-[#2563eb]',
};

function formatDate(dateString) {
  if (!dateString) return '—';

  return new Date(dateString).toLocaleString('es-MX', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function getSeverityClass(severidad) {
  const s = (severidad || '').toLowerCase();

  if (s === 'alta') return SEVERITY_CLASS.alta;
  if (s === 'media') return SEVERITY_CLASS.media;

  return SEVERITY_CLASS.info;
}

function AuditoriaTable({
  logs = [],
  selectedLogId,
  onSelectLog,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8edf5] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <table className="w-full border-collapse">
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className={TH}>Fecha</th>
            <th className={TH}>Acción</th>
            <th className={TH}>Módulo</th>
            <th className={TH}>Entidad</th>
            <th className={TH}>Severidad</th>
            <th className={TH}>IP</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              onClick={() => onSelectLog?.(log)}
              className={clsx(
                'cursor-pointer transition-colors',
                selectedLogId === log.id ? 'bg-[#eef4ff]' : 'hover:bg-[#f8fafc]',
              )}
            >
              <td className={TD}>{formatDate(log.fecha)}</td>

              <td className={`${TD} font-semibold`}>
                {log.accion}
              </td>

              <td className={TD}>{log.modulo}</td>

              <td className={TD}>{log.entidad}</td>

              <td className={TD}>
                <span className={`rounded-full px-2.5 py-1.5 text-xs font-bold ${getSeverityClass(log.severidad)}`}>
                  {log.severidad}
                </span>
              </td>

              <td className={TD}>{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditoriaTable;
