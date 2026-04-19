import React from 'react';

export default function ProfileList({ profiles = [], selectedProfile, onSelectProfile }) {
  return (
    <div style={{
      width: '260px',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <h3 style={{
        fontSize: '16px',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 4px 0',
      }}>
        Perfiles Existentes
      </h3>

      {profiles.map((profile) => {
        const isSelected = selectedProfile === profile.id;
        return (
          <div
            key={profile.id}
            onClick={() => onSelectProfile && onSelectProfile(profile.id)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              borderRadius: '10px',
              border: `1.5px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
              backgroundColor: isSelected ? '#eff6ff' : '#fff',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background-color 0.2s',
            }}
          >
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '3px',
              }}>
                {profile.name}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#64748b',
              }}>
                {profile.description}
              </div>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isSelected ? '#3b82f6' : '#94a3b8'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        );
      })}
    </div>
  );
}
