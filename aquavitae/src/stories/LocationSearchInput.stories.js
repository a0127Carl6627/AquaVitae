import React, { useState } from 'react';
import LocationSearchInput from './LocationSearchInput';

export default {
  title: 'HU18/LocationSearchInput',
  component: LocationSearchInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const opciones = [
  { value: 'planta-queretaro',  label: 'Planta Querétaro',    sublabel: 'Región Centro-Bajío' },
  { value: 'valle-mexico',      label: 'Valle de México',      sublabel: 'Acuífero Metropolitano' },
  { value: 'planta-monterrey',  label: 'Planta Monterrey',     sublabel: 'Región Noreste' },
  { value: 'zona-norte',        label: 'Zona Norte',           sublabel: 'Región Norte' },
  { value: 'zona-bajio',        label: 'Zona Bajío',           sublabel: 'Guanajuato / Jalisco' },
  { value: 'zona-sur',          label: 'Zona Sur',             sublabel: 'Región Sur' },
  { value: 'planta-guadalajara',label: 'Planta Guadalajara',   sublabel: 'Occidente' },
  { value: 'planta-toluca',     label: 'Planta Toluca',        sublabel: 'Zona Centro' },
];

function Controlled({ initialSelected = [] }) {
  const [selected, setSelected] = useState(initialSelected);
  return (
    <div style={{ position: 'relative', width: 420 }}>
      <LocationSearchInput
        options={opciones}
        selected={selected}
        onSelect={opt => setSelected(s => [...s, opt])}
        onRemove={opt => setSelected(s => s.filter(x => x.value !== opt.value))}
      />
    </div>
  );
}

export const Vacio = {
  render: () => <Controlled />,
};

export const ConSelecciones = {
  render: () => (
    <Controlled initialSelected={[
      { value: 'planta-queretaro', label: 'Planta Querétaro' },
      { value: 'valle-mexico',     label: 'Valle de México' },
      { value: 'planta-monterrey', label: 'Planta Monterrey' },
    ]} />
  ),
};

export const LimiteAlcanzado = {
  render: () => (
    <Controlled initialSelected={[
      { value: 'planta-queretaro',  label: 'Planta Querétaro' },
      { value: 'valle-mexico',      label: 'Valle de México' },
      { value: 'planta-monterrey',  label: 'Planta Monterrey' },
      { value: 'zona-norte',        label: 'Zona Norte' },
    ]} />
  ),
};

export const EnPanelComparador = {
  render: () => {
    const [selected, setSelected] = useState([
      { value: 'planta-queretaro', label: 'Planta Querétaro' },
      { value: 'valle-mexico',     label: 'Valle de México' },
      { value: 'planta-monterrey', label: 'Planta Monterrey' },
    ]);

    return (
      <div style={{
        fontFamily: 'sans-serif',
        background: '#f0f7ff',
        borderRadius: 16,
        padding: 32,
        minWidth: 520,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Comparador de Ubicaciones</h2>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ background: 'none', border: '1.5px solid #cbd5e1', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
              ↓ Descargar Datos
            </button>
            <button style={{ background: '#1d4ed8', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
              Exportar comparación
            </button>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '20px 20px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'relative' }}>
          <LocationSearchInput
            options={opciones}
            selected={selected}
            onSelect={opt => setSelected(s => [...s, opt])}
            onRemove={opt => setSelected(s => s.filter(x => x.value !== opt.value))}
          />
        </div>
      </div>
    );
  },
};
