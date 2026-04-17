import DatePicker from './DatePicker';
import { useState } from 'react';

const meta = {
  title: 'SCRUM-35/DatePicker',
  component: DatePicker,
};

export default meta;

export const Default = () => {
  const [date, setDate] = useState('');

  return <DatePicker value={date} onChange={setDate} />;
};