import React from 'react';
import Sidebar from './SideBar';

export default {
  title: 'Base Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    role:            { control: { type: 'select', options: ['director', 'admin'] } },
    activeItem:      { control: 'text' },
    hasNotification: { control: 'boolean' },
    hasApiError:     { control: 'boolean' },
    avatarInitials:  { control: 'text' },
    onItemClick:     { action: 'itemClicked' },
    onLogout:        { action: 'logout' },
  },
};

const Template = (args) => (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Sidebar {...args} />
  </div>
);

export const DirectorDefault = Template.bind({});
DirectorDefault.storyName = 'Director — sin notificaciones';
DirectorDefault.args = { role: 'director', activeItem: 'bell', hasNotification: false, avatarInitials: 'DR' };

export const DirectorWithNotification = Template.bind({});
DirectorWithNotification.storyName = 'Director — con notificación';
DirectorWithNotification.args = { role: 'director', activeItem: 'globe', hasNotification: true, avatarInitials: 'DR' };

export const AdminDefault = Template.bind({});
AdminDefault.storyName = 'Admin — sin errores de API';
AdminDefault.args = { role: 'admin', activeItem: 'settings', hasApiError: false, avatarInitials: 'AU' };

export const AdminWithApiError = Template.bind({});
AdminWithApiError.storyName = 'Admin — con fallo de API ';
AdminWithApiError.args = { role: 'admin', activeItem: 'eye', hasApiError: true, avatarInitials: 'AU' };