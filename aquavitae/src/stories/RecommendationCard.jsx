import React from 'react';

const defaultMessages = {
  bajo: "Se recomienda mantener los protocolos actuales y monitorear los indicadores de consumo para prevenir incrementos.",
  medio: "Se sugiere optimizar el ciclo de recuperación de agua en la planta norte debido al incremento estacional de estrés hídrico.",
  alto: "Se sugiere implementar medidas urgentes de reducción de consumo y optimización de recuperación de agua debido al estrés hídrico crítico."
};

const colors = {
  bajo: { border: '#22c55e', bg: '#f0fdf4', text: '#166534' },
  medio: { border: '#f97316', bg: '#fff7ed', text: '#f97316' },
  alto: { border: '#ef4444', bg: '#fef2f2', text: '#991b1b' }
};

export default function RecommendationCard({ 
  riskLevel = "medio", 
  customMessage = null 
}) {
  const level = riskLevel.toLowerCase();
  const message = customMessage || defaultMessages[level] || defaultMessages.medio;
  const { border, bg, text } = colors[level] || colors.medio;

  return (
    <div style={{
      backgroundColor: bg,
      borderRadius: '16px',
      border: `1px solid ${border}`,
      padding: '20px 24px',
      maxWidth: '500px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }}>
      <div style={{
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        color: text,
        marginBottom: '12px',
      }}>
        Recomendación
      </div>
      <div style={{
        fontSize: '15px',
        lineHeight: '1.5',
        color: '#1e293b',
      }}>
        {message}
      </div>
    </div>
  );
}