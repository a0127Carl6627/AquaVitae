import React, { useState } from 'react';

const MAX_CHARS = 80;

function detectType(value) {
  if (value === null || value === undefined) return 'empty';
  if (typeof value === 'object') return 'json';
  if (typeof value === 'number') return 'number';
  return 'string';
}

function parseIfJSON(value) {
  if (typeof value === 'object' && value !== null) return value;
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

function JSONPreview({ data, previousData, expanded }) {
  const entries = Object.entries(data);
  const visible = expanded ? entries : entries.slice(0, 3);
  const hidden = entries.length - visible.length;

  return (
    <pre style={{
      margin: 0,
      background: '#0a1f0f',
      borderRadius: 6,
      padding: '6px 10px',
      fontFamily: 'monospace',
      fontSize: 11,
      color: '#c9d1d9',
      lineHeight: 1.7,
      overflowX: 'auto',
      maxWidth: '100%',
      border: '1px solid #1a3a1f',
    }}>
      <span>{'{'}</span>{'\n'}
      {visible.map(([key, val], i) => {
        const prevVal = previousData?.[key];
        const changed = previousData !== null && prevVal !== undefined && String(prevVal) !== String(val);
        const isNew = previousData !== null && prevVal === undefined;

        return (
          <span key={key}>
            {'  '}
            <span style={{ color: '#c9d1d9' }}>"{key}"</span>
            <span>: </span>
            <span style={{
              color: changed || isNew ? '#3fb950' : getValueColor(val),
              fontWeight: changed || isNew ? '700' : '400',
            }}>
              {formatValue(val)}
            </span>
            {(changed || isNew) && (
              <span style={{ color: '#3fb950', fontSize: 9, marginLeft: 4, opacity: 0.8 }}>
                {isNew ? '●nuevo' : '●modificado'}
              </span>
            )}
            {i < visible.length - 1 && <span>,</span>}
            {'\n'}
          </span>
        );
      })}
      {!expanded && hidden > 0 && (
        <span style={{ color: '#6e7681' }}>{'  '}…{hidden} campo{hidden > 1 ? 's' : ''} más{'\n'}</span>
      )}
      <span>{'}'}</span>
    </pre>
  );
}

export default function NewValueCell({
  value = null,
  previousValue = null,
  maxChars = MAX_CHARS,
  emptyLabel = '—',
}) {
  const [expanded, setExpanded] = useState(false);

  if (value === null || value === undefined || value === '') {
    return <span style={{ color: '#9ca3af', fontSize: 12, fontStyle: 'italic' }}>{emptyLabel}</span>;
  }

  const jsonData = parseIfJSON(value);
  const prevJsonData = previousValue ? parseIfJSON(previousValue) : null;

  if (jsonData) {
    const totalKeys = Object.keys(jsonData).length;
    const needsToggle = totalKeys > 3;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <JSONPreview data={jsonData} previousData={prevJsonData} expanded={expanded} />
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
    const changed = previousValue !== null && previousValue !== undefined && previousValue !== value;
    return (
      <span style={{
        fontFamily: 'monospace',
        fontSize: 12,
        color: changed ? '#16a34a' : '#374151',
        fontWeight: 600,
      }}>
        {value}
      </span>
    );
  }

  const text = String(value);
  const changed = previousValue !== null && previousValue !== undefined && String(previousValue) !== text;
  const isTruncatable = text.length > maxChars;
  const displayText = !expanded && isTruncatable ? text.slice(0, maxChars) + '…' : text;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{
        fontSize: 12,
        color: changed ? '#15803d' : '#374151',
        fontWeight: changed ? 600 : 400,
        wordBreak: 'break-word',
      }}>
        {displayText}
        {changed && (
          <span style={{ marginLeft: 6, fontSize: 10, color: '#16a34a', fontWeight: 400 }}>●</span>
        )}
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
