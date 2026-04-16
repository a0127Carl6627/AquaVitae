import React from 'react';
import './EmailInput.css';

export default function EmailInput({
  placeholder = 'yourmail@example.com',
  value,
  onChange,
  disabled = false,
  name = 'email',
  id = 'email',
}) {
  return (
    <input
      className="email-input"
      type="email"
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}