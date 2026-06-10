import React from 'react';

const ICONS = {
  water: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="1.5"/>
      <circle cx="18.5" cy="18.5" r="1.5"/>
    </svg>
  ),
};

// Set completo de clases por icono (no interpoladas) para el JIT de Tailwind.
const ICON_BG = {
  water: 'bg-[#dbeafe] text-[#2563eb]',
  money: 'bg-[#e3f4ea] text-[#2ea36b]',
  clock: 'bg-[#fdf2dd] text-[#e89923]',
  shield: 'bg-[#ede9fe] text-[#7c3aed]',
  truck: 'bg-[#fef3c7] text-[#d97706]',
};

export default function FactoresClave({
  titulo = 'Para la ubicación seleccionada',
  factores = [],
}) {
  return (
    <div className="flex flex-col rounded-xl border border-[#e6eaf0] bg-white font-sans shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="border-b border-[#e6eaf0] px-[18px] pb-2.5 pt-4">
        <h3 className="m-0 text-sm font-semibold text-[#1a2332]">Factores clave considerados</h3>
        <div className="mt-0.5 text-[11.5px] text-[#8a93a3]">{titulo}</div>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-[18px] py-4">
        {factores.map((f, i) => {
          const bg = ICON_BG[f.icon] || 'bg-[#f1f5f9] text-[#64748b]';
          return (
            <div key={i} className="flex items-center gap-3">
              <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${bg}`}>
                <div className="h-4 w-4">{ICONS[f.icon]}</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 text-[12.5px] font-medium text-[#1a2332]">{f.nombre}</div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, j) => (
                    <div
                      key={j}
                      className={`h-[9px] w-[9px] rounded-full border-[1.5px] ${j < f.puntos ? 'opacity-100' : 'opacity-[0.28]'}`}
                      // color 100% dinámico desde datos: única excepción inline justificada
                      style={{
                        backgroundColor: j < f.puntos ? f.color : 'transparent',
                        borderColor: f.color,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
