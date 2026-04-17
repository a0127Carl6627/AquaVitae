import React from 'react';
import './MapAlertPopup.css';

export default function MapAlertPopup({
  title = 'Alerta Monterrey 1',
  description = 'Disponibilidad hídrica disminuyó 15% en los últimos 7 días. Requiere acción inmediata.',
  onActivate,
  onIgnore,
}) {
  return (
    <div className="map-alert-popup">
      <div className="map-alert-popup__icon-box" aria-hidden="true">
        <span className="map-alert-popup__icon">*</span>
      </div>

      <div className="map-alert-popup__content">
        <h3 className="map-alert-popup__title">{title}</h3>

        <p className="map-alert-popup__description">{description}</p>

        <div className="map-alert-popup__actions">
          <button
            type="button"
            className="map-alert-popup__action map-alert-popup__action--primary"
            onClick={onActivate}
          >
            ACTIVAR PROTOCOLO
          </button>

          <button
            type="button"
            className="map-alert-popup__action map-alert-popup__action--secondary"
            onClick={onIgnore}
          >
            IGNORAR
          </button>
        </div>
      </div>
    </div>
  );
}