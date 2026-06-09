import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalDeleteUser from '../../../components/admin/ModalDeleteUser';

const mockUser = {
  id: 1,
  nombreCompleto: 'Juan Pérez',
  correo: 'juan@test.com',
  nombreRol: 'Director',
  regionPlanta: 'Norte',
};

describe('ModalDeleteUser', () => {
  it('returns null when user is null', () => {
    const { container } = render(
      <ModalDeleteUser user={null} onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the modal with user info', () => {
    render(<ModalDeleteUser user={mockUser} onConfirm={() => {}} onCancel={() => {}} />);
    expect(screen.getByText('¿Eliminar usuario?')).toBeInTheDocument();
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('juan@test.com')).toBeInTheDocument();
    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Norte/)).toBeInTheDocument();
  });

  it('shows "Usuario" when nombreCompleto is missing', () => {
    render(
      <ModalDeleteUser user={{ correo: 'x@x.com' }} onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByText('Usuario')).toBeInTheDocument();
  });

  it('shows "—" when correo is missing', () => {
    render(
      <ModalDeleteUser user={{ nombreCompleto: 'Test' }} onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });

  it('calls onConfirm with the user object when clicking Eliminar', () => {
    const onConfirm = jest.fn();
    render(<ModalDeleteUser user={mockUser} onConfirm={onConfirm} onCancel={() => {}} />);
    fireEvent.click(screen.getByText('Eliminar usuario'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(mockUser);
  });

  it('calls onCancel when clicking the Cancelar button', () => {
    const onCancel = jest.fn();
    render(<ModalDeleteUser user={mockUser} onConfirm={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('Cancelar'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when clicking the backdrop', () => {
    const onCancel = jest.fn();
    render(<ModalDeleteUser user={mockUser} onConfirm={() => {}} onCancel={onCancel} />);
    fireEvent.click(document.querySelector('.fixed.inset-0'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not propagate click from modal content to backdrop', () => {
    const onCancel = jest.fn();
    render(<ModalDeleteUser user={mockUser} onConfirm={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('¿Eliminar usuario?'));
    expect(onCancel).not.toHaveBeenCalled();
  });
});
