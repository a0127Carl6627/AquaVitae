import GraficaDisponibilidadOperativa from './GraficaDisponibilidadOperativa';

export default {
  title: 'AlternativasUbicacion/GraficaDisponibilidadOperativa',
  component: GraficaDisponibilidadOperativa,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const generarDatos = (inicioDeclive, cierreForzoso) => {
  const puntos = [];
  for (let d = 0; d <= 90; d += 2) {
    let v;
    if (d < inicioDeclive) {
      v = 90 - (d / inicioDeclive) * 5;
    } else {
      const t = (d - inicioDeclive) / (cierreForzoso - inicioDeclive);
      v = Math.max(0, 85 * Math.pow(1 - t, 1.3));
    }
    v = Math.max(0, Math.min(100, v));
    puntos.push({
      dia: d,
      valor: parseFloat(v.toFixed(1)),
      bandaSup: Math.min(100, v + 7),
      bandaInf: Math.max(0, v - 7),
    });
  }
  return puntos;
};

export const RiesgoAlto = {
  args: {
    data: generarDatos(10, 80),
    inicioDeclive: 10,
    cierreForzoso: 80,
    perdidaProyectada: '$4.8 M',
    probEvento: '82%',
  },
};

export const RiesgoMedio = {
  args: {
    data: generarDatos(20, 65),
    inicioDeclive: 20,
    cierreForzoso: 65,
    perdidaProyectada: '$3.2 M',
    probEvento: '61%',
  },
};

export const RiesgoBajo = {
  args: {
    data: generarDatos(40, 85),
    inicioDeclive: 40,
    cierreForzoso: 85,
    perdidaProyectada: '$1.5 M',
    probEvento: '34%',
  },
};
