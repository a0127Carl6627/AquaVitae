import React from 'react';
import clsx from 'clsx';

export default function AlertaBannerHidrico({
  plantaNombre = 'Planta Monterrey',
  estresActual = 85,
  cierreRecomendadoDias = 60,
  costoApertura = '$2.4 M',
  costoOperacion = '$3.1 M',
  diasApertura = '45–60',
}) {
  const metricas = [
    { val: `${estresActual}%`, lbl: 'Estrés actual' },
    { val: `${cierreRecomendadoDias} días`, lbl: 'Cierre recomendado' },
    { val: costoApertura, lbl: 'Costo est. de apertura' },
    { val: costoOperacion, lbl: 'Costo est. de operación' },
    { val: `${diasApertura}`, lbl: 'días est. de apertura' },
  ];

  return (
    <div className="flex items-center gap-4 rounded-xl border border-[rgba(226,59,59,0.22)] bg-[#fde8e8] px-5 py-4 font-sans">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[#e23b3b] text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/>
          <path d="M12 9v4M12 17h.01"/>
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <strong className="mb-[3px] block text-[13.5px] font-semibold text-[#e23b3b]">
          Estrés hídrico Alto en {plantaNombre}
        </strong>
        <span className="text-xs text-[#5a6577]">
          Esta planta está por encima del límite operativo. Se recomienda evaluar alternativas de cierre temporal y reubicación.
        </span>
      </div>

      <div className="flex shrink-0">
        {metricas.map(({ val, lbl }, i) => (
          <div
            key={i}
            className={clsx(
              'flex flex-col items-center gap-[3px]',
              i === 0
                ? 'pl-3 pr-[18px]'
                : 'border-l border-[rgba(226,59,59,0.2)] px-[18px]',
            )}
          >
            <span className="text-xl font-bold leading-none tracking-[-.01em] text-[#e23b3b]">{val}</span>
            <span className="whitespace-nowrap text-center text-[10.5px] text-[#8a93a3]">{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
