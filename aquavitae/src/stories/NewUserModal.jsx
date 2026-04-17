import React, { useState } from 'react';
import './NewUserModal.css';

export default function NewUserModal() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="new-user-modal-overlay">
      <div className="new-user-modal">
        <div className="new-user-modal__header">
          <h2 className="new-user-modal__title">Nuevo Usuario</h2>
          <p className="new-user-modal__subtitle">
            Completa la información para dar de alta un nuevo administrador o usuario.
          </p>
        </div>

        <div className="new-user-modal__body">
          <div className="new-user-modal__row new-user-modal__row--name-admin">
            <div className="new-user-modal__field">
              <label className="new-user-modal__label" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                className="new-user-modal__input"
                type="text"
                placeholder="Ej. Juan Pérez"
              />
            </div>

            <div className="new-user-modal__admin-toggle">
              <button
                type="button"
                className={`new-user-modal__switch ${isAdmin ? 'is-active' : ''}`}
                onClick={() => setIsAdmin(!isAdmin)}
                aria-pressed={isAdmin}
              >
                <span className="new-user-modal__switch-thumb" />
              </button>

              <span className="new-user-modal__admin-text">¿Admin?</span>
            </div>
          </div>

          <div className="new-user-modal__field">
            <label className="new-user-modal__label" htmlFor="correo">
              Correo
            </label>
            <input
              id="correo"
              className="new-user-modal__input"
              type="email"
              placeholder="usuario@empresa.com"
            />
          </div>

          <div className="new-user-modal__row new-user-modal__row--two-columns">
            <div className="new-user-modal__field">
              <label className="new-user-modal__label" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                className="new-user-modal__input"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="new-user-modal__field">
              <label className="new-user-modal__label" htmlFor="confirmPassword">
                Confirma contraseña
              </label>
              <input
                id="confirmPassword"
                className="new-user-modal__input"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="new-user-modal__field">
            <label className="new-user-modal__label" htmlFor="empresa">
              Empresa
            </label>
            <div className="new-user-modal__select-wrapper">
              <span className="new-user-modal__select-icon">🏢</span>
              <select
                id="empresa"
                className="new-user-modal__select"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una empresa
                </option>
                <option value="empresa1">Empresa 1</option>
                <option value="empresa2">Empresa 2</option>
                <option value="empresa3">Empresa 3</option>
              </select>
              <span className="new-user-modal__select-arrow">⌄</span>
            </div>
          </div>
        </div>

        <div className="new-user-modal__footer">
          <button type="button" className="new-user-modal__confirm-button">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}