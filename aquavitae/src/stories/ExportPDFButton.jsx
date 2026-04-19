import React, { useState } from 'react';

const STATUS = { idle: 'idle', loading: 'loading', success: 'success', error: 'error' };

const IconDownload = ({ color = 'currentColor' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v10M8.5 10.5L12 14l3.5-3.5M5 18h14"/>
  </svg>
);

const IconSpinner = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconError = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

function buildFileName(prefix = 'reporte_sequia') {
  const now = new Date();
  const fecha = now.toISOString().slice(0, 10).replace(/-/g, '');
  return `${prefix}_${fecha}.pdf`;
}

async function generatePDF({ targetRef, fileName, data }) {
  if (targetRef?.current) {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).jsPDF;
    const canvas = await html2canvas(targetRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(fileName);
    return;
  }

  const jsPDF = (await import('jspdf')).jsPDF;
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const margin = 15;
  let y = margin;

  pdf.setFontSize(18);
  pdf.setTextColor(29, 78, 216);
  pdf.text('AquaVitae — Informe de Simulación de Sequías', margin, y);
  y += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128);
  pdf.text(`Generado el ${new Date().toLocaleDateString('es-MX', { dateStyle: 'long' })}`, margin, y);
  y += 10;

  pdf.setDrawColor(229, 231, 235);
  pdf.line(margin, y, 210 - margin, y);
  y += 8;

  if (data?.kpis) {
    pdf.setFontSize(13);
    pdf.setTextColor(17, 24, 39);
    pdf.text('KPIs y Métricas', margin, y);
    y += 7;
    pdf.setFontSize(10);
    pdf.setTextColor(55, 65, 81);
    data.kpis.forEach((kpi) => {
      pdf.text(`• ${kpi.label}: ${kpi.value}`, margin + 3, y);
      y += 6;
    });
    y += 4;
  }

  if (data?.regiones) {
    pdf.setFontSize(13);
    pdf.setTextColor(17, 24, 39);
    pdf.text('Desglose por Región', margin, y);
    y += 7;

    const headers = ['Región', 'Severidad (%)', 'Acción recomendada'];
    const colWidths = [70, 35, 75];
    pdf.setFillColor(239, 246, 255);
    pdf.rect(margin, y - 4, colWidths.reduce((a, b) => a + b, 0), 7, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(29, 78, 216);
    let x = margin;
    headers.forEach((h, i) => { pdf.text(h, x + 2, y); x += colWidths[i]; });
    y += 6;

    pdf.setFontSize(9);
    pdf.setTextColor(55, 65, 81);
    data.regiones.forEach((r, idx) => {
      if (idx % 2 === 0) {
        pdf.setFillColor(249, 250, 251);
        pdf.rect(margin, y - 4, colWidths.reduce((a, b) => a + b, 0), 6, 'F');
      }
      x = margin;
      [r.nombre, `${r.severidad}%`, r.accion].forEach((val, i) => {
        pdf.text(String(val), x + 2, y);
        x += colWidths[i];
      });
      y += 6;
    });
  }

  pdf.save(fileName);
}

export default function ExportPDFButton({
  label = 'Exportar informe PDF',
  fileNamePrefix = 'reporte_sequia',
  data = null,
  targetRef = null,
  onExport = null,
  forceStatus = null,
}) {
  const [status, setStatus] = useState(STATUS.idle);
  const current = forceStatus || status;

  const handleClick = async () => {
    if (current === STATUS.loading) return;
    setStatus(STATUS.loading);
    try {
      const fileName = buildFileName(fileNamePrefix);
      await generatePDF({ targetRef, fileName, data });
      setStatus(STATUS.success);
      onExport?.({ fileName, success: true });
      setTimeout(() => setStatus(STATUS.idle), 3000);
    } catch (err) {
      setStatus(STATUS.error);
      onExport?.({ success: false, error: err });
      setTimeout(() => setStatus(STATUS.idle), 3000);
    }
  };

  const config = {
    idle:    { bg: '#1d4ed8', border: '#1d4ed8', color: '#fff', text: label,              icon: <IconDownload /> },
    loading: { bg: '#3b82f6', border: '#3b82f6', color: '#fff', text: 'Generando PDF...', icon: <IconSpinner /> },
    success: { bg: '#dcfce7', border: '#16a34a', color: '#15803d', text: 'PDF descargado', icon: <IconCheck /> },
    error:   { bg: '#fee2e2', border: '#dc2626', color: '#dc2626', text: 'Error al generar', icon: <IconError /> },
  }[current];

  return (
    <button
      onClick={handleClick}
      disabled={current === STATUS.loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '7px 16px',
        background: config.bg,
        color: config.color,
        border: `1.5px solid ${config.border}`,
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: 'sans-serif',
        whiteSpace: 'nowrap',
        cursor: current === STATUS.loading ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
        letterSpacing: '0.01em',
      }}
    >
      {config.icon}
      {config.text}
    </button>
  );
}
