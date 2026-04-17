import React, { useState } from 'react';
import PropTypes from 'prop-types';
import JsonDiffViewer from './JSONDiffViewer'; 

const styles = {
  container: {
    background: '#ffffff',
    borderRadius: 10,
    padding: '1.5rem',
    fontFamily: 'sans-serif',
    color: '#30363d',
    border: '0.5px solid #30363d',
    maxWidth: '100%',
    overflowX: 'auto',
  },
  
  detailPanel: {
    marginBottom: '1.5rem',
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '0.5rem',
  },
  detailFields: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    background: '#ffffff',
    padding: '0.75rem 1.25rem',
    borderRadius: 8,
    border: '0.5px solid #ffffff',
    marginBottom: '1rem',
  },
  fieldItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldLabel: {
    fontSize: 10,
    letterSpacing: '0.08em',
    color: '0F172A',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: 500,
    color: '#0F172A',
  },

  tableWrapper: {
    overflowX: 'auto',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 12,
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem 0.5rem',
    borderBottom: '1px solid #30363d',
    color: '#0F172A',
    fontWeight: 500,
    fontSize: 11,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
  },
  td: {
    padding: '0.75rem 0.5rem',
    borderBottom: '0.5px solid #21262d',
    color: '#0F172A',
    cursor: 'pointer',
  },

  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    color: '#8b949e',
  },
  pageNumbers: {
    display: 'flex',
    gap: '0.75rem',
  },
  pageButton: {
    background: 'transparent',
    border: 'none',
    color: '#8b949e',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    borderRadius: 4,
    fontSize: 12,
  },
  pageButtonActive: {
    background: '#3d8eff',
    color: '#ffffff',
  },
};

const AuditLogTable = ({ logs, onSelectLog, selectedLog, jsonDiffAction }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5; 
  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = logs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(logs.length / logsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          style={{
            ...styles.pageButton,
            ...(i === currentPage ? styles.pageButtonActive : {}),
          }}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div style={styles.container}>
      {/* Panel de detalle (solo si hay un registro seleccionado) */}
      {selectedLog && (
        <div style={styles.detailPanel}>
          <div style={styles.detailFields}>
            <div style={styles.fieldItem}>
              <span style={styles.fieldLabel}>Timestamp</span>
              <span style={styles.fieldValue}>{selectedLog.timestamp}</span>
            </div>
            <div style={styles.fieldItem}>
              <span style={styles.fieldLabel}>Usuario</span>
              <span style={styles.fieldValue}>{selectedLog.user}</span>
            </div>
            <div style={styles.fieldItem}>
              <span style={styles.fieldLabel}>Acción</span>
              <span style={styles.fieldValue}>{selectedLog.status}</span>
            </div>
            <div style={styles.fieldItem}>
              <span style={styles.fieldLabel}>Módulo</span>
              <span style={styles.fieldValue}>{selectedLog.module}</span>
            </div>
            <div style={styles.fieldItem}>
              <span style={styles.fieldLabel}>IP</span>
              <span style={styles.fieldValue}>{selectedLog.ip}</span>
            </div>
          </div>
          {selectedLog.before && selectedLog.after && (
            <JsonDiffViewer
              before={selectedLog.before}
              after={selectedLog.after}
              recordId={selectedLog.recordId || `LOG-${selectedLog.id}`}
              action={jsonDiffAction || selectedLog.status.toLowerCase()}
            />
          )}
        </div>
      )}

      {/* Tabla de logs */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Timestamp</th>
              <th style={styles.th}>Usuario</th>
              <th style={styles.th}>Acción</th>
              <th style={styles.th}>Módulo</th>
              <th style={styles.th}>IP</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log) => {
              const isSelected = selectedLog && selectedLog.id === log.id;
              const rowStyle = {
                ...styles.td, 
                ...(hoveredRow === log.id || isSelected ? styles.trHover : {}),
                ...(isSelected ? { background: '#d8e7ff' } : {}),
              };
              return (
                <tr
                  key={log.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelectLog(log)}
                  onMouseEnter={() => setHoveredRow(log.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={rowStyle}>{log.timestamp}</td>
                  <td style={rowStyle}>{log.user}</td>
                  <td style={rowStyle}>
                    <span style={{
                      color: log.status === 'CREATE' ? '#3fb950' :
                             log.status === 'DELETE' ? '#ff7b72' :
                             log.status === 'UPDATE' ? '#58a6ff' :
                             log.status === 'LOGIN' ? '#8b949e' : '#c9d1d9',
                      fontWeight: 500,
                    }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={rowStyle}>{log.module}</td>
                  <td style={rowStyle}>{log.ip}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div style={styles.pagination}>
        <span>Mostrando {indexOfFirst + 1}-{Math.min(indexOfLast, logs.length)} de {logs.length} registros</span>
        <div style={styles.pageNumbers}>
          <button
            style={styles.pageButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {renderPageButtons()}
          <button
            style={styles.pageButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

AuditLogTable.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      timestamp: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      module: PropTypes.string.isRequired,
      ip: PropTypes.string.isRequired,
      before: PropTypes.object,
      after: PropTypes.object,
      recordId: PropTypes.string,
    })
  ).isRequired,
  onSelectLog: PropTypes.func.isRequired,
  selectedLog: PropTypes.object,
  jsonDiffAction: PropTypes.oneOf(['create', 'update', 'delete', 'login']),
};

export default AuditLogTable;