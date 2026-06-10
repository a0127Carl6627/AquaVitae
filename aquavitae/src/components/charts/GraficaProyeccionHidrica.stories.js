import GraficaProyeccionHidrica from './GraficaProyeccionHidrica';

export default {
  title: 'SimulacionHidrica/GraficaProyeccionHidrica',
  component: GraficaProyeccionHidrica,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const generarDatos = (startDay, peakDay, peakValue) => {
  const puntos = [];
  for (let d = 0; d <= 90; d += 2) {
    let v;
    if (d < startDay) {
      v = 12 + (d / startDay) * 8;
    } else if (d <= peakDay) {
      const t = (d - startDay) / (peakDay - startDay);
      v = 20 + (peakValue - 20) * (1 - Math.pow(1 - t, 2));
    } else {
      const t = (d - peakDay) / (90 - peakDay);
      v = peakValue - (peakValue - 30) * Math.pow(t, 1.4);
    }
    v = Math.max(8, Math.min(95, v));
    puntos.push({ dia: d, valor: parseFloat(v.toFixed(1)), bandaSup: Math.min(98, v + 8), bandaInf: Math.max(4, v - 8) });
  }
  return puntos;
};

export const RiesgoAlto = {
  args: {
    data: generarDatos(14, 45, 88),
    startDay: 14,
    peakDay: 45,
    peakValue: 88,
  },
};

export const RiesgoMedio = {
  args: {
    data: generarDatos(20, 55, 62),
    startDay: 20,
    peakDay: 55,
    peakValue: 62,
  },
};

export const RiesgoBajo = {
  args: {
    data: generarDatos(30, 70, 38),
    startDay: 30,
    peakDay: 70,
    peakValue: 38,
  },
};
