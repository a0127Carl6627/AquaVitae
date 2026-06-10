import React, { useState } from 'react';
import clsx from 'clsx';

export default function TablaCostosUbicacion({
  alternativas = [],
  onSelectAlternativa,
  selectedNombre = null,
}) {
  const [internalIdx, setInternalIdx] = useState(0);

  const controlledIdx = selectedNombre != null
    ? alternativas.findIndex(a => a.nombre === selectedNombre)
    : -1;
  const selectedIdx = controlledIdx >= 0 ? controlledIdx : internalIdx;

  function handleSelect(i) {
    setInternalIdx(i);
    onSelectAlternativa?.(alternativas[i]);
  }

  const lowest = alternativas.reduce((min, a, i) => {
    const v = parseFloat(a.costoTotal.replace(/[^0-9.]/g, ''));
    return v < min.v ? { v, i } : min;
  }, { v: Infinity, i: -1 });

  return (
    <div className="flex flex-col rounded-xl border border-[#e6eaf0] bg-white font-sans shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between gap-3 border-b border-[#e6eaf0] px-[18px] pb-2.5 pt-4">
        <div>
          <h3 className="m-0 text-sm font-semibold text-[#1a2332]">
            Costos estimados de cierre y apertura por ubicación
          </h3>
          <div className="mt-0.5 text-[11.5px] text-[#8a93a3]">
            Comparación de escenarios operativos · Valores estimados en MXN millones
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr>
              {['Ubicación', 'Costo de cierre', 'Tiempo de cierre', 'Costo de apertura', 'Costo TOTAL'].map(h => (
                <th
                  key={h}
                  className="whitespace-nowrap border-b border-[#e6eaf0] bg-[#fafbfc] px-3.5 py-2.5 text-left text-[11px] font-medium uppercase tracking-[.03em] text-[#8a93a3]"
                >{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternativas.map((a, i) => {
              const isSelected = i === selectedIdx;
              const isLowest = i === lowest.i;
              return (
                <tr
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={clsx(
                    'cursor-pointer border-b border-l-[3px] border-[#e6eaf0] transition-colors duration-[120ms]',
                    isSelected ? 'border-l-[#2563eb] bg-[#eaf1fe]' : 'border-l-transparent bg-transparent',
                  )}
                >
                  <td className="px-3.5 py-[11px] align-middle text-[#1a2332]">
                    <div className="flex flex-wrap items-center gap-2">
                      {a.recommended && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(46,163,107,0.2)] bg-[#e3f4ea] px-[7px] py-0.5 text-[10px] font-semibold text-[#2ea36b]">
                          <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#2ea36b]" />
                          Recomendada
                        </span>
                      )}
                      <span className={isSelected ? 'font-semibold' : 'font-normal'}>{a.nombre}, {a.estado}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-[11px] tabular-nums text-[#1a2332]">{a.costoCierre}</td>
                  <td className="px-3.5 py-[11px] text-[#5a6577]">{a.tiempoCierre}</td>
                  <td className="px-3.5 py-[11px] tabular-nums text-[#1a2332]">{a.costoApertura}</td>
                  <td className={clsx('px-3.5 py-[11px] font-bold tabular-nums', isLowest ? 'text-[#2ea36b]' : 'text-[#1a2332]')}>{a.costoTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#e6eaf0] px-[18px] py-3">
        <span className="text-[11px] text-[#8a93a3]">
          {alternativas.length} ubicaciones analizadas · 1 recomendada
        </span>
      </div>
    </div>
  );
}
