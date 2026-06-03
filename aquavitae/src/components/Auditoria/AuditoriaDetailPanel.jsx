const LABEL = 'mb-2 block text-xs font-bold text-[#64748b]';
const VALUE = 'm-0 text-[#172033]';

function formatJson(value) {
  if (!value) return '{}';

  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

function AuditoriaDetailPanel({ log }) {
  if (!log) {
    return (
      <div className="rounded-2xl border border-dashed border-[#dbe4f0] bg-white p-10 text-center text-[#64748b]">
        Selecciona un evento de auditoría
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#e8edf5] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="mb-6">
        <h3 className="m-0 mb-2 text-[22px] text-[#172033]">Detalle de evento</h3>
        <span className="text-[13px] font-semibold text-[#64748b]">{log.accion}</span>
      </div>

      <div className="mb-5">
        <label className={LABEL}>Descripción</label>
        <p className={VALUE}>{log.descripcion}</p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Módulo</label>
          <p className={VALUE}>{log.modulo}</p>
        </div>

        <div>
          <label className={LABEL}>Entidad</label>
          <p className={VALUE}>{log.entidad}</p>
        </div>

        <div>
          <label className={LABEL}>IP</label>
          <p className={VALUE}>{log.ip}</p>
        </div>

        <div>
          <label className={LABEL}>Severidad</label>
          <p className={VALUE}>{log.severidad}</p>
        </div>
      </div>

      <div className="mb-5">
        <label className={LABEL}>Valor anterior</label>

        <pre className="overflow-x-auto rounded-xl bg-[#0f172a] p-4 text-xs text-[#e2e8f0]">
          {formatJson(log.valorAnterior)}
        </pre>
      </div>

      <div className="mb-5">
        <label className={LABEL}>Valor nuevo</label>

        <pre className="overflow-x-auto rounded-xl bg-[#0f172a] p-4 text-xs text-[#e2e8f0]">
          {formatJson(log.valorNuevo)}
        </pre>
      </div>

      <div className="mb-5">
        <label className={LABEL}>Hash integridad</label>
        <code className="inline-block rounded-lg bg-[#eef2ff] px-3 py-2 text-[13px] text-[#3730a3]">{log.hashIntegridad}</code>
      </div>
    </div>
  );
}

export default AuditoriaDetailPanel;
