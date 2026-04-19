import React from 'react';

const AVATAR_COLORS = [
  { bg: '#1e3a5f', color: '#79c0ff' },
  { bg: '#1a2f1a', color: '#3fb950' },
  { bg: '#2d1b4e', color: '#c084fc' },
  { bg: '#3b1f0a', color: '#fb923c' },
  { bg: '#1a3030', color: '#2dd4bf' },
  { bg: '#3b0a0a', color: '#ff7b72' },
];

function getAvatarColor(username) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) hash += username.charCodeAt(i);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function getInitials(username) {
  const parts = username.replace(/[._-]/g, ' ').trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return username.slice(0, 2).toUpperCase();
}

function parseTimestamp(timestamp) {
  if (!timestamp) return null;
  const d = new Date(timestamp.replace(' ', 'T'));
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(date, timezone) {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone,
  }).format(date);
}

function formatTime(date, timezone) {
  return new Intl.DateTimeFormat('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).format(date);
}

function formatRelative(date) {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'Justo ahora';
  if (diffMin < 60) return `Hace ${diffMin} min`;
  if (diffHr < 24) return `Hace ${diffHr} h`;
  if (diffDay < 7) return `Hace ${diffDay} día${diffDay > 1 ? 's' : ''}`;
  return null;
}

export default function AuditMetaCell({
  user = '',
  timestamp = '',
  showAvatar = true,
  showRelative = false,
  showIP = false,
  ip = '',
  timezone = 'America/Mexico_City',
}) {
  const date = parseTimestamp(timestamp);
  const avatarColor = getAvatarColor(user || 'X');
  const initials = getInitials(user || 'XX');
  const relative = date ? formatRelative(date) : null;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      {showAvatar && (
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: avatarColor.bg,
          color: avatarColor.color,
          border: `1px solid ${avatarColor.color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          fontWeight: 700,
          fontFamily: 'monospace',
          flexShrink: 0,
          marginTop: 1,
        }}>
          {initials}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#0F172A',
          fontFamily: 'sans-serif',
        }}>
          {user || '—'}
        </span>

        {date ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'monospace' }}>
              {formatDate(date, timezone)}
            </span>
            <span style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>
              {formatTime(date, timezone)}
            </span>
            {showRelative && relative && (
              <span style={{ fontSize: 10, color: '#3b82f6', fontStyle: 'italic' }}>
                {relative}
              </span>
            )}
          </div>
        ) : (
          <span style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>Sin fecha</span>
        )}

        {showIP && ip && (
          <span style={{
            fontSize: 10,
            color: '#6b7280',
            fontFamily: 'monospace',
            marginTop: 1,
          }}>
            IP: {ip}
          </span>
        )}
      </div>
    </div>
  );
}
