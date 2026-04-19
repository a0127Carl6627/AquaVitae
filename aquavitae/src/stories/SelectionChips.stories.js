import React, { useState } from 'react';
import SelectionChips from './SelectionChips';

export default {
  title: 'HU18/SelectionChips',
  component: SelectionChips,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const itemsMock = [
  { value: 'planta-queretaro',  label: 'Planta Querétaro'  },
  { value: 'valle-mexico',      label: 'Valle de México'   },
  { value: 'planta-monterrey',  label: 'Planta Monterrey'  },
  { value: 'zona-norte',        label: 'Zona Norte'        },
];

function Interactive({ initial = [] }) {
  const [items, setItems] = useState(initial);
  const toggle = (item) => {
    setItems(prev =>
      prev.find(i => i.value === item.value)
        ? prev.filter(i => i.value !== item.value)
        : [...prev, item]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'sans-serif', minWidth: 360 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {itemsMock.map(item => (
          <button key={item.value} onClick={() => toggle(item)} style={{
            padding: '5px 12px', borderRadius: 6, border: '1px solid #e2e8f0',
            background: items.find(i => i.value === item.value) ? '#dbeafe' : '#f8fafc',
            color: items.find(i => i.value === item.value) ? '#1d4ed8' : '#64748b',
            fontSize: 12, cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 500,
          }}>
            {item.label}
          </button>
        ))}
      </div>
      <SelectionChips
        selectedItems={items}
        onRemove={item => setItems(prev => prev.filter(i => i.value !== item.value))}
        onClearAll={() => setItems([])}
      />
    </div>
  );
}

export const Vacio = {
  args: { selectedItems: [] },
};

export const UnaSeleccion = {
  args: {
    selectedItems: [{ value: 'planta-queretaro', label: 'Planta Querétaro' }],
    onRemove: () => {},
  },
};

export const VariasSelecciones = {
  args: {
    selectedItems: itemsMock,
    onRemove: () => {},
    onClearAll: () => {},
  },
};

export const SinAnimacion = {
  args: {
    selectedItems: itemsMock.slice(0, 3),
    onRemove: () => {},
    animate: false,
  },
};

export const Interactivo = {
  render: () => <Interactive initial={itemsMock.slice(0, 3)} />,
};

export const EnComparador = {
  render: () => {
    const [selected, setSelected] = useState([
      { value: 'planta-queretaro', label: 'Planta Querétaro' },
      { value: 'valle-mexico',     label: 'Valle de México'  },
      { value: 'planta-monterrey', label: 'Planta Monterrey' },
    ]);

    return (
      <div style={{ fontFamily: 'sans-serif', background: '#fff', borderRadius: 12, padding: '20px 20px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', minWidth: 460 }}>
        <p style={{ margin: '0 0 10px', fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Seleccionar ubicaciones para análisis (2–4)
        </p>
        <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: '#94a3b8', fontSize: 13 }}>
          🔍 Busca y selecciona plantas o regiones…
        </div>
        <SelectionChips
          selectedItems={selected}
          onRemove={item => setSelected(s => s.filter(x => x.value !== item.value))}
          onClearAll={() => setSelected([])}
        />
      </div>
    );
  },
};
