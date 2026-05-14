import GraficaRecuperacionHidrica from './GraficaRecuperacionHidrica';

export default {
  title: 'SimulacionHidrica/GraficaRecuperacionHidrica',
  component: GraficaRecuperacionHidrica,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const generarDatos = (peakValue) => {
  const puntos = [];
  for (let d = 0; d <= 90; d += 2) {
    const t = d / 90;
    const conIntervencion = Math.max(15, peakValue * Math.pow(1 - t, 1.6) + 18 * t * (1 - t) * 2);
    const sinIntervencion = Math.max(50, peakValue - (peakValue - 60) * Math.pow(t, 0.6));
    puntos.push({
      dia: d,
      conIntervencion: parseFloat(conIntervencion.toFixed(1)),
      sinIntervencion: parseFloat(sinIntervencion.toFixed(1)),
    });
  }
  return puntos;
};

export const RecuperacionAlta = {
  args: { data: generarDatos(88) },
};

export const RecuperacionMedia = {
  args: { data: generarDatos(62) },
};

export const RecuperacionBaja = {
  args: { data: generarDatos(40) },
};
