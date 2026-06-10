import React from 'react';

// Solo se usa el color de texto del icono; mapeamos a clase completa.
const COLOR_TEXT = {
  red:   'text-[#e23b3b]',
  amber: 'text-[#e89923]',
  green: 'text-[#2ea36b]',
  blue:  'text-[#2563eb]',
  gray:  'text-[#64748b]',
};

export default function SimulacionKpiCard({
  label = 'Índice hídrico actual',
  value = '85%',
  sublabel = 'Nivel de estrés',
  color = 'red',
  icon,
}) {
  const textClass = COLOR_TEXT[color] || COLOR_TEXT.gray;

  return (
    <div className="flex flex-col gap-2.5 rounded-[10px] border border-gray-100 bg-white px-[18px] py-4 [font-family:Inter,sans-serif]">
      <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.07em] text-gray-500">
        {label}
      </p>

      <div className="flex items-center gap-3">
        {icon && (
          <div className={`flex items-center ${textClass}`}>
            {icon}
          </div>
        )}
        <span className="text-[32px] font-semibold leading-none text-gray-900">
          {value}
        </span>
      </div>

      {sublabel && (
        <p className="m-0 text-xs text-gray-400">{sublabel}</p>
      )}
    </div>
  );
}
