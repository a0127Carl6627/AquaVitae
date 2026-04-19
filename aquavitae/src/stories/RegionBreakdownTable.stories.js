import React from 'react';
import RegionBreakdownTable from './RegionBreakdownTable';
import ActionBadge from './ActionBadge';

export default {
  title: 'HU10/RegionBreakdownTable',
  component: RegionBreakdownTable,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const pocosRegistros = [
  { region: 'Zona Norte (Monterrey)',    plantaId: 'ID: PLT-005', severidad: 88, accion: 'Inminente riesgo de paro operativo',  boton: 'Reubicar producción' },
  { region: 'Zona Bajío (Guadalajara)',  plantaId: 'ID: PLT-006', severidad: 45, accion: 'Reducción de consumo preventiva',      boton: 'Ver detalle' },
  { region: 'Zona Centro (Toluca)',      plantaId: 'ID: PLT-008', severidad: 12, accion: 'Operación estable sin riesgos detectados', boton: 'Ver detalle' },
];

const muchosRegistros = [
  ...pocosRegistros,
  { region: 'Zona Sur (Oaxaca)',         plantaId: 'ID: PLT-011', severidad: 72, accion: 'Riesgo alto, revisar reservas',        boton: 'Reubicar producción' },
  { region: 'Zona Pacífico (Sinaloa)',   plantaId: 'ID: PLT-014', severidad: 35, accion: 'Monitoreo preventivo recomendado',     boton: 'Ver detalle' },
  { region: 'Zona Noreste (Saltillo)',   plantaId: 'ID: PLT-017', severidad: 58, accion: 'Alerta media, plan de contingencia',   boton: 'Ver detalle' },
];

export const PocosRegistros  = { args: { data: pocosRegistros  } };
export const MuchosRegistros = { args: { data: muchosRegistros } };

export const ConActionBadge = {
  args: {
    data: [
      { region: 'Zona Norte (Monterrey)',   plantaId: 'ID: PLT-005', severidad: 88, accion: 'Reubicar producción',  boton: 'Reubicar producción', actionType: 'critical' },
      { region: 'Zona Bajío (Guadalajara)', plantaId: 'ID: PLT-006', severidad: 45, accion: 'Consumo preventivo',   boton: 'Ver detalle',         actionType: 'warning'  },
      { region: 'Zona Centro (Toluca)',     plantaId: 'ID: PLT-008', severidad: 12, accion: 'Operación estable',    boton: 'Ver detalle',         actionType: 'safe'     },
    ],
  },
};
