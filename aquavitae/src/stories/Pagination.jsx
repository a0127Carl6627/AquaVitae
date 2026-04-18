import React from 'react';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontFamily: 'sans-serif',
  },
  info: {
    fontSize: 12,
    color: '#8a9bb0',
    marginRight: 8,
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    border: '0.5px solid #d0e8f0',
    background: '#ffffff',
    color: '#1a2b4a',
    fontSize: 13,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    background: '#2F9EF3',
    color: '#ffffff',
    border: '0.5px solid #2F9EF3',
    fontWeight: 600,
  },
  btnDisabled: {
    color: '#cbd5e1',
    cursor: 'not-allowed',
    border: '0.5px solid #e8f0f7',
  },
  ellipsis: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: '#8a9bb0',
  },
};

function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export default function Pagination({
  currentPage  = 1,
  totalPages   = 125,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}) {
  const pages = buildPages(currentPage, totalPages);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end   = Math.min(currentPage * itemsPerPage, totalItems ?? totalPages * itemsPerPage);

  return (
    <div style={styles.container}>
      {totalItems && (
        <span style={styles.info}>
          Mostrando {start}-{end} de {totalItems.toLocaleString()} registros
        </span>
      )}

      {/* Anterior */}
      <button
        style={{ ...styles.btn, ...(currentPage === 1 ? styles.btnDisabled : {}) }}
        onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} style={styles.ellipsis}>…</span>
        ) : (
          <button
            key={p}
            style={{ ...styles.btn, ...(p === currentPage ? styles.btnActive : {}) }}
            onClick={() => onPageChange?.(p)}
          >
            {p}
          </button>
        )
      )}

      {/* Siguiente */}
      <button
        style={{ ...styles.btn, ...(currentPage === totalPages ? styles.btnDisabled : {}) }}
        onClick={() => currentPage < totalPages && onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
}