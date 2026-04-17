import React from 'react';

const styles = {
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2F9EF3',
    color: '#ffffff',
    border: 'none',
    borderRadius: 12,
    padding: '10px 20px',
    fontSize: 15,
    fontWeight: 500,
    fontFamily: 'sans-serif',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#1a8be0',
  },
  buttonDisabled: {
    backgroundColor: '#a0cff7',
    cursor: 'not-allowed',
  },
  icon: {
    width: 18,
    height: 18,
    flexShrink: 0,
  },
};

function DownloadIcon() {
  return (
    <svg
      style={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v13M7 11l5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export default function ExportCsvButton({
  label = 'Exportar CSV',
  onClick,
  disabled = false,
  type = 'button',
}) {
  const [hovered, setHovered] = React.useState(false);

  const buttonStyle = {
    ...styles.button,
    ...(hovered && !disabled ? styles.buttonHover : {}),
    ...(disabled ? styles.buttonDisabled : {}),
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      type={type}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <DownloadIcon />
      {label}
    </button>
  );
}