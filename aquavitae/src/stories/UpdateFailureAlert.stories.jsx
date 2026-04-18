import React, { useState } from 'react';
import UpdateFailureAlert from './UpdateFailureAlert';

export default {
  title: 'HU11/UpdateFailureAlert',
  component: UpdateFailureAlert,
  argTypes: {
    title:     { control: 'text' },
    message:   { control: 'text' },
    timestamp: { control: 'text' },
    visible:   { control: 'boolean' },
    onClose:   { action: 'closed' },
  },
};

const Template = (args) => <UpdateFailureAlert {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  title:   'Fallo en actualización',
  message: 'No se pudo sincronizar el módulo. Intenta de nuevo.',
  visible: true,
};

export const WithTimestamp = Template.bind({});
WithTimestamp.storyName = 'Con timestamp';
WithTimestamp.args = {
  title:     'Fallo en actualización',
  message:   'No se pudo sincronizar el módulo. Intenta de nuevo.',
  timestamp: '2023-10-27 14:30:05',
  visible:   true,
};

export const WithClose = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      {!visible && (
        <button onClick={() => setVisible(true)} style={{ marginBottom: 12, fontFamily: 'sans-serif', fontSize: 12 }}>
          Mostrar alerta
        </button>
      )}
      <UpdateFailureAlert
        title="Fallo en actualización"
        message="No se pudo sincronizar el módulo. Intenta de nuevo."
        timestamp="2023-10-27 14:30:05"
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  );
};
WithClose.storyName = 'Con botón de cierre';

export const Hidden = Template.bind({});
Hidden.storyName = 'Oculta (visible: false)';
Hidden.args = {
  visible: false,
};

