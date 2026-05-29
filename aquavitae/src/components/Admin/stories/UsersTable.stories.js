import UsersTable from './UsersTable';

export default {
  title: 'UsuarioYRoles/UsersTable',
  component: UsersTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    onPageChange: { action: 'pageChange' },
    onEdit:       { action: 'edit' },
    onDelete:     { action: 'delete' },
    onAgregar:    { action: 'agregar' },
  },
};

const items = [
  { id:1, nombreCompleto:'Fernanda Ríos',   correo:'fernanda.rios@aquavitae.com',   nombreRol:'Administrador',    nombreRegion:'Monterrey', activo:true,  ultimoAcceso:'20 May 2025, 10:24 a.m.' },
  { id:2, nombreCompleto:'Juan Morales',    correo:'juan.morales@aquavitae.com',    nombreRol:'Director',         nombreRegion:'Guadalajara', activo:true,  ultimoAcceso:'20 May 2025, 09:15 a.m.' },
  { id:3, nombreCompleto:'Laura Pérez',     correo:'laura.perez@aquavitae.com',     nombreRol:'Gerente de Planta',nombreRegion:'CDMX',      activo:true,  ultimoAcceso:'19 May 2025, 04:30 p.m.' },
  { id:4, nombreCompleto:'Carlos Ramírez',  correo:'carlos.ramirez@aquavitae.com',  nombreRol:'Analista',         nombreRegion:'CDMX',      activo:true,  ultimoAcceso:'19 May 2025, 11:20 a.m.' },
  { id:5, nombreCompleto:'María Gómez',     correo:'maria.gomez@aquavitae.com',     nombreRol:'Operador',         nombreRegion:'Chihuahua', activo:false, ultimoAcceso:'18 May 2025, 08:45 a.m.' },
];


export const Default = {
  args: {
    usuarios: { items, total: 48, page: 0, size: 5, totalPages: 10 },
  },
};

export const PaginaIntermedia = {
  args: {
    usuarios: { items, total: 48, page: 4, size: 5, totalPages: 10 },
  },
};

export const UltimaPagina = {
  args: {
    usuarios: {
      items: items.slice(0, 3),
      total: 48, page: 9, size: 5, totalPages: 10,
    },
  },
};

export const Cargando = {
  args: {
    usuarios: { items: [], total: 0, page: 0, size: 5, totalPages: 0 },
    loading: true,
  },
};

export const SinUsuarios = {
  args: {
    usuarios: { items: [], total: 0, page: 0, size: 5, totalPages: 0 },
  },
};

export const UnUsuario = {
  args: {
    usuarios: {
      items: [items[0]],
      total: 1, page: 0, size: 5, totalPages: 1,
    },
  },
};

export const ConInactivos = {
  args: {
    usuarios: {
      items: items.map((u, i) => ({ ...u, activo: i % 2 === 0 })),
      total: 48, page: 0, size: 5, totalPages: 10,
    },
  },
};