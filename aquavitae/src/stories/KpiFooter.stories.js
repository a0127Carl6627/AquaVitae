import React from 'react';
import KpiFooter from './KpiFooter';

export default {
  title: 'HU11/KpiFooter',
  component: KpiFooter,
  argTypes: {
    kpis: { control: 'object' },
  },
};

const Template = (args) => <KpiFooter {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {};

export const HighLoad = Template.bind({});
HighLoad.storyName = 'Alta carga';
HighLoad.args = {
  kpis: [
    { key: 'uptime',    label: 'Avg Uptime',  value: '97.30%',  icon: 'uptime'    },
    { key: 'latency',   label: 'Latency',     value: '320ms',   icon: 'latency'   },
    { key: 'requests',  label: 'Total Req',   value: '21.4M',   icon: 'requests'  },
    { key: 'endpoints', label: 'Endpoints',   value: '80 active',icon: 'endpoints'},
  ],
};

export const Minimal = Template.bind({});
Minimal.storyName = 'Carga mínima';
Minimal.args = {
  kpis: [
    { key: 'uptime',    label: 'Avg Uptime',  value: '100%',   icon: 'uptime'    },
    { key: 'latency',   label: 'Latency',     value: '8ms',    icon: 'latency'   },
    { key: 'requests',  label: 'Total Req',   value: '120',    icon: 'requests'  },
    { key: 'endpoints', label: 'Endpoints',   value: '3 active',icon: 'endpoints'},
  ],
};