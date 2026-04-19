import React, { useState } from 'react';

const MAX_CHARS = 80;

function detectType(value) {
  if (value === null || value === undefined) return 'empty';
  if (typeof value === 'object') return 'json';
  if (typeof value === 'number') return 'number';
  return 'string';
}

function parseIfJSON(value) {
  if (typeof value === 'object') return value;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'object' && parsed !== null) return parsed;
  } catch (_) {}
  return null;
}

const STATUS_COLORS = {
  active:   '#3fb950',
  inactive: '#ff7b72',
  update:   '#79c0ff',
  login:    '#8b949e',
};

function getValueColor(val) {
  const s = String(val).toLowerCase();
  return STATUS_COLORS[s] || '#c9d1d9';
}

function formatValue(val) {
  if (typeof val === 'string') return `"${val}"`;
  return String(val);
}

function JSONPreview({ data, expanded }) {
  const entries = Object.entries(data);
  const visible = expanded ? entries : entries.slice(0, 3);
  const hidden = entries.length - visible.length;

  return (
    <pre style={{
      margin: 0,
      background: '#0f1117',
      borderRadius: 6,
      padding: '6px 10px',
      fontFamily: 'monospace',
      fontSize: 11,
      color: '#c9d1d9',
      lineHeight: 1.7,
      overflowX: 'auto',
      maxWidth: '100%',
    }}>
      <span>{'{'}</span>{'\n'}
      {visible.map(([key, val], i) => (
        <span key={key}>
          {'  '}
          <span style={{ color: '#c9d1d9' }}>"{key}"</span>
          <span>: </span>
          <span style={{ color: getValueColor(val) }}>{formatValue(val)}</span>
          {i < visible.length - 1 && <span>,</span>}
          {'\n'}
        </span>
      ))}
      {!expanded && hidden > 0 && (
        <span style={{ color: '#6e7681' }}>{'  '}…{hidden} campo{hidden > 1 ? 's' : ''} más{'\n'}</span>
      )}
      <span>{'}'}</span>
    </pre>
  );
}

export default function PreviousValueCell({
  value = null,
  maxChars = MAX_CHARS,
  emptyLabel = '—',
}) {
  const [expanded, setExpanded] = useState(false);

  if (value === null || value === undefined || value === '') {
    return <span style={{ color: '#9ca3af', fontSize: 12, fontStyle: 'italic' }}>{emptyLabel}</span>;
  }

  const jsonData = parseIfJSON(value);

  if (jsonData) {
    const totalKeys = Object.keys(jsonData).length;
    const needsToggle = totalKeys > 3;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <JSONPreview data={jsonData} expanded={expanded} />
        {needsToggle && (
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              alignSelf: 'flex-start',
              background: 'none',
              border: 'none',
              color: '#3b82f6',
              fontSize: 11,
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'sans-serif',
            }}
          >
            {expanded ? 'Ver menos ▲' : `Ver más (${totalKeys - 3} campos) ▼`}
          </button>
        )}
      </div>
    );
  }

  if (detectType(value) === 'number') {
    return (
      <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#374151', fontWeight: 600 }}>
        {value}
      </span>
    );
  }

  const text = String(value);
  const isTruncatable = text.length > maxChars;
  const displayText = !expanded && isTruncatable ? text.slice(0, maxChars) + '…' : text;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 12, color: '#374151', wordBreak: 'break-word' }}>
        {displayText}
      </span>
      {isTruncatable && (
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            fontSize: 11,
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'sans-serif',
          }}
        >
          {expanded ? 'Ver menos ▲' : 'Ver más ▼'}
        </button>
      )}
    </div>
  );
}
